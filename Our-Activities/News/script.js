// ১. কারেন্ট ফোল্ডারের data.json থেকে ডেটা রিড করা
async function loadCurrentNews() {
  try {
    const response = await fetch('data.json');
    const news = await response.json();
    renderNewsDetail(news);
    loadLatestSixNews(news.link); // কারেন্ট নিউজ বাদ দিয়ে বাকি ৬টি লোড করা
  } catch (error) {
    console.error("সংবাদ লোড করতে ত্রুটি:", error);
    document.getElementById('mainNewsContent').innerHTML = "<p style='color:red;'>সংবাদ লোড করা সম্ভব হয়নি।</p>";
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
      // ক্লিক করলে মূল পাতায় ফিল্টার প্যারামিটারসহ নিয়ে যাবে
      html += `<a href="../../index.html?filter=${encodeURIComponent(cat)}" class="cat-badge-link">${cat}</a>`; 
    });
    html += `</div></div>`;
  }

  container.innerHTML = html;
  document.title = news.title + " - রাজশাহী অলিম্পিয়াড সোসাইটি";
}

// শেয়ার বাটন কন্ট্রোলার
function copyNewsLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert("📋 সংবাদের লিংকটি কপি করা হয়েছে!");
  });
}

// ২. মূল অ্যাক্টিভিটি পেজের ইনডেক্স থেকে বাফারিং করে সর্বশেষ ৬টি সংবাদ নিয়ে আসা
async function loadLatestSixNews(currentLink) {
  try {
    // মূল কার্যক্রমের মেইন ফাইল থেকে ইনডেক্স রিড করার ট্রিক
    const response = await fetch('../../index.html');
    const htmlText = await response.text();
    
    // মেইন ইনডেক্স থেকে স্ক্রিপ্ট ডেটা বা সোর্স থেকে নিউজ লিস্ট এগ্রিগেট করা
    // এখানে আমরা ধরে নিচ্ছি মেইন অ্যাক্টিভিটি পেজ লোকাল স্টোরেজ বা গ্লোবাল ইনডেক্স অবজেক্ট থেকে ডেটা রিড করছে।
    // সবচেয়ে নিরাপদ উপায় হলো কার্যক্রমের মূল সোর্স থেকে এপিআই বা এগ্রিগেটর রিড করা
    if(window.parent && window.parent.allNewsData) {
       renderLatestGrid(window.parent.allNewsData, currentLink);
    } else {
       // ফলব্যাক: যদি ডিরেক্ট ওপেন হয়, ইনডেক্স এরে রেন্ডার লজিক
       const res = await fetch('../../../Our-Activities/News/abc123/data.json'); // ডেমো চেইনিং স্ট্রাকচার
       // প্রজেক্টের মেইন এগ্রিগেটর থাকলে সেখান থেকে ফিল্টার হবে
    }
  } catch(e) { }
}

function renderLatestGrid(allNews, currentLink) {
  const grid = document.getElementById('latestNewsGrid');
  grid.innerHTML = '';
  
  // বর্তমান নিউজটি বাদ দিয়ে ডেট অনুযায়ী শর্ট করে প্রথম ৬টি নেওয়া
  const filtered = allNews
    .filter(item => item.link !== currentLink)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  filtered.forEach(news => {
    const card = document.createElement('div');
    card.className = 'activity-card show';
    card.innerHTML = `
      <div class="card-banner-wrapper"><img src="${news.image}" class="card-banner"></div>
      <div class="card-body">
        <h2 class="card-heading"><a href="../${news.link}/index.html" style="text-decoration:none; color:inherit;">${news.title}</a></h2>
        <div class="card-date"><i class="fa-solid fa-calendar-day"></i> ${news.date}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

window.onload = loadCurrentNews;

