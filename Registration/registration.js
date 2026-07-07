// Google Web App Apps Script Backend End-Point Deployment URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydeKRTgDdd6OxiGy78oBzXzl9CmtqOUUm7vv69S21zlPgqfamKMFlT2R-AQulGLq9JFA/exec"; 

const sameAddressCheck = document.getElementById('sameAddressCheck');
const presentAddress = document.getElementById('presentAddress');
const permanentAddress = document.getElementById('permanentAddress');
const registrationForm = document.getElementById('registrationForm');

// ১. Blood Group Custom Dropdown Controller
const wrapper = document.getElementById('bloodGroupWrapper');
const trigger = wrapper.querySelector('.custom-select-trigger');
const searchBox = wrapper.querySelector('.search-box');
const options = wrapper.querySelectorAll('.custom-option');
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
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        option.style.display = "";
      } else {
        option.style.display = "none";
      }
    });
  });
}

options.forEach(option => {
  option.addEventListener('click', () => {
    trigger.querySelector('span').innerText = option.innerText;
    hiddenInput.value = option.getAttribute('data-value');
    wrapper.classList.remove('open');
  });
});

document.addEventListener('click', () => {
  if (wrapper) wrapper.classList.remove('open');
});

// ২. Address Synchronization
if (sameAddressCheck) {
  sameAddressCheck.addEventListener('change', () => {
    if (sameAddressCheck.checked) {
      permanentAddress.value = presentAddress.value;
      permanentAddress.readOnly = true;
      permanentAddress.style.opacity = "0.6";
    } else {
      permanentAddress.value = "";
      permanentAddress.readOnly = false;
      permanentAddress.style.opacity = "1";
    }
  });
  presentAddress.addEventListener('input', () => {
    if (sameAddressCheck.checked) {
      permanentAddress.value = presentAddress.value;
    }
  });
}

// ৩. OTP Box Focus Auto Shifter
const otpFields = document.querySelectorAll('.otp-field');
otpFields.forEach((field, index) => {
  field.addEventListener('input', () => {
    if (field.value.length === 1 && index < otpFields.length - 1) {
      otpFields[index + 1].focus();
    }
  });
  field.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && field.value.length === 0 && index > 0) {
      otpFields[index - 1].focus();
    }
  });
});

// Cross Modal Close Handler Fixed
document.getElementById('closeModalBtn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('otpModal').classList.remove('active');
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerText = "Proceed with Verification";
  submitBtn.disabled = false;
});

// ৪. Real-time Pre-Checking Duplicate Gmail Logic & Photo Pipeline
let savedFormPayload = {}; 

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.innerText = "Checking Credentials...";
  submitBtn.disabled = true;

  const targetEmail = document.getElementById('email').value.trim();

  try {
    // Real-time bypass parameter matching for sheet validation layer
    const checkPayload = {
      action: "register",
      email: targetEmail,
      mobileNumber: "BYPASS_CHECK_" + new Date().getTime(), 
      otp: "000000" 
    };

    const preCheckResponse = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(checkPayload)
    });
    const preCheckResult = await preCheckResponse.json();

    // Gmail duplication assertion window
    if (!preCheckResult.success && preCheckResult.error.includes("ইমেইল ঠিকানাটি অলরেডি রেজিস্টার্ড")) {
      alert("দুঃখিত, এই ইমেইল ঠিকানাটি অলরেডি রেজিস্টার্ড! অনুগ্রহ করে অন্য ইমেইল ব্যবহার করুন।");
      submitBtn.innerText = "Proceed with Verification";
      submitBtn.disabled = false;
      return;
    }

    submitBtn.innerText = "Uploading Profile Photo...";

    const photoFile = document.getElementById('profilePhoto').files[0];
    let finalPhotoUrl = "https://rosociety.vercel.app/Assets/Logo/ROS%20Logo.png"; 

    if (photoFile) {
      if (photoFile.size > 1024 * 1024) {
        alert("প্রোফাইল ছবির সাইজ ১ মেগাবাইটের বেশি হতে পারবে না!");
        submitBtn.innerText = "Proceed with Verification";
        submitBtn.disabled = false;
        return;
      }
      
      const formData = new FormData();
      formData.append('file', photoFile);
      formData.append('upload_preset', 'ros_preset'); 

      const cloudResponse = await fetch('https://api.cloudinary.com/v1_1/dcy0p8vbb/image/upload', {
        method: 'POST',
        body: formData
      });
      const cloudData = await cloudResponse.json();
      if (cloudData.secure_url) {
        finalPhotoUrl = cloudData.secure_url;
      }
    }

    submitBtn.innerText = "Sending Verification OTP...";

    savedFormPayload = {
      banglaName: document.getElementById('banglaName').value,
      englishName: document.getElementById('englishName').value,
      fatherName: document.getElementById('fatherName').value,
      motherName: document.getElementById('motherName').value,
      mobileNumber: document.getElementById('mobileNumber').value,
      email: targetEmail,
      bloodGroup: document.getElementById('bloodGroup').value,
      gender: document.getElementById('gender').value,
      dob: document.getElementById('dob').value,
      presentAddress: document.getElementById('presentAddress').value,
      permanentAddress: document.getElementById('permanentAddress').value,
      education: document.getElementById('education').value,
      academicYear: document.getElementById('academicYear').value,
      profession: document.getElementById('profession').value,
      institution: document.getElementById('institution').value,
      photoUrl: finalPhotoUrl,
      whatsappNumber: document.getElementById('whatsappNumber').value || "—",
      facebookLink: document.getElementById('facebookLink').value || "—",
      nidOrBrn: document.getElementById('nidOrBrn').value,
      password: document.getElementById('password').value
    };

    const otpResponse = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: "sendOtp",
        email: savedFormPayload.email,
        englishName: savedFormPayload.englishName
      })
    });
    
    const otpResult = await otpResponse.json();

    if (otpResult.success) {
      document.getElementById('otpModal').classList.add('active');
      otpFields.forEach(f => f.value = "");
      otpFields[0].focus();
    } else {
      alert("ওটিপি পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("একটি ত্রুটি ঘটেছে: " + error.message);
  } finally {
    submitBtn.innerText = "Proceed with Verification";
    submitBtn.disabled = false;
  }
});

// ৫. Final Submission Pipeline
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
      document.getElementById('otpModal').classList.remove('active');
      
      document.getElementById('displayUserName').innerText = savedFormPayload.englishName;
      document.getElementById('displayRegNumber').innerText = finalRes.memberId;
      
      document.getElementById('successModal').classList.add('active');
      registrationForm.reset();
    } else {
      throw new Error(finalRes.error);
    }

  } catch (error) {
    alert("ভেরিফিকেশন ত্রুটি: " + error.message);
    otpFields.forEach(f => f.value = "");
    otpFields[0].focus();
  } finally {
    verifyBtn.innerText = "Verify & Submit";
    verifyBtn.disabled = false;
  }
});
