// আপনার একদম নতুন Google Web App URL 
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxzQ8VQm0x33osCX-ZjiGbAEDfiR9xpt3WpK-_nlFQSq_7ICO9io9q8YoejAGcehbPStw/exec"; 

// ১. কাস্টম ড্যাশড স্পিনার (নীল ও হলুদ) এবং মডাল স্টাইল ইনজেকশন (একদম স্ক্রিনের মাঝখানে দেখানোর জন্য)
const styleNode = document.createElement('style');
styleNode.innerHTML = `
  /* ফুল স্ক্রিন ওভারলে লোডার */
  .ros-global-loader {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(3, 10, 22, 0.85); display: none;
    flex-direction: column; align-items: center; justify-content: center; z-index: 99999;
    font-family: 'Poppins', 'Hind Siliguri', sans-serif;
  }
  .ros-spinner-container {
    position: relative; width: 110px; height: 110px;
    display: flex; align-items: center; justify-content: center;
  }
  /* কাটা কাটা (Dashed) থিম স্পিনার - নীল এবং হলুদ রং */
  .ros-dashed-spinner {
    position: absolute; width: 100%; height: 100%;
    border: 4px dashed #00b4d8; border-top-color: #ffd700; border-bottom-color: #ffd700;
    border-radius: 50%; animation: ros-spin 1.5s linear infinite;
  }
  .ros-spinner-logo {
    width: 65px; height: 65px; background: #ffffff;
    border-radius: 50%; padding: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    object-fit: cover; z-index: 2;
  }
  .ros-loader-text {
    color: #ffd700; font-size: 16px; font-weight: 500; margin-top: 20px;
    letter-spacing: 0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
  @keyframes ros-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  /* টাইমার এবং রিসেন্ড টেক্সট স্টাইল */
  .otp-timer-container {
    margin: 15px 0 5px 0; font-size: 14px; color: #ffd700; font-weight: 500; text-align: center;
  }
  .resend-otp-btn {
    background: none; border: none; color: #52667d; font-weight: 600;
    cursor: not-allowed; text-decoration: underline; font-size: 13px; margin-top: 5px; transition: 0.3s;
  }
  .resend-otp-btn.active {
    color: #00a4cc; cursor: pointer;
  }
  .spam-notice-box {
    background: rgba(255, 215, 0, 0.06); border: 1px dashed #ffd700;
    border-radius: 6px; padding: 10px; font-size: 12px; color: #f1f5f9;
    margin: 12px 0; text-align: center; line-height: 1.5;
  }
`;
document.head.appendChild(styleNode);

// HTML-এ গ্লোবাল লোডার ডাইনামিকালি তৈরি করে বডিতে পুশ করা
const globalLoaderDiv = document.createElement('div');
globalLoaderDiv.id = "rosGlobalLoader";
globalLoaderDiv.className = "ros-global-loader";
globalLoaderDiv.innerHTML = `
  <div class="ros-spinner-container">
    <div class="ros-dashed-spinner"></div>
    <img src="https://rosociety.vercel.app/ros%20logo.png" class="ros-spinner-logo" alt="ROS">
  </div>
  <div class="ros-loader-text" id="rosLoaderText">otp পাঠানো হচ্ছে...</div>
`;
document.body.appendChild(globalLoaderDiv);

// ফর্ম অবজেক্ট রেফারেন্স
const sameAddressCheck = document.getElementById('sameAddressCheck');
const presentAddress = document.getElementById('presentAddress');
const permanentAddress = document.getElementById('permanentAddress');
const registrationForm = document.getElementById('registrationForm');
const otpModal = document.getElementById('otpModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// ক্লোজ বাটন অ্যাকশন
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    otpModal.classList.remove('active');
  });
}
window.addEventListener('click', (e) => {
  if (e.target === otpModal) otpModal.classList.remove('active');
});

// কাস্টম ড্রপডাউন (Blood Group) ইন্টিগ্রেশন
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
  searchBox.addEventListener('click', (e) => e.stopPropagation());
  searchBox.addEventListener('input', (e) => {
    const filter = e.target.value.toUpperCase();
    options.forEach(option => {
      const txtValue = option.textContent || option.innerText;
      option.style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
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

// Address কপি লজিক
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
    if (sameAddressCheck.checked) permanentAddress.value = presentAddress.value;
  });
}

// Cloudinary ইমেজ আপলোড
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
let countdownInterval = null;
let resendCount = 0; // মোট কতবার রিসেন্ড করা হয়েছে ট্র্যাকিং করার জন্য

// টাইমার এবং রিসেন্ড বাটন হ্যান্ডলার ফাংশন
function startOtpEngine() {
  if (countdownInterval) clearInterval(countdownInterval);
  
  const timerDisplay = document.getElementById('otpCountdownTimer');
  const resendBtn = document.getElementById('resendOtpBtn');
  
  let totalSeconds = 5 * 60; // ৫ মিনিট = ৩০০ সেকেন্ড
  resendBtn.disabled = true;
  resendBtn.classList.remove('active');
  
  if(resendCount >= 1) {
    resendBtn.innerText = "Resend OTP (Limit reached)";
  } else {
    resendBtn.innerText = "Resend OTP (Available in 03:00)";
  }

  countdownInterval = setInterval(() => {
    totalSeconds--;
    
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
      timerDisplay.innerText = "Time Expired!";
      resendBtn.disabled = true;
      resendBtn.classList.remove('active');
      alert("ওটিপির ৫ মিনিট মেয়াদ শেষ হয়েছে। অনুগ্রহ করে আবার ট্রাই করুন।");
      return;
    }

    // মিনিট ও সেকেন্ড ফরম্যাটিং
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    timerDisplay.innerText = `${mins}:${secs}`;

    // ৩ মিনিট পার হলে (বাকি থাকে ২ মিনিট বা ১২০ সেকেন্ড) এবং রিসেন্ড লিমিট ক্রস না করলে বাটন একটিভ হবে
    if (totalSeconds <= 120 && resendCount < 1) {
      resendBtn.disabled = false;
      resendBtn.classList.add('active');
      resendBtn.innerText = "Resend OTP";
    } else if (resendCount < 1) {
      // ৩ মিনিট হওয়ার আগ পর্যন্ত কত সময় বাকি আছে তা দেখাবে
      const waitTime = totalSeconds - 120;
      const waitMins = String(Math.floor(waitTime / 60)).padStart(2, '0');
      const waitSecs = String(waitTime % 60).padStart(2, '0');
      resendBtn.innerText = `Resend OTP (Available in ${waitMins}:${waitSecs})`;
    }
  }, 1000);
}

