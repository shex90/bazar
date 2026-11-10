/* ========================================================
   زانیارییێن سەرەکی یێن بەڕێوەبەر و پارەی
======================================================== */
const DAILY_USD_RATE_PER_100 = 151500; 
const ADMIN_WHATSAPP_NUMBER = "9647504799202"; 

/* ========================================================
   فەرهەنگا تەمام یا زمانان (بادینی، سۆرانی، عربي، English)
======================================================== */
const translations = {
    badini: {
        dir: "rtl",
        brand: "بازاڕ",
        rentHeader: "کرێکرنا دوکانێ",
        search: "ل کاڵا یان دوکانەکێ بگەڕی...",
        pill_all: "هەمی",
        pill_women: "👩 کچان",
        pill_men: "👨 کوڕان",
        pill_kids: "👶 زارۆکان",
        navHome: "سەرەکی",
        navCategories: "پۆلێنەکان",
        navCart: "سەبەتە",
        navProfile: "پرۆفایل",
        langModalTitle: "زمانێ بەرنامەی هەڵبژێرە",
        allCatsTitle: "هەمی بەش و پۆلێنێن بازاڕی",
        profileTitle: "هەژمار و پرۆفایل",
        welcome: "بەخێربێی بۆ بازاڕێ کوردستانێ",
        vendorQ: "دوکانداری؟",
        vendorSub: "دوکانا خۆ ل بازاڕی کرێ بکە و کاڵایێن خۆ بفرۆشە",
        vendorBtn: "کرێکرنا دوکانێ ب واتسئەپێ",
        changeLang: "گۆڕینا زمانی",
        changeLoc: "گۆڕینا باژێڕ و جهی",
        support: "پشتیڤانی و پەیوەندی",
        locationModalTitle: "دەستنیشانکرنا جهێ گەهاندنێ",
        lblGov: "پارێزگەهـ:",
        lblDist: "قەزا / دەڤەر:",
        confirmLocBtn: "پەسەندکرن",
        cartTitle: "سەبەتەیا من",
        cartUnit: "کاڵا",
        subtotal: "کۆژمێ کاڵایان:",
        delivery: "کرێیا گەهاندنێ:",
        total: "کۆژمێ گشتی:",
        checkoutBtn: "تەمامکرنا داواکاریێ ب واتسئەپێ",
        emptyCart: "سەبەتەیا تە یا ڤالایە!",
        addCartBtn: "زێدەکرن بۆ سەلکێ 🛒",
        currencyIQD: "د.ع",
        mallEmptyTitle: "مۆڵ و بازاڕێ نوی یێ کوردستانێ",
        mallEmptyDesc: "ئەڤ بازاڕە نوکە ل قۆناغا دەستپێکێیە! هێشتا دوکان ل ڤێرە نەهاتینە تۆمارکرن.<br><strong>تۆ خودانێ دوکانێ یان بزنسەکی ل کوردستانێ؟</strong>",
        mallEmptyBtn: "دوکانا خۆ ل ڤێرە کرێ بکە",
        categories: {
            all: "هەمی",
            shoes: "پێلاڤ و وەرزش",
            flowers: "گوڵ و دیاری",
            beauty: "جوانکاری و عەتر",
            home: "ناڤماڵ",
            sweets: "شیریناهی",
            fashion: "جلوبەرگ"
        }
    },
    sorani: {
        dir: "rtl",
        brand: "بازاڕ",
        rentHeader: "کرێکردنی دوکان",
        search: "بگەڕێ بۆ کاڵا یان فرۆشگا...",
        pill_all: "هەموو",
        pill_women: "👩 خانمان",
        pill_men: "👨 پیاوان",
        pill_kids: "👶 منداڵان",
        navHome: "سەرەکی",
        navCategories: "پۆلێنەکان",
        navCart: "سەبەتە",
        navProfile: "پرۆفایل",
        langModalTitle: "زمانی ئەپ هەڵبژێرە",
        allCatsTitle: "هەموو بەش و پۆلێنەکانی بازاڕ",
        profileTitle: "ئەژمار و پرۆفایل",
        welcome: "بەخێربێیت بۆ بازاڕی کوردستان",
        vendorQ: "دوکانداریت؟",
        vendorSub: "فرۆشگاکەت لە بازاڕ کرێ بکە و بەرهەمەکانت بفرۆشە",
        vendorBtn: "کرێکردنی دوکان بە واتسئەپ",
        changeLang: "گۆڕینی زمان",
        changeLoc: "گۆڕینی شار و شوێن",
        support: "پشتیوانی و پەیوەندی",
        locationModalTitle: "دیاریکردنی شوێنی گەیاندن",
        lblGov: "پارێزگا:",
        lblDist: "قەزا / ناوچە:",
        confirmLocBtn: "پەسەندکردن",
        cartTitle: "سەبەتەکەم",
        cartUnit: "کاڵا",
        subtotal: "بڕی کاڵاکان:",
        delivery: "کرێی گەیاندن:",
        total: "کۆی گشتی:",
        checkoutBtn: "تەواوکردنی داواکاری بە واتسئەپ",
        emptyCart: "سەبەتەکەت بەتاڵە!",
        addCartBtn: "زیادکردن بۆ سەبەتە 🛒",
        currencyIQD: "د.ع",
        mallEmptyTitle: "مۆڵ و بازاڕی نوێی کوردستان",
        mallEmptyDesc: "ئەم بازاڕە لە قۆناغی دەستپێکدایە! هێشتا دوکانەکان لێرە تۆمار نەکراون.<br><strong>تۆ خاوەنی فرۆشگا یان بزنسێکیت لە کوردستان؟</strong>",
        mallEmptyBtn: "دوکانەکەت لێرە کرێ بکە",
        categories: {
            all: "هەموو",
            shoes: "پێڵاو و وەرزش",
            flowers: "گوڵ و دیاری",
            beauty: "جوانکاری و بۆن",
            home: "ماڵ و کەلوپەل",
            sweets: "شیرینی",
            fashion: "جلوبەرگ"
        }
    },
    arabic: {
        dir: "rtl",
        brand: "بازار",
        rentHeader: "استئجار متجر",
        search: "ابحث عن منتج أو متجر...",
        pill_all: "الكل",
        pill_women: "👩 نساء",
        pill_men: "👨 رجال",
        pill_kids: "👶 أطفال",
        navHome: "الرئيسية",
        navCategories: "الأقسام",
        navCart: "السلة",
        navProfile: "حسابي",
        langModalTitle: "اختر لغة التطبيق",
        allCatsTitle: "جميع أقسام وفئات السوق",
        profileTitle: "الملف الشخصي",
        welcome: "أهلاً بك في بازار كوردستان",
        vendorQ: "هل أنت صاحب متجر؟",
        vendorSub: "استأجر متجرك في البازار وابدأ ببيع منتجاتك",
        vendorBtn: "استئجار متجر عبر واتساب",
        changeLang: "تغيير اللغة",
        changeLoc: "تغيير المدينة والموقع",
        support: "الدعم والمساعدة",
        locationModalTitle: "تحديد موقع التوصيل",
        lblGov: "المحافظة:",
        lblDist: "القضاء / المنطقة:",
        confirmLocBtn: "تأكيد الموقع",
        cartTitle: "سلتي",
        cartUnit: "منتجات",
        subtotal: "مجموع المنتجات:",
        delivery: "أجور التوصيل:",
        total: "المجموع الكلي:",
        checkoutBtn: "إتمام الطلب عبر واتساب",
        emptyCart: "سلة التسوق فارغة!",
        addCartBtn: "إضافة إلى السلة 🛒",
        currencyIQD: "د.ع",
        mallEmptyTitle: "سوق ومول كوردستان الجديد",
        mallEmptyDesc: "هذا البازار في مرحلة الإطلاق الأولية! لم يتم إدراج المتاجر بعد.<br><strong>هل أنت صاحب متجر أو مشروع تجاري في كوردستان؟</strong>",
        mallEmptyBtn: "استأجر متجرك وابدأ البيع هنا",
        categories: {
            all: "الكل",
            shoes: "أحذية ورياضة",
            flowers: "زهور وهدايا",
            beauty: "تجميل وعطور",
            home: "مستلزمات منزلية",
            sweets: "حلويات ومكسرات",
            fashion: "أزياء وملابس"
        }
    },
    english: {
        dir: "ltr",
        brand: "Bazar",
        rentHeader: "Rent a Store",
        search: "Search products or stores...",
        pill_all: "All",
        pill_women: "👩 Women",
        pill_men: "👨 Men",
        pill_kids: "👶 Kids",
        navHome: "Home",
        navCategories: "Categories",
        navCart: "Cart",
        navProfile: "Profile",
        langModalTitle: "Select App Language",
        allCatsTitle: "All Market Categories",
        profileTitle: "Account & Profile",
        welcome: "Welcome to Kurdistan Bazar",
        vendorQ: "Are you a store owner?",
        vendorSub: "Rent your store and start selling products locally",
        vendorBtn: "Rent Store via WhatsApp",
        changeLang: "Change Language",
        changeLoc: "Change City & Location",
        support: "Support & Contact",
        locationModalTitle: "Select Delivery Location",
        lblGov: "Governorate:",
        lblDist: "District / Area:",
        confirmLocBtn: "Confirm Location",
        cartTitle: "My Cart",
        cartUnit: "items",
        subtotal: "Subtotal:",
        delivery: "Delivery Fee:",
        total: "Total:",
        checkoutBtn: "Checkout via WhatsApp",
        emptyCart: "Your cart is empty!",
        addCartBtn: "Add to Cart 🛒",
        currencyIQD: "IQD",
        mallEmptyTitle: "Kurdistan Grand Online Bazar",
        mallEmptyDesc: "This marketplace is brand new! Stores have not listed their products yet.<br><strong>Are you a business or store owner in Kurdistan?</strong>",
        mallEmptyBtn: "Rent Your Store Space Here",
        categories: {
            all: "All",
            shoes: "Shoes & Sports",
            flowers: "Flowers & Gifts",
            beauty: "Beauty & Perfume",
            home: "Home Living",
            sweets: "Sweets & Nuts",
            fashion: "Fashion & Wear"
        }
    }
};

