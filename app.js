// ژمارەیا WhatsApp یا تە بۆ کڕێکرنا دوکانێ
const OWNER_PHONE = "9647504799202";

// فەرهەنگا تەواو یا هەمی زمانان
const i18n = {
    badini: {
        dir: "rtl",
        pageTitle: "مۆڵ و بازاڕێ ئۆنلاین",
        logo: 'بازاڕێ مە <span class="badge">Mall</span>',
        account: "هەژمار",
        bannerTitle: '<i class="fa-solid fa-shop"></i> تە دڤێت کەلپەلێن خۆ بفرۆشی؟',
        bannerDesc: "دوکانا خۆ نوکە د ئەپی دا کرێ بکە و بەرهەمێن خۆ نیشانی هەزاران کڕیاران بدە.",
        rentBtn: "کرێکرنا دوکانێ",
        searchPlaceholder: "ل چ بەرهەمی یان دوکانەکێ دگەڕی؟",
        storesTitle: "دوکانێن پشکدار:",
        allStores: "هەمی دوکان",
        catTitle: "جۆرێ بەرهەمی:",
        cats: { all: "هەمی", clothes: "جلوبەرگ", shoes: "پێلاڤ", electronics: "ئەلکترۆنیات", other: "یێن دی" },
        btnCart: "+ سەلک",
        btnBuy: "کڕین",
        cartTitle: "سەلکا کڕینێ یا تە",
        emptyCart: "سەلکا تە یا ڤالایە!",
        totalLabel: "کۆمێ گشتی:",
        orderAllBtn: "داواکرنا هەمییان ب WhatsApp",
        orderHeader: "زانیاریێن گەیاندن و کڕینێ",
        custName: "ناڤێ کڕیاری:",
        custPhone: "ژمارەیا تەلەفۆنێ (WhatsApp):",
        custCity: "باژێڕ / دەڤەر:",
        custAddress: "ناڤنیشانێ گەیاندنێ (تاخ، کووچە):",
        sendOrderBtn: "ناردنا داواکاریێ ب WhatsApp",
        profileTitle: "پرۆفایلێ من",
        profName: "ناڤێ تە یێ تەواو:",
        profEmail: "ئیمەیل (Email):",
        profPhone: "ژمارەیا مۆبایلێ:",
        profCity: "شار:",
        profAddress: "ناڤنیشان:",
        saveProfileBtn: "پاشەکەوتکرن",
        addModalTitle: "زێدەکرنا کاڵایێ نوی",
        prodStore: "ناڤێ دوکانا تە:",
        prodTitle: "ناڤێ بەرهەمی:",
        prodCat: "پۆلێن:",
        prodPrice: "نرخ:",
        prodImage: "وێنەیێ بەرهەمی:",
        prodPhone: "ژمارەیا WhatsApp یا دوکاندارێ:",
        prodCity: "شار / جهێ دوکانێ:",
        publishBtn: "بەلاڤکرنا بەرهەمی",
        addedToCartMsg: "زێدە بوو بۆ سەلکێ!",
        defaultStoreName: "دوکان"
    },
    sorani: {
        dir: "rtl",
        pageTitle: "مۆڵ و بازاڕی ئۆنلاین",
        logo: 'بازاڕی ئێمە <span class="badge">Mall</span>',
        account: "هەژمار",
        bannerTitle: '<i class="fa-solid fa-shop"></i> دەتەوێت کاڵاکانت بفرۆشیت؟',
        bannerDesc: "دووکانی خۆت ئێستا لە ئەپەکەدا بەکرێ بگرە و بەرهەمەکانت نیشانی کڕیاران بدە.",
        rentBtn: "بەکرێگرتنی دووکان",
        searchPlaceholder: "بۆ چ بەرهەم یان دووکانێک دەگەڕێیت؟",
        storesTitle: "دووکانە بەشداربووەکان:",
        allStores: "هەموو دووکانەکان",
        catTitle: "جۆری بەرهەم:",
        cats: { all: "هەموو", clothes: "جلوبەرگ", shoes: "پێڵاو", electronics: "ئەلیکترۆنیات", other: "هیتر" },
        btnCart: "+ سەبەتە",
        btnBuy: "کڕین",
        cartTitle: "سەبەتەی کڕینی تۆ",
        emptyCart: "سەبەتەکەت بەتاڵە!",
        totalLabel: "کۆی گشتی:",
        orderAllBtn: "داواکردنی هەموویان بە WhatsApp",
        orderHeader: "زانیاری گەیاندن و کڕین",
        custName: "ناوی کڕیار:",
        custPhone: "ژمارەی تەلەفۆن (واتسئەپ):",
        custCity: "شار / ناوچە:",
        custAddress: "ناونیشانی تەواو (گەڕەک، کۆڵان):",
        sendOrderBtn: "ناردنی داواکاری بە WhatsApp",
        profileTitle: "پڕۆفایلی من",
        profName: "ناوی تەواو:",
        profEmail: "ئیمەیل:",
        profPhone: "ژمارەی مۆبایل:",
        profCity: "شار:",
        profAddress: "ناونیشان:",
        saveProfileBtn: "پاشەکەوتکردن",
        addModalTitle: "زیادکردنی کاڵای نوێ",
        prodStore: "ناوی دووکانی تۆ:",
        prodTitle: "ناوی بەرهەم:",
        prodCat: "پۆلێن:",
        prodPrice: "نرخ:",
        prodImage: "وێنەی بەرهەم:",
        prodPhone: "ژمارەی WhatsAppـی فرۆشیار:",
        prodCity: "شار / شوێنی دووکان:",
        publishBtn: "بڵاوکردنەوەی کاڵا",
        addedToCartMsg: "زیادکرا بۆ سەبەتەی کڕین!",
        defaultStoreName: "دووکان"
    },
    ar: {
        dir: "rtl",
        pageTitle: "السوق الرقمي الموحد",
        logo: 'سوقنا <span class="badge">Mall</span>',
        account: "حسابي",
        bannerTitle: '<i class="fa-solid fa-shop"></i> هل ترغب ببيع منتجاتك معنا؟',
        bannerDesc: "استأجر متجرك الرقمي الآن واعرض منتجاتك لآلاف المشترين.",
        rentBtn: "تأجير متجر",
        searchPlaceholder: "عن أي منتج أو متجر تبحث؟",
        storesTitle: "المتاجر المشاركة:",
        allStores: "جميع المتاجر",
        catTitle: "تصنيف المنتجات:",
        cats: { all: "الكل", clothes: "ملابس", shoes: "أحذية", electronics: "إلكترونيات", other: "أخرى" },
        btnCart: "+ السلة",
        btnBuy: "شراء",
        cartTitle: "سلة المشتريات",
        emptyCart: "سلتك فارغة حالياً!",
        totalLabel: "المجموع الكلي:",
        orderAllBtn: "طلب الكل عبر WhatsApp",
        orderHeader: "معلومات التوصيل والشراء",
        custName: "اسم المشتري الكامل:",
        custPhone: "رقم الهاتف (واتساب):",
        custCity: "المدينة / المنطقة:",
        custAddress: "العنوان بالتفصيل (الحي، الشارع):",
        sendOrderBtn: "إرسال الطلب عبر WhatsApp",
        profileTitle: "الملف الشخصي",
        profName: "الاسم الكامل:",
        profEmail: "البريد الإلكتروني:",
        profPhone: "رقم الهاتف:",
        profCity: "المدينة:",
        profAddress: "العنوان بالتفصيل:",
        saveProfileBtn: "حفظ المعلومات",
        addModalTitle: "إضافة منتج جديد",
        prodStore: "اسم متجرك:",
        prodTitle: "اسم المنتج:",
        prodCat: "التصنيف:",
        prodPrice: "السعر:",
        prodImage: "صورة المنتج:",
        prodPhone: "رقم WhatsApp للبائع:",
        prodCity: "المدينة / الموقع:",
        publishBtn: "نشر المنتج",
        addedToCartMsg: "تمت الإضافة إلى السلة بنجاح!",
        defaultStoreName: "متجر"
    },
    en: {
        dir: "ltr",
        pageTitle: "Online Mall & Marketplace",
        logo: 'Our Mall <span class="badge">Mall</span>',
        account: "Account",
        bannerTitle: '<i class="fa-solid fa-shop"></i> Want to sell your products?',
        bannerDesc: "Rent your digital storefront today and reach thousands of buyers.",
        rentBtn: "Rent a Store",
        searchPlaceholder: "Search for any product or store...",
        storesTitle: "Partner Stores:",
        allStores: "All Stores",
        catTitle: "Categories:",
        cats: { all: "All", clothes: "Clothes", shoes: "Shoes", electronics: "Electronics", other: "Other" },
        btnCart: "+ Cart",
        btnBuy: "Buy",
        cartTitle: "Your Shopping Cart",
        emptyCart: "Your cart is empty!",
        totalLabel: "Total Items:",
        orderAllBtn: "Order All via WhatsApp",
        orderHeader: "Delivery & Order Info",
        custName: "Full Name:",
        custPhone: "Phone Number (WhatsApp):",
        custCity: "City / Area:",
        custAddress: "Full Address (Street, Neighborhood):",
        sendOrderBtn: "Send Order via WhatsApp",
        profileTitle: "My Profile",
        profName: "Full Name:",
        profEmail: "Email Address:",
        profPhone: "Phone Number:",
        profCity: "City:",
        profAddress: "Address:",
        saveProfileBtn: "Save Profile",
        addModalTitle: "Add New Product",
        prodStore: "Your Store Name:",
        prodTitle: "Product Title:",
        prodCat: "Category:",
        prodPrice: "Price:",
        prodImage: "Product Image:",
        prodPhone: "Vendor WhatsApp Number:",
        prodCity: "City / Location:",
        publishBtn: "Publish Product",
        addedToCartMsg: "Added to cart successfully!",
        defaultStoreName: "Store"
    }
};

