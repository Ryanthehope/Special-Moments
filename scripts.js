// ── Sanity config ─────────────────────────────────────────
const SANITY_PROJECT_ID = '54015okq';
const SANITY_DATASET    = 'firstone';

function sanityImageUrl(ref) {
    // ref format: image-abc123-1200x800-jpg
    const clean = ref.replace('image-', '');
    const parts = clean.split('-');
    const ext   = parts.pop();
    const dims  = parts.pop();
    const id    = parts.join('-');
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dims}.${ext}`;
}

function buildProductCard(product) {
    const imgUrl = product.image && product.image.asset
        ? sanityImageUrl(product.image.asset._ref)
        : './images/image-26.jpg';
    const price = product.price ? `<span class="product-price">From \u00a3${product.price}</span>` : '';
    return `
    <article class="product-card">
        <div class="product-image">
            <img src="${imgUrl}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-desc">${product.description || ''}</p>
            <div class="product-footer">
                ${price}
                <a href="contact.html" class="product-btn">Enquire</a>
            </div>
        </div>
    </article>`;
}

async function loadSanityProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    try {
        const query = encodeURIComponent('*[_type == "product" && available == true] | order(_createdAt asc) {name, description, price, image}');
        const url   = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${SANITY_DATASET}?query=${query}`;
        const res   = await fetch(url);
        const { result } = await res.json();
        const loader = document.getElementById('shop-loading');
        if (loader) loader.remove();
        if (result && result.length > 0) {
            grid.innerHTML = result.map(buildProductCard).join('');
            if (typeof observeFadeEls === 'function') observeFadeEls();
        } else {
            grid.innerHTML = '<p class="shop-empty">Products coming soon &mdash; <a href="contact.html">get in touch</a> to discuss a bespoke piece.</p>';
        }
    } catch (e) {
        console.warn('Could not load Sanity products — showing static cards.', e);
    }
}

loadSanityProducts();

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

});

