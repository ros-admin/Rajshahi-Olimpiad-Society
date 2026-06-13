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

  /* ৩-ডট বাটন ডিজাইন */
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

  .menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
  .menu-toggle.active span:nth-child(2) { opacity: 0; transform: translateX(10px); }
  .menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -6px); }

  /* ডানদিকের ড্রয়ার মেনুবার - ঝাপসা রোধ করার জন্য ফিল্টার রিমুভ করা হয়েছে */
  .nav-menu {
    position: fixed;
    top: 0;
    right: -320px;
    width: 300px;
    height: 100vh;
    background: #0d1b2a !important; /* সলিড ব্যাকগ্রাউন্ড কালার */
    box-shadow: -10px 0 35px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    padding: 80px 25px 40px;
    gap: 12px;
    list-style: none;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2000;
    overflow-y: auto;
    filter: none !important; /* কোনো এক্সটার্নাল ঝাপসা ইফেক্ট যেন কাজ না করে */
    -webkit-filter: none !important;
  }

  .nav-menu.active {
    right: 0;
  }

  /* ব্যাকড্রপ ওভারলে - মেইন পেজ হালকা ডার্ক হবে, কিন্তু ব্লার হবে না */
  .menu-overlay {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: none !important; /* ব্লার ইফেক্ট সম্পূর্ণ বন্ধ */
    -webkit-backdrop-filter: none !important;
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
    filter: none !important;
  }

  .nav-link {
    color: var(--text-light) !important;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 12px 15px;
    border-radius: 8px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255,255,255,0.05) !important;
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    filter: none !important;
  }

  .nav-link:hover {
    color: var(--secondary-color) !important;
    background: rgba(0, 180, 216, 0.15) !important;
    padding-left: 20px;
  }

  .dropdown-menu {
    list-style: none;
    background-color: rgba(0, 0, 0, 0.3) !important;
    border-left: 2px solid var(--secondary-color);
    margin: 5px 0 5px 10px;
    padding: 5px 0;
    display: none;
    filter: none !important;
  }

  .nav-item.active .dropdown-menu {
    display: block;
  }

  .dropdown-item a {
    color: var(--text-muted) !important;
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    font-size: 0.9rem;
    transition: all 0.3s;
  }

  .dropdown-item a:hover {
    color: var(--secondary-color) !important;
    padding-left: 25px;
  }

  .btn-join {
    background-color: var(--danger-color) !important;
    color: white !important;
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
    background-color: #bd2130 !important;
    transform: translateY(-2px);
  }

  .fb-icon-top {
    color: #1877f2;
    font-size: 1.6rem;
    transition: transform 0.3s;
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
    grid-template-columns: 1.5fr 1fr 1fr 1fr; 
    gap: 30px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 40px;
  }

  .footer-col h3 {
    font-size: 1.15rem;
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

  .footer-brand-container {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .footer-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid var(--accent-color);
    flex-shrink: 0;
  }

  .footer-text-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .footer-brand-container h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-light);
    line-height: 1.2;
  }

  .footer-slogan {
    font-size: 0.88rem;
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

  /* --- FIXED BACK TO TOP BUTTON STYLE --- */
  .back-to-top {
    position: fixed;
    bottom: 25px;
    right: 25px;
    width: 45px;
    height: 45px;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 180, 216, 0.4);
    z-index: 1500;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
  }

  .back-to-top.show {
    opacity: 1;
    visibility: visible;
  }

  /* --- RESPONSIVE BREAKPOINTS --- */
  @media (max-width: 1024px) {
    .footer-container {
      grid-template-columns: 1fr 1fr;
      gap: 35px;
    }
  }

  @media (max-width: 650px) {
    .footer-container {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .back-to-top {
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
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
            <h1>রাজশাহী অলিম্পিয়াড সোসাইটি</h1>
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

      <button class="back-to-top" id="backToTopBtn" title="Go to Top">
        <i class="fa-solid fa-arrow-up"></i>
      </button>
    `;

    this.setupNavigationLogic();
  }

  setupNavigationLogic() {
    const toggle = this.querySelector('#menuToggle');
    const menu = this.querySelector('#navMenu');
    const overlay = this.querySelector('#menuOverlay');
    const dropdownToggles = this.querySelectorAll('.nav-item > .nav-link');
    const backToTopBtn = this.querySelector('#backToTopBtn');

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      overlay.classList.remove('active');
    });

    dropdownToggles.forEach(navLink => {
      navLink.addEventListener('click', (e) => {
        if (navLink.nextElementSibling) {
          e.preventDefault();
          const parent = navLink.parentElement;
          
          dropdownToggles.forEach(otherLink => {
            if(otherLink !== navLink) {
              otherLink.parentElement.classList.remove('active');
            }
          });
          parent.classList.toggle('active');
        }
      });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// --- CUSTOM FOOTER COMPONENT ---
class RosFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="ros-footer">
        <div class="footer-container">
          
          <div class="footer-col">
            <div class="footer-brand-container">
              <img src="../ros logo.png" alt="ROS Logo" class="footer-logo">
              <div class="footer-text-group">
                <h2>রাজশাহী অলিম্পিয়াড সোসাইটি</h2>
                <p class="footer-slogan">"মেধার লালন, দক্ষতার গঠন"</p>
              </div>
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
          <p>Copyright © 2026 All rights reserved <a href="index.html">Rajshahi Olympiad Society</a>.</p>
          <p class="developer-credit">Developed by, <a href="https://www.facebook.com/share/18nJSiYvtY/" target="_blank">Utsab Sarker</a></p>
        </div>
      </footer>
    `;
  }
}

customElements.define('ros-header', RosHeader);
customElements.define('ros-footer', RosFooter);