let currentLang = "badini";

/* پارێزگەهـ و قەزایان */
const kurdistanLocations = {
    duhok: {
        name: "دهۆک",
        districts: ["ناوەند", "زاخۆ", "سێمێل", "ئامێدی", "ئاکرێ", "شێخان", "بەردەڕەش"]
    },
    erbil: {
        name: "هەولێر",
        districts: ["ناوەند", "سۆران", "شەقڵاوە", "کۆیە", "خەبات", "ڕەواندوز"]
    },
    sulaymaniyah: {
        name: "سلێمانی",
        districts: ["ناوەند", "ڕانیە", "قەڵادزێ", "کەلار", "دەربەندیخان", "دوکان"]
    },
    halabja: {
        name: "هەڵەبجە",
        districts: ["ناوەند", "شارەزوور", "سەیدسادق", "خورماڵ", "بیارە"]
    }
};

/* پۆلێن */
const marketCategories = [
    { id: "all", icon: "✨" },
    { id: "shoes", icon: "👟" },
    { id: "flowers", icon: "💐" },
    { id: "beauty", icon: "💄" },
    { id: "home", icon: "🏠" },
    { id: "sweets", icon: "🍫" },
    { id: "fashion", icon: "👗" }
];

/* لیستا بەرهەمان نوکە ڤالایە */
const productsDatabase = [];