let currentLang = localStorage.getItem('my_market_lang') || 'badini';

// گوڕینا دەستبەجێ و ١٠٠٪ یا هەمی بەشێن ئەپێ
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('my_market_lang', lang);
    const t = i18n[lang];

    // ڕێکخستنا ئاراستەیێ لاپەرەی (LTR بۆ ئینگلیزی و RTL بۆ یێن دی)
    document.documentElement.setAttribute('dir', t.dir);
    document.documentElement.setAttribute('lang', lang === 'badini' || lang === 'sorani' ? 'ku' : lang);

    // نووکرنا تێکستێن سەرەکی
    document.getElementById('pageTitle').innerText = t.pageTitle;
    document.getElementById('txtLogo').innerHTML = t.logo;
    document.getElementById('txtBannerTitle').innerHTML = t.bannerTitle;
    document.getElementById('txtBannerDesc').innerText = t.bannerDesc;
    document.getElementById('txtRentBtn').innerText = t.rentBtn;
    document.getElementById('searchInput').placeholder = t.searchPlaceholder;
    document.getElementById('txtStoresTitle').innerText = t.storesTitle;
    document.getElementById('btnAllStores').innerText = t.allStores;
    document.getElementById('txtCategoriesTitle').innerText = t.catTitle;
    
    // کاتیگۆری
    document.getElementById('catAll').innerText = t.cats.all;
    document.getElementById('catClothes').innerText = t.cats.clothes;
    document.getElementById('catShoes').innerText = t.cats.shoes;
    document.getElementById('catElectronics').innerText = t.cats.electronics;
    document.getElementById('catOther').innerText = t.cats.other;

    // هەلبژاردنێن ناو فۆڕما زێدەکرنێ
    document.getElementById('optClothes').innerText = t.cats.clothes;
    document.getElementById('optShoes').innerText = t.cats.shoes;
    document.getElementById('optElectronics').innerText = t.cats.electronics;
    document.getElementById('optOther').innerText = t.cats.other;

    // مۆداڵا سەلکێ
    document.getElementById('txtCartTitle').innerText = t.cartTitle;
    document.getElementById('txtTotalCountLabel').innerText = t.totalLabel;
    document.getElementById('txtOrderAllBtn').innerText = t.orderAllBtn;

    // مۆداڵا کڕینێ
    document.getElementById('txtOrderHeaderTitle').innerText = t.orderHeader;
    document.getElementById('lblCustName').innerText = t.custName;
    document.getElementById('lblCustPhone').innerText = t.custPhone;
    document.getElementById('lblCustCity').innerText = t.custCity;
    document.getElementById('lblCustAddress').innerText = t.custAddress;
    document.getElementById('txtSendOrderBtn').innerText = t.sendOrderBtn;

    // مۆداڵا پرۆفایلێ
    document.getElementById('txtProfileTitle').innerText = t.profileTitle;
    document.getElementById('lblProfName').innerText = t.profName;
    document.getElementById('lblProfEmail').innerText = t.profEmail;
    document.getElementById('lblProfPhone').innerText = t.profPhone;
    document.getElementById('lblProfCity').innerText = t.profCity;
    document.getElementById('lblProfAddress').innerText = t.profAddress;
    document.getElementById('txtSaveProfileBtn').innerText = t.saveProfileBtn;

    // مۆداڵا زێدەکرنا کاڵای
    document.getElementById('txtAddModalTitle').innerText = t.addModalTitle;
    document.getElementById('lblProdStore').innerText = t.prodStore;
    document.getElementById('lblProdTitle').innerText = t.prodTitle;
    document.getElementById('lblProdCat').innerText = t.prodCat;
    document.getElementById('lblProdPrice').innerText = t.prodPrice;
    document.getElementById('lblProdImage').innerText = t.prodImage;
    document.getElementById('lblProdPhone').innerText = t.prodPhone;
    document.getElementById('lblProdCity').innerText = t.prodCity;
    document.getElementById('txtPublishBtn').innerText = t.publishBtn;

    // بەشێ پرۆفایل ل سەرێ ئەپی
    const saved = JSON.parse(localStorage.getItem('saved_customer_profile'));
    document.getElementById('userProfileText').innerText = saved && saved.name ? saved.name.split(" ")[0] : t.account;

    // نامەیا WhatsApp
    const rentMsg = encodeURIComponent(
        lang === 'en' ? "Hello, I would like to rent a store in your online mall." :
        lang === 'ar' ? "مرحباً، أود استئجار متجر في سوقكم الرقمي." :
        lang === 'sorani' ? "سڵاو، دەمەوێت دووکانێک لە بازاڕە ئۆنلاینەکەتان بەکرێ بگرم." :
        "سڵاو، من دڤێت دوکانەکێ د ناڤ بازاڕێ ئۆنلاین دا کرێ بکەم."
    );
    document.getElementById('rentShopBtn').href = `https://wa.me/${OWNER_PHONE}?text=${rentMsg}`;

    // دەستبەجێ نووکرنا کارتێن بەرهەمان و فلتەران ب زمانێ نوی
    updateStoreTabs();
    applyFilters();
}

