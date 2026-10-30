
const productGrid = document.getElementById('productGrid');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Menu trên điện thoại
menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Đóng menu' : 'Mở menu'
    );
});

mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Mở menu');
    });
});

// Lọc di sản theo tên, tiêu đề và nội dung câu chuyện.
const productSearch = document.getElementById('productSearch');
const productSearchInput = document.getElementById('productSearchInput');
let products = [];

if (productSearch && productSearchInput) {
    productSearch.addEventListener('submit', event => {
        event.preventDefault();
        renderProducts();
        productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    productSearchInput.addEventListener('input', renderProducts);
}

async function loadProducts() {
    try {
        const response = await fetch('/api/products');

        if (!response.ok) {
            throw new Error('Không thể tải danh sách sản phẩm.');
        }

        const responseProducts = await response.json();
        products = Array.isArray(responseProducts) ? responseProducts : [];

        if (products.length === 0) {
            productGrid.innerHTML =
                '<p class="loading is-empty" role="status" aria-live="polite">Các câu chuyện di sản đang được cập nhật.</p>';
            return;
        }

        renderProducts();
    } catch (error) {
        console.error(error);

        productGrid.innerHTML =
            '<p class="loading is-error" role="alert">Chưa thể tải dữ liệu di sản. Vui lòng thử lại sau.</p>';
    }
}

function renderProducts() {
    if (!productGrid || products.length === 0) {
        return;
    }

    const query = normalizeSearchText(productSearchInput?.value || '');
    const matchingProducts = products.filter(product => {
        const searchableText = normalizeSearchText([
            product.tenSanPham,
            product.tieuDe,
            product.doanGioiThieu,
            product.cauChuyen,
            product.giaTriVanHoa
        ].filter(Boolean).join(' '));

        return searchableText.includes(query);
    });

    if (matchingProducts.length === 0) {
        productGrid.innerHTML =
            '<p class="loading is-empty" role="status" aria-live="polite">Không tìm thấy sản phẩm hoặc làng nghề phù hợp.</p>';
        return;
    }

    productGrid.innerHTML = matchingProducts.map(product => {
        const name = escapeHTML(product.tenSanPham);
        const intro = escapeHTML(product.doanGioiThieu || '');
        const image = safeImageURL(product.hinhAnhDaiDien);
        const slug = encodeURIComponent(product.duongDan || '');

        return `
            <article class="product-card">
                <img
                    src="${image}"
                    alt="${name}"
                    loading="lazy"
                    onerror="showProductImageFallback(this)"
                >
                <div class="product-info">
                    <h3>${name}</h3>
                    <p>${intro}</p>
                    <a href="/pages/chi-tiet-san-pham.html?slug=${slug}">
                        Khám phá câu chuyện ↗
                    </a>
                </div>
            </article>
        `;
    }).join('');
}

function normalizeSearchText(value) {
    return String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('vi')
        .replace(/đ/g, 'd');
}

function showProductImageFallback(image) {
    const placeholder = document.createElement('div');
    placeholder.className = 'product-image-placeholder';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', image.alt || 'Ảnh sản phẩm chưa có');
    image.replaceWith(placeholder);
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char]);
}

function safeImageURL(value) {
    const image = String(value || '').trim();

    if (
        image.startsWith('/') &&
        !image.startsWith('//') &&
        !image.includes('\\') &&
        !image.split('/').includes('..')
    ) {
        return image;
    }

    if (/^https:\/\//i.test(image)) {
        return image;
    }

    return '/images/heritage-placeholder.jpg';
}

loadProducts();
