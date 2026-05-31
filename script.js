// =====================================================
        // PRELOADER
        // =====================================================
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.classList.remove('loading');
                
                // Trigger hero animations after preloader
                animateHeroStats();
            }, 2000);
        });
        
        // =====================================================
        // CUSTOM CURSOR
        // =====================================================
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursorDot');
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        // Cursor hover effect
        const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .skill-category, .tech-icon');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
        
        // =====================================================
        // THEME TOGGLE
        // =====================================================
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
        
        // =====================================================
        // MOBILE MENU TOGGLE
        // =====================================================
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // =====================================================
        // NAVBAR SCROLL EFFECT
        // =====================================================
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
        
        // =====================================================
        // ACTIVE NAV LINK ON SCROLL
        // =====================================================
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // =====================================================
        // HERO STATS COUNTER ANIMATION
        // =====================================================
        function animateHeroStats() {
            const statNumbers = document.querySelectorAll('.hero-stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        stat.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }
        
        // =====================================================
        // PARTICLES ANIMATION
        // =====================================================
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 10 + 's';
                particle.style.animationDuration = (10 + Math.random() * 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        
        createParticles();
        
        // =====================================================
        // SCROLL REVEAL ANIMATIONS
        // =====================================================
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
        
        // =====================================================
        // SKILL PROGRESS BARS
        // =====================================================
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const percentage = progress.style.getPropertyValue('--progress');
                    progress.style.transform = `scaleX(${parseFloat(percentage) / 100})`;
                    progress.classList.add('animate');
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => skillObserver.observe(bar));
        
        // =====================================================
        // PORTFOLIO FILTER
        // =====================================================
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // =====================================================
        // 3D TILT EFFECT ON HERO VISUAL
        // =====================================================
        const hero3DContainer = document.querySelector('.hero-3d-container');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual && hero3DContainer) {
            heroVisual.addEventListener('mousemove', (e) => {
                const rect = heroVisual.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                hero3DContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            heroVisual.addEventListener('mouseleave', () => {
                hero3DContainer.style.transform = '';
            });
        }
        
        // =====================================================
        // ABOUT IMAGE 3D TILT
        // =====================================================
        const aboutImageWrapper = document.querySelector('.about-image-wrapper');
        const aboutVisual = document.querySelector('.about-visual');
        
        if (aboutVisual && aboutImageWrapper) {
            aboutVisual.addEventListener('mousemove', (e) => {
                const rect = aboutVisual.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                aboutImageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            aboutVisual.addEventListener('mouseleave', () => {
                aboutImageWrapper.style.transform = '';
            });
        }
        
        // =====================================================
        // BACK TO TOP BUTTON
        // =====================================================
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // =====================================================
        // FORM SUBMISSION
        // =====================================================
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message (you can customize this)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
        
        // =====================================================
        // SMOOTH SCROLL FOR ANCHOR LINKS
        // =====================================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // =====================================================
        // TESTIMONIALS PAUSE ON HOVER
        // =====================================================
        const testimonialsTrack = document.querySelector('.testimonials-track');
        
        if (testimonialsTrack) {
            testimonialsTrack.addEventListener('mouseenter', () => {
                testimonialsTrack.style.animationPlayState = 'paused';
            });
            
            testimonialsTrack.addEventListener('mouseleave', () => {
                testimonialsTrack.style.animationPlayState = 'running';
            });
        }
        
        // =====================================================
        // KEYBOARD NAVIGATION
        // =====================================================
        document.addEventListener('keydown', (e) => {
            // ESC to close mobile menu
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // =====================================================
        // LAZY LOADING FOR PERFORMANCE
        // =====================================================
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // =====================================================
        // ADD CSS ANIMATION FOR FADE IN
        // =====================================================
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // =====================================================
        // CONSOLE WELCOME MESSAGE
        // =====================================================
        console.log('%c Welcome to my Portfolio! 🚀', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
        console.log('%c Built with ❤️ using HTML, CSS & JavaScript', 'color: #a78bfa; font-size: 14px;');