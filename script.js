/**
 * Interactive UI behaviors for NovaBook Pro
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Interface Observer - For Fade In elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it becomes visible for one-time animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => fadeInObserver.observe(el));


    // 2. Advanced Cursor Parallax Effect for the Hero Image
    const heroSection = document.querySelector('.hero');
    const laptopImg = document.getElementById('laptop-img');

    if(heroSection && laptopImg) {
        // Only bind heavy mouse events on larger screens where UX allows it
        const isDesktop = () => window.innerWidth > 900;

        heroSection.addEventListener('mousemove', (e) => {
            if(!isDesktop()) return;

            // Calculate mouse position relative to center of screen
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            
            // Map the mouse delta to CSS 3D Rotations
            // Combining the default base rotation (-10deg Y, 5deg X) with dynamic mouse angles
            laptopImg.style.transform = `scale(1.1) rotateY(${-10 + xAxis}deg) rotateX(${5 + yAxis}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            if(!isDesktop()) return;
            // Snap back to original position with a smooth transition
            laptopImg.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            laptopImg.style.transform = `scale(1.1) rotateY(-10deg) rotateX(5deg)`;
        });
        
        heroSection.addEventListener('mouseenter', () => {
            if(!isDesktop()) return;
            // Make the movement snappy while tracking mouse
            laptopImg.style.transition = 'transform 0.1s ease-out';
        });
    }

    // 3. 3D Tilt Effect for Glassmorphic Feature Cards
    const cards = document.querySelectorAll('.tilt');

    cards.forEach(card => {
        // Add dynamic highlight element
        const highlight = document.createElement('div');
        highlight.style.position = 'absolute';
        highlight.style.top = '0';
        highlight.style.left = '0';
        highlight.style.width = '100%';
        highlight.style.height = '100%';
        highlight.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 50%)';
        highlight.style.opacity = '0';
        highlight.style.pointerEvents = 'none';
        highlight.style.transition = 'opacity 0.3s ease';
        highlight.style.zIndex = '0';
        highlight.style.borderRadius = '24px'; // Matches card border radius
        
        card.appendChild(highlight);
        
        // Ensure child elements inside card stay above highlight
        Array.from(card.children).forEach(child => {
            if (child !== highlight) {
                child.style.position = 'relative';
                child.style.zIndex = '2';
            }
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Coordinates relative to card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Center points
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation offsets
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg vertical tilt
            const rotateY = ((x - centerX) / centerX) * 10;  // Max 10 deg horizontal tilt
            
            // Apply 3D transforms
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Move the highlight gradient to follow the cursor for that extra premium touch
            highlight.style.opacity = '1';
            highlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.15), transparent 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            highlight.style.opacity = '0';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    });
});
