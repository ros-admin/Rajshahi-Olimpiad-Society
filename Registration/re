// আপনার Google Web App URL এবং Cloudinary ক্রেডেনশিয়াল এখানে দিন
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwIoAiqPW96kHOIi8hHgivS8-M7Zl1phoiNmKYukgQTmh9kn_UkDjVEpPhEZ98hErddqg/exec"; 

const sameAddressCheck = document.getElementById('sameAddressCheck');
const presentAddress = document.getElementById('presentAddress');
const permanentAddress = document.getElementById('permanentAddress');
const registrationForm = document.getElementById('registrationForm');

// ১. কাস্টম ড্রপডাউন (Blood Group) ইন্টিগ্রেশন এবং অ্যারে ফিল্টারিং
const wrapper = document.getElementById('bloodGroupWrapper');
const trigger = wrapper.querySelector('.custom-select-trigger');
const searchBox = wrapper.querySelector('.search-box');
const options = wrapper.querySelectorAll('.custom-option');
const hiddenInput = document.getElementById('bloodGroup');

trigger.addEventListener('click', () => wrapper.classList.toggle('open'));

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

options.forEach(option => {
  option.addEventListener('click', () => {
    trigger.querySelector('span').innerText = option.innerText;
    hiddenInput.value = option.getAttribute('data-value');
    wrapper.classList.remove('open');
  });
});

// ক্লিক আউটসাইড টু ক্লোজ ড্রপডাউন
window.addEventListener('click', (e) => {
  if (!wrapper.contains(e.target)) wrapper.classList.remove('open');
});

// ২. 'Same as Present Address' লজিক টগল
sameAddressCheck.addEventListener('change', () => {
  if (sameAddressCheck.checked) {
    permanentAddress.value = presentAddress.value;
    permanentAddress.readOnly = true;
  } else {
    permanentAddress.value = "";
    permanentAddress.readOnly = false;
  }
});

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

// OTP ইনপুট অটো-ফোকাস কার্সার মুভমেন্ট
const otpFields = document.querySelectorAll('.otp-field');
otpFields.forEach((field, index) => {
  field.addEventListener('input', (e) => {
    if (e.target.value.length === 1 && index < otpFields.length - 1) {
      otpFields[index + 1].focus();
    }
  });
});

let savedFormPayload = {}; // ডাটা সাময়িকভাবে ধরে রাখার জন্য গ্লোবাল ভেরিয়েবল

// ৪. প্রথম ধাপ: ফর্ম সাবমিশন ও ওটিপি জেনারেশন ফেচ
registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (password !== confirmPassword) {
    alert("ত্রুটি: পাসওয়ার্ড এবং কনফর্ম পাসওয়ার্ড মেলেনি!");
    return;
  }

  const photoFile = document.getElementById('profilePhoto').files[0];
  if (photoFile && photoFile.size > 512 * 1024) {
    alert("ত্রুটি: প্রোফাইল ছবির সাইজ ৫১২ কেবির বেশি হতে পারবে না!");
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerText = "ওটিপি পাঠানো হচ্ছে...";
  submitBtn.disabled = true;

  try {
    const email = document.getElementById('email').value.trim();
    
    // Apps script-এ OTP পাঠানোর রিকোয়েস্ট
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ action: "sendOtp", email: email })
    });
    const resData = await response.json();

    if (!resData.success) throw new Error(resData.error || "OTP পাঠাতে ব্যর্থ হয়েছে।");

    // ডাটা সাময়িকভাবে অবজেক্টে সেভ করা হচ্ছে
    const uploadedPhotoUrl = photoFile ? await uploadToCloudinary(photoFile) : "";
    
    savedFormPayload = {
      banglaName: document.getElementById('banglaName').value,
      englishName: document.getElementById('englishName').value,
      fatherName: document.getElementById('fatherName').value,
      motherName: document.getElementById('motherName').value,
      mobileNumber: document.getElementById('mobileNumber').value.trim(),
      email: email,
      bloodGroup: hiddenInput.value,
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

    // ওটিপি মডাল উইন্ডো প্রদর্শন
    document.getElementById('otpModal').classList.add('active');

  } catch (error) {
    alert("রেজিস্ট্রেশন ত্রুটি: " + error.message);
    submitBtn.innerText = "ওটিপি পাঠান ও অগ্রসর হোন";
    submitBtn.disabled = false;
  }
});

// ৫. দ্বিতীয় ধাপ: ওটিপি ভেরিফাই এবং চূড়ান্ত সাবমিশন
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
    // সংগৃহীত ডাটার সাথে ওটিপি ও অ্যাকশন ম্যাপ করে পাঠানো হচ্ছে
    savedFormPayload.action = "register";
    savedFormPayload.otp = otpCode;

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(savedFormPayload)
    });
    const finalRes = await response.json();

    if (finalRes.success) {
      document.getElementById('otpModal').classList.remove('active');
      document.getElementById('displayMemberId').innerText = finalRes.memberId;
      document.getElementById('successModal').classList.add('active');
      
      // রিসেট অল ফিল্ডস (রিসেট গাইডলাইন অনুযায়ী)
      registrationForm.reset();
      trigger.querySelector('span').innerText = "রক্তের গ্রুপ নির্বাচন করুন";
      hiddenInput.value = "";
    } else {
      throw new Error(finalRes.error);
    }

  } catch (error) {
    alert("ভেরিফিকেশন ব্যর্থ: " + error.message);
    verifyBtn.innerText = "ভেরিফাই এবং সাবমিট করুন";
    verifyBtn.disabled = false;
  }
});
      