// گوێگرتن ل دەست لێدانا ئێکسەر یا زمانی
const langSelect = document.getElementById('langSelect');
langSelect.value = currentLang;
langSelect.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
});

// بەرهەمێن دەستپێکێ
const initialProducts = [
    {
        id: 1,
        storeName: "Zara Boutique",
        title: "Men's Winter Jacket",
        category: "clothes",
        price: "35,000 IQD",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        phone: "9647500000000",
        city: "Duhok"
    },
    {
        id: 2,
        storeName: "Zakho Outlet",
        title: "Nike Air Running Shoes",
        category: "shoes",
        price: "50 $",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        phone: "9647500000000",
        city: "Zakho"
    }
];

let products = JSON.parse(localStorage.getItem('my_market_products')) || initialProducts;
let cart = JSON.parse(localStorage.getItem('my_market_cart')) || [];
let isAdminMode = false;
let uploadedImageBase64 = "";
let profileAvatarBase64 = "";

let selectedStore = 'all';
let selectedCategory = 'all';
let currentOrderMode = 'cart';
let singleBuyItem = null;

// توخمێن سەرەکی
const grid = document.getElementById('productsGrid');
const storeTabsContainer = document.getElementById('storeTabs');
const searchInput = document.getElementById('searchInput');
const catButtons = document.querySelectorAll('.cat-btn');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const cartCountBadge = document.getElementById('cartCountBadge');

