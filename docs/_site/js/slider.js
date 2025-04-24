export function initializeSlider() {
    const slider = document.querySelector('.project-cards');
    const handle = document.querySelector('.slider-handle');
    const sliderBar = document.querySelector('.slider-bar');
    
    if (!slider || !handle || !sliderBar) return;

    let isDragging = false;
    let startX;
    let startScrollLeft;

    function updateSliderPosition(scrollPercentage) {
        const boundedPercentage = Math.max(0, Math.min(1, scrollPercentage));
        const trackWidth = sliderBar.offsetWidth - handle.offsetWidth;
        const handlePosition = boundedPercentage * trackWidth;
        handle.style.left = `${handlePosition}px`;
    }

    function handleSliderMove(clientX) {
        if (!isDragging) return;
        
        const rect = sliderBar.getBoundingClientRect();
        const handleWidth = handle.offsetWidth;
        const x = clientX - rect.left - (handleWidth / 2);
        const maxX = rect.width - handleWidth;
        const boundedX = Math.max(0, Math.min(maxX, x));
        
        const scrollPercentage = boundedX / maxX;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        slider.scrollLeft = scrollPercentage * maxScroll;
        
        updateSliderPosition(scrollPercentage);
    }

    // Handle dragging
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        handle.classList.add('active');
        startX = e.clientX - handle.offsetLeft;
        startScrollLeft = slider.scrollLeft;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        handleSliderMove(e.clientX);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        handle.classList.remove('active');
        document.body.style.userSelect = '';
    });

    // Handle slider bar clicks
    sliderBar.addEventListener('click', (e) => {
        if (e.target === handle) return;
        
        const rect = sliderBar.getBoundingClientRect();
        const handleWidth = handle.offsetWidth;
        const x = e.clientX - rect.left - (handleWidth / 2);
        const maxX = rect.width - handleWidth;
        const boundedX = Math.max(0, Math.min(maxX, x));
        
        const scrollPercentage = boundedX / maxX;
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        slider.scrollLeft = scrollPercentage * maxScroll;
        
        updateSliderPosition(scrollPercentage);
    });

    // Update handle position on scroll
    let scrollTimeout;
    slider.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPercentage = slider.scrollLeft / (slider.scrollWidth - slider.clientWidth);
            updateSliderPosition(scrollPercentage);
        }, 10);
    });

    // Handle touch events
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        handle.classList.add('active');
        const touch = e.touches[0];
        startX = touch.clientX - handle.offsetLeft;
        startScrollLeft = slider.scrollLeft;
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        handleSliderMove(e.touches[0].clientX);
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
        handle.classList.remove('active');
    });

    // Initialize slider position
    updateSliderPosition(0);
} 