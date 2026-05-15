// 滚动淡入效果 - IntersectionObserver
(function () {
    const selectors = '.post-entry, .first-entry, .post-content > *';
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    elements.forEach(function (el) {
        el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '-50px' }
    );

    elements.forEach(function (el) {
        observer.observe(el);
    });
})();
