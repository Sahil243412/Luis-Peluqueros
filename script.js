document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Navbar scroll
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        // Active link
        const y = window.scrollY + 150;
        sections.forEach(s => {
            const id = s.getAttribute('id');
            if (!id) return;
            if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
            }
        });
    }, { passive: true });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    navLinks.forEach(l => l.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // Scroll animations
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.anim').forEach(el => obs.observe(el));

    // Hero particles
    const pc = document.getElementById('hero-particles');
    if (pc) {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.classList.add('hero-particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.top = 60 + Math.random() * 40 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = 6 + Math.random() * 6 + 's';
            const sz = 2 + Math.random() * 4 + 'px';
            p.style.width = sz; p.style.height = sz;
            pc.appendChild(p);
        }
    }

    // Lightbox
    const gis = document.querySelectorAll('.gi');
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbCap = document.getElementById('lb-caption');
    let idx = 0;
    const data = [];
    gis.forEach((g, i) => {
        const img = g.querySelector('img');
        const sp = g.querySelector('.gi-ov span');
        data.push({ src: img.src.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=900'), alt: img.alt, cap: sp ? sp.textContent : img.alt });
        g.addEventListener('click', () => { idx = i; openLB(); });
    });
    function openLB() { lbImg.src = data[idx].src; lbImg.alt = data[idx].alt; lbCap.textContent = data[idx].cap; lb.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeLB() { lb.classList.remove('active'); document.body.style.overflow = ''; }
    function navLB(d) {
        idx = (idx + d + data.length) % data.length;
        lbImg.style.opacity = 0;
        setTimeout(() => { lbImg.src = data[idx].src; lbImg.alt = data[idx].alt; lbCap.textContent = data[idx].cap; lbImg.style.opacity = 1; }, 200);
    }
    document.getElementById('lb-close').addEventListener('click', closeLB);
    document.getElementById('lb-prev').addEventListener('click', () => navLB(-1));
    document.getElementById('lb-next').addEventListener('click', () => navLB(1));
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') closeLB();
        if (e.key === 'ArrowLeft') navLB(-1);
        if (e.key === 'ArrowRight') navLB(1);
    });

    // Contact form
    const form = document.getElementById('contact-form');
    const fOk = document.getElementById('form-ok');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        btn.disabled = true; btn.querySelector('span').textContent = 'Sending...';
        setTimeout(() => {
            fOk.classList.add('visible'); form.reset();
            btn.disabled = false; btn.querySelector('span').textContent = 'Send Message';
            setTimeout(() => fOk.classList.remove('visible'), 5000);
        }, 1200);
    });
});
