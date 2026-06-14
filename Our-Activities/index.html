<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>আমাদের কার্যক্রম - রাজশাহী অলিম্পিয়াড সোসাইটি</title>
  
  <style>
    :root {
      --primary: #0a1128;
      --secondary: #00b4d8; /* থিমের প্রধান নীল/সায়ান রঙ */
      --accent: #ffd700;    /* থিমের হলুদ রঙ */
      --dark-bg: #020c1b;
      --text-light: #f1f5f9;
      --card-bg: rgba(10, 25, 47, 0.65);
      --glow: 0 0 20px rgba(0, 180, 216, 0.3);
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Hind Siliguri', 'Poppins', sans-serif;
      background-color: var(--dark-bg);
      color: var(--text-light);
      overflow-x: hidden;
    }

    /* --- ১. পেজ হেডার এবং ফিল্টার এরিয়া --- */
    .page-header-container {
      padding: 60px 10% 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      border-bottom: 1px solid rgba(0, 180, 216, 0.15);
      background: linear-gradient(180deg, rgba(10, 25, 47, 0.5) 0%, transparent 100%);
    }

    @media (min-width: 768px) {
      .page-header-container {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    /* আপনার নির্দেশনানুযায়ী হেডিং নীল এবং নিচের টান হলুদ করা হলো */
    .page-title {
      font-size: 2.2rem;
      color: var(--secondary); /* নীল রঙ */
      margin: 0;
      position: relative;
      text-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
    }

    .page-title::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: var(--accent); /* হলুদ রঙের বর্ডার টান */
      margin-top: 8px;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }

    .filter-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .filter-label {
      font-size: 1rem;
      color: #94a3b8;
    }

    .filter-select {
      background: rgba(2, 12, 27, 0.9);
      color: #fff;
      border: 1px solid rgba(0, 180, 216, 0.3);
      padding: 10px 20px;
      border-radius: 30px;
      font-family: inherit;
      font-size: 0.95rem;
      cursor: pointer;
      outline: none;
      transition: 0.3s;
      box-shadow: var(--glow);
    }

    .filter-select:focus {
      border-color: var(--secondary);
      box-shadow: 0 0 15px rgba(0, 180, 216, 0.6);
    }

    /* --- ২. কার্যক্রম গ্রিড ও বক্স ডিজাইন --- */
    .activities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      padding: 60px 10%;
      min-height: 400px;
    }

    .activity-card {
      background: var(--card-bg);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border: 1px solid rgba(0, 180, 216, 0.2);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s;
    }

    .activity-card.show {
      opacity: 1;
      transform: translateY(0);
    }

    .activity-card:hover {
      border-color: var(--secondary);
      box-shadow: 0 15px 35px rgba(0, 180, 216, 0.25);
    }

    .card-banner-wrapper {
      width: 100%;
      height: 200px;
      overflow: hidden;
      position: relative;
    }

    .card-banner {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .activity-card:hover .card-banner {
      transform: scale(1.05);
    }

    .card-body {
      padding: 25px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .card-heading {
      font-size: 1.4rem;
      margin: 0 0 12px 0;
      color: #ffffff;
      cursor: pointer;
      line-height: 1.4;
      transition: color 0.2s;
    }

    .card-heading:hover {
      color: var(--secondary);
    }

    .card-date {
      font-size: 0.85rem;
      color: #64748b;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .card-categories {
      margin-top: auto;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .cat-badge {
      background: rgba(0, 180, 216, 0.12);
      color: var(--secondary);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      border: 1px solid rgba(0, 180, 216, 0.25);
    }

    /* --- ৩. কাস্টম ডাইনামিক পপআপ মডাল --- */
    .popup-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(2, 12, 27, 0.85);
      backdrop-filter: blur(12px);
      z-index: 99999;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s ease;
    }

    .popup-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .popup-window {
      background: #061121;
      border: 1px solid rgba(0, 180, 216, 0.25);
      width: 90%;
      max-width: 800px;
      height: 85vh;
      border-radius: 24px;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 25px 60px rgba(0,0,0,0.8);
      transform: scale(0.9);
      transition: 0.3s ease;
    }

    .popup-overlay.active .popup-window {
      transform: scale(1);
    }

    .popup-close-btn {
      position: absolute;
      top: 20px; right: 20px;
      background: rgba(255,255,255,0.05);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.1);
      width: 40px; height: 40px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
    }
    .popup-close-btn:hover {
      background: #ef4444;
      border-color: #ef4444;
    }

    .popup-content-area {
      padding: 40px;
    }

    .popup-title {
      font-size: 2rem;
      color: #fff;
      margin: 0 0 15px 0;
      line-height: 1.4;
    }

    .popup-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      font-size: 0.9rem;
      color: #94a3b8;
      margin-bottom: 30px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding-bottom: 15px;
    }

    .popup-meta span i {
      color: var(--secondary);
      margin-right: 6px;
    }

    /* পপআপের ভেতরের ডাইনামিক কন্টেন্ট ফ্লো */
    .popup-body-flow p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #cbd5e1;
      margin-bottom: 25px;
      text-align: justify;
    }

    .popup-media-container {
      margin: 30px 0;
      border-radius: 14px;
      overflow: hidden;
      background: rgba(0,0,0,0.2);
      border: 1px solid rgba(255,255,255,0.05);
    }

    .popup-dynamic-img {
      width: 100%;
      max-height: 450px;
      object-fit: cover;
      display: block;
    }

    /* ইমেজের ক্যাপশন এবং ক্রেডিট কাস্টমাইজেশন */
    .popup-img-caption-bar {
      padding: 14px 20px;
      background: rgba(2, 12, 27, 0.7);
      font-size: 0.95rem;
      color: #cbd5e1;
      border-top: 1px solid rgba(255,255,255,0.05);
      line-height: 1.5;
    }

    /* নীল রঙের ক্রেডিট লোগো (ক্যামেরা) */
    .credit-logo {
      color: var(--accent);
      margin-left: 8px;
      margin-right: 5px;
      font-size: 0.9rem;
    }

    /* হলুদ রঙের ক্রেডিট নাম */
    .credit-name {
      color: var(--secondary);
      font-weight: 500;
    }

    /* উদ্ধৃতি বা কোটেশন ডিজাইন */
    .popup-quote-box {
      background: rgba(0, 180, 216, 0.04);
      border-left: 4px solid var(--secondary);
      padding: 25px 30px;
      border-radius: 0 16px 16px 0;
      margin: 35px 0;
      box-shadow: inset 10px 0 20px rgba(0,0,0,0.1);
      position: relative;
    }
    
    .popup-quote-box::before {
      content: '“';
      position: absolute;
      top: -10px; left: 10px;
      font-size: 4rem;
      color: rgba(0, 180, 216, 0.15);
      font-family: serif;
    }

    .quote-text {
      font-size: 1.2rem;
      font-style: italic;
      color: #e2e8f0;
      line-height: 1.7;
      margin: 0 0 12px 0;
    }

    .quote-author {
      display: block;
      text-align: right;
      font-size: 0.9rem;
      color: var(--accent);
      font-weight: 600;
    }

    /* নিউজের একদম নিচে 'ক্যাটাগরি: ' টেক্সট এবং ব্যাজ কন্টেইনার */
    .popup-footer-categories-container {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.05);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .popup-category-label {
      font-size: 1rem;
      font-weight: 600;
      color: #94a3b8;
    }

    .popup-footer-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* স্ক্রলবার কাস্টমাইজেশন */
    .popup-window::-webkit-scrollbar { width: 8px; }
    .popup-window::-webkit-scrollbar-track { background: #020c1b; }
    .popup-window::-webkit-scrollbar-thumb { background: rgba(0, 180, 216, 0.3); border-radius: 4px; }
    .popup-window::-webkit-scrollbar-thumb:hover { background: var(--secondary); }
  </style>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

  <ros-header></ros-header>

  <main>
    <div class="page-header-container">
      <h1 class="page-title">আমাদের কার্যক্রম</h1>
      <div class="filter-wrapper">
        <span class="filter-label"><i class="fa-solid fa-filter"></i> ফিল্টার:</span>
        <select class="filter-select" id="categoryFilter">
          <option value="all">সব কার্যক্রম</option>
        </select>
      </div>
    </div>

    <div class="activities-grid" id="activitiesGrid"></div>
  </main>

  <div class="popup-overlay" id="activityPopup">
    <div class="popup-window">
      <button class="popup-close-btn" id="closePopup">&times;</button>
      <div class="popup-content-area" id="popupDynamicContent"></div>
    </div>
  </div>

  <ros-footer></ros-footer>

  <script>
    let allNewsData = [];

    // --- ১. JSON ডাটা লোড ---
    async function fetchActivities() {
      try {
        const response = await fetch('../Our-Activities/News.json');
        allNewsData = await response.json();
        
        generateFilterOptions(allNewsData);
        renderCards(allNewsData);
      } catch (error) {
        console.error("News.json ফাইল লোড করা সম্ভব হয়নি:", error);
        document.getElementById('activitiesGrid').innerHTML = `<p style="color:red; text-align:center; width:100%;">কার্যক্রম লোড করা সম্ভব হয়নি।</p>`;
      }
    }

    // --- ২. অটোমেটিক ফিল্টার জেনারেটর ---
    function generateFilterOptions(newsArray) {
      const filterSelect = document.getElementById('categoryFilter');
      const categoriesSet = new Set();

      newsArray.forEach(item => {
        if (item.category && Array.isArray(item.category)) {
          item.category.forEach(cat => categoriesSet.add(cat.trim()));
        }
      });

      categoriesSet.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.innerText = cat;
        filterSelect.appendChild(option);
      });

      filterSelect.addEventListener('change', (e) => {
        const selectedCat = e.target.value;
        if (selectedCat === 'all') {
          renderCards(allNewsData);
        } else {
          const filtered = allNewsData.filter(item => 
            item.category && item.category.includes(selectedCat)
          );
          renderCards(filtered);
        }
      });
    }

    // --- ৩. কার্ড রেন্ডার এবং স্ক্রিন এন্ট্রি অ্যানিমেশন ---
    function renderCards(newsArray) {
      const grid = document.getElementById('activitiesGrid');
      grid.innerHTML = '';

      if(newsArray.length === 0) {
        grid.innerHTML = `<p style="color:#64748b; text-align:center; width:100%;">এই ক্যাটাগরিতে কোনো কার্যক্রম পাওয়া যায়নি।</p>`;
        return;
      }

      newsArray.forEach((news, index) => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        
        let catBadges = '';
        if(news.category && Array.isArray(news.category)) {
          news.category.forEach(cat => {
            catBadges += `<span class="cat-badge">${cat}</span>`;
          });
        }

        card.innerHTML = `
          <div class="card-banner-wrapper">
            <img src="${news.image || 'default-banner.jpg'}" alt="Banner" class="card-banner">
          </div>
          <div class="card-body">
            <h2 class="card-heading" onclick="openActivityPopup(${index})">${news.title}</h2>
            <div class="card-date"><i class="fa-solid fa-calendar-day"></i> ${news.date || 'N/A'}</div>
            <div class="card-categories">${catBadges}</div>
          </div>
        `;

        grid.appendChild(card);

        // সবগুলো বক্স নিখুঁত ফেড ইন ইফেক্টে স্ক্রিনে আসবে
        setTimeout(() => {
          card.classList.add('show');
        }, index * 100);
      });
    }

    // --- ৪. কাস্টম রেন্ডার লজিক (ছবির ক্রেডিট ফরম্যাট এবং ক্যাটাগরি লেবেল ফিক্সড) ---
    function openActivityPopup(index) {
      const news = allNewsData[index];
      if (!news) return;

      const contentArea = document.getElementById('popupDynamicContent');
      contentArea.innerHTML = '';

      let headHTML = `
        <h2 class="popup-title">${news.title}</h2>
        <div class="popup-meta">
          <span><i class="fa-solid fa-pen-nib"></i> <b>লেখা:</b> ${news.author || 'অজানা'}</span>
          <span><i class="fa-solid fa-clock"></i> <b>আপলোড:</b> ${news.date || ''} ${news.time || ''}</span>
        </div>
        <div class="popup-body-flow">
      `;

      // প্রথম/প্রধান ব্যানার ইমেজ প্রসেসিং
      if (news.image) {
        // নির্দেশনানুযায়ী: বিষয়বস্তু শেষ হয়ে দাড়ি, তারপর নীল ক্রেডিট লোগো এবং হলুদ রঙে ক্রেডিট নাম
        let imageCaptionHTML = '';
        if (news.image_description || news.image_credit) {
          imageCaptionHTML = `
            <div class="popup-img-caption-bar">
              <span>${news.image_description ? news.image_description.trim() : ''}</span>
              ${news.image_credit ? `<i class="fa-solid fa-camera credit-logo"></i><span class="credit-name">${news.image_credit}</span>` : ''}
            </div>
          `;
        }

        headHTML += `
          <div class="popup-media-container">
            <img src="${news.image}" class="popup-dynamic-img" alt="Main Banner">
            ${imageCaptionHTML}
          </div>
        `;
      }

      // কন্টেন্ট সিকোয়েন্স লুপ (প্যারাগ্রাফ, ইমেজ ও উদ্ধৃতি ক্রমানুসারে সাজানো)
      if (news.news_content && Array.isArray(news.news_content)) {
        news.news_content.forEach(element => {
          if (element.type === 'paragraph') {
            headHTML += `<p>${element.text}</p>`;
          } 
          else if (element.type === 'image') {
            let subImageCaptionHTML = '';
            if (element.description || element.credit) {
              subImageCaptionHTML = `
                <div class="popup-img-caption-bar">
                  <span>${element.description ? element.description.trim() : ''}</span>
                  ${element.credit ? `<i class="fa-solid fa-camera credit-logo"></i><span class="credit-name">${element.credit}</span>` : ''}
                </div>
              `;
            }

            headHTML += `
              <div class="popup-media-container">
                <img src="${element.url}" class="popup-dynamic-img" alt="Activity Media">
                ${subImageCaptionHTML}
              </div>
            `;
          } 
          else if (element.type === 'quote') {
            headHTML += `
              <div class="popup-quote-box">
                <p class="quote-text">${element.text}</p>
                ${element.writer ? `<span class="quote-author">— ${element.writer}</span>` : ''}
              </div>
            `;
          }
        });
      } else if (typeof news.news === 'string') {
        headHTML += `<p>${news.news}</p>`;
      }

      headHTML += `</div>`; // .popup-body-flow এন্ড ট্যাগ

      // নিউজের একদম নিচে 'ক্যাটাগরি: ' এবং ছোট ছোট বক্সে ক্যাটাগরি নাম রেন্ডারিং
      if (news.category && Array.isArray(news.category)) {
        headHTML += `
          <div class="popup-footer-categories-container">
            <span class="popup-category-label">ক্যাটাগরি:</span>
            <div class="popup-footer-categories">
        `;
        news.category.forEach(cat => {
          headHTML += `<span class="cat-badge">${cat}</span>`;
        });
        headHTML += `
            </div>
          </div>
        `;
      }

      contentArea.innerHTML = headHTML;

      document.getElementById('activityPopup').classList.add('active');
      document.body.style.overflow = 'hidden'; 
    }

    document.getElementById('closePopup').addEventListener('click', () => {
      document.getElementById('activityPopup').classList.remove('active');
      document.body.style.overflow = '';
    });

    document.getElementById('activityPopup').addEventListener('click', (e) => {
      if(e.target === document.getElementById('activityPopup')) {
        document.getElementById('activityPopup').classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    window.onload = () => {
      fetchActivities();
    };
  </script>

  <script src="../navigation.js"></script>
</body>
</html>
