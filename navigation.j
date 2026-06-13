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
    padding: 15px 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: var(--text-light);
  }

  .header-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--secondary-color);
  }

  .header-title-box h1 {
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .header-title-box p {
    font-size: 0.75rem;
    color: var(--secondary-color);
    letter-spacing: 0.5px;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  /* Navigation Links */
  .nav-menu {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 20px;
  }

  .nav-item {
    position: relative;
  }

  .nav-link {
    color: var(--text-light);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  .nav-link:hover {
    color: var(--secondary-color);
  }

  /* Dropdown Menu */
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #1b263b;
    min-width: 220px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    list-style: none;
    border-radius: 4px;
    padding: 10px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s ease;
  }

  .nav-item:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-item a {
    color: var(--text-light);
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    font-size: 0.9rem;
    transition: background 0.3s, color 0.3s;
  }

  .dropdown-item a:hover {
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }

  /* Action Button & Icons */
  .btn-join {
    background-color: var(--danger-color);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: background 0.3s, transform 0.2s;
  }

  .btn-join:hover {
    background-color: #bd2130;
    transform: scale(1.05);
  }

  .fb-icon-top {
    color: #1877f2;
    font-size: 1.5rem;
    transition: transform 0.3s;
  }

  .fb-icon-top:hover {
    transform: scale(1.1);
  }

  /* Hamburger Menu Button */
  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .menu-toggle span {
    width: 25px;
    height: 3px;
    background-color: var(--text-light);
    border-radius: 2px;
    transition: 0.3s;
  }

  /* --- FOOTER STYLES --- */
  .ros-footer {
    background-color: #010811;
    color: var(--text-light);
    padding: 60px 5% 20px;
    margin-top: auto;
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
    gap: 12px;
  }

  .footer-logo-box {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .footer-logo {
    width: 60px;
    height: 60px;
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

  /* Bottom Copyright Area */
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

  /* --- RESPONSIVE DESIGN --- */
  @media (max-width: 992px) {
    .footer-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }

    .nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: var(--primary-color);
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      gap: 15px;
      box-shadow: 0 10px 15px rgba(0,0,0,0.2);
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }

    .nav-menu.active {
      max-height: 500px;
      overflow-y: auto;
    }

    .nav-item {
      width: 100%;
    }

    .dropdown-menu {
      position: relative;
      top: 0;
      box-shadow: none;
      background-color: rgba(255,255,255,0.05);
      margin-top: 5px;
      display: none;
      opacity: 1;
      visibility: visible;
      transform: none;
    }

    .nav-item.active .dropdown-menu {
      display: block;
    }

    .header-right {
      gap: 15px;
    }

    .footer-container {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    
    .menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .menu-toggle.active span:nth-child(2) { opacity: 0; }
    .menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
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
      <header class="ros-header">
        <a href="index.html" class="header-left">
          <img src="ros logo.png" alt="ROS Logo" class="header-logo">
          <div class="header-title-box">
            <h1>রাজশাহী অলিম্পিয়াড সোসাইটি</h1>
          </div>
        </a>

        <div class="header-right">
          <nav>
            <ul class="nav-menu" id="navMenu">
              <li class="nav-item"><a href="about.html" class="nav-link">আমাদের সম্পর্কে</a></li>
              <li class="nav-item"><a href="notice.html" class="nav-link">বিজ্ঞপ্তি</a></li>
              <li class="nav-item"><a href="activities.html" class="nav-link">আমাদের কার্যক্রম</a></li>
              
              <!-- ড্রপডাউন মেনু (কমিটি) -->
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
              
              <!-- সদস্য হওয়ার বাটন -->
              <li class="nav-item">
                <a href="registration.html" class="btn-join">সদস্য হতে চাই</a>
              </li>
            </ul>
          </nav>

          <!-- ফেসবুক আইকন -->
          <a href="https://www.facebook.com/share/18nJSiYvtY/" target="_blank" class="fb-icon-top" title="Facebook Page">
            <i class="fa-brands fa-square-facebook"></i>
          </a>

          <!-- হ্যামবার্গার মেনু বাটন (মোবাইলের জন্য) -->
          <button class="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    `;

    // মোবাইল মেনু ফাংশনালিটি সেট করা
    this.setupMobileMenu();
  }

  setupMobileMenu() {
    const toggle = this.querySelector('#menuToggle');
    const menu = this.querySelector('#navMenu');
    const dropdownToggles = this.querySelectorAll('.nav-item > .nav-link');

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // মোবাইল ডিভাইসে ড্রপডাউনে ক্লিক ইভেন্ট হ্যান্ডল করা
    dropdownToggles.forEach(navLink => {
      navLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navLink.nextElementSibling) {
          e.preventDefault();
          navLink.parentElement.classList.toggle('active');
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
          
          <!-- ১ম সারি: পরিচিতি -->
          <div class="footer-col footer-about">
            <div class="footer-logo-box">
              <img src="ros logo.png" alt="ROS Logo" class="footer-logo">
              <h2>রাজশাহী অলিম্পিয়াড সোসাইটি</h2>
            </div>
            <p class="footer-slogan">"জ্ঞানের খোঁজে, অনন্য উচ্চতায়"</p>
          </div>

          <!-- ২য় সারি: তথ্য কনিকা -->
          <div class="footer-col">
            <h3>তথ্য কনিকা</h3>
            <ul class="footer-links">
              <li><a href="about.html">আমাদের সম্পর্কে</a></li>
              <li><a href="notice.html">বিজ্ঞপ্তি</a></li>
              <li><a href="gallery.html">ছবি</a></li>
            </ul>
          </div>

          <!-- ৩য় সারি: গোপনীয়তা -->
          <div class="footer-col">
            <h3>গোপনীয়তা</h3>
            <ul class="footer-links">
              <li><a href="terms.html">শর্তাবলী</a></li>
              <li><a href="constitution.html">গঠনতন্ত্র</a></li>
            </ul>
          </div>

          <!-- ৪র্থ সারি: কুইক লিংক -->
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

        <!-- ফুটার বটম এরিয়া -->
        <div class="footer-bottom">
          <p>Copyright © 2024-2025 All rights reserved <a href="index.html">Rajshahi Olympiad Society</a>.</p>
          <p class="developer-credit">Developed by, <a href="https://www.facebook.com/share/18nJSiYvtY/" target="_blank">Utsab Sarker</a></p>
        </div>
      </footer>
    `;
  }
}

// কাস্টম ট্যাগ রেজিস্টার করা
customElements.define('ros-header', RosHeader);
customElements.define('ros-footer', RosFooter);
