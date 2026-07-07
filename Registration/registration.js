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
      
      // ব্যাকএন্ডে সাকসেস হলে সাথে সাথে পিডিএফ ডাউনলোডের লজিক বাইন্ড করা হচ্ছে
      setupPdfDownloadTrigger(finalRes.memberId, savedFormPayload);

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

// 🖨️ ৬. ডাইনামিক পিডিএফ জেনারেশন ফাংশন (ডিজাইন মডিউলের হুবহু রূপান্তর)
function setupPdfDownloadTrigger(memberId, memberData) {
  const downloadPdfBtn = document.getElementById('downloadPdfBtn'); // আপনার Success মডালের ডাউনলোড বাটন আইডি নিশ্চিত করুন
  if (!downloadPdfBtn) return;

  // পিডিএফ বাফারিং কন্টেইনার ডমে না থাকলে ডাইনামিকালি এড করা হচ্ছে
  let pdfBuffer = document.getElementById('pdfRenderBufferContainer');
  if (!pdfBuffer) {
    pdfBuffer = document.createElement('div');
    pdfBuffer.id = 'pdfRenderBufferContainer';
    pdfBuffer.style.display = 'none';
    document.body.appendChild(pdfBuffer);
  }

  // ডাটা ম্যাপিং এবং ফরম্যাটিং
  const regNo = memberId || '—'; 
  const regDate = new Date().toLocaleDateString('bn-BD');
  const bName = memberData.banglaName || '—';
  const eName = (memberData.englishName || 'MEMBER').toUpperCase();
  const fName = memberData.fatherName || '—';
  const mName = memberData.motherName || '—';
  const phone = memberData.mobileNumber || '—';
  const email = memberData.email || '—';
  const dob = memberData.dob || '—';
  const blood = memberData.bloodGroup || '—';
  const gender = memberData.gender === 'Female' ? 'মহিলা' : (memberData.gender === 'Male' ? 'পুরুষ' : memberData.gender || '—');
  const prof = memberData.profession || '—'; 
  const inst = memberData.institution || '—';
  const edu = memberData.education || '—';
  const session = memberData.academicYear || '—';
  const mType = 'সাধারণ সদস্য'; // ডিফল্ট টাইপ

  const photoHtml = memberData.photoUrl ? 
    `<img src="${memberData.photoUrl}" style="width: 100%; height: 100%; object-fit: cover;">` : 
    `<div style="font-size: 10px; color: #777; padding-top: 40px; text-align:center;">ছবি নেই</div>`;

  // ক্লিক ইভেন্ট লিসেনার অ্যাড
  downloadPdfBtn.addEventListener('click', async () => {
    downloadPdfBtn.disabled = true;
    downloadPdfBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> পিডিএফ তৈরি হচ্ছে...`;

    try {
      // html2pdf লাইব্রেরি চেক ও ডাইনামিক লোড
      if (typeof html2pdf === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const now = new Date();
      const formattedTimeStr = `ডাউনলোড সময়: ${now.toLocaleDateString('bn-BD')} | সময়: ${now.toLocaleTimeString('bn-BD')}`;

      // হুবহু এক ডিজাইনের ইন-মেমরি টেমপ্লেট ইনজেকশন
      pdfBuffer.innerHTML = `
        <div id="actualTargetPaper" style="width: 535pt; height: 760pt; background: #ffffff; color: #000000; font-family: 'Hind Siliguri', 'Arial', sans-serif; position: relative; box-sizing: border-box; padding: 25pt; border: 2.5pt double #0077b6; overflow: hidden; display: flex; flex-direction: column;">
          
          <!-- ওয়াটারমার্ক ব্যাকগ্রাউন্ড -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); opacity: 0.03; font-size: 38px; font-weight: bold; color: #000; text-align: center; width: 100%; pointer-events: none; white-space: nowrap; z-index: 1;">
            RAJSHAHI OLIMPIAD SOCIETY
          </div>

          <!-- অফিশিয়াল হেডার এবং আন্ডারলাইন টান -->
          <div style="text-align: center; border-bottom: 2px solid #0077b6; padding-bottom: 8px; margin-bottom: 12px; position: relative; z-index: 2;">
            <img src="https://ros-admin.github.io/Rajshahi-Olimpiad-Society/ros%20logo%20transparent.png" style="width: 50px; height: 50px; margin-bottom: 2px;">
            <h1 style="font-size: 17px; font-weight: 700; color: #0056b3; margin: 0; padding: 0;">রাজশাহী অলিম্পিয়াড সোসাইটি</h1>
            <p style="font-size: 8.5px; color: #555; margin: 1px 0 0 0; text-transform: uppercase; font-family: 'Arial'; letter-spacing: 0.5px;">Rajshahi Olympiad Society</p>
            <div style="display: inline-block; background: #0077b6; color: #fff; padding: 2px 10px; font-size: 9.5px; font-weight: bold; border-radius: 3px; margin-top: 5px;">সদস্য নিবন্ধন ফরম</div>
          </div>

          <!-- মেটা ডাটা এবং ছবির জন্য ফ্লেক্স কন্টেইনার -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px; position: relative; z-index: 2; width: 100%;">
            
            <!-- বাম পাশে বেসিক ট্র্যাকিং মেটা ডাটা -->
            <div style="font-size: 10px; line-height: 1.6;">
              <p style="margin: 2px 0;"><strong>নিবন্ধন নাম্বার:</strong> <span style="color: #0077b6; font-weight: bold; font-family:'Arial';">${regNo}</span></p>
              <p style="margin: 2px 0;"><strong>নিবন্ধনের তারিখ:</strong> <span>${regDate}</span></p>
              <p style="margin: 2px 0;"><strong>সদস্যের ধরন:</strong> <span style="color: #0056b3; font-weight: bold;">${mType}</span></p>
            </div>

            <!-- ডান পাশে প্রোফাইল ফটো বক্স -->
            <div style="width: 85px; height: 100px; border: 1px dashed #0077b6; box-sizing: border-box; background: #fafafa; overflow: hidden;">
              ${photoHtml}
            </div>

          </div>

          <!-- গ্রিড টেবিল -->
          <h3 style="font-size: 11px; color: #0077b6; border-left: 3px solid #0077b6; padding-left: 6px; margin-bottom: 6px; padding-bottom: 1px; position: relative; z-index: 2;">১. সদস্যের বিস্তারিত তথ্যাবলী</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; margin-bottom: 12px; position: relative; z-index: 2;">
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; width: 18%; background: #fcfcfc; font-weight: bold;">নাম (বাংলা):</td>
              <td style="padding: 5px; border: 1px solid #cccccc; width: 82%;" colspan="3">${bName}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">Name (English):</td>
              <td style="padding: 5px; border: 1px solid #cccccc;" colspan="3"><strong>${eName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">বাবার নাম:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; width: 32%;">${fName}</td>
              <td style="padding: 5px; border: 1px solid #cccccc; width: 16%; background: #fcfcfc; font-weight: bold;">মায়ের নাম:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; width: 34%;">${mName}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">মোবাইল নম্বর:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; font-family:'Arial';">${phone}</td>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">ইমেইল এড্রেস:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; font-family:'Arial'; font-size: 8.5px; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">জন্মতারিখ:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; font-family:'Arial';">${dob}</td>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">রক্তের গ্রুপ:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; font-weight: bold; color: #d90429;">${blood}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">লিঙ্গ:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; width: 32%;">${gender}</td>
              <td style="padding: 5px; border: 1px solid #cccccc; width: 16%; background: #fcfcfc; font-weight: bold;">পেশা:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; width: 34%;">${prof}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">প্রতিষ্ঠান/কর্মস্থল:</td>
              <td style="padding: 5px; border: 1px solid #cccccc;" colspan="3">${inst}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">শিক্ষাগত যোগ্যতা:</td>
              <td style="padding: 5px; border: 1px solid #cccccc;">${edu}</td>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">শিক্ষাবর্ষ:</td>
              <td style="padding: 5px; border: 1px solid #cccccc; font-family:'Arial';">${session}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">বর্তমান ঠিকানা:</td>
              <td style="padding: 5px; border: 1px solid #cccccc;" colspan="3">${curAddr || presentAddress.value}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #cccccc; background: #fcfcfc; font-weight: bold;">স্থায়ী ঠিকানা:</td>
              <td style="padding: 5px; border: 1px solid #cccccc;" colspan="3">${perAddr || permanentAddress.value}</td>
            </tr>
          </table>

          <!-- শর্তাবলী বক্স -->
          <h3 style="font-size: 11px; color: #0077b6; border-left: 3px solid #0077b6; padding-left: 6px; margin-bottom: 5px; position: relative; z-index: 2;">২. সদস্যপদ বহাল থাকার শর্তাবলী ও ঘোষণা</h3>
          <div style="font-size: 8.5px; line-height: 1.4; color: #222; text-align: justify; background: #f9f9f9; padding: 8px; border: 1px solid #e0e0e0; border-radius: 4px; margin-bottom: 25px; position: relative; z-index: 2;">
            ১. <strong>কর্তৃপক্ষের সর্বোচ্চ ক্ষমতা:</strong> সংগঠনের শৃঙ্খলা, ভাবমূর্তি ও আদর্শ পরিপন্থী কোনো কাজে লিপ্ত হলে, রাজশাহী অলিম্পিয়াড সোসাইটি (ROS) কর্তৃপক্ষ যেকোনো সময় পূর্ব নোটিশ ছাড়াই যেকোনো সদস্যের সদস্যপদ সম্পূর্ণ বাতিল বা স্থগিত করার একক ও চূড়ান্ত ক্ষমতা সংরক্ষণ করে।<br>
            ২. আমি এই মর্মে অঙ্গীকার করছি যে, উপরে প্রদত্ত সকল তথ্য সম্পূর্ণ সত্য ও সঠিক। আমি অনলাইন ড্যাশবোর্ডের মাধ্যমে ডিজিটালভাবে এই সকল শর্তাবলীতে সম্মতি প্রদান করে এই মেম্বারশিপ কপিটি জেনারেট করেছি।
          </div>

          <!-- স্বাক্ষর জোন -->
          <div style="margin-top: auto; display: flex; justify-content: space-between; font-size: 9.5px; padding: 0 5px; position: relative; z-index: 2;">
            <div style="text-align: center; width: 130px; margin-top: 25px;">
              <div style="border-top: 1px solid #333; padding-top: 4px;">আবেদনকারীর স্বাক্ষর</div>
            </div>
            
            <div style="text-align: center; width: 150px; position: relative;">
              <div style="font-family: 'Arial'; font-size: 9px; font-weight: bold; color: #2a9d8f; text-transform: uppercase; border: 2px dashed #2a9d8f; padding: 2px 6px; display: inline-block; margin-bottom: 4px; transform: rotate(-4deg); border-radius: 4px; background: #fff;">
                ✓ SIGNED VERIFIED
              </div>
              <div style="border-top: 1px solid #0077b6; padding-top: 4px; color: #0077b6; font-weight: bold;">কর্তৃপক্ষের স্বাক্ষর</div>
            </div>
          </div>

          <!-- সিস্টেম জেনারেটেড নোটিশ নোট -->
          <div style="text-align: center; font-size: 8px; color: #e63946; font-weight: bold; background: #fff5f5; padding: 4px; border: 1px dashed #e63946; border-radius: 4px; margin-top: 20px; position: relative; z-index: 2;">
            * বিশেষ দ্রষ্টব্য: এটি একটি সিস্টেম জেনারেটেড ডিজিটাল ভেরিফাইড কপি। অনলাইন ডাটাবেজে রিয়েল-টাইম ভেরিফিকেশনের ব্যবস্থা থাকায় এতে কোনো ম্যানুয়াল স্বাক্ষর বা সিলের প্রয়োজন নেই।
          </div>

          <!-- রিয়েলটাইম ফুটার -->
          <div style="position: absolute; bottom: 10pt; left: 25pt; right: 25pt; display: flex; justify-content: space-between; align-items: center; font-size: 8px; color: #666; border-top: 1px solid #eee; padding-top: 5px; z-index: 5;">
            <div>${formattedTimeStr}</div>
            <div style="font-weight: 600; color: #333;">Developed by: Utsab Sarker</div>
          </div>

        </div>
      `;

      // পিডিএফ কনফিগারেশন প্যারামিটার
      const targetPaperNode = document.getElementById('actualTargetPaper');
      const filenameClean = eName.replace(/[^a-zA-Z0-9]/g, "_");

      const options = {
        margin:       [30, 30, 30, 30],
        filename:     `ROS_Form_${filenameClean}.pdf`,
        image:        { type: 'jpeg', quality: 1.0 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true, 
          allowTaint: true, 
          logging: false,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
      };

      // পিডিএফ ডাউনলোড সম্পন্ন করা
      await html2pdf().set(options).from(targetPaperNode).save();

    } catch (err) {
      console.error("PDF Export Error:", err);
      alert("পিডিএফ ফাইল তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      pdfBuffer.innerHTML = "";
      downloadPdfBtn.disabled = false;
      downloadPdfBtn.innerHTML = `<i class="fas fa-file-download"></i> পিডিএফ ফরম ডাউনলোড করুন`;
    }
  });
}
