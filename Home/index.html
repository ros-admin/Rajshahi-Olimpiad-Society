<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>রাজশাহী অলিম্পিয়াড সোসাইটি</title>
  
  <style>
    :root {
      --primary: #0d1b2a;
      --secondary: #00b4d8;
      --accent: #ffd700;
      --dark-bg: #010811;
      --light-bg: #f8f9fa;
      --text-dark: #1a1a1a;
      --text-light: #ffffff;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Hind Siliguri', 'Poppins', sans-serif;
      background-color: var(--dark-bg);
      color: var(--text-light);
      overflow-x: hidden;
    }

    /* স্ক্রল অ্যানিমেশন */
    .fade-in-section {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
      visibility: hidden;
    }

    .fade-in-section.is-visible {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }

    section {
      position: relative;
      border-bottom: 4px solid rgba(0, 180, 216, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    /* --- ১. ভিডিও ব্যানার সেকশন --- */
    .hero-section {
      position: relative;
      height: 75vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      text-align: center;
      border-bottom: 5px solid var(--secondary);
    }

    .hero-video {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    .hero-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(to bottom, rgba(13, 27, 42, 0.6), rgba(1, 8, 17, 0.95));
      z-index: 2;
    }

    .hero-content {
      position: relative;
      z-index: 3;
      padding: 0 20px;
    }

    .hero-welcome {
      font-size: 1.4rem;
      color: var(--secondary);
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 10px;
      font-family: 'Poppins', sans-serif;
    }

    .hero-title {
      font-size: 2.8rem;
      font-weight: 700;
      color: var(--text-light);
      text-shadow: 0 0 20px rgba(0, 180, 216, 0.6);
      margin: 0;
    }

    /* --- ২. পরিচিতি সেকশন --- */
    .about-section {
      background: linear-gradient(-45deg, #f1f3f5, #e9ecef, #dee2e6, #f8f9fa);
      background-size: 400% 400%;
      animation: gradientBg 12s ease infinite;
      color: var(--text-dark);
      padding: 60px 5%;
      text-align: center;
      border-bottom: 5px solid #ced4da;
    }

    .about-text {
      font-size: 1.15rem;
      line-height: 1.8;
      max-width: 800px;
      margin: 0 auto 30px;
      font-weight: 500;
    }

    .btn-more {
      display: inline-block;
      padding: 12px 35px;
      background-color: var(--primary);
      color: var(--text-light);
      text-decoration: none;
      font-weight: 600;
      border-radius: 30px;
      transition: all 0.3s ease;
    }

    .btn-more:hover {
      background-color: var(--secondary);
      transform: translateY(-3px);
    }

    /* --- ৩. পরবর্তী ইভেন্ট সেকশন (মোবাইল রেসপন্সিভ কাউন্টডাউন ফিক্স) --- */
    .event-section {
      padding: 60px 5%;
      background: radial-gradient(circle at 20% 30%, #0a192f 0%, #020c1b 100%);
      text-align: center;
      display: none;
      border-bottom: 5px solid var(--accent);
    }

    .section-title {
      font-size: 2rem;
      color: var(--secondary);
      margin-bottom: 35px;
    }

    .event-card {
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(0, 180, 216, 0.3);
      border-radius: 20px;
      padding: 30px 20px;
      max-width: 650px;
      margin: 0 auto;
      box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    }

    .event-logo { width: 90px; height: 90px; object-fit: contain; margin-bottom: 15px; }
    
    /* কাউন্টডাউন গ্রিড - মোবাইলে ভেঙে যাবে না */
    .countdown-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      max-width: 450px;
      margin: 25px auto;
    }

    .countdown-box {
      background: #0d1b2a;
      padding: 10px 5px;
      border-radius: 10px;
      border: 1px solid rgba(255, 213, 0, 0.3);
      border-bottom: 4px solid var(--accent);
    }

    .countdown-box span { 
      display: block; 
      font-size: 1.5rem; 
      font-weight: bold; 
      color: var(--accent); 
      font-family: 'Poppins', sans-serif;
    }
    
    .countdown-label {
      font-size: 0.85rem;
      color: var(--text-light);
    }

    .btn-details {
      padding: 12px 35px; background: var(--secondary); border: none; color: white;
      font-weight: 600; border-radius: 25px; cursor: pointer; transition: 0.3s;
    }

    /* পপআপ মডাল */
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.85); z-index: 9999; display: flex;
      justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s ease;
    }
    .modal-overlay.active { opacity: 1; visibility: visible; }
    .modal-content {
      background: white; width: 92%; max-width: 500px; border-radius: 15px;
      overflow: hidden; position: relative; color: var(--text-dark); transform: scale(0.8); transition: 0.3s ease;
    }
    .modal-overlay.active .modal-content { transform: scale(1); }
    .modal-banner { width: 100%; height: 180px; object-fit: cover; }
    .modal-body { padding: 25px; text-align: left; background: white; }
    .modal-close {
      position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: white;
      border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 1.3rem; cursor: pointer; z-index: 10;
    }
    .btn-volunteer {
      display: block; text-align: center; width: 100%; padding: 12px; background: #28a745;
      color: white; text-decoration: none; font-weight: bold; margin-top: 15px; border-radius: 6px;
    }

    /* --- ৪. নোটিশ সেকশন (টেবিল ১টি টেক্সট ফিক্সড) --- */
    .notice-section {
      padding: 60px 5%;
      background: linear-gradient(135deg, #ffffff 0%, #f1f3f5 100%);
      color: var(--text-dark);
      text-align: center;
      border-bottom: 5px solid var(--primary);
    }
    
    .notice-table-container {
      overflow-x: auto; 
      max-width: 850px; 
      margin: 0 auto; 
      background: white;
      border-radius: 12px; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      border: 1px solid #e9ecef;
      -webkit-overflow-scrolling: touch; /* আইফোনে স্মুথ স্ক্রলিং এর জন্য */
    }

    .notice-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 500px; }
    .notice-table th { background: var(--primary); color: white; padding: 16px 12px; font-weight: 600; font-size: 0.95rem; }
    .notice-table td { padding: 16px 12px; border-bottom: 1px solid #edf2f7; font-weight: 500; font-size: 0.95rem; }
    
    /* তারিখের সংখ্যা কেটে যাওয়া প্রতিরোধ করার জন্য কাস্টম উইডথ */
    .notice-table th:nth-child(1), .notice-table td:nth-child(1) {
      width: 120px;
      white-space: nowrap; 
    }

    .btn-download { color: var(--secondary); text-decoration: none; font-weight: 600; }
    .view-all-notice { display: block; text-align: right; max-width: 850px; margin: 20px auto 0; color: var(--primary); font-weight: bold; text-decoration: none; }

    /* --- ৫. এডভার্টাইজমেন্ট সেকশন --- */
    .ad-section {
      padding: 50px 5%; text-align: center;
      background: #020710;
      animation: pulseBg 4s ease-in-out infinite alternate;
      border-bottom: 5px solid rgba(0, 180, 216, 0.5);
    }
    .ad-banner {
      max-width: 100%; height: auto; border-radius: 12px;
      box-shadow: 0 0 25px rgba(0,180,216,0.4); cursor: pointer;
    }

    /* --- ৬. পার্টনার স্লাইডার সেকশন (একসাথে ৩টি লোগো ভিউ ফিক্স) --- */
    .partner-section {
      padding: 60px 5%;
      background: linear-gradient(30deg, #020c1b, #0d1b2a, #010811);
      background-size: 300% 300%;
      animation: gradientBg 15s ease infinite;
      text-align: center;
    }
    
    /* মোবাইলেও ৩টি করে লোগো সমানভাবে দেখানোর জন্য রেস্পনসিভ উইডথ */
    .slider-viewport { 
      max-width: 380px; /* মোবাইলে ৩টি লোগোর জন্য মানানসই সাইজ */
      margin: 0 auto; 
      overflow: hidden; 
      position: relative; 
    }
    
    @media (min-width: 768px) {
      .slider-viewport { max-width: 450px; }
    }

    .partner-track { 
      display: flex; 
      gap: 15px; 
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
    }
    
    .partner-logo {
      width: calc((100% - 30px) / 3); /* প্রতি ভিউতে নিখুঁত ৩টি লোগো নির্ধারণ */
      aspect-ratio: 1 / 1;
      border-radius: 50%; 
      background: white;
      padding: 6px; 
      object-fit: contain; 
      cursor: pointer; 
      transition: 0.3s; 
      flex-shrink: 0;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3); 
      border: 2px solid rgba(0, 180, 216, 0.2);
    }
    .partner-logo:hover { transform: translateY(-3px); border-color: var(--secondary); }

    @keyframes gradientBg {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes pulseBg {
      0% { background-color: #010811; }
      100% { background-color: #0a1424; }
    }
  </style>
</head>
<body>

  <ros-header></ros-header>

  <section class="hero-section">
    <video class="hero-video" autoplay loop muted playsinline>
      <source src="bg video.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-welcome">Welcome to</div>
      <h1 class="hero-title">রাজশাহী অলিম্পিয়াড সোসাইটি</h1>
    </div>
  </section>

  <section class="about-section fade-in-section">
    <p class="about-text">
      রাজশাহী অলিম্পিয়াড সোসাইটি হলো রাজশাহী অঞ্চলের শিক্ষার্থীদের মেধা, সৃজনশীলতা এবং বিশ্লেষণী দক্ষতা বিকাশের লক্ষ্যে প্রতিষ্ঠিত একটি শিক্ষা ও প্রতিযোগিতামূলক কার্যক্রমভিত্তিক সংগঠন। ২০২৬ সালে প্রতিষ্ঠিত এই সংগঠনটি একটি উদ্ভাবনী ও প্রগতিশীল প্ল্যাটফর্ম হিসেবে কাজ করছে, যেখানে স্কুল, কলেজ এবং বিশ্ববিদ্যালয় পর্যায়ের শিক্ষার্থীরা নিজেদের প্রতিভা বিকাশের সুযোগ পায়।
    </p>
    <a href="../about.html" class="btn-more">আরও করুন</a>
  </section>

  <section class="event-section fade-in-section" id="eventSection">
    <h2 class="section-title">আমাদের পরবর্তী ইভেন্ট</h2>
    <div class="event-card" id="eventCard">
      </div>
  </section>

  <div class="modal-overlay" id="eventModal">
    <div class="modal-content">
      <button class="modal-close" id="closeModal">&times;</button>
      <img src="" alt="Banner" class="modal-banner" id="modalBanner">
      <div class="modal-body">
        <h3 id="modalTitle" style="margin-top:0; color:var(--primary); font-size: 1.4rem;"></h3>
        <p id="modalFullText" style="line-height: 1.6; font-size:0.95rem;"></p>
        <a href="" target="_blank" class="btn-volunteer" id="volunteerLink">ভলিন্টিয়ার হতে চাই</a>
      </div>
    </div>
  </div>

  <section class="notice-section fade-in-section">
    <h2 class="section-title" style="color: var(--primary);">বিজ্ঞপ্তি</h2>
    <div class="notice-table-container">
      <table class="notice-table">
        <thead>
          <tr>
            <th>তারিখ</th>
            <th>বিষয়</th>
            <th>বিস্তারিত</th>
          </tr>
        </thead>
        <tbody id="noticeTableBody">
          </tbody>
      </table>
    </div>
    <a href="../Notice/index.html" class="view-all-notice">সকল বিজ্ঞপ্তি দেখুন &rarr;</a>
  </section>

  <section class="ad-section fade-in-section">
    <a href="https://example-ad-link.com" target="_blank">
      <img src="Advertise.gif" alt="Advertisement" class="ad-banner">
    </a>
  </section>

  <section class="partner-section fade-in-section">
    <h2 class="section-title">আমাদের পার্টনার</h2>
    <div class="slider-viewport">
      <div class="partner-track" id="partnerTrack">
        <img src="p1.png" class="partner-logo" onclick="window.open('https://partner1.com')" alt="Partner 1">
        <img src="p2.png" class="partner-logo" onclick="window.open('https://partner2.com')" alt="Partner 2">
        <img src="p3.png" class="partner-logo" onclick="window.open('https://partner3.com')" alt="Partner 3">
        <img src="p4.png" class="partner-logo" onclick="window.open('https://partner4.com')" alt="Partner 4">
        <img src="p5.png" class="partner-logo" onclick="window.open('https://partner5.com')" alt="Partner 5">
        <img src="p6.png" class="partner-logo" onclick="window.open('https://partner6.com')" alt="Partner 6">
      </div>
    </div>
  </section>

  <ros-footer></ros-footer>


  <script>
    // --- ১. স্ক্রল অ্যানিমেশন ---
    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        appearOnScroll.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- ২. পরবর্তী ইভেন্ট ডাটা এবং কাউন্টডাউন মেকানিズム (ক্রস ব্রাউজার ফিক্সড) ---
    async function loadNextEvent() {
      try {
        const response = await fetch('../Next Event/event.json');
        const data = await response.json();
        
        if (data.status !== "active") return; 

        document.getElementById('eventSection').style.display = 'block';
        
        const card = document.getElementById('eventCard');
        card.innerHTML = `
          <img src="${data.logo}" alt="Event Logo" class="event-logo">
          <h3 style="font-size:1.6rem; margin:10px 0; color: #fff;">${data.title}</h3>
          <p style="color:var(--text-muted); margin:6px 0; font-size:0.9rem;"><i class="fa-solid fa-calendar"></i> ${data.date} | <i class="fa-solid fa-clock"></i> ${data.time}</p>
          <p style="color:var(--text-muted); margin:6px 0; font-size:0.9rem;"><i class="fa-solid fa-location-dot"></i> ${data.location}</p>
          
          <div class="countdown-container" id="countdown">
            <div class="countdown-box"><span id="days">00</span><div class="countdown-label">দিন</div></div>
            <div class="countdown-box"><span id="hours">00</span><div class="countdown-label">ঘণ্টা</div></div>
            <div class="countdown-box"><span id="mins">00</span><div class="countdown-label">মিনিট</div></div>
            <div class="countdown-box"><span id="secs">00</span><div class="countdown-label">সেকেন্ড</div></div>
          </div>
          
          <button class="btn-details" id="openModalBtn">বিস্তারিত</button>
        `;

        document.getElementById('openModalBtn').addEventListener('click', () => {
          document.getElementById('modalBanner').src = data.banner;
          document.getElementById('modalTitle').innerText = data.title;
          document.getElementById('modalFullText').innerText = data.description;
          document.getElementById('volunteerLink').href = data.volunteer_url;
          document.getElementById('eventModal').classList.add('active');
        });

        // ক্রস ব্রাউজার NaN ট্রাবলশুটিং সমাধান (নিরাপদ স্প্লিট মেথড)
        const dParts = data.date_en.split('-'); // YYYY, MM, DD
        const tParts = data.time_en.split(':'); // HH, MM, SS
        // জাভাস্ক্রিপ্ট মাসে ০ থেকে কাউন্ট শুরু করে তাই ১ বিয়োগ করা হয়েছে
        const targetDate = new Date(dParts[0], dParts[1] - 1, dParts[2], tParts[0], tParts[1], tParts[2]).getTime();

        const interval = setInterval(() => {
          const now = new Date().getTime();
          const diff = targetDate - now;

          if (diff <= 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = "<p style='color:var(--accent); font-weight:bold; grid-column: span 4;'>ইভেন্টটি শুরু হয়েছে!</p>";
            return;
          }

          document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
          document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
          document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
          document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);

      } catch (e) { console.log("Event loader safe-mode initialized."); }
    }

    document.getElementById('closeModal').addEventListener('click', () => {
      document.getElementById('eventModal').classList.remove('active');
    });

    // --- ৩. JSON থেকে নোটিশ লোড ---
    async function loadNotices() {
      try {
        const response = await fetch('../Notice/notice.json');
        const notices = await response.json();
        const tableBody = document.getElementById('noticeTableBody');
        
        const latestNotices = notices.slice(0, 5);
        tableBody.innerHTML = '';

        latestNotices.forEach(notice => {
          tableBody.innerHTML += `
            <tr>
              <td>${notice.date}</td>
              <td>${notice.title}</td>
              <td><a href="${notice.pdf_url}" target="_blank" class="btn-download"><i class="fa-solid fa-file-pdf"></i> ডাউনলোড</a></td>
            </tr>
          `;
        });
      } catch (e) { console.log("Notice layout generated."); }
    }

    // --- ৪. ৩টি করে লোগো অটো স্লাইড করার নিখুঁত লজিক ---
    const track = document.getElementById('partnerTrack');
    let currentSlide = 0;

    setInterval(() => {
      const logos = track.children;
      const totalLogos = logos.length;
      
      // যেহেতু একসাথে ৩টি লোগো দেখা যাবে, তাই ৩টি করে ইনডেক্স জাম্প করবে
      currentSlide += 3;
      
      if (currentSlide >= totalLogos) {
        currentSlide = 0; // লুপ রিসেট
      }
      
      // প্রতিটি লোগোর উইডথ এবং গ্যাপ হিসাব করে ট্র্যাক পুশ করা
      if(logos.length > 0) {
        const logoWidth = logos[0].clientWidth + 15; // লোগো সাইজ + গ্যাপ
        track.style.transform = `translateX(-${currentSlide * logoWidth}px)`;
      }
    }, 2000);

    window.onload = () => {
      loadNextEvent();
      loadNotices();
    };
  </script>

  <script src="../navigation.js"></script>
</body>
</html>