// نووکرنا ژمارەیا سەلکێ
function updateCartBadge() {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountBadge.innerText = totalQty;
    localStorage.setItem('my_market_cart', JSON.stringify(cart));
}

// زێدەکرنا کاڵای بۆ سەلکێ
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingIndex = cart.findIndex(c => c.id === id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartBadge();
    alert(`«${product.title}» ${i18n[currentLang].addedToCartMsg}`);
};

// کەم و زێدەکرنا کاڵای د سەلکێ دا
window.changeCartQty = function(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(c => c.id !== id);
    }
    updateCartBadge();
    renderCartModal();
};

// نیشادانا سەلکێ
function renderCartModal() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartFooterSection = document.getElementById('cartFooterSection');
    const cartTotalItemsCount = document.getElementById('cartTotalItemsCount');

    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p style="text-align: center; color: #64748b; padding: 20px;">${i18n[currentLang].emptyCart}</p>`;
        cartFooterSection.style.display = 'none';
        return;
    }

    cartFooterSection.style.display = 'block';
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        const row = document.createElement('div');
        row.className = 'cart-item-card';
        row.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h5>${item.title}</h5>
                <span>${item.price}</span>
            </div>
            <div class="cart-qty-controls">
                <button class="qty-btn" onclick="changeCartQty(${item.id}, -1)">-</button>
                <strong>${item.quantity}</strong>
                <button class="qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsList.appendChild(row);
    });

    cartTotalItemsCount.innerText = `${totalItems}`;
}

// ڤەکرنا سەلکێ
document.getElementById('openCartBtn').onclick = () => {
    renderCartModal();
    document.getElementById('cartModal').style.display = 'flex';
};
document.getElementById('closeCartModalBtn').onclick = () => {
    document.getElementById('cartModal').style.display = 'none';
};

// داواکرنا پێکڤە یا سەلکێ
document.getElementById('checkoutCartBtn').onclick = () => {
    if (cart.length === 0) return;
    currentOrderMode = 'cart';
    document.getElementById('cartModal').style.display = 'none';

    let summaryText = `<strong>${i18n[currentLang].cartTitle}:</strong><br>`;
    cart.forEach(c => {
        summaryText += `• ${c.title} (${c.quantity}x) - ${c.price}<br>`;
    });
    document.getElementById('orderProductSummary').innerHTML = summaryText;

    loadSavedProfileIntoForm();
    document.getElementById('orderModal').style.display = 'flex';
};

// کڕینا ئێک بەرهەم
window.quickBuy = function(id) {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    currentOrderMode = 'single';
    singleBuyItem = prod;

    const t = i18n[currentLang];
    document.getElementById('orderProductSummary').innerHTML = `
        <strong>${prod.title}</strong><br>
        <strong>${prod.price}</strong><br>
        <small>${prod.storeName || t.defaultStoreName}</small>
    `;

    loadSavedProfileIntoForm();
    document.getElementById('orderModal').style.display = 'flex';
};

document.getElementById('closeOrderModalBtn').onclick = () => {
    document.getElementById('orderModal').style.display = 'none';
};

// فۆڕما کڕینێ ب واتسئەپ
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const city = document.getElementById('custCity').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    let invoice = `🛍️ *New Order / داواکاری*\n━━━━━━━━━━━━━━\n`;
    let targetPhone = OWNER_PHONE;

    if (currentOrderMode === 'single' && singleBuyItem) {
        invoice += `🏪 *Store:* ${singleBuyItem.storeName || 'Store'}\n`;
        invoice += `📦 *Item:* ${singleBuyItem.title}\n`;
        invoice += `💰 *Price:* ${singleBuyItem.price}\n`;
        targetPhone = singleBuyItem.phone.replace(/[^0-9]/g, '') || OWNER_PHONE;
    } else {
        invoice += `📦 *Cart Items:*\n`;
        cart.forEach((item, index) => {
            invoice += `${index + 1}. ${item.title} (${item.quantity}x) - ${item.price} [${item.storeName || 'Store'}]\n`;
        });
        targetPhone = cart[0].phone.replace(/[^0-9]/g, '') || OWNER_PHONE;
    }

    invoice += `━━━━━━━━━━━━━━\n`;
    invoice += `👤 *Customer:* ${name}\n`;
    invoice += `📞 *Phone:* ${phone}\n`;
    invoice += `📍 *City:* ${city}\n`;
    invoice += `🏠 *Address:* ${address}\n`;
    invoice += `━━━━━━━━━━━━━━`;

    if (currentOrderMode === 'cart') {
        cart = [];
        updateCartBadge();
    }

    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(invoice)}`, '_blank');
    document.getElementById('orderModal').style.display = 'none';
});

