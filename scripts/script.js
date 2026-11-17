const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
navMenu.id = 'primary-menu';

function closeNavigation() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    navMenu.classList.remove('active');
}

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.classList.toggle('active', !isOpen);
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navMenu.classList.toggle('active', !isOpen);
});

let activeDropdown = null;
let activeTrigger = null;

function positionActiveDropdown() {
    if (!activeDropdown || !activeTrigger) return;

    if (!window.matchMedia('(max-width: 480px)').matches) {
        activeDropdown.style.position = '';
        activeDropdown.style.top = '';
        activeDropdown.style.left = '';
        activeDropdown.style.removeProperty('--dropdown-x');
        return;
    }

    const triggerRect = activeTrigger.getBoundingClientRect();
    const dropdownRect = activeDropdown.getBoundingClientRect();
    const wrapper = activeTrigger.closest('.social-btn-wrapper');
    const wrapperRect = wrapper.getBoundingClientRect();
    const gutter = 8;
    const centeredLeft = triggerRect.left + ((triggerRect.width - dropdownRect.width) / 2);
    const left = Math.max(gutter, Math.min(centeredLeft, window.innerWidth - dropdownRect.width - gutter));

    activeDropdown.style.position = 'absolute';
    activeDropdown.style.top = `${triggerRect.bottom - wrapperRect.top + 10}px`;
    activeDropdown.style.left = `${left - wrapperRect.left}px`;
    activeDropdown.style.setProperty('--dropdown-x', '0');
}

function closeDropdowns() {
    document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
        menu.classList.remove('active');
        menu.style.position = '';
        menu.style.top = '';
        menu.style.left = '';
        menu.style.removeProperty('--dropdown-x');
    });
    document.querySelectorAll('[data-multi]').forEach(button => button.setAttribute('aria-expanded', 'false'));
    activeDropdown = null;
    activeTrigger = null;
}

document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-multi]');
    if (trigger) {
        const dropdown = document.getElementById(`${trigger.dataset.multi}-dropdown`);
        if (!dropdown) return;

        if (activeDropdown === dropdown) {
            closeDropdowns();
        } else {
            closeDropdowns();
            activeDropdown = dropdown;
            activeTrigger = trigger;
            positionActiveDropdown();
            dropdown.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
        }
        return;
    }

    if (!event.target.closest('.dropdown-menu')) closeDropdowns();
});

window.addEventListener('resize', positionActiveDropdown);
window.addEventListener('scroll', positionActiveDropdown, { passive: true });

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeDropdowns();
        closeNavigation();
    }
});

const pages = {
    home: `
        <div class="hero-section home-page">
            <div class="container">
                <header class="header">
                    <div class="profile">
                        <img class="avatar" src="/images/profile.jpg" alt="niyam shah">
                        <h1>niyam</h1>
                        <p class="alias">(333ns)</p>
                        <p class="tagline">musician • photo/videographer • content creator</p>
                    </div>
                </header>
                <section class="social-links" aria-label="Social links">
                    <div class="social-btn-wrapper">
                        <button class="social-btn instagram" type="button" data-multi="instagram" aria-expanded="false" aria-controls="instagram-dropdown"><i class="fab fa-instagram" aria-hidden="true"></i><span>instagram</span></button>
                        <div class="dropdown-menu" id="instagram-dropdown" aria-label="Instagram accounts"><a href="https://instagram.com/niyam.sh" target="_blank" rel="noopener noreferrer">@niyam.sh</a><a href="https://instagram.com/333ns.mp3" target="_blank" rel="noopener noreferrer">@333ns.mp3</a></div>
                    </div>
                    <div class="social-btn-wrapper">
                        <button class="social-btn tiktok" type="button" data-multi="tiktok" aria-expanded="false" aria-controls="tiktok-dropdown"><i class="fab fa-tiktok" aria-hidden="true"></i><span>tiktok</span></button>
                        <div class="dropdown-menu" id="tiktok-dropdown" aria-label="TikTok accounts"><a href="https://tiktok.com/@niyams_" target="_blank" rel="noopener noreferrer">@niyams_</a><a href="https://tiktok.com/@333ns.mp3" target="_blank" rel="noopener noreferrer">@333ns.mp3</a></div>
                    </div>
                    <div class="social-btn-wrapper">
                        <button class="social-btn youtube" type="button" data-multi="youtube" aria-expanded="false" aria-controls="youtube-dropdown"><i class="fab fa-youtube" aria-hidden="true"></i><span>youtube</span></button>
                        <div class="dropdown-menu" id="youtube-dropdown" aria-label="YouTube accounts"><a href="https://youtube.com/@333ns.mp3" target="_blank" rel="noopener noreferrer">@333ns.mp3</a><a href="https://youtube.com/@ns31" target="_blank" rel="noopener noreferrer">@ns31</a></div>
                    </div>
                    <a href="https://open.spotify.com/artist/3hgYUhIuB2EH5oM3mEMQBV" target="_blank" rel="noopener noreferrer" class="social-btn spotify"><i class="fab fa-spotify" aria-hidden="true"></i><span>spotify</span></a>
                    <div class="social-btn-wrapper">
                        <button class="social-btn soundcloud" type="button" data-multi="soundcloud" aria-expanded="false" aria-controls="soundcloud-dropdown"><i class="fab fa-soundcloud" aria-hidden="true"></i><span>soundcloud</span></button>
                        <div class="dropdown-menu" id="soundcloud-dropdown" aria-label="SoundCloud accounts"><a href="https://soundcloud.com/333ns" target="_blank" rel="noopener noreferrer">ns (333ns)</a><a href="https://soundcloud.com/prodns31" target="_blank" rel="noopener noreferrer">ns31</a></div>
                    </div>
                    <a href="https://github.com/NS0731" target="_blank" rel="noopener noreferrer" class="social-btn github"><i class="fab fa-github" aria-hidden="true"></i><span>github</span></a>
                </section>
            </div>
        </div>
        <footer class="home-footer"><p>all rights reserved, © niyam shah</p></footer>
    `,
    about: `
        <div class="page-section about-page"><div class="container">
            <header class="page-header"><h1>about me</h1></header>
            <section class="about-section"><div class="about-container content-surface">
                <p>i'm a student with a passion for all things creative. with expertise in music production, photo/videography, and content creation, i bring ideas to life through my creativity and passion.</p>
                <div class="skills"><div class="skill-tag">music production</div><div class="skill-tag">photography</div><div class="skill-tag">videography</div><div class="skill-tag">content creation</div><div class="skill-tag">sound engineering</div><div class="skill-tag">fashion</div></div>
            </div></section>
        </div></div>
        <footer><p>all rights reserved, © niyam shah</p></footer>
    `,
    music: `
        <div class="page-section"><div class="container">
            <header class="page-header"><h1>my music</h1><p>listen to my music on spotify</p></header>
            <div class="spotify-embed"><iframe src="https://open.spotify.com/embed/artist/3hgYUhIuB2EH5oM3mEMQBV" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="niyam shah on Spotify"></iframe></div>
        </div></div>
        <footer><p>all rights reserved, © niyam shah</p></footer>
    `,
    contact: `
        <div class="page-section contact-page"><div class="container">
            <header class="page-header"><h1>contact me</h1><p>say hi!</p></header>
            <div class="contact-card content-surface"><p class="contact-label">for music related inquiries</p><a href="mailto:music@niyam.co.uk" class="contact-email">music@niyam.co.uk</a><p class="contact-label">for all other inquiries</p><a href="mailto:me@niyam.co.uk" class="contact-email">me@niyam.co.uk</a></div>
        </div></div>
        <footer><p>all rights reserved, © niyam shah</p></footer>
    `
};

const pageTitles = {
    home: "niyam's website",
    about: 'niyam - about me',
    music: 'niyam - music',
    contact: 'niyam - contact me'
};

function currentPage() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    return { '/': 'home', '/about': 'about', '/music': 'music', '/contact': 'contact' }[path] || 'home';
}

function updateNavigation(page) {
    const pathMap = { home: '/', music: '/music', about: '/about', contact: '/contact' };
    document.querySelectorAll('.nav-link').forEach(link => {
        const active = link.getAttribute('href') === pathMap[page];
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}

function router() {
    const page = currentPage();
    const app = document.getElementById('app');
    app.classList.toggle('home-app', page === 'home');
    app.innerHTML = pages[page];
    document.title = pageTitles[page];
    updateNavigation(page);
    closeNavigation();
    closeDropdowns();
}

document.addEventListener('click', event => {
    const link = event.target.closest('.nav-link');
    if (!link) return;
    event.preventDefault();
    window.history.pushState({}, '', link.getAttribute('href'));
    router();
});

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);
