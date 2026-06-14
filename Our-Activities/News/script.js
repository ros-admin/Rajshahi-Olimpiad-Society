async function loadCurrentNews() {
  try {
    const response = await fetch('data.json');
    const news = await response.json();
    renderNewsDetail(news);
    
    // লোকাল স্টোরেজ থেকে ব্যাকগ্রাউন্ড ডেটা নিয়ে সর্বশেষ ৬টি গ্রিড তৈরি করা
    const savedData = localStorage.getItem('allNewsData');
    if (savedData) {
      renderLatestGrid(JSON.parse(savedData), news.link);
    }
  } catch (error) {
    console.error("সংবাদ লোড করতে ত্রুটি:", error);
    document.getElementById('mainNewsContent').innerHTML = "<p style='color:red; text-align:center;'>সংবাদ লোড করা সম্ভব হয়নি।</p>";
  }
}

function renderNewsDetail(news) {
  const container = document.getElementById('mainNewsContent');
  
  let html = `
    <h1 class="popup-title">${news.title}</h1>
    <div class="popup-meta">
      <div class="popup-meta-left">
        <span><i class="fa-solid fa-pen-nib"></i> লেখা: ${news.author || 'অজানা'}</span>
        <span><i class="fa-solid fa-clock"></i> আপলোড: ${news.date || ''} ${news.time || ''}</span>
      </div>
      <button class="btn-share" onclick="copyNewsLink()"><i class="fa-solid fa-share-nodes"></i> শেয়ার</button>
    </div>
    <div class="popup-body-flow">
  `;

  if (news.image) {
    html += `
      <div class="popup-media-container">
        <img src="${news.image}" class="popup-dynamic-img">
        ${(news.image_description || news.image_credit) ? `
          <div class="popup-img-caption-bar">
            <span>${news.image_description || ''}</span>
            ${news.image_credit ? `<i class="fa-solid fa-camera credit-logo"></i><span class="credit-name">${news.image_credit}</span>` : ''}
          </div>` : ''}
      </div>
    `;
  }

  if (news.news_content) {
    news.news_content.forEach(element => {
      if (element.type === 'paragraph') html += `<p>${element.text}</p>`;
      else if (element.type === 'image') {
        html += `
          <div class="popup-media-container">
            <img src="${element.url}" class="popup-dynamic-img">
            ${(element.description || element.credit) ? `
              <div class="popup-img-caption-bar">
                <span>${element.description || ''}</span>
                ${element.credit ? `<i class="fa-solid fa-camera credit-logo"></i><span class="credit-name">${element.credit}</span>` : ''}
              </div>` : ''}
          </div>`;
      } else if (element.type === 'quote') {
        html += `<div class="popup-quote-box"><p class="quote-text">${element.text}</p>${element.writer ? `<span class="quote-author">— ${element.writer}</span>` : ''}</div>`;
      }
    });
  }

  html += `</div>`;

  if (news.category) {
    html += `<div class="popup-footer-categories-container"><span class="popup-category-label">ক্যাটাগরি:</span><div class="popup-footer-categories">`;
    news.category.forEach(cat => { 
      html += `<a href="../../index.html?filter=${encodeURIComponent(cat)}" class="cat-badge-link">${cat}</a>`; 
    });
    html += `</div></div>`;
  }

  container.innerHTML = html;
  document.title = news.title + " - রাজশাহী অলিম্পিয়াড সোসাইটি";
}

function copyNewsLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2500);
  });
}

function renderLatestGrid(allNews, currentLink) {
  const grid = document.getElementById('latestNewsGrid');
  grid.innerHTML = '';
  
  // কারেন্ট সংবাদটি বাদ দিয়ে প্রথম ৬টি সর্বশেষ সংবাদ ফিল্টার করা
  const filtered = allNews
    .filter(item => item.link !== currentLink)
    .slice(0, 6);

  if(filtered.length === 0) {
    document.querySelector('.latest-news-section').style.display = 'none';
    return;
  }

  filtered.forEach(news => {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.innerHTML = `
      <div class="card-banner-wrapper"><img src="${news.image || '../default-banner.jpg'}" class="card-banner"></div>
      <div class="card-body">
        <h2 class="card-heading"><a href="../${news.link}/index.html">${news.title}</a></h2>
        <div class="card-date"><i class="fa-solid fa-calendar-day"></i> ${news.date}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.onload = loadCurrentNews;
