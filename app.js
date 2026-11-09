// ژمارەیا تەلەفۆنا تە بۆ پەیوەندیکرنێ و کرێکرنا دوکانێ
const OWNER_PHONE = "9647500000000"; // ل ڤێرە ژمارەیا خۆ یا دروست دابنێ

// ڕێکخستنا لینکا بانەرا کرێکرنا دوکانێ
const rentBtn = document.getElementById('rentShopBtn');
const rentMessage = encodeURIComponent("سڵاو، من دڤێت دوکانەکێ د ناڤ ئەپێ مە دا کرێ بکەم بۆ فرۆتنا کەلپەلێن خۆ. چەوا دەست پێ بکەم؟");
rentBtn.href = `https://wa.me/${OWNER_PHONE}?text=${rentMessage}`;

// بەرهەمێن دەستپێکێ ب ناڤێ دوکانان
const initialProducts = [
    {
        id: 1,
        storeName: "بۆتیکا زارا",
        title: "چاکێتێ زڤستانێ یێ پیاوان",
        category: "clothes",
        price: "35,000 دینار",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        phone: "9647504799202",
        city: "دهۆک"
    },
    {
        id: 2,
        storeName: "کۆگەها زاخۆ",
        title: "پێلاڤا Nike ئەسڵی",
        category: "shoes",
        price: "50 $",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        phone: "9647500000000",
        city: "زاخۆ"
    }
];

let products = JSON.parse(localStorage.getItem('my_market_products')) || initialProducts;
let isAdminMode = false;
let uploadedImageBase64 = "";

let selectedStore = 'all';
let selectedCategory = 'all';

const grid = document.getElementById('productsGrid');
const storeTabsContainer = document.getElementById('storeTabs');
const modal = document.getElementById('addModal');
const openModalBtn = document.getElementById('openAddModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const form = document.getElementById('productForm');
const searchInput = document.getElementById('searchInput');
const catButtons = document.querySelectorAll('.cat-btn');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const fileInput = document.getElementById('prodImageFile');
const imagePreview = document.getElementById('imagePreview');
const previewContainer = document.getElementById('imagePreviewContainer');

// پیشاندانا دوکانان د بەشێ فلتەری دا ب شێوەیەکێ ئۆتۆماتیکی
function updateStoreTabs() {
    const stores = ['all', ...new Set(products.map(p => p.storeName || "دوکانا گشتی"))];
    storeTabsContainer.innerHTML = '';
    
    stores.forEach(store => {
        const btn = document.createElement('button');
        btn.className = `store-btn ${store === selectedStore ? 'active' : ''}`;
        btn.dataset.store = store;
        btn.innerText = store === 'all' ? 'هەمی دوکان' : store;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.store-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedStore = store;
            applyFilters();
        });
        storeTabsContainer.appendChild(btn);
    });
}

// پیشاندانا پێشبینیا وێنەی ژ کۆمپیوتەری
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageBase64 = e.target.result;
            imagePreview.src = uploadedImageBase64;
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// نیشادانا بەرهەمان ل سەر شاشەی
function renderProducts(items) {
    grid.innerHTML = '';
    if (items.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 30px;">چ بەرهەم ل ڤێرە نینن!</p>';
        return;
    }

    items.forEach(item => {
        const message = encodeURIComponent(`سڵاو، من دڤێت ڤی بەرهەمی ژ (${item.storeName || 'دوکان'}) بکڕم:\nبەرهەم: ${item.title}\nنرخ: ${item.price}`);
        const waLink = `https://wa.me/${item.phone}?text=${message}`;

        const card = document.createElement('div');
        card.className = 'product-card';
        
        const deleteButton = isAdminMode ? `
            <button class="delete-btn" onclick="deleteProduct(${item.id})" title="ژێبرنا بەرهەمی">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        ` : '';

        card.innerHTML = `
            ${deleteButton}
            <img src="${item.image}" alt="${item.title}">
            <div class="product-info">
                <span class="store-tag"><i class="fa-solid fa-store"></i> ${item.storeName || 'دوکان'}</span>
                <h4>${item.title}</h4>
                <div class="price">${item.price}</div>
                <div class="seller-meta">
                    <i class="fa-solid fa-location-dot"></i> ${item.city}
                </div>
                <a href="${waLink}" target="_blank" class="btn-whatsapp">
                    <i class="fa-brands fa-whatsapp"></i> داواکرن ژ فرۆشیاری
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// پاقژکرن و فلتەرکرنا بەرهەمان
function applyFilters() {
    const term = searchInput.value.toLowerCase();
    
    let filtered = products.filter(p => {
        const matchStore = (selectedStore === 'all') || (p.storeName === selectedStore);
        const matchCat = (selectedCategory === 'all') || (p.category === selectedCategory);
        const matchSearch = p.title.toLowerCase().includes(term) || (p.storeName && p.storeName.toLowerCase().includes(term));
        return matchStore && matchCat && matchSearch;
    });

    renderProducts(filtered);
}

// ژێبرنا بەرهەمی ب ئەدمینی
window.deleteProduct = function(id) {
    if (confirm("ئایا دڤێت ئەڤ بەرهەمە بهێتە ژێبرن؟")) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('my_market_products', JSON.stringify(products));
        updateStoreTabs();
        applyFilters();
    }
};

// گۆڕینا دۆخێ ئەدمین
adminToggleBtn.addEventListener('click', () => {
    isAdminMode = !isAdminMode;
    adminToggleBtn.classList.toggle('active');
    adminToggleBtn.innerHTML = isAdminMode ? 
        `<i class="fa-solid fa-lock-open"></i> ئەدمین (چالاک)` : 
        `<i class="fa-solid fa-user-shield"></i> ئەدمین`;
    applyFilters();
});

// فلتەرکرنا کاتیگۆریان
catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCategory = btn.dataset.category;
        applyFilters();
    });
});

// لێگەڕیان
searchInput.addEventListener('input', applyFilters);

// مۆداڵ
openModalBtn.onclick = () => modal.style.display = 'flex';
closeModalBtn.onclick = () => {
    modal.style.display = 'none';
    form.reset();
    previewContainer.style.display = 'none';
    uploadedImageBase64 = "";
};

// زێدەکرنا کاڵایێ نوی دگەل ناڤێ دوکانێ
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!uploadedImageBase64) {
        alert("تکایە وێنەیەک ژ کۆمپیوتەری هەلبژێرە!");
        return;
    }

    const newProduct = {
        id: Date.now(),
        storeName: document.getElementById('prodStore').value.trim(),
        title: document.getElementById('prodTitle').value.trim(),
        category: document.getElementById('prodCategory').value,
        price: document.getElementById('prodPrice').value.trim(),
        image: uploadedImageBase64,
        phone: document.getElementById('prodPhone').value.replace(/[^0-9]/g, ''),
        city: document.getElementById('prodCity').value.trim()
    };

    products.unshift(newProduct);
    localStorage.setItem('my_market_products', JSON.stringify(products));
    
    updateStoreTabs();
    applyFilters();

    form.reset();
    previewContainer.style.display = 'none';
    uploadedImageBase64 = "";
    modal.style.display = 'none';
});

// دەستپێکرنا ئەپی
updateStoreTabs();
applyFilters();