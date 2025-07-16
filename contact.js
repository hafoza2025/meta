// ===== Current language variable =====
let currentLang = 'en'; // English is now the default

// ===== Language switching function =====
function switchLanguage(event, lang) {
    currentLang = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Update page direction and language
    document.body.className = lang === 'ar' ? 'rtl' : '';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all translatable elements
    document.querySelectorAll('[data-en][data-ar]').forEach(element => {
        element.textContent = element.getAttribute('data-' + lang);
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]').forEach(element => {
        element.placeholder = element.getAttribute('data-placeholder-' + lang);
    });

    // Update meta tags
    updateMetaTags(lang);

    // Save language preference
    saveLanguagePreference(lang);
}

// ===== Update meta tags function =====
function updateMetaTags(lang) {
    const titles = {
        en: 'Contact Us | Meta Software - Arab World',
        ar: 'تواصل معنا | Meta Software - الوطن العربي'
    };
    const descriptions = {
        en: 'Contact Meta Software for complete software development services across the Arab world. We are your comprehensive technology partner from Egypt to Saudi Arabia, UAE, Kuwait and Qatar.',
        ar: 'تواصل مع شركة Meta Software للحصول على خدمات البرمجة المتكاملة في الوطن العربي. نحن شريكك التقني الشامل من مصر إلى السعودية والإمارات والكويت وقطر.'
    };

    document.getElementById('page-title').textContent = titles[lang];
    document.getElementById('meta-description').setAttribute('content', descriptions[lang]);
}

// ===== Intersection Observer for animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = Math.random() * 0.3;
            entry.target.style.animationDelay = `${delay}s`;

            if (entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('fade-in');
            } else if (entry.target.classList.contains('slide-in-left')) {
                entry.target.classList.add('slide-in-left');
            } else if (entry.target.classList.contains('slide-in-right')) {
                entry.target.classList.add('slide-in-right');
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ===== Observe all animated elements =====
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(element => {
    observer.observe(element);
});

// ===== Form submission handling =====
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const submitBtn = this.querySelector('.modern-btn-submit');

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...';
    submitBtn.disabled = true;

    
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // Show status message
    status.hidden = false;

    // Hide status after 5 seconds
    setTimeout(() => {
        status.classList.remove('show');
        setTimeout(() => status.hidden = true, 300);
    }, 5000);
});

// ===== Form validation =====
const formInputs = document.querySelectorAll('.modern-form-control[required]');
formInputs.forEach(input => {
    input.addEventListener('invalid', function (e) {
        e.preventDefault();
        this.style.borderColor = 'var(--danger-red)';

        setTimeout(() => {
            this.style.borderColor = '';
        }, 3000);
    });

    input.addEventListener('input', function () {
        if (this.validity.valid) {
            this.style.borderColor = 'var(--success-green)';
        } else {
            this.style.borderColor = 'var(--danger-red)';
        }
    });
});

// ===== Hide loading spinner =====
window.addEventListener('load', function () {
    setTimeout(function () {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.style.opacity = '0';
            setTimeout(() => {
                spinner.style.display = 'none';
            }, 300);
        }
    }, 500);
});

// ===== Accessibility improvements =====
document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('focus', function () {
        this.style.outline = '2px solid var(--primary-blue)';
        this.style.outlineOffset = '2px';
    });

    el.addEventListener('blur', function () {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// ===== Smooth scrolling for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== Keyboard navigation improvements =====
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
});

// ===== Performance optimization for scroll events =====
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect for background
    document.body.style.setProperty('--scroll-offset', `${rate}px`);

    ticking = false;
}

window.addEventListener('scroll', function () {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// ===== Error handling for missing images =====
document.querySelectorAll('img, [style*="background-image"]').forEach(element => {
    if (element.tagName === 'IMG') {
        element.addEventListener('error', function () {
            this.style.display = 'none';
        });
    }
});

// ===== Progressive enhancement =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            console.log('SW registered: ', registration);
        }).catch(function (registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// ===== Initialize page =====
document.addEventListener('DOMContentLoaded', function () {
    // Set initial language state
    updateMetaTags(currentLang);

    // Add loading classes to elements
    document.querySelectorAll('.contact-card, .contact-form').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // Initialize form placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(element => {
        element.placeholder = element.getAttribute('data-placeholder-' + currentLang);
    });

    // Load language preference
    loadLanguagePreference();
});

// ===== Handle browser back/forward buttons =====
window.addEventListener('popstate', function (event) {
    if (event.state && event.state.lang) {
        const langBtn = document.querySelector(`[onclick*="${event.state.lang}"]`);
        if (langBtn) {
            langBtn.click();
        }
    }
});

// ===== Save language preference =====
function saveLanguagePreference(lang) {
    try {
        localStorage.setItem('preferredLanguage', lang);
        history.pushState({ lang: lang }, '', window.location.href);
    } catch (e) {
        console.log('LocalStorage not available');
    }
}

// ===== Load language preference =====
function loadLanguagePreference() {
    try {
        const saved = localStorage.getItem('preferredLanguage');
        if (saved && (saved === 'en' || saved === 'ar')) {
            const langBtn = document.querySelector(`[onclick*="${saved}"]`);
            if (langBtn && !langBtn.classList.contains('active')) {
                langBtn.click();
            }
        }
    } catch (e) {
        console.log('LocalStorage not available');
    }
}

