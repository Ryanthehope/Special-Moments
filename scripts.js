document.addEventListener("DOMContentLoaded", () => {
    // Auto-update copyright year
    const copyright = document.getElementById("copyright");
    if (copyright) {
        copyright.textContent = `© ${new Date().getFullYear()} Head-start Web Development. All rights reserved.`;
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
            } else if (document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
