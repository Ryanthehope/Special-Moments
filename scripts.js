document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Auto-update copyright year ──────────────────────────
    const copyright = document.getElementById("copyright");
    if (copyright) {
        copyright.textContent = `\u00a9 ${new Date().getFullYear()} Head-start Web Development. All rights reserved.`;
    }

    // ── 2. Active nav link based on current page ───────────────
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
        const linkPage = link.getAttribute("href");
        link.classList.remove("active");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    // ── 3. Scroll fade-in for sections and cards ───────────────
    const fadeEls = document.querySelectorAll(
        ".split-section, .product-card, .intro-section, .shop-intro, .contact-intro, .contact-form-wrapper, .info-card, .etsy-banner"
    );
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        fadeEls.forEach(el => {
            el.classList.add("fade-in-hidden");
            observer.observe(el);
        });
    }

    // ── 4. Contact form validation ─────────────────────────────
    const form = document.querySelector(".contact-form");
    if (form) {
        form.setAttribute("novalidate", "");

        const showError = (input, msg) => {
            clearError(input);
            input.classList.add("input-error");
            const err = document.createElement("span");
            err.className = "field-error";
            err.textContent = msg;
            input.parentNode.appendChild(err);
        };

        const clearError = (input) => {
            input.classList.remove("input-error");
            const existing = input.parentNode.querySelector(".field-error");
            if (existing) existing.remove();
        };

        form.querySelectorAll("input, textarea, select").forEach(field => {
            field.addEventListener("input", () => clearError(field));
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valid = true;

            const name = form.querySelector("#name");
            const email = form.querySelector("#email");
            const message = form.querySelector("#message");

            if (!name.value.trim()) {
                showError(name, "Please enter your name.");
                valid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, "Please enter your email address.");
                valid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                showError(email, "Please enter a valid email address.");
                valid = false;
            }

            if (!message.value.trim()) {
                showError(message, "Please enter a message.");
                valid = false;
            }

            if (valid) {
                const btn = form.querySelector(".contact-btn");
                btn.textContent = "Message Sent!";
                btn.disabled = true;
                btn.style.backgroundColor = "#4caf50";
                form.reset();
            }
        });
    }

    // ── 5. Scroll-to-top button ────────────────────────────────
    const scrollBtn = document.createElement("button");
    scrollBtn.className = "scroll-top-btn";
    scrollBtn.setAttribute("aria-label", "Scroll to top");
    scrollBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="18 15 12 9 6 15"/></svg>`;
    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", () => {
        scrollBtn.classList.toggle("visible", window.scrollY > 400);
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ── Smooth scroll for anchor links ─────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#") {
                e.preventDefault();
            } else if (document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

});