let selectedGov = "duhok";
let selectedDist = "ناوەند";
let selectedGender = "all";
let selectedCategory = "all";
let cart = [];

/* ========================================================
   نامەیا واتسئەپێ یا کرێکرنا دوکانێ (WhatsApp Store Rental)
======================================================== */
function rentStoreWhatsApp() {
    const govName = kurdistanLocations[selectedGov].name;
    const msg = `سڵاو، ئەز خودانێ دوکانێ / بزنسەکی مە ل پارێزگەها (${govName} - ${selectedDist}).\nدڤێت دوکانا خۆ د ئەپێ بازاڕێ کوردستانێ دا تۆمار بکەم و کرێ بکەم.\nتکایە زانیاری و مەرجێن کرێکرنێ بۆ من بنێرە.`;
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ========================================================
   گۆڕینا زمانی ب شێوەیەکێ دەستبەجێ
======================================================== */
function selectLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    const t = translations[lang];

    document.documentElement.dir = t.dir;
    document.documentElement.lang = (lang === 'english' ? 'en' : (lang === 'arabic' ? 'ar' : 'ku'));

    document.getElementById("t_brand").innerText = t.brand;
    document.getElementById("t_rentHeader").innerText = t.rentHeader;
    document.getElementById("searchInput").placeholder = t.search;
    document.getElementById("pill_all").innerText = t.pill_all;
    document.getElementById("pill_women").innerText = t.pill_women;
    document.getElementById("pill_men").innerText = t.pill_men;
    document.getElementById("pill_kids").innerText = t.pill_kids;

    document.getElementById("t_navHome").innerText = t.navHome;
    document.getElementById("t_navCategories").innerText = t.navCategories;
    document.getElementById("t_navCart").innerText = t.navCart;
    document.getElementById("t_navProfile").innerText = t.navProfile;

    document.getElementById("t_langModalTitle").innerText = t.langModalTitle;
    document.getElementById("t_allCatsTitle").innerText = t.allCatsTitle;
    document.getElementById("t_profileTitle").innerText = t.profileTitle;
    document.getElementById("t_welcome").innerText = t.welcome;
    document.getElementById("t_vendorQ").innerText = t.vendorQ;
    document.getElementById("t_vendorSub").innerText = t.vendorSub;
    document.getElementById("t_vendorBtn").innerText = t.vendorBtn;
    document.getElementById("t_changeLang").innerText = t.changeLang;
    document.getElementById("t_changeLoc").innerText = t.changeLoc;
    document.getElementById("t_support").innerText = t.support;

    document.getElementById("t_locationModalTitle").innerText = t.locationModalTitle;
    document.getElementById("t_lblGov").innerText = t.lblGov;
    document.getElementById("t_lblDist").innerText = t.lblDist;
    document.getElementById("t_confirmLocBtn").innerText = t.confirmLocBtn;

    document.getElementById("t_cartTitle").innerText = t.cartTitle;
    document.getElementById("t_cartUnit").innerText = t.cartUnit;
    document.getElementById("t_subtotal").innerText = t.subtotal;
    document.getElementById("t_delivery").innerText = t.delivery;
    document.getElementById("t_total").innerText = t.total;
    document.getElementById("t_checkoutBtn").innerText = t.checkoutBtn;

    document.querySelectorAll(".lang-option").forEach(btn => {
        if (btn.getAttribute("data-lang") === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    initCategories();
    renderProducts();
    updateCartUI();
    closeLanguageModal();
}

function openLanguageModal() {
    document.getElementById("languageModal").classList.add("open");
}

function closeLanguageModal() {
    document.getElementById("languageModal").classList.remove("open");
}

/* ========================================================
   پۆلێن و کاڵا
======================================================== */
function initCategories() {
    const bar = document.getElementById("categoriesBar");
    const t = translations[currentLang];
    bar.innerHTML = marketCategories.map(cat => `
        <div class="cat-circle-item ${cat.id === selectedCategory ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
            <div class="cat-circle-icon">${cat.icon}</div>
            <span>${t.categories[cat.id] || cat.id}</span>
        </div>
    `).join("");
}

function selectCategory(catId) {
    selectedCategory = catId;
    initCategories();
    renderProducts();
}

function setGenderFilter(gender, btn) {
    document.querySelectorAll(".gender-pills .pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    selectedGender = gender;
    renderProducts();
}

function filterProducts() {
    renderProducts();
}

function renderProducts() {
    const container = document.getElementById("productsContainer");
    const t = translations[currentLang];

    // ئەگەر مۆڵ یا ڤالابیت
    if(productsDatabase.length === 0) {
        container.innerHTML = `
            <div class="empty-mall-card">
                <div class="mall-icon">🏬✨</div>
                <h3>${t.mallEmptyTitle}</h3>
                <p>${t.mallEmptyDesc}</p>
                <button class="cta-btn" onclick="rentStoreWhatsApp()">
                    <i class="fa-brands fa-whatsapp"></i> ${t.mallEmptyBtn}
                </button>
            </div>
        `;
        return;
    }
}

/* ========================================================
   دوگمەیێن بنێ شاشەی (Navigation)
======================================================== */
function switchTab(tab) {
    document.querySelectorAll(".bottom-nav .nav-item").forEach(el => el.classList.remove("active"));

    if (tab === 'home') {
        document.getElementById("navHome").classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'categories') {
        document.getElementById("navCategories").classList.add("active");
        openCategoriesModal();
    } else if (tab === 'profile') {
        document.getElementById("navProfile").classList.add("active");
        openProfileModal();
    }
}

function openCategoriesModal() {
    const box = document.getElementById("allCategoriesList");
    const t = translations[currentLang];
    box.innerHTML = marketCategories.filter(c => c.id !== 'all').map(cat => `
        <div class="cat-full-row" onclick="selectCategoryFromModal('${cat.id}')">
            <span>${cat.icon}</span>
            <span style="flex-grow:1; text-align:inherit;">${t.categories[cat.id]}</span>
            <i class="fa-solid fa-chevron-left nav-arrow"></i>
        </div>
    `).join("");
    document.getElementById("categoriesModal").classList.add("open");
}

function closeCategoriesModal() {
    document.getElementById("categoriesModal").classList.remove("open");
    document.getElementById("navHome").classList.add("active");
    document.getElementById("navCategories").classList.remove("active");
}

function selectCategoryFromModal(catId) {
    selectCategory(catId);
    closeCategoriesModal();
}

function openProfileModal() {
    const govName = kurdistanLocations[selectedGov].name;
    document.getElementById("profileCityText").innerText = `${govName} - ${selectedDist}، کوردستان`;
    document.getElementById("profileModal").classList.add("open");
}

function closeProfileModal() {
    document.getElementById("profileModal").classList.remove("open");
    document.getElementById("navHome").classList.add("active");
    document.getElementById("navProfile").classList.remove("active");
}

function contactSupportWhatsApp() {
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent("سڵاو، پرسیارەکم هەبوو دەربارەی بازاڕی:")}`, "_blank");
}

/* ========================================================
   جهێ گەهاندنێ
======================================================== */
function openLocationModal() {
    document.getElementById("locationModal").classList.add("open");
    renderGovernorates();
    renderDistricts();
}

function closeLocationModal() {
    document.getElementById("locationModal").classList.remove("open");
}

function renderGovernorates() {
    const box = document.getElementById("governorateChips");
    box.innerHTML = Object.keys(kurdistanLocations).map(key => `
        <button class="chip-btn ${key === selectedGov ? 'active' : ''}" onclick="selectGov('${key}')">
            ${kurdistanLocations[key].name}
        </button>
    `).join("");
}

function selectGov(key) {
    selectedGov = key;
    selectedDist = kurdistanLocations[key].districts[0];
    renderGovernorates();
    renderDistricts();
}

function renderDistricts() {
    const box = document.getElementById("districtChips");
    const districts = kurdistanLocations[selectedGov].districts;
    box.innerHTML = districts.map(d => `
        <button class="chip-btn ${d === selectedDist ? 'active' : ''}" onclick="selectDist('${d}')">
            ${d}
        </button>
    `).join("");
}

function selectDist(d) {
    selectedDist = d;
    renderDistricts();
}

function confirmLocation() {
    const govName = kurdistanLocations[selectedGov].name;
    document.getElementById("currentLocationText").innerText = `${govName} - ${selectedDist}`;
    closeLocationModal();
}

/* ========================================================
   سەبەتە
======================================================== */
function updateCartUI() {
    const t = translations[currentLang];
    document.getElementById("cartCountBadge").innerText = cart.length;
    document.getElementById("cartTotalItems").innerText = cart.length;

    const list = document.getElementById("cartItemsList");
    list.innerHTML = cart.length === 0 ? `<div style="text-align:center; padding:20px; color:#888;">${t.emptyCart}</div>` : '';

    document.getElementById("subtotalPrice").innerText = `0 ${t.currencyIQD}`;
    document.getElementById("deliveryFee").innerText = `0 ${t.currencyIQD}`;
    document.getElementById("finalTotalPrice").innerText = `0 ${t.currencyIQD}`;
}

function openCart() {
    document.getElementById("cartModal").classList.add("open");
}

function closeCart() {
    document.getElementById("cartModal").classList.remove("open");
}

function checkoutWhatsApp() {
    const t = translations[currentLang];
    alert(t.emptyCart);
}

/* دەستپێکرنا ئەپێ */
window.onload = () => {
    selectLanguage("badini");
};