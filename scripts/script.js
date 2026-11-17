// mouse tracking
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
});

// hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// close menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// dropdown functionality
let activeDropdown = null;
let activeWrapper = null;
let dropdownTimeout = null;

document.addEventListener('click', (e) => {
    // if clicked on a multi-account button, toggle its dropdown
    if (e.target.closest('[data-multi]')) {
        const btn = e.target.closest('[data-multi]');
        const wrapper = btn.closest('.social-btn-wrapper');
        const type = btn.dataset.multi;
        const dropdown = document.getElementById(`${type}-dropdown`);
        
        // close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== dropdown) {
                menu.classList.remove('active');
            }
        });
        
        clearTimeout(dropdownTimeout);
        dropdown.classList.add('active');
        activeDropdown = dropdown;
        activeWrapper = wrapper;
        e.stopPropagation();
    } else if (!e.target.closest('.dropdown-menu')) {
        // close dropdowns if clicked elsewhere
        clearTimeout(dropdownTimeout);
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
        activeDropdown = null;
        activeWrapper = null;
    }
});

// keep dropdown open when hovering over button or dropdown
document.addEventListener('mousemove', (e) => {
    if (activeDropdown && activeWrapper) {
        const button = activeWrapper.querySelector('[data-multi]');
        const buttonRect = button.getBoundingClientRect();
        const dropdownRect = activeDropdown.getBoundingClientRect();
        
        const isOverButton = (
            e.clientX >= buttonRect.left &&
            e.clientX <= buttonRect.right &&
            e.clientY >= buttonRect.top &&
            e.clientY <= buttonRect.bottom
        );
        
        const isOverDropdown = (
            e.clientX >= dropdownRect.left &&
            e.clientX <= dropdownRect.right &&
            e.clientY >= dropdownRect.top &&
            e.clientY <= dropdownRect.bottom
        );
        
        clearTimeout(dropdownTimeout);
        
        if (!isOverButton && !isOverDropdown) {
            dropdownTimeout = setTimeout(() => {
                activeDropdown.classList.remove('active');
                activeDropdown = null;
                activeWrapper = null;
            }, 100);
        }
    }
});

