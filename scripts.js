

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
    window.observeFadeEls = function() {
        const fadeEls = document.querySelectorAll(
            ".split-section, .product-card, .shop-intro, .contact-intro, .info-card, .etsy-banner"
        );
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove("fade-in-hidden");
                        entry.target.classList.add("fade-in-visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            fadeEls.forEach(el => {
                if (!el.classList.contains("fade-in-hidden")) {
                    el.classList.add("fade-in-hidden");
                }
                observer.observe(el);
            });
        }
    };
    window.observeFadeEls();

    // ── 4. Scroll-to-top button ────────────────────────────────
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

    // Click-to-enlarge for product images with product details.
    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close enlarged image">×</button>
        <div class="lightbox-content">
            <div class="lightbox-image-container">
                <img src="" alt="Enlarged product image">
            </div>
            <div class="lightbox-info">
                <h2 class="lightbox-title"></h2>
                <p class="lightbox-desc"></p>
                <div class="lightbox-footer">
                    <span class="lightbox-price"></span>
                    <a href="#" class="lightbox-btn" target="_blank" rel="noopener noreferrer">Buy via PayPal</a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");
    const lightboxTitle = lightbox.querySelector(".lightbox-title");
    const lightboxDesc = lightbox.querySelector(".lightbox-desc");
    const lightboxPrice = lightbox.querySelector(".lightbox-price");
    const lightboxBtn = lightbox.querySelector(".lightbox-btn");

    function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        if (lightboxImg) lightboxImg.src = "";
    }

    document.addEventListener("click", (event) => {
        const clickedImage = event.target.closest(".product-image img");
        if (clickedImage) {
            const productCard = clickedImage.closest(".product-card");
            if (productCard) {
                // Get product details
                const productName = productCard.querySelector(".product-name")?.textContent || "";
                const productDesc = productCard.querySelector(".product-desc")?.textContent || "";
                const productPrice = productCard.querySelector(".product-price")?.textContent || "";
                const productLink = productCard.querySelector(".product-btn")?.getAttribute("href") || "#";

                // Populate lightbox
                if (lightboxImg) {
                    lightboxImg.src = clickedImage.currentSrc || clickedImage.src;
                    lightboxImg.alt = clickedImage.alt || "Enlarged product image";
                }
                if (lightboxTitle) lightboxTitle.textContent = productName;
                if (lightboxDesc) lightboxDesc.textContent = productDesc;
                if (lightboxPrice) lightboxPrice.textContent = productPrice;
                if (lightboxBtn) lightboxBtn.setAttribute("href", productLink);
            }
            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            return;
        }

        const clickedClose = event.target.closest(".lightbox-close");
        if (clickedClose || event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("open")) {
            closeLightbox();
        }
    });

});

