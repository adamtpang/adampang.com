// Context-aware cursor system
// Only active on devices with a fine pointer (mouse/trackpad)
(function () {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.innerHTML = '<div class="cursor-dot"></div>';
    document.body.appendChild(cursor);

    let cursorX = 0, cursorY = 0;
    let raf;

    function updateCursor() {
        cursor.style.transform = 'translate(' + cursorX + 'px, ' + cursorY + 'px)';
        raf = null;
    }

    document.addEventListener('mousemove', function (e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        if (!raf) {
            raf = requestAnimationFrame(updateCursor);
        }
    });

    // Context detection
    document.addEventListener('mouseover', function (e) {
        var target = e.target;
        cursor.className = 'custom-cursor';

        if (target.closest('a, button, [role="button"], .link, .theme-toggle, .play-button, .mode-btn')) {
            cursor.classList.add('custom-cursor--link');
        } else if (target.closest('.music-player, .progress-bar, audio')) {
            cursor.classList.add('custom-cursor--music');
        } else if (target.closest('img, picture, .hero-image')) {
            cursor.classList.add('custom-cursor--zoom');
        } else if (target.closest('input, textarea, [contenteditable]')) {
            cursor.classList.add('custom-cursor--text');
        }
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
        cursor.style.opacity = '1';
    });

    // Click feedback
    document.addEventListener('mousedown', function () {
        cursor.classList.add('custom-cursor--click');
    });
    document.addEventListener('mouseup', function () {
        cursor.classList.remove('custom-cursor--click');
    });
})();