// ওটিপি মডালের ভেতর ডাইনামিক এলিমেন্ট (স্প্যাম নোটিশ, টাইমার ও রিসেন্ড বাটন) ইনজেক্ট করা
function setupOtpModalUi() {
  const otpSection = document.getElementById('otpSection');
  
  // অলরেডি অ্যাপেন্ড করা থাকলে ডুপ্লিকেট করবে না
  if (!document.getElementById('otpCountdownTimer')) {
    
    // স্প্যাম বক্স নোটিশ ইনপুট বক্সের ঠিক ওপরে অ্যাড করা হলো
    const spamBox = document.createElement('div');
    spamBox.className = "spam-notice-box";
    spamBox.innerHTML = `⚠️ যেকোনো কারণে ওটিপি খুঁজে না পেলে অনুগ্রহ করে আপনার ইমেইলের <strong>Spam (স্প্যাম)</strong> বক্সটি চেক করুন।`;
    otpSection.insertBefore(spamBox, otpSection.querySelector('.otp-input-wrapper') || otpSection.querySelector('.btn-submit'));

    // টাইমার ও রিসেন্ড বাটন সাবমিট বাটনের ঠিক নিচে অ্যাড করা হলো
    const timerWrapper = document.createElement('div');
    timerWrapper.innerHTML = `
      <div class="otp-timer-container">
        ⏱ ওটিপির মেয়াদ বাকি: <span id="otpCountdownTimer" style="font-weight:700; font-family:monospace; font-size:16px;">05:00</span> মিনিট
      </div>
      <div style="text-align:center; margin-bottom:10px;">
        <button id="resendOtpBtn" class="resend-otp-btn" type="button" disabled>Resend OTP</button>
      </div>
    `;
    otpSection.appendChild(timerWrapper);

    // রিসেন্ড বাটন ক্লিক ইভেন্ট লিসেনার
    document.getElementById('resendOtpBtn').addEventListener('click', async () => {
      if (resendCount >= 1) return;
      
      document.getElementById('rosGlobalLoader').style.display = "flex";
      document.getElementById('rosLoaderText').innerText = "ওটিপি পুনরায় পাঠানো হচ্ছে...";
      
      try {
        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({ action: "sendOtp", email: savedFormPayload.email, englishName: savedFormPayload.englishName })
        });
        const resData = await response.json();
        
        if (resData.success) {
          resendCount++;
          alert("ওটিপি সফলভাবে পুনরায় পাঠানো হয়েছে!");
          startOtpEngine(); // নতুন করে ৫ মিনিটের টাইমার স্টার্ট
        } else {
          alert("ওটিপি পুনরায় পাঠাতে ব্যর্থ হয়েছে: " + resData.error);
        }
      } catch (err) {
        alert("নেটওয়ার্ক ত্রুটি: " + err.message);
      } finally {
        document.getElementById('rosGlobalLoader').style.display = "none";
      }
    });
  }
}

// প্রথম ধাপ: ফর্ম সাবমিশন ও ওটিপি জেনারেশন (ড্যাশড স্পিনার লোডার এবং কাস্টম এরর ডায়ালগ ফিক্স)
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

  // স্ক্রিনের মাঝখানে কাস্টম কাটা কাটা রাউন্ড লোডার অন করা হলো
  document.getElementById('rosGlobalLoader').style.display = "flex";
  document.getElementById('rosLoaderText').innerText = "otp পাঠানো হচ্ছে...";

  try {
    const email = document.getElementById('email').value.trim();
    
    // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: "sendOtp", email: email, englishName: document.getElementById('englishName').value })
    });
    const resData = await response.json();

    // ইমেইল অলরেডি রেজিস্টার্ড থাকলে কাস্টম স্ক্রিন অ্যালার্ট এবং লগইন বাটন জেনারেট হবে
    if (!resData.success) {
      if (resData.error && (resData.error.includes("already") || resData.error.includes("registered"))) {
        
        // মডাল কন্টেন্ট বক্স ক্লিয়ার করে সুন্দর সাকসেস/এরর ইন্টারফেস লোড
        document.getElementById('otpSection').style.display = "none";
        document.getElementById('successSection').innerHTML = `
          <div style="text-align: center; padding: 20px; font-family: 'Poppins', 'Hind Siliguri', sans-serif;">
            <div style="font-size: 50px; color: #ff4d6d; margin-bottom: 15px;"><i class="fas fa-exclamation-circle"></i></div>
            <h2 style="color: #fff; font-size: 20px; margin-bottom: 12px; font-family:'Hind Siliguri';">দুঃখিত, নিবন্ধন করা যাচ্ছে না!</h2>
            <p style="color: #ffd700; font-size: 15px; margin-bottom: 25px; line-height:1.6; font-family:'Hind Siliguri';">
              এই ই-মেইলে অলরেডি অ্যাকাউন্ট আছে। অনুগ্রহ করে লগইন করুন।
            </p>
            <a href="../../Login/" class="btn-go-login" style="display:inline-block; padding:12px 30px; background:#00b4d8; color:#fff; text-decoration:none; border-radius:6px; font-weight:600;">
              <i class="fa-solid fa-right-to-bracket"></i> লগইন করুন
            </a>
          </div>
        `;
        document.getElementById('closeModalBtn').style.display = "block";
        document.getElementById('successSection').style.display = "block";
        document.getElementById('otpModal').classList.add('active');
        return; 
      }
      throw new Error(resData.error || "OTP পাঠাতে ব্যর্থ হয়েছে।");
    }

    // ইমেজ ক্লাউডিনারিতে আপলোড
    const uploadedPhotoUrl = photoFile ? await uploadToCloudinary(photoFile) : "";
    const bloodGroupValue = document.getElementById('bloodGroup').value || "";

    // পে-লোড ডাটা সংরক্ষণ
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

    // মডাল ও টাইমার UI সেটাআপ এবং ওটিপি প্রম্পট লোড
    setupOtpModalUi();
    resendCount = 0; // কাউন্টার রিসেট
    startOtpEngine(); // ৫ মিনিটের টাইমার শুরু

    document.getElementById('otpSection').style.display = "block";
    document.getElementById('successSection').style.display = "none";
    document.getElementById('closeModalBtn').style.display = "block";
    document.getElementById('otpModal').classList.add('active');
    
    // প্রথম ওটিপি বক্সে অটো-ফোকাস
    otpFields.forEach(f => f.value = "");
    if (otpFields[0]) otpFields[0].focus();

  } catch (error) {
    alert("রেজিস্ট্রেশন ত্রুটি: " + error.message);
  } finally {
    // গ্লোবাল ড্যাশড স্পিনার ক্লোজ করা হলো
    document.getElementById('rosGlobalLoader').style.display = "none";
  }
});