// پیشاندانا بەرهەمان
function renderProducts(items) {
    grid.innerHTML = '';
    const t = i18n[currentLang];

    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 30px;">${currentLang === 'en' ? 'No products found!' : 'چ بەرهەم نەهاتنە دیتن!'}</p>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const deleteBtn = isAdminMode ? `
            <button class="delete-btn" onclick="deleteProduct(${item.id})" title="Delete">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        ` : '';

        card.innerHTML = `
            ${deleteBtn}
            <img src="${item.image}" alt="${item.title}">
            <div class="product-info">
                <span class="store-tag"><i class="fa-solid fa-store"></i> ${item.storeName || t.defaultStoreName}</span>
                <h4>${item.title}</h4>
                <div class="price">${item.price}</div>
                <div class="seller-meta">
                    <i class="fa-solid fa-location-dot"></i> ${item.city}
                </div>
                <div class="card-actions">
                    <button class="btn-add-cart" onclick="addToCart(${item.id})">
                        <i class="fa-solid fa-cart-plus"></i> ${t.btnCart}
                    </button>
                    <button class="btn-quick-buy" onclick="quickBuy(${item.id})">
                        ${t.btnBuy}
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

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

function updateStoreTabs() {
    const t = i18n[currentLang];
    const stores = ['all', ...new Set(products.map(p => p.storeName || t.defaultStoreName))];
    storeTabsContainer.innerHTML = '';
    
    stores.forEach(store => {
        const btn = document.createElement('button');
        btn.className = `store-btn ${store === selectedStore ? 'active' : ''}`;
        btn.dataset.store = store;
        btn.innerText = store === 'all' ? t.allStores : store;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.store-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedStore = store;
            applyFilters();
        });
        storeTabsContainer.appendChild(btn);
    });
}

// پرۆفایل
function loadUserProfile() {
    const saved = JSON.parse(localStorage.getItem('saved_customer_profile'));
    if (saved) {
        document.getElementById('profName').value = saved.name || "";
        document.getElementById('profEmail').value = saved.email || "";
        document.getElementById('profPhone').value = saved.phone || "";
        document.getElementById('profCity').value = saved.city || "";
        document.getElementById('profAddress').value = saved.address || "";
        
        document.getElementById('userProfileText').innerText = saved.name.split(" ")[0] || i18n[currentLang].account;

        if (saved.avatar) {
            profileAvatarBase64 = saved.avatar;
            document.getElementById('profileAvatarPreview').src = saved.avatar;
            const headerAvatar = document.getElementById('headerUserAvatar');
            headerAvatar.src = saved.avatar;
            headerAvatar.style.display = 'inline-block';
            document.getElementById('headerUserIcon').style.display = 'none';
        }
    }
}

function loadSavedProfileIntoForm() {
    const saved = JSON.parse(localStorage.getItem('saved_customer_profile'));
    if (saved) {
        document.getElementById('custName').value = saved.name || "";
        document.getElementById('custPhone').value = saved.phone || "";
        document.getElementById('custCity').value = saved.city || "";
        document.getElementById('custAddress').value = saved.address || "";
    }
}

document.getElementById('userProfileBtn').onclick = () => {
    loadUserProfile();
    document.getElementById('profileModal').style.display = 'flex';
};
document.getElementById('closeProfileModalBtn').onclick = () => {
    document.getElementById('profileModal').style.display = 'none';
};

document.getElementById('profileImageInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileAvatarBase64 = e.target.result;
            document.getElementById('profileAvatarPreview').src = profileAvatarBase64;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const profile = {
        name: document.getElementById('profName').value.trim(),
        email: document.getElementById('profEmail').value.trim(),
        phone: document.getElementById('profPhone').value.trim(),
        city: document.getElementById('profCity').value.trim(),
        address: document.getElementById('profAddress').value.trim(),
        avatar: profileAvatarBase64 || document.getElementById('profileAvatarPreview').src
    };
    localStorage.setItem('saved_customer_profile', JSON.stringify(profile));
    loadUserProfile();
    document.getElementById('profileModal').style.display = 'none';
    alert(i18n[currentLang].saveProfileBtn + " Done!");
});

// ئەدمین
adminToggleBtn.addEventListener('click', () => {
    if (!isAdminMode) {
        const pass = prompt("Admin Password:");
        if (pass !== "1234") {
            alert("Wrong password!");
            return;
        }
    }
    isAdminMode = !isAdminMode;
    adminToggleBtn.classList.toggle('active');
    applyFilters();
});

window.deleteProduct = function(id) {
    if (confirm("Are you sure?")) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('my_market_products', JSON.stringify(products));
        updateStoreTabs();
        applyFilters();
    }
};

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
document.getElementById('openAddModalBtn').onclick = () => {
    document.getElementById('addModal').style.display = 'flex';
};
document.getElementById('closeModalBtn').onclick = () => {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('productForm').reset();
    document.getElementById('imagePreviewContainer').style.display = 'none';
    uploadedImageBase64 = "";
};

document.getElementById('prodImageFile').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageBase64 = e.target.result;
            document.getElementById('imagePreview').src = uploadedImageBase64;
            document.getElementById('imagePreviewContainer').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!uploadedImageBase64) {
        alert("Please select an image!");
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

    document.getElementById('productForm').reset();
    document.getElementById('imagePreviewContainer').style.display = 'none';
    uploadedImageBase64 = "";
    document.getElementById('addModal').style.display = 'none';
});

// دەستپێکرنا ئەپێ
applyLanguage(currentLang);
loadUserProfile();
updateCartBadge();