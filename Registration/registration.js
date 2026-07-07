// আপনার নতুন Google Web App URL এবং Cloudinary ক্রেডেনশিয়াল
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxj-IEzlvcZWLzSMhDnTZiTl_TY2u9I2J55H_ZiIQqRYjZl9LdVVBKYmTxS7Znn5b2F/exec"; 

const sameAddressCheck = document.getElementById('sameAddressCheck');
const presentAddress = document.getElementById('presentAddress');
const permanentAddress = document.getElementById('permanentAddress');
const registrationForm = document.getElementById('registrationForm');
const otpModal = document.getElementById('otpModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// ক্লোজ বাটন ফিক্স (ভেরিফিকেশন পেজ ক্লোজ বাটন)
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    otpModal.classList.remove('active');
  });
}

// ওটিপি মডালের বাইরের ব্লাঙ্ক এরিয়াতে ক্লিক করলেও যাতে বন্ধ হয়
window.addEventListener('click', (e) => {
  if (e.target === otpModal) {
    otpModal.classList.remove('active');
  }
});

// ১. কাস্টম ড্রপডাউন (Blood Group) ইন্টিগ্রেশন
const wrapper = document.getElementById('bloodGroupWrapper');
const trigger = wrapper ? wrapper.querySelector('.custom-select-trigger') : null;
const searchBox = wrapper ? wrapper.querySelector('.search-box') : null;
const options = wrapper ? wrapper.querySelectorAll('.custom-option') : [];
const hiddenInput = document.getElementById('bloodGroup');

if (trigger) {
  trigger.addEventListener('click', (e) => {
    wrapper.classList.toggle('open');
    e.stopPropagation();
  });
}

if (searchBox) {
  searchBox.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  searchBox.addEventListener('input', (e) => {
    const filter = e.target.value.toUpperCase();
    options.forEach(option => {
      const txtValue = option.textContent || option.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        option.style.display = "";
      } else {
        option.style.display = "none";
      }
    });
  });
}

options.forEach(option => {
  option.addEventListener('click', (e) => {
    const val = option.getAttribute('data-value');
    trigger.querySelector('span').innerText = option.innerText;
    hiddenInput.value = val;
    wrapper.classList.remove('open');
    e.stopPropagation();
  });
});

window.addEventListener('click', () => {
  if (wrapper) wrapper.classList.remove('open');
});

// ২. 'Same as Present Address' লজিক
if (sameAddressCheck) {
  sameAddressCheck.addEventListener('change', () => {
    if (sameAddressCheck.checked) {
      permanentAddress.value = presentAddress.value;
      permanentAddress.readOnly = true;
    } else {
      permanentAddress.value = "";
      permanentAddress.readOnly = false;
    }
  });

  presentAddress.addEventListener('input', () => {
    if (sameAddressCheck.checked) {
      permanentAddress.value = presentAddress.value;
    }
  });
}

// ৩. Cloudinary ইমেজ আপলোড
async function uploadToCloudinary(file) {
  const cloudName = "dcmu3hius"; 
  const unsignedUploadPreset = "ros_uploads"; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData
  });
  
  if (!res.ok) throw new Error("Cloudinary ইমেজ আপলোড ব্যর্থ হয়েছে!");
  const data = await res.json();
  return data.secure_url; 
}

// OTP ইনপুট অটো-ফোকাস
const otpFields = document.querySelectorAll('.otp-field');
otpFields.forEach((field, index) => {
  field.addEventListener('input', (e) => {
    if (e.target.value.length === 1 && index < otpFields.length - 1) {
      otpFields[index + 1].focus();
    }
  });
  field.addEventListener('keydown', (e) => {
    if (e.key === "Backspace" && field.value.length === 0 && index > 0) {
      otpFields[index - 1].focus();
    }
  });
});

let savedFormPayload = {}; 

// ৪. প্রথম ধাপ: ফর্ম সাবমিশন ও ওটিপি জেনারেশন (ডুপ্লিকেট ইমেইল চেকিং লজিকসহ)
registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (password !== confirmPassword) {
    alert("ত্রুটি: পাসওয়ার্ড এবং কনফর্ম পাসওয়ার্ড মেলেনি!");
    return;
  }

  const photoFile = document.getElementById('profilePhoto').files[0];
  if (photoFile && photoFile.size > 1024 * 1024) { 
    alert("ত্রুটি: প্রোফাইল ছবির সাইজ ১ এমবির বেশি হতে পারবে না!");
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> প্রসেসিং হচ্ছে...`;
  submitBtn.disabled = true;

  try {
    const email = document.getElementById('email').value.trim();
    
    // ডুপ্লিকেট ইমেইল চেকিং এবং OTP পাঠানো
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: "sendOtp", email: email, englishName: document.getElementById('englishName').value })
    });
    const resData = await response.json();

    // একই ইমেইল দিয়ে অলরেডি অ্যাকাউন্ট থাকলে অ্যালার্ট মেসেজ এবং ওটিপি যাবে না
    if (!resData.success) {
      if (resData.error && (resData.error.includes("already") || resData.error.includes("বিদ্যমান"))) {
        throw new Error("This email is already registered. Please login.");
      }
      throw new Error(resData.error || "OTP পাঠাতে ব্যর্থ হয়েছে।");
    }

    const uploadedPhotoUrl = photoFile ? await uploadToCloudinary(photoFile) : "";
    const bloodGroupValue = document.getElementById('bloodGroup').value || "";

    savedFormPayload = {
      banglaName: document.getElementById('banglaName').value,
      englishName: document.getElementById('englishName').value,
      fatherName: document.getElementById('fatherName').value,
      motherName: document.getElementById('motherName').value,
      mobileNumber: document.getElementById('mobileNumber').value.trim(),
      email: email,
      bloodGroup: bloodGroupValue,
      gender: document.getElementById('gender').value,
      dob: document.getElementById('dob').value,
      presentAddress: presentAddress.value,
      permanentAddress: permanentAddress.value,
      education: document.getElementById('education').value,
      academicYear: document.getElementById('academicYear').value,
      profession: document.getElementById('profession').value,
      institution: document.getElementById('institution').value,
      whatsappNumber: document.getElementById('whatsappNumber').value || "",
      facebookLink: document.getElementById('facebookLink').value || "",
      nidOrBrn: document.getElementById('nidOrBrn').value || "",
      password: password,
      photoUrl: uploadedPhotoUrl
    };

    const modalContent = document.querySelector('#otpModal .modal-content') || document.getElementById('modalContentBox');
    if(modalContent) {
      modalContent.style.maxHeight = "90vh";
      modalContent.style.overflowY = "auto";
    }

    document.getElementById('otpSection').style.display = "block";
    document.getElementById('successSection').style.display = "none";
    document.getElementById('closeModalBtn').style.display = "block";
    document.getElementById('otpModal').classList.add('active');
    if (otpFields[0]) otpFields[0].focus();

  } catch (error) {
    alert("রেজিস্ট্রেশন ত্রুটি: " + error.message);
  } finally {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
});

// ৫. দ্বিতীয় ধাপ: ওটিপি ভেরিফাই এবং চূড়ান্ত সাকসেস মেসেজ (পিডিএফ অপশন রিমুভড)
document.getElementById('verifyOtpBtn').addEventListener('click', async () => {
  let otpCode = "";
  otpFields.forEach(field => otpCode += field.value);

  if (otpCode.length < 6) {
    alert("অনুগ্রহ করে ৬-ডিজিটের সম্পূর্ণ ওটিপি দিন।");
    return;
  }

  const verifyBtn = document.getElementById('verifyOtpBtn');
  verifyBtn.innerText = "নিবন্ধন সম্পন্ন হচ্ছে...";
  verifyBtn.disabled = true;

  try {
    savedFormPayload.action = "register";
    savedFormPayload.otp = otpCode;

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(savedFormPayload)
    });
    const finalRes = await response.json();

    if (finalRes.success) {
      const regNumber = finalRes.memberId || "ROS-2026-____";
      const userEnglishName = savedFormPayload.englishName || "(Name in English)";

      // সাকসেস মেসেজ ও পেন্ডিং ডিজাইন লোড
      document.getElementById('successSection').innerHTML = `
        <div style="text-align: center; padding: 10px; font-family: 'Poppins', sans-serif;">
          <div style="font-size: 45px; color: #4cc9f0; margin-bottom: 10px;"><i class="fas fa-check-circle"></i></div>
          <h2 style="color: #fff; font-size: 20px; margin-bottom: 5px;">Congratulations!</h2>
          <p style="color: #4cc9f0; font-size: 15px; margin-bottom: 5px;">Your registration was successful.</p>
          <p style="color: #ffd700; font-weight: bold; font-size: 16px; margin-bottom: 15px;">Registration Number: ${regNumber}</p>
          
          <div style="color: #a4b3c6; font-size: 14px; text-align: left; line-height: 1.6; background: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 15px;">
            Dear <strong>${userEnglishName}</strong>,<br><br>
            Your registration with the Rajshahi Olympiad Society has been successfully completed. Thank you sincerely for joining us.<br><br>
            
            <div style="text-align: center; margin: 15px 0;">
              <div style="display: inline-block; background: rgba(243, 156, 18, 0.15); border: 1px solid #f39c12; color: #f39c12; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fas fa-clock"></i> Account Status: Pending
              </div>
            </div>

            Your application is currently awaiting verification. Your account will be activated once the admin or president completes the verification process. You will be notified via email once your account is active.<br><br>
            
            <span style="color: #ffd700;"><i class="fa-solid fa-lock"></i> Please keep your assigned password safe for future logins.</span><br><br>
            
            May your journey with the Rajshahi Olympiad Society be joyful and successful. Best wishes!<br><br>
            
            <span style="font-size: 13px; color: #fff;">With regard,<br><strong>Rajshahi Olympiad Society</strong></span>
          </div>
          
          <a href="../../Login/" class="btn-go-login">
            <i class="fa-solid fa-right-to-bracket"></i> Go to Login Page
          </a>
          
          <a href="../../Home/" class="btn-go-home">
            <i class="fa-solid fa-house"></i> Go Back To Home
          </a>
        </div>
      `;

      document.getElementById('otpSection').style.display = "none";
      document.getElementById('closeModalBtn').style.display = "none"; // সফল হলে মোডাল ক্লোজ বাটন হাইড হবে
      document.getElementById('successSection').style.display = "block";

      registrationForm.reset();
      if (trigger) trigger.querySelector('span').innerText = "Select Blood Group";
      if (hiddenInput) hiddenInput.value = "";
    } else {
      throw new Error(finalRes.error || "ভেরিফিকেশন কোড ভুল হয়েছে।");
    }

  } catch (error) {
    alert("ভেরিফিকেশন ব্যর্থ: " + error.message);
    verifyBtn.innerText = "Verify & Submit";
    verifyBtn.disabled = false;
  }
});
