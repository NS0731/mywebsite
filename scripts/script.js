// mouse tracking
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
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
                        <h1>niyam s</h1>
                        <p class="tagline">musician • photo/videographer • content creator</p>
                    </div>
                </header>

                <main>
                    <section class="intro-section">
                        <h2>welcome</h2>
                        <p>welcome to my...website?</p>
                    </section>

                    <section class="social-links">
                        <div class="social-btn-wrapper">
                            <button class="social-btn instagram" data-multi="instagram">
                                <i class="fab fa-instagram"></i>
                                <span>instagram</span>
                            </button>
                            <div class="dropdown-menu" id="instagram-dropdown">
                                <a href="https://instagram.com/niyam.sh" target="_blank">@niyam.sh</a>
                                <a href="https://instagram.com/prod.ns31" target="_blank">@prod.ns31</a>
                            </div>
                        </div>

                        <div class="social-btn-wrapper">
                            <button class="social-btn tiktok" data-multi="tiktok">
                                <i class="fab fa-tiktok"></i>
                                <span>tiktok</span>
                            </button>
                            <div class="dropdown-menu" id="tiktok-dropdown">
                                <a href="https://tiktok.com/@niyams_" target="_blank">@niyams_</a>
                                <a href="https://tiktok.com/@prod.ns31" target="_blank">@prod.ns31</a>
                                <a href="https://tiktok.com/@shotbyns31" target="_blank">@shotbyns31</a>
                            </div>
                        </div>

                        <div class="social-btn-wrapper">
                            <button class="social-btn youtube" data-multi="youtube">
                                <i class="fab fa-youtube"></i>
                                <span>youtube</span>
                            </button>
                            <div class="dropdown-menu" id="youtube-dropdown">
                                <a href="https://youtube.com/@NS31" target="_blank">@NS31</a>
                                <a href="https://youtube.com/@prod.ns31" target="_blank">@prod.ns31</a>
                            </div>
                        </div>

                        <a href="https://snapchat.com/t/UmP5mjiW" target="_blank" class="social-btn snapchat">
                            <i class="fab fa-snapchat"></i>
                            <span>snapchat</span>
                        </a>

                        <a href="https://soundcloud.com/prodns31" target="_blank" class="social-btn soundcloud">
                            <i class="fab fa-soundcloud"></i>
                            <span>soundcloud</span>
                        </a>

                        <a href="https://github.com/NS0731" target="_blank" class="social-btn github">
                            <i class="fab fa-github"></i>
                            <span>github</span>
                        </a>
                    </section>
                </main>
            </div>
        </div>

        <section class="about-section">
            <div class="about-container">
                <h2>about me</h2>
                <p>i'm a student with a passion for all things creative. with expertise in music production, photo/videography, and content creation, i bring ideas to life through my creativity and passion.</p>
                <div class="skills">
                    <div class="skill-tag">music production</div>
                    <div class="skill-tag">photography</div>
                    <div class="skill-tag">videography</div>
                    <div class="skill-tag">content creation</div>
                    <div class="skill-tag">sound engineering</div>
                </div>
            </div>
        </section>

        <footer>
            <p>all rights reserved, copyright, ns31</p>
        </footer>
    `,

    music: `
        <div class="page-section">
            <div class="container">
                <header class="page-header">
                    <h1>my music</h1>
                    <p>take a look at my most recent release on soundcloud</p>
                </header>

                <main>
                    <div class="soundcloud-embed">
                        <!-- PASTE YOUR SOUNDCLOUD EMBED CODE HERE -->
                        <iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2232733418&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
                    </div>
                </main>
            </div>
        </div>

        <footer>
            <p>copyright, niyam</p>
        </footer>
    `,

    'photo-film': `
        <div class="page-section">
            <div class="container">
                <header class="page-header">
                    <h1>photo & film</h1>
                    <p>coming soon</p>
                </header>
            </div>
        </div>

        <footer>
            <p>all rights reserved, copyright, ns31</p>
        </footer>
    `,

    personal: `
        <div class="page-section">
            <div class="container">
                <header class="page-header">
                    <h1>personal</h1>
                    <p>coming soon</p>
                </header>
            </div>
        </div>

        <footer>
            <p>copyright, niyam</p>
        </footer>
    `,

    contact: `
        <div class="page-section">
            <div class="container">
                <header class="page-header">
                    <h1>contact me</h1>
                    <p>say hi!</p>
                </header>

                <main>
                    <div class="contact-card">
                        <p class="contact-label">you can contact me at</p>
                        <a href="mailto:me@niyam.co.uk" class="contact-email">me@niyam.co.uk</a>
                    </div>
                </main>
            </div>
        </div>

        <footer>
            <p>all rights reserved, copyright, ns31</p>
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
        setTimeout(() => updateMusicPage(), 100);
    }
    if (path === '/photo-film') page = 'photo-film';
    if (path === '/personal') page = 'personal';
    if (path === '/contact') page = 'contact';
    
    app.innerHTML = pages[page];
    updateNavigation(page);
}

// update navigation active state
function updateNavigation(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const pathMap = { home: '/', music: '/music', 'photo-film': '/photo-film', personal: '/personal', contact: '/contact' };
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