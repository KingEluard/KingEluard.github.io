// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.section-title, .about-text, .timeline-item, .experience-card, .skill-category, .project-card');
animateElements.forEach(el => {
    observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Skills hover effects
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
    });
});

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const pauseTime = 2000;
    
    let currentText = '';
    let currentIndex = 0;
    let isTyping = true;
    
    function measureAndSetWidth() {
        // Get the computed styles for current screen size
        const computedStyle = window.getComputedStyle(heroSubtitle);
        
        // Create a hidden element to measure the full width
        const measureElement = document.createElement('span');
        measureElement.textContent = originalText;
        measureElement.style.cssText = `
            position: absolute;
            visibility: hidden;
            white-space: nowrap;
            font-size: ${computedStyle.fontSize};
            font-weight: ${computedStyle.fontWeight};
            font-family: ${computedStyle.fontFamily};
        `;
        document.body.appendChild(measureElement);
        
        // Set the width based on the full text at current screen size
        const fullWidth = measureElement.offsetWidth;
        heroSubtitle.style.width = fullWidth + 'px';
        heroSubtitle.style.textAlign = 'left';
        
        // Remove the measuring element
        document.body.removeChild(measureElement);
    }
    
    function typeText() {
        if (isTyping) {
            if (currentIndex < originalText.length) {
                currentText += originalText[currentIndex];
                heroSubtitle.innerHTML = currentText + '<span class="typing-cursor">|</span>';
                currentIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                setTimeout(() => {
                    isTyping = false;
                    typeText();
                }, pauseTime);
            }
        } else {
            if (currentIndex > 0) {
                currentText = originalText.substring(0, currentIndex - 1);
                heroSubtitle.innerHTML = currentText + '<span class="typing-cursor">|</span>';
                currentIndex--;
                setTimeout(typeText, erasingSpeed);
            } else {
                isTyping = true;
                setTimeout(typeText, typingSpeed);
            }
        }
    }
    
    // Initial width measurement
    measureAndSetWidth();
    
    // Recalculate width on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            measureAndSetWidth();
        }, 150);
    });
    
    // Start typing effect after page load
    setTimeout(typeText, 1000);
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effects for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    // Skip to main content on Tab
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        e.preventDefault();
        document.querySelector('main').focus();
    }
});

// Enhanced mobile menu animation
const bars = document.querySelectorAll('.bar');
navToggle.addEventListener('click', () => {
    bars.forEach((bar, index) => {
        bar.style.transform = navMenu.classList.contains('active') ? 
            `rotate(${index === 0 ? 45 : index === 1 ? 0 : -45}deg) translate(${index === 0 ? '6px, 6px' : index === 1 ? '0, 0' : '6px, -6px'})` :
            'none';
        bar.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer-left p');
if (yearElement) {
    yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
}

// Experience Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card[data-modal]');
    const modals = document.querySelectorAll('.experience-modal');
    const body = document.body;

    // Function to open modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            modal.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent body scroll
        }
    }

    // Function to close modal
    function closeModal(modal) {
        modal.classList.remove('active');
        body.style.overflow = ''; // Restore body scroll
    }

    // Add click listeners to experience cards
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Add click listeners to close buttons and overlays
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const modalContent = modal.querySelector('.modal-content');

        // Close button
        closeBtn.addEventListener('click', function() {
            closeModal(modal);
        });

        // Overlay click
        overlay.addEventListener('click', function() {
            closeModal(modal);
        });

        // Prevent modal from closing when clicking inside the content
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.experience-modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});

console.log('E-Portfolio loaded successfully!');