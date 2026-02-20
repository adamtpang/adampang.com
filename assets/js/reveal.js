// Scroll-reveal animations — Framer Motion feel, zero dependencies
// Uses Intersection Observer for performant scroll-triggered animations
(function () {
    // Don't run if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Elements to animate: anything with data-reveal attribute
    // Or auto-detect common elements on the page
    function init() {
        var targets = document.querySelectorAll(
            '.content-box, .nav-card, .ext-link, .project-card, ' +
            '.chamorro-card, .heroes-section, .more-link, .music-player, ' +
            '.design-section, .type-specimen, ' +
            '.voice-card, .color-swatch, .asset-pill, .essay-item, ' +
            '.hero-section, .game-card, .games-section, ' +
            '.games-note, .identity, .header-right, .tldr, [data-reveal]'
        );

        if (!targets.length) return;

        // Set initial state
        for (var i = 0; i < targets.length; i++) {
            targets[i].style.opacity = '0';
            targets[i].style.transform = 'translateY(20px)';
            targets[i].style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            // Stagger delay based on position in view
            targets[i].setAttribute('data-reveal-index', i);
        }

        var observer = new IntersectionObserver(function (entries) {
            // Collect all newly visible entries, sort by DOM position
            var visible = [];
            for (var j = 0; j < entries.length; j++) {
                if (entries[j].isIntersecting) {
                    visible.push(entries[j]);
                }
            }

            // Stagger reveal within each batch
            for (var k = 0; k < visible.length; k++) {
                (function (entry, delay) {
                    setTimeout(function () {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                })(visible[k], k * 60);

                observer.unobserve(visible[k].target);
            }
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        for (var m = 0; m < targets.length; m++) {
            observer.observe(targets[m]);
        }
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // Small delay to let initial page render complete
        setTimeout(init, 50);
    }
})();
