// Function to initialize the slider
function initializeSlider() {
    const slider = document.querySelector('.project-slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const handle = slider.querySelector('.slider-handle');
    const cards = slider.querySelector('.project-cards');
    
    if (!track || !handle || !cards) return;

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    // Touch events
    cards.addEventListener('touchstart', touchStart);
    cards.addEventListener('touchmove', touchMove);
    cards.addEventListener('touchend', touchEnd);

    // Mouse events
    cards.addEventListener('mousedown', touchStart);
    cards.addEventListener('mousemove', touchMove);
    cards.addEventListener('mouseup', touchEnd);
    cards.addEventListener('mouseleave', touchEnd);

    // Prevent context menu on long press
    cards.addEventListener('contextmenu', e => e.preventDefault());

    function touchStart(e) {
        isDragging = true;
        startPos = getPositionX(e);
        animationID = requestAnimationFrame(animation);
        cards.classList.add('grabbing');
    }

    function touchMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        cards.classList.remove('grabbing');
        
        // Snap to nearest card
        const cardWidth = cards.querySelector('.project-card').offsetWidth;
        const gap = 32; // 2rem gap
        const totalWidth = cardWidth + gap;
        
        const snapPoint = Math.round(currentTranslate / totalWidth) * totalWidth;
        currentTranslate = snapPoint;
        prevTranslate = currentTranslate;
        
        setSliderPosition();
    }

    function animation() {
        if (isDragging) {
            setSliderPosition();
            requestAnimationFrame(animation);
        }
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function setSliderPosition() {
        cards.style.transform = `translateX(${currentTranslate}px)`;
        
        // Update handle position
        const maxScroll = cards.scrollWidth - cards.clientWidth;
        if (maxScroll > 0) {
            const scrollPercentage = Math.max(0, Math.min(100, (currentTranslate / maxScroll) * 100));
            handle.style.left = `${scrollPercentage}%`;
        } else {
            handle.style.left = '0%';
        }
    }

    // Handle click on track
    track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const maxScroll = cards.scrollWidth - cards.clientWidth;
        currentTranslate = -maxScroll * percentage;
        prevTranslate = currentTranslate;
        setSliderPosition();
    });
    
    // Initialize slider position
    setSliderPosition();
}

// Export the initialization function
export { initializeSlider }; 