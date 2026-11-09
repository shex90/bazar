// ژمارەیا WhatsApp یا خۆ ل ڤێرە دابنێ بۆ پەیوەندیکرنا کڕێکرنا دوکانێ
const OWNER_PHONE = "9647504799202";

// ڕێکخستنا لینکا بانەرا کرێکرنا دوکانێ
const rentBtn = document.getElementById('rentShopBtn');
const rentMessage = encodeURIComponent("سڵاو، من دڤێت دوکانەکێ د ناڤ بازاڕێ ئۆنلاین دا کرێ بکەم بۆ فرۆتنا بەرهەمێن خۆ. چەوا دەست پێ بکەم؟");
rentBtn.href = `https://wa.me/${OWNER_PHONE}?text=${rentMessage}`;

// بەرهەمێن دەستپێکێ
const initialProducts = [
    {
        id: 1,
        storeName: "بۆتیکا زارا",
        title: "چاکێتێ زڤستانێ یێ پیاوان",
        category: "clothes",
        price: "35,000 دینار",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        phone: "9647500000000",
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
let currentBuyingProduct = null;

// توخمێن سەرەکی
const grid = document.getElementById('productsGrid');
const storeTabsContainer = document.getElementById('storeTabs');
const searchInput = document.getElementById('searchInput');
const catButtons = document.querySelectorAll('.cat-btn');
const adminToggleBtn = document.getElementById('adminToggleBtn');

// بەشێ مۆداڵا کڕینێ (Order Modal)
const orderModal = document.getElementById('orderModal');
const closeOrderModalBtn = document.getElementById('closeOrderModalBtn');
const orderForm = document.getElementById('orderForm');
const orderSummary = document.getElementById('orderProductSummary');
const custNameInput = document.getElementById('custName');
const custPhoneInput = document.getElementById('custPhone');
const custCityInput = document.getElementById('custCity');
const custAddressInput = document.getElementById('custAddress');

// بەشێ مۆداڵا زێدەکرنا کاڵای
const addModal = document.getElementById('addModal');
const openAddModalBtn = document.getElementById('openAddModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const productForm = document.getElementById('productForm');
const fileInput = document.getElementById('prodImageFile');
const imagePreview = document.getElementById('imagePreview');
const previewContainer = document.getElementById('imagePreviewContainer');

// پڕکرنا خۆکار یا ناڤنیشانێ کڕیاری ژ بیرگەیێ (وەک ترێندیۆل)
function loadSavedCustomerInfo() {
    const saved = JSON.parse(localStorage.getItem('saved_customer_profile'));
    if (saved) {
        custNameInput.value = saved.name || "";
        custPhoneInput.value = saved.phone || "";
        custCityInput.value = saved.city || "";
        custAddressInput.value = saved.address || "";
        document.getElementById('userProfileText').innerText = saved.name.split(" ")[0] || "هەژمار";
    }
}

// پاراستنا ناڤنیشانێ کڕیاری بۆ جارا بهێت
function saveCustomerInfo(name, phone, city, address) {
    const profile = { name, phone, city, address };
    localStorage.setItem('saved_customer_profile', JSON.stringify(profile));
    document.getElementById('userProfileText').innerText = name.split(" ")[0];
}

// دوگمەیا پرۆفایل ل سەرێ ئەپی
document.getElementById('userProfileBtn').addEventListener('click', () => {
    const saved = JSON.parse(localStorage.getItem('saved_customer_profile'));
    if (saved) {
        alert(`زانیاریێن هەژمارا تە:\nناڤ: ${saved.name}\nتەلەفۆن: ${saved.phone}\nناڤنیشان: ${saved.city} - ${saved.address}`);
    } else {
        alert("هێشتا چ داواکاری نەهاتینە تۆمارکرن. دەمێ تو تشتەکێ دکڕی زانیاریێن تە دێ هێنە پاراستن.");
    }
});

// پیشاندانا دوکانان د بەشێ فلتەری دا
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
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 30px;">چ بەرهەم نەهاتنە دیتن!</p>';
        return;
    }

    items.forEach(item => {
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
                <button class="btn-buy" onclick="openOrderModal(${item.id})">
                    <i class="fa-solid fa-cart-shopping"></i> کڕین و داواکرن
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ڤەکرنا پەنجەرەیا ناڤنیشان و کڕینێ
window.openOrderModal = function(id) {
    currentBuyingProduct = products.find(p => p.id === id);
    if (!currentBuyingProduct) return;

    orderSummary.innerHTML = `
        <strong>بەرهەم:</strong> ${currentBuyingProduct.title}<br>
        <strong>نرخ:</strong> ${currentBuyingProduct.price}<br>
        <strong>دوکان:</strong> ${currentBuyingProduct.storeName || 'دوکان'}
    `;

    loadSavedCustomerInfo();
    orderModal.style.display = 'flex';
};

// داخستنا پەنجەرەیا کڕینێ
closeOrderModalBtn.onclick = () => {
    orderModal.style.display = 'none';
};

// کڕیار فۆڕما کڕینێ تەواو دکەت
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentBuyingProduct) return;

    const custName = custNameInput.value.trim();
    const custPhone = custPhoneInput.value.trim();
    const custCity = custCityInput.value.trim();
    const custAddress = custAddressInput.value.trim();

    // پاراستنا ناڤنیشانی بۆ جارێن بهێت
    saveCustomerInfo(custName, custPhone, custCity, custAddress);

    // نامەیا فەرمی یا داواکاریێ بۆ فرۆشیاری
    const invoiceMessage = 
`🛍️ *داواکارییا نوی ژ بازاڕێ ئۆنلاین*
━━━━━━━━━━━━━━
🏪 *دوکان:* ${currentBuyingProduct.storeName || 'گشتی'}
📦 *بەرهەم:* ${currentBuyingProduct.title}
💰 *نرخ:* ${currentBuyingProduct.price}
━━━━━━━━━━━━━━
👤 *ناڤێ کڕیاری:* ${custName}
📞 *تەلەفۆنا کڕیاری:* ${custPhone}
📍 *باژێڕ:* ${custCity}
🏠 *ناڤنیشانێ گەیاندنێ:* ${custAddress}
━━━━━━━━━━━━━━
تکایە بۆ گەیاندنێ پەیوەندیێ ب من بکەن.`;

    const vendorPhone = currentBuyingProduct.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${vendorPhone}?text=${encodeURIComponent(invoiceMessage)}`;

    // ڤەکرنا ڕاستەوخۆ یا WhatsApp
    window.open(waUrl, '_blank');
    orderModal.style.display = 'none';
});

// فلتەرکرن
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

// ئەدمین ب پاسۆرد (1234)
adminToggleBtn.addEventListener('click', () => {
    if (!isAdminMode) {
        const pass = prompt("پاسۆردێ ئەدمینی بنڤیسە:");
        if (pass !== "1234") {
            alert("پاسۆرد خەلەتە!");
            return;
        }
    }
    isAdminMode = !isAdminMode;
    adminToggleBtn.classList.toggle('active');
    adminToggleBtn.innerHTML = isAdminMode ? 
        `<i class="fa-solid fa-lock-open"></i> ئەدمین (چالاک)` : 
        `<i class="fa-solid fa-user-shield"></i> ئەدمین`;
    applyFilters();
});

// ژێبرنا بەرهەمی
window.deleteProduct = function(id) {
    if (confirm("ئایا دڤێت ئەڤ بەرهەمە بهێتە ژێبرن؟")) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('my_market_products', JSON.stringify(products));
        updateStoreTabs();
        applyFilters();
    }
};

// کاتیگۆری
catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedCategory = btn.dataset.category;
        applyFilters();
    });
});

searchInput.addEventListener('input', applyFilters);

// زێدەکرنا کاڵایێ نوی
openAddModalBtn.onclick = () => addModal.style.display = 'flex';
closeModalBtn.onclick = () => {
    addModal.style.display = 'none';
    productForm.reset();
    previewContainer.style.display = 'none';
    uploadedImageBase64 = "";
};

productForm.addEventListener('submit', (e) => {
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

    productForm.reset();
    previewContainer.style.display = 'none';
    uploadedImageBase64 = "";
    addModal.style.display = 'none';
});

// دەستپێکرن
updateStoreTabs();
applyFilters();
loadSavedCustomerInfo();