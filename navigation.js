// FontAwesome এবং Google Fonts লোড করার জন্য
const link1 = document.createElement('link');
link1.rel = 'stylesheet';
link1.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(link1);

const link2 = document.createElement('link');
link2.rel = 'stylesheet';
link2.href = 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Poppins:wght@400;500;600&display=swap';
document.head.appendChild(link2);

// গ্লোবাল এবং কম্পোনেন্ট স্টাইল শিট যুক্ত করা
const styles = `
  :root {
    --primary-color: #0d1b2a;
    --secondary-color: #00b4d8;
    --accent-color: #ffd700;
    --danger-color: #dc3545;
    --text-light: #ffffff;
    --text-muted: #a0aec0;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Hind Siliguri', 'Poppins', sans-serif;
  }

  /* --- HEADER STYLES --- */
  .ros-header {
    background-color: var(--primary-color);
    color: var(--text-light);
    padding: 12px 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 25px rgba(0,0,0,0.3);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: var(--text-light);
  }

  .header-logo {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--secondary-color);
  }

  .header-title-box h1 {
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* ৩-ডট বাটন ডিজাইন (কম্পিউটার এবং মোবাইল সব জায়গায় থাকবে) */
  .menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255,255,255,0.1);
    width: 42px;
    height: 42px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2001;
  }

  .menu-toggle:hover {
    background: rgba(0, 180, 216, 0.2);
    border-color: var(--secondary-color);
  }

  .menu-toggle span {
    width: 20px;
    height: 3px;
    background-color: var(--text-light);
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ৩-ডট টু এক্স (X) অ্যানিমেশন ক্রস ইফেক্ট */
  .menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
  .menu-toggle.active span:nth-child(2) { opacity: 0; transform: translateX(10px); }
  .menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -6px); }

  /* ডানদিকের প্রিমিয়াম সাইড ড্রয়ার মেনুবার */
  .nav-menu {
    position: fixed;
    top: 0;
    right: -320px; /* ডিফল্টভাবে স্ক্রিনের বাইরে থাকবে, তাই আগে থেকে বের হয়ে থাকবে না */
    width: 300px;
    height: 100vh;
    background: linear-gradient(180deg, #0d1b2a 0%, #060d15 100%);
    box-shadow: -10px 0 35px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    padding: 80px 25px 40px;
    gap: 12px;
    list-style: none;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2000;
    overflow-y: auto;
  }

  .nav-menu.active {
    right: 0; /* ড্রয়ার মেনু ওপেন করার পজিশন */
  }

  /* ব্যাকড্রপ ব্লার ওভারলে (মেনু খুললে পেজের বাকি অংশ আবছা করার জন্য) */
  .menu-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .menu-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link {
    color: var(--text-light);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 12px 15px;
    border-radius: 8px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.03);
    cursor: pointer;
  }

  .nav-link:hover {
    color: var(--secondary-color);
    background: rgba(0, 180, 216, 0.1);
    padding-left: 20px;
  }

  /* ড্রপডাউন মেনু ইন্টারফেস */
  .dropdown-menu {
    list-style: none;
    background-color: rgba(0, 0, 0, 0.2);
    border-left: 2px solid var(--secondary-color);
    margin: 5px 0 5px 10px;
    padding: 5px 0;
    display: none; /* ক্লিকের আগে বন্ধ থাকবে */
  }

  .nav-item.active .dropdown-menu {
    display: block;
  }

  .dropdown-item a {
    color: var(--text-muted);
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    font-size: 0.9rem;
    transition: all 0.3s;
  }

  .dropdown-item a:hover {
    color: var(--secondary-color);
    padding-left: 25px;
  }

  .nav-link i {
    transition: transform 0.3s ease;
  }
  .nav-item.active .nav-link i {
    transform: rotate(180deg);
  }

  /* অ্যাকশন জয়েন বাটন */
  .btn-join {
    background-color: var(--danger-color);
    color: white;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    text-align: center;
    display: block;
    margin-top: 10px;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
  }

  .btn-join:hover {
    background-color: #bd2130;
    transform: translateY(-2px);
  }

  .fb-icon-top {
    color: #1877f2;
    font-size: 1.6rem;
    transition: transform 0.3s;
  }

  .fb-icon-top:hover {
    transform: scale(1.1);
  }

  /* --- FOOTER STYLES --- */
  .ros-footer {
    background-color: #010811;
    color: var(--text-light);
    padding: 60px 5% 20px;
    margin-top: auto;
    border-top: 4px solid var(--primary-color);
  }

  .footer-container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 40px;
  }

  .footer-col h3 {
    font-size: 1.2rem;
    color: var(--secondary-color);
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 8px;
  }

  .footer-col h3::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background-color: var(--accent-color);
  }

  .footer-about {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .footer-logo-box {
    display: flex;
    flex-direction: column; /* স্লোগানকে নামের নিচে চমৎকার দেখানোর জন্য কলাম ভিউ */
    align-items: flex-start;
    gap: 8px;
  }

  .footer-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .footer-logo {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: 2px solid var(--accent-color);
  }

  .footer-about h2 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .footer-slogan {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-style: italic;
    padding-left: 67px; /* লোগোর উইডথ এবং গ্যাপের সাথে মিলিয়ে নিখুঁত এলাইনমেন্ট */
    margin-top: -5px;
  }

  .footer-links {
    list-style: none;
  }

  .footer-links li {
    margin-bottom: 12px;
  }

  .footer-links a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s, padding-left 0.3s;
  }

  .footer-links a:hover {
    color: var(--accent-color);
    padding-left: 5px;
  }

  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 10px;
  }

  .social-links a {
    color: var(--text-light);
    font-size: 1.3rem;
    transition: color 0.3s, transform 0.3s;
  }

  .social-links a:hover {
    transform: translateY(-3px);
  }

  .social-links .fb:hover { color: #1877f2; }
  .social-links .insta:hover { color: #e1306c; }
  .social-links .yt:hover { color: #ff0000; }

  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    font-size: 0.9rem;
    color: var(--text-muted);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .footer-bottom a {
    color: var(--text-light);
    text-decoration: none;
    transition: color 0.3s;
  }

  .footer-bottom a:hover {
    color: var(--secondary-color);
  }

  .developer-credit {
    font-size: 0.85rem;
  }

  .developer-credit a {
    font-size: 1rem;
    font-weight: bold;
    color: var(--accent-color) !important;
  }

  /* রেস্পনসিভ ব্রেকপয়েন্ট গ্রিড */
  @media (max-width: 992px) {
    .footer-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    .footer-container {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .footer-slogan {
      padding-left: 0;
      margin-top: 0;
    }
    .header-title-box h1 {
      font-size: 1rem;
    }
  }
`;

// স্টাইল ইনজেক্ট করা
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


// --- CUSTOM HEADER COMPONENT ---
class RosHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="menu-overlay" id="menuOverlay"></div>

      <header class="ros-header">
        <a href="index.html" class="header-left">
          <img src="../ros logo.png" alt="ROS Logo" class="header-logo">
          <div class="header-title-box">
            <h1>রাজশাহী অলিম্পিয়াড सोसाइटी</h1>
          </div>
        </a>

        <div class="header-right">
          <a href="https://www.facebook.com/share/18nJSiYvtY/" target="_blank" class="fb-icon-top" title="Facebook Page">
            <i class="fa-brands fa-square-facebook"></i>
          </a>

          <button class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav>
            <ul class="nav-menu" id="navMenu">
              <li class="nav-item"><a href="about.html" class="nav-link">আমাদের সম্পর্কে</a></li>
              <li class="nav-item"><a href="notice.html" class="nav-link">বিজ্ঞপ্তি</a></li>
              <li class="nav-item"><a href="activities.html" class="nav-link">আমাদের কার্যক্রম</a></li>
              
             
              <li class="nav-item">
                <span class="nav-link">কমিটি <i class="fa-solid fa-chevron-down" style="font-size:0.7rem"></i></span>
                <ul class="dropdown-menu">
                  <li class="dropdown-item"><a href="convening-committee.html">আহবায়ক কমিটি</a></li>
                  <li class="dropdown-item"><a href="executive-committee-2026.html">কার্যনির্বাহী কমিটি-২০২৬</a></li>
                </ul>
              </li>
              
              <li class="nav-item"><a href="members.html" class="nav-link">সদস্য তালিকা</a></li>
              <li class="nav-item"><a href="gallery.html" class="nav-link">ছবি</a></li>
              <li class="nav-item"><a href="contact.html" class="nav-link">যোগাযোগ</a></li>
              
              <li class="nav-item">
                <a href="registration.html" class="btn-join">সদস্য হতে চাই</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    this.setupMobileMenu();
  }

  setupMobileMenu() {
    const toggle = this.querySelector('#menuToggle');
    const menu = this.querySelector('#navMenu');
    const overlay = this.querySelector('#menuOverlay');
    const dropdownToggles = this.querySelectorAll('.nav-item > .nav-link');

    // ৩-ডট বাটনে ক্লিকের মাধ্যমে ড্রয়ার ওপেন/ক্লোজ
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    // পেজের বাইরে ব্লার অংশে ক্লিক করলে মেনু ড্রয়ার বন্ধ হয়ে যাবে
    overlay.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      overlay.classList.remove('active');
    });

    // সাব-মেনু ড্রপডাউন টগল হ্যান্ডলার (ক্লিক করলে ওপেন হবে, আগে থেকে বের হয়ে থাকবে না)
    dropdownToggles.forEach(navLink => {
      navLink.addEventListener('click', (e) => {
        if (navLink.nextElementSibling) {
          e.preventDefault();
          const parent = navLink.parentElement;
          
          // অন্য কোনো সাব-মেনু খোলা থাকলে তা বন্ধ করার জন্য
          dropdownToggles.forEach(otherLink => {
            if(otherLink !== navLink) {
              otherLink.parentElement.classList.remove('active');
            }
          });

          parent.classList.toggle('active');
        }
      });
    });
  }
}

// --- CUSTOM FOOTER COMPONENT ---
class RosFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="ros-footer">
        <div class="footer-container">
          
          <div class="footer-col footer-about">
            <div class="footer-logo-box">
              <div class="footer-title-row">
                <img src="../ros logo.png" alt="ROS Logo" class="footer-logo">
                <h2>রাজশাহী অলিম্পিয়াড সোসাইটি</h2>
              </div>
              <p class="footer-slogan">"জ্ঞানের খোঁজে, অনন্য উচ্চতায়"</p>
            </div>
          </div>

         
          <div class="footer-col">
            <h3>তথ্য কনিকা</h3>
            <ul class="footer-links">
              <li><a href="about.html">আমাদের সম্পর্কে</a></li>
              <li><a href="notice.html">বিজ্ঞপ্তি</a></li>
              <li><a href="gallery.html">ছবি</a></li>
            </ul>
          </div>

         
          <div class="footer-col">
            <h3>গোপনীয়তা</h3>
            <ul class="footer-links">
              <li><a href="terms.html">শর্তাবলী</a></li>
              <li><a href="constitution.html">গঠনতন্ত্র</a></li>
            </ul>
          </div>

         
          <div class="footer-col">
            <h3>কুইক লিংক</h3>
            <ul class="footer-links" style="margin-bottom: 15px;">
              <li><a href="contact.html">যোগাযোগ</a></li>
            </ul>
            <div class="social-links">
              <a href="https://www.facebook.com/share/18nJSiYvtY/" target="_blank" class="fb" title="Facebook"><i class="fa-brands fa-facebook"></i></a>
              <a href="https://instagram.com" target="_blank" class="insta" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://youtube.com" target="_blank" class="yt" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>

        </div>

       
        <div class="footer-bottom">
          <p>Copyright © 2024-2026 All rights reserved <a href="index.html">Rajshahi Olympiad Society</a>.</p>
          <p class="developer-credit">Developed by, <a href="https://www.facebook.com/share/18nJSiYvtY/" target="_blank">Utsab Sarker</a></p>
        </div>
      </footer>
    `;
  }
}

// কাস্টম ট্যাগ রেজিস্টার করা
customElements.define('ros-header', RosHeader);
customElements.define('ros-footer', RosFooter);