// দ্বিতীয় ধাপ: ওটিপি ভেরিফাই এবং চূড়ান্ত সাকসেস মেসেজ ট্র্রিগার করা
document.getElementById('verifyOtpBtn').addEventListener('click', async () => {
  let otpCode = "";
  otpFields.forEach(field => otpCode += field.value);

  if (otpCode.length < 6) {
    alert("অনুগ্রহ করে ৬-ডিজিটের সম্পূর্ণ ওটিপি দিন।");
    return;
  }

  // ওটিপি সাবমিট করার সময়ও একই ড্যাশড স্পিনার স্ক্রিনে দেখাবে
  document.getElementById('rosGlobalLoader').style.display = "flex";
  document.getElementById('rosLoaderText').innerText = "নিবন্ধন সম্পন্ন হচ্ছে...";

  try {
    savedFormPayload.action = "register";
    savedFormPayload.otp = otpCode;

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(savedFormPayload)
    });
    const finalRes = await response.json();

    if (finalRes.success) {
      if (countdownInterval) clearInterval(countdownInterval); // ওটিপি সফল হলে টাইমার বন্ধ হবে
      
      const regNumber = finalRes.memberId || "ROS-2026-____";
      const userEnglishName = savedFormPayload.englishName || "(Name in English)";

      // সাকসেস মেসেজ ও পেন্ডিং ডিজাইন লোড করা হচ্ছে
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
          
          <a href="../../Home/" class="btn-go-home" style="margin-top: 10px;">
            <i class="fa-solid fa-house"></i> Go Back To Home
          </a>
        </div>
      `;

      document.getElementById('otpSection').style.display = "none";
      document.getElementById('closeModalBtn').style.display = "none"; 
      document.getElementById('successSection').style.display = "block";

      registrationForm.reset();
      if (trigger) trigger.querySelector('span').innerText = "Select Blood Group";
      if (hiddenInput) hiddenInput.value = "";
    } else {
      throw new Error(finalRes.error || "ভেরিফিকেশন কোড ভুল হয়েছে।");
    }

  } catch (error) {
    alert("ভেরিফিকেশন ব্যর্থ: " + error.message);
  } finally {
    document.getElementById('rosGlobalLoader').style.display = "none";
  }
});
                                                         