// page templates
const pages = {
    home: `
        <div class="hero-section">
            <div class="container">
                <header class="header">
                    <div class="profile">
                        <div class="avatar"></div>
                        <h1>niyam</h1>
                        <p class="alias">(333ns)</p>
                        <p class="tagline">musician • photo/videographer • content creator</p>
                    </div>
                </header>

                <main>
                    <section class="social-links">
                        <div class="social-btn-wrapper">
                            <button class="social-btn instagram" data-multi="instagram">
                                <i class="fab fa-instagram"></i>
                                <span>instagram</span>
                            </button>
                            <div class="dropdown-menu" id="instagram-dropdown">
                                <a href="https://instagram.com/niyam.sh" target="_blank">@niyam.sh</a>
                                <a href="https://instagram.com/333ns.mp3" target="_blank">@333ns.mp3</a>
                            </div>
                        </div>

                        <div class="social-btn-wrapper">
                            <button class="social-btn tiktok" data-multi="tiktok">
                                <i class="fab fa-tiktok"></i>
                                <span>tiktok</span>
                            </button>
                            <div class="dropdown-menu" id="tiktok-dropdown">
                                <a href="https://tiktok.com/@niyams_" target="_blank">@niyams_</a>
                                <a href="https://tiktok.com/@333ns.mp3" target="_blank">@333ns.mp3</a>
                            </div>
                        </div>

                        <div class="social-btn-wrapper">
                            <button class="social-btn youtube" data-multi="youtube">
                                <i class="fab fa-youtube"></i>
                                <span>youtube</span>
                            </button>
                            <div class="dropdown-menu" id="youtube-dropdown">
                                <a href="https://youtube.com/@333ns.mp3" target="_blank">@333ns.mp3</a>
                                <a href="https://youtube.com/@ns31" target="_blank">@ns31</a>
                            </div>
                        </div>

                        <a href="https://open.spotify.com/artist/3hgYUhIuB2EH5oM3mEMQBV" target="_blank" class="social-btn spotify">
                            <i class="fab fa-spotify"></i>
                            <span>spotify</span>
                        </a>

                        <div class="social-btn-wrapper">
                            <button class="social-btn soundcloud" data-multi="soundcloud">
                                <i class="fab fa-soundcloud"></i>
                                <span>soundcloud</span>
                            </button>
                            <div class="dropdown-menu" id="soundcloud-dropdown">
                                <a href="https://soundcloud.com/333ns" target="_blank">ns (333ns)</a>
                                <a href="https://soundcloud.com/prodns31" target="_blank">ns31</a>
                            </div>
                        </div>

                        <a href="https://github.com/NS0731" target="_blank" class="social-btn github">
                            <i class="fab fa-github"></i>
                            <span>github</span>
                        </a>
                    </section>
                </main>
            </div>
        </div>

        <footer>
            <p>all rights reserved, © niyam shah</p>
        </footer>
    `,

    about: `
        <div class="page-section about-page">
            <div class="container">
                <header class="page-header">
                    <h1>about me</h1>
                </header>

                <main>
                    <section class="about-section">
                        <div class="about-container">
                            <p>i'm a student with a passion for all things creative. with expertise in music production, photo/videography, and content creation, i bring ideas to life through my creativity and passion.</p>
                            <div class="skills">
                                <div class="skill-tag">music production</div>
                                <div class="skill-tag">photography</div>
                                <div class="skill-tag">videography</div>
                                <div class="skill-tag">content creation</div>
                                <div class="skill-tag">sound engineering</div>
                                <div class="skill-tag">fashion</div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>

        <footer>
            <p>all rights reserved, © niyam shah</p>
        </footer>
    `,

    music: `
        <div class="page-section">
            <div class="container">
                <header class="page-header">
                    <h1>my music</h1>
                    <p>listen to my music on spotify</p>
                </header>

                <main>
                    <div class="spotify-embed">
                        <iframe src="https://open.spotify.com/embed/artist/3hgYUhIuB2EH5oM3mEMQBV" width="100%" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="niyam shah on Spotify"></iframe>
                    </div>
                </main>
            </div>
        </div>

        <footer>
            <p>all rights reserved, © niyam shah</p>
        </footer>
    `,

    contact: `
        <div class="page-section contact-page">
            <div class="container">
                <header class="page-header">
                    <h1>contact me</h1>
                    <p>say hi!</p>
                </header>

                <main>
                    <div class="contact-card">
                        <p class="contact-label">for music related inquiries</p>
                        <a href="mailto:music@niyam.co.uk" class="contact-email">music@niyam.co.uk</a>
                        <p class="contact-label">for all other inquiries</p>
                        <a href="mailto:me@niyam.co.uk" class="contact-email">me@niyam.co.uk</a>
                    </div>
                </main>
            </div>
        </div>

        <footer>
            <p>all rights reserved, © niyam shah</p>
        </footer>
    `
};

// router function
function router() {
    const path = window.location.pathname;
    const app = document.getElementById('app');
    
    let page = 'home';
    if (path === '/music') {
        page = 'music';
    }
    if (path === '/about') page = 'about';
    if (path === '/contact') page = 'contact';
    
    app.innerHTML = pages[page];
    updateNavigation(page);
}

// update navigation active state
function updateNavigation(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const pathMap = { home: '/', music: '/music', about: '/about', contact: '/contact' };
    document.querySelector(`a[href="${pathMap[page]}"]`).classList.add('active');
}

// handle navigation clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        window.history.pushState({}, '', path);
        router();
    }
});

// Initialize router on page load
document.addEventListener('DOMContentLoaded', () => {
    router();
});
