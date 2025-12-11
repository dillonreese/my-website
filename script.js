// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeAnimations();
    initializeSocialCards();
    initializeScrollEffects();
    initializeThemeDetection();
    initializeScrollAnimations();
    initializeTypewriterAnimations();
});

// Initialize smooth animations and interactions
function initializeAnimations() {
    // Add staggered text animation effect
    const textElements = document.querySelectorAll('.text-animation h1, .text-animation p');
    
    textElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add typewriter effect for the name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const text = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                nameElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove the cursor after typing is complete
                setTimeout(() => {
                    nameElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing after the initial animation
        setTimeout(typeWriter, 500);
    }
}

// Initialize typewriter animations for all text elements
function initializeTypewriterAnimations() {
    const typewriterElements = document.querySelectorAll('.typewriter-text');
    
    typewriterElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        element.style.whiteSpace = 'nowrap';
        element.style.overflow = 'hidden';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Faster typing for better flow
            } else {
                // Remove the cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.whiteSpace = 'normal'; // Allow text to wrap after typing
                }, 500);
            }
        };
        
        // Stagger the start times for different elements
        // "Hello, I'm" starts first, then name, then description, then about section
        let startDelay;
        if (element.classList.contains('greeting')) {
            startDelay = 500; // Start immediately after page load
        } else if (element.classList.contains('name')) {
            startDelay = 1500; // Start after "Hello, I'm" finishes
        } else if (element.classList.contains('hero-description')) {
            startDelay = 2500; // Start after name finishes
        } else {
            startDelay = 3500 + (index * 1000); // About section and beyond
        }
        
        setTimeout(typeWriter, startDelay);
    });
}

// Initialize social card interactions
function initializeSocialCards() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        // Add click tracking
        card.addEventListener('click', function(e) {
            const platform = this.classList.contains('github') ? 'GitHub' : 'LinkedIn';
            console.log(`Clicked ${platform} link`);
            
            // Optional: Add a small delay for visual feedback
            setTimeout(() => {
                // Link will open in new tab as specified in HTML
            }, 150);
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Parallax effect for background shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.section-header, .highlight-item, .social-card');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Initialize theme detection and switching
function initializeThemeDetection() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark-mode');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark-mode');
            } else {
                document.documentElement.classList.remove('dark-mode');
            }
        }
    });
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 20; // Small offset for better positioning
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close any open modals or focus management
    if (e.key === 'Escape') {
        // Reset any focused elements
        document.activeElement.blur();
    }
    
    // Arrow key navigation for sections
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else {
                nextIndex = Math.max(currentIndex - 1, 0);
            }
            
            const nextSection = sections[nextIndex];
            const offsetTop = nextSection.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Add performance monitoring
window.addEventListener('load', function() {
    // Log page load performance
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }

    // Show page after all resources loaded to prevent FOUC
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
});

// Add error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
        console.warn('Failed to load external resource:', e.target.src || e.target.href);
    }
});

// Add viewport change handling for responsive design
// Note: Removed forced reflow code that was causing animations to restart on resize

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific interactions
    const touchElements = document.querySelectorAll('.social-card, .btn');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Add accessibility improvements
function improveAccessibility() {
    // Add ARIA labels where needed
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        const platform = card.classList.contains('github') ? 'GitHub' : 'LinkedIn';
        card.setAttribute('aria-label', `Visit my ${platform} profile`);
    });
    
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add focus indicators for better accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility improvements
improveAccessibility();

// Add console welcome message
console.log(`
%c👋 Welcome to Dillon Reese's Professional Portfolio!
%c
%cBuilt with HTML, CSS, and JavaScript
%cFeaturing comprehensive typewriter animations throughout
`, 
'color: #6366f1; font-size: 16px; font-weight: bold;',
'',
'color: #64748b; font-size: 12px;',
'color: #64748b; font-size: 12px;'
);