// ===== Security enhancements =====
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// ===== Additional form security =====
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('input', function (e) {
            if (e.target.type === 'text' || e.target.type === 'email' || e.target.tagName === 'TEXTAREA') {
                const sanitized = sanitizeInput(e.target.value);
                if (sanitized !== e.target.value) {
                    e.target.value = sanitized;
                }
            }
        });
    }
});

// ===== Console security warning =====
console.warn('🚨 Security Warning: This is a browser feature intended for developers. Do not paste any code here that you do not understand.');

// ===== Performance monitoring =====
if ('performance' in window) {
    window.addEventListener('load', function () {
        setTimeout(function () {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }
        }, 0);
    });
}

// ===== Touch and mobile optimizations =====
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    // Improve touch interactions
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.contact-card, .modern-social-icon, .lang-btn').forEach(element => {
            element.addEventListener('touchstart', function () {
                this.classList.add('touch-active');
            });

            element.addEventListener('touchend', function () {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    });
}

// ===== Dark mode detection =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode-preferred');
}

// ===== Reduced motion detection =====
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}

// ===== Network status monitoring =====
window.addEventListener('online', function () {
    console.log('Connection restored');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', function () {
    console.log('Connection lost');
    document.body.classList.add('offline');
});

// ===== Additional utility functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== Enhanced scroll performance =====
const debouncedScrollHandler = debounce(updateScrollEffects, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// ===== Form enhancement =====
document.addEventListener('DOMContentLoaded', function () {
    // Auto-resize textarea
    const textareas = document.querySelectorAll('textarea.modern-form-control');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    // Email validation enhancement
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = 'var(--danger-red)';
                this.setCustomValidity(currentLang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
            } else {
                this.style.borderColor = '';
                this.setCustomValidity('');
            }
        });
    });
});

// ===== Initialize all systems =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ Meta Software Contact Page initialized successfully');
    console.log('🌐 Language system ready');
    console.log('📱 Responsive design active');
    console.log('🎨 Animations loaded');
    console.log('📧 Contact form ready');
    console.log('🔒 Security measures active');
    console.log('⚡ Performance optimizations loaded');
});

// ===== Error handling wrapper =====
window.addEventListener('error', function (e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You can add error reporting here
});
// تفاعل النقاط العربية
document.addEventListener('DOMContentLoaded', function () {
    const arabMarkers = document.querySelectorAll('.arab-marker');

    arabMarkers.forEach(marker => {
        marker.addEventListener('click', function () {
            const country = this.dataset.country;
            const countryName = this.querySelector('.marker-label').textContent;

            // إظهار معلومات الدولة
            showCountryInfo(country, countryName);
        });

        // إضافة تأثير الهوفر
        marker.addEventListener('mouseenter', function () {
            this.style.zIndex = '100';
        });

        marker.addEventListener('mouseleave', function () {
            this.style.zIndex = '10';
        });
    });
});

function showCountryInfo(country, countryName) {
    // يمكنك إضافة المزيد من التفاعل هنا
    console.log(`Clicked on ${countryName} (${country})`);

    // مثال: إظهار نافذة معلومات
    alert(`معلومات عن ${countryName}\nنقطة اتصال نشطة مع Meta Software`);
}
// تبديل اللغة العالمي
function switchGlobalLanguage(lang) {
    const labels = document.querySelectorAll('.label-text, .egypt-text');
    const metaLangBtns = document.querySelectorAll('.meta-lang-btn');
    
    labels.forEach(label => {
        if (label.classList.contains(lang)) {
            label.style.display = 'block';
        } else {
            label.style.display = 'none';
        }
    });
    
    metaLangBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// تفاعل الشبكة العنكبوتية
document.addEventListener('DOMContentLoaded', function() {
    const networkPoints = document.querySelectorAll('.network-point');
    const spiderLines = document.querySelectorAll('.spider-line');
    
    networkPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const country = this.dataset.country;
            const region = this.dataset.region;
            
            // إبراز جميع الخطوط المتصلة بمصر
            if (country === 'egypt') {
                spiderLines.forEach(line => {
                    line.style.opacity = '1';
                    line.style.strokeWidth = '5';
                    line.style.filter = 'drop-shadow(0 0 15px currentColor)';
                });
            } else {
                // إبراز الخطوط المتصلة بهذه النقطة
                spiderLines.forEach(line => {
                    if (line.classList.contains('egypt-global') || 
                        line.classList.contains('egypt-primary')) {
                        line.style.opacity = '1';
                        line.style.strokeWidth = '4';
                    }
                });
            }
            
            // تأثير خاص لمصر
            if (country === 'egypt') {
                this.style.filter = 'drop-shadow(0 0 25px #FF4500)';
            } else {
                this.style.filter = 'drop-shadow(0 0 15px #4A90E2)';
            }
        });
        
        point.addEventListener('mouseleave', function() {
            // إعادة تعيين جميع التأثيرات
            spiderLines.forEach(line => {
                line.style.opacity = '';
                line.style.strokeWidth = '';
                line.style.filter = '';
            });
            
            this.style.filter = '';
        });
    });
});
