/* ========================================================
   ١. گرێدانا داتابەیسا Firebase (Firestore)
======================================================== */
const firebaseConfig = {
    apiKey: "AIzaSyDhz6711dI7pfD53UaK9-GSQ27cGLAY274",
    authDomain: "bazar-kurdistan.firebaseapp.com",
    projectId: "bazar-kurdistan",
    storageBucket: "bazar-kurdistan.firebasestorage.app",
    messagingSenderId: "932431440393",
    appId: "1:932431440393:web:a486807e5784b8686726d8",
    measurementId: "G-PMD00MRVGV"
};

let db = null;
try {
    if (typeof firebase !== "undefined") {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
    }
} catch(e) {
    console.error("Firebase Error:", e);
}

const ADMIN_WHATSAPP_NUMBER = "9647504799202";
const RATE_100_DOLLARS = 153000;
const RATE_1_DOLLAR = RATE_100_DOLLARS / 100;

let activeVendor = null;
let currentProductBase64 = "";
let allLiveProducts = [];
let allStoresList = [];
let currentCategory = "all";
let currentGender = "all";
let searchQuery = "";
let currentLang = "badini";
let cart = [];
let authMode = "login";
let userAvatarBase64 = "";

function safeSet(id, text) { 
    const el = document.getElementById(id); 
    if (el) el.innerText = text; 
}

/* ========================================================
   ٢. ناڤێ باژێڕ و قەزایان ب ٤ زمانان
======================================================== */
const kurdistanLocations = {
    duhok: {
        names: { badini: "دهۆک", sorani: "دهۆک", arabic: "دهوك", english: "Duhok" },
        districts: {
            badini: ["ناوەند", "زاخۆ", "سێمێل", "ئامێدی", "ئاکرێ", "شێخان", "بەردەڕەش"],
            sorani: ["ناوەند", "زاخۆ", "سێمێڵ", "ئامێدی", "ئاکرێ", "شێخان", "بەردەڕەش"],
            arabic: ["المركز", "زاخو", "سميل", "العمادية", "عقرة", "الشيخان", "بردرش"],
            english: ["Center", "Zakho", "Semel", "Amedi", "Akre", "Shekhan", "Bardarash"]
        }
    },
    erbil: {
        names: { badini: "هەولێر", sorani: "هەولێر", arabic: "أربيل", english: "Erbil" },
        districts: {
            badini: ["ناوەند", "سۆران", "شەقڵاوە", "کۆیە", "خەبات"],
            sorani: ["ناوەند", "سۆران", "شەقڵاوە", "کۆیە", "خەبات"],
            arabic: ["المركز", "سوران", "شقلاوة", "كويسنجق", "خبات"],
            english: ["Center", "Soran", "Shaqlawa", "Koya", "Khabat"]
        }
    },
    sulaymaniyah: {
        names: { badini: "سلێمانی", sorani: "سلێمانی", arabic: "السليمانية", english: "Sulaymaniyah" },
        districts: {
            badini: ["ناوەند", "ڕانیە", "قەڵادزێ", "کەلار"],
            sorani: ["ناوەند", "ڕانیە", "قەڵادزێ", "کەلار"],
            arabic: ["المركز", "رانية", "قلعة دزة", "كلار"],
            english: ["Center", "Ranya", "Qaladiza", "Kalar"]
        }
    },
    halabja: {
        names: { badini: "هەڵەبجە", sorani: "هەڵەبجە", arabic: "حلبجة", english: "Halabja" },
        districts: {
            badini: ["ناوەند", "شارەزوور", "خورماڵ"],
            sorani: ["ناوەند", "شارەزوور", "خورماڵ"],
            arabic: ["المركز", "شارزور", "خورمال"],
            english: ["Center", "Sharazoor", "Khurmal"]
        }
    }
};

let selectedGovKey = "duhok";
let selectedDistIndex = 0;

/* ========================================================
   ٣. فەرهەنگا وەرگێڕانێ ب ٤ زمانان
======================================================== */
const translations = {
    badini: {
        dir: "rtl",
        brand: "بازاڕ",
        searchPlaceholder: "ل کاڵا یان دوکانەکێ بگەڕی...",
        pill_all: "هەمی", pill_women: "👩 کچان", pill_men: "👨 کوڕان", pill_kids: "👶 زارۆکان",
        cat_all: "هەمی", cat_shoes: "پێلاڤ و وەرزش", cat_fashion: "جلوبەرگ", cat_flowers: "گوڵ و دیاری",
        cat_beauty: "جوانکاری و بۆن", cat_home: "ناڤماڵ", cat_sweets: "شیریناهی",
        navHome: "سەرەکی", navCategories: "پۆلێن", navCart: "سەبەتە", navProfile: "پرۆفایل",
        profileTitle: "پرۆفایل و هەژمار",
        welcomeUser: "بەخێربێی بۆ بازاڕ",
        choiceCustomerTitle: "هەژمارا کڕیاری (مشتری)",
        choiceCustomerDesc: "ناڤ، تەلەفۆن، ناڤنیشان و لۆکەیشنا GPS تۆمار بکە",
        choiceGoCustomer: "ڤەکرن",
        choiceVendorTitle: "پانێلا دوکانداران",
        choiceVendorDesc: "چوونەژوور، دروستکرنی دوکانێ، و دانانا بەرهەمان",
        choiceGoVendor: "ڤەکرن",
        changeLangLink: "گۆڕینا زمانێ بەرنامەی",
        contactLink: "پشتیڤانی و پەیوەندی ب مە",
        backHub: "زڤڕین",
        subCustTitle: "زانیاریێن کڕیاری",
        subVendTitle: "دەرگەهێ دوکانداران",
        lbl_userName: "ناڤێ تە یێ سیانی:",
        ph_userName: "ناڤێ خۆ بنڤیسە",
        lbl_userPhone: "ژمارەیا تەلەفۆنێ (WhatsApp):",
        lbl_userEmail: "ئیمەیڵ (دڵخوازانە):",
        lbl_userGps: "جهێ نەخشەیێ GPS (بۆ گەهاندنا کاڵایان):",
        ph_userGps: "نەخشە دیار نینە",
        saveProfileBtn: "پاراستنا زانیارییان",
        vGateTitle: "بەڕێوەبردنا دوکانێ",
        vGateSub: "چوونەژوور ب تەلەفۆن و پاسۆردێ نهێنی",
        vBtnLogin: "چوونەژوور",
        vBtnReg: "تۆمارکرنی دوکانێ",
        cartModalTitle: "سەبەتەیا کڕینێ",
        cartEmptyText: "سەبەتە یا بەتاڵە!",
        rateTitle: "نرخێ بۆڕسەیا ئەڤرۆ (100$):",
        totalIqdTitle: "کۆیێ گشتی ب دینار:",
        totalUsdTitle: "کۆیێ گشتی ب دۆلار ($):",
        checkoutBtn: "ناردنا داواکاریێ ب واتسئەپێ",
        locModalTitle: "دەستنیشانکرنا باژێڕ و قەزایێ",
        govLabel: "پارێزگەهـ:",
        distLabel: "قەزا و ناوەند:",
        confirmLocBtn: "تەواو و جێگیرکردن",
        langModalTitle: "زمان / Language",
        alertEmptyInputs: "تکایە سەرەتا ناڤ و ژمارەیا تەلەفۆنا خۆ بنڤیسە!",
        alertSavedSuccess: "زانیاری ب سەرکەفتی هاتنە پاراستن!",
        addToCartBtn: "🛒 سەبەتە",
        emptyFeedTitle: "کاڵایەک نەهاتە دیتن!",
        emptyFeedDesc: "تەماشەی پۆلێنەکا دی یان گەڕیانەکا نوو بکە."
    },
    sorani: {
        dir: "rtl",
        brand: "بازاڕ",
        searchPlaceholder: "بگەڕێ بۆ کاڵا یان دوکانێک...",
        pill_all: "هەمووی", pill_women: "👩 ئافرەتان", pill_men: "👨 پیاوان", pill_kids: "👶 منداڵان",
        cat_all: "هەمووی", cat_shoes: "پێڵاو و وەرزش", cat_fashion: "جلوبەرگ", cat_flowers: "گوڵ و دیاری",
        cat_beauty: "جوانی و بۆن", cat_home: "ماڵ و ناوماڵ", cat_sweets: "شیرینی",
        navHome: "سەرەکی", navCategories: "پۆلەکان", navCart: "سەبەتە", navProfile: "پرۆفایل",
        profileTitle: "هەژمار و پرۆفایل",
        welcomeUser: "بەخێربێیت بۆ بازاڕ",
        choiceCustomerTitle: "ئەکاونتی کڕیار (مشتری)",
        choiceCustomerDesc: "ناو، مۆبایل، ناونیشان و لۆکەیشنی GPS پاشەکەوت بکە",
        choiceGoCustomer: "کردنەوە",
        choiceVendorTitle: "پانێڵی فرۆشیاران",
        choiceVendorDesc: "چوونەژوورەوە، دروستکردنی دوکان، و بەڕێوەبردن",
        choiceGoVendor: "کردنەوە",
        changeLangLink: "گۆڕینی زمانی بەرنامە",
        contactLink: "پشتیوانی و پەیوەندیکردن بە ئێمە",
        backHub: "گەڕانەوە",
        subCustTitle: "زانیارییەکانی کڕیار",
        subVendTitle: "دەروازەی فرۆشیاران",
        lbl_userName: "ناوی سیانیت:",
        ph_userName: "ناوت بنووسە",
        lbl_userPhone: "ژمارەی مۆبایل (WhatsApp):",
        lbl_userEmail: "ئیمەیڵ (ئارەزوومەندانە):",
        lbl_userGps: "شوێنی نەخشەی GPS (بۆ گەیاندنی کاڵا):",
        ph_userGps: "نەخشە دیاری نەکراوە",
        saveProfileBtn: "پاشەکەوتکردنی زانیارییەکان",
        vGateTitle: "بەڕێوەبردنی دوکان",
        vGateSub: "چوونەژوورەوە بە مۆبایل و پاسۆردی نهێنی",
        vBtnLogin: "چوونەژوورەوە",
        vBtnReg: "تۆمارکردنی دوکان",
        cartModalTitle: "سەبەتەی کڕین",
        cartEmptyText: "سەبەتە بەتاڵە!",
        rateTitle: "نرخی بۆڕسەی ئەمڕۆ (100$):",
        totalIqdTitle: "کۆی گشتی بە دینار:",
        totalUsdTitle: "کۆی گشتی بە دۆلار ($):",
        checkoutBtn: "ناردنی داواکاری بە وەتسئەپ",
        locModalTitle: "دیاریکردنی شار و قەزا",
        govLabel: "پارێزگا:",
        distLabel: "قەزا و ناوەند:",
        confirmLocBtn: "تەواو و جێگیرکردن",
        langModalTitle: "زمان / Language",
        alertEmptyInputs: "تکایە سەرەتا ناو و ژمارەی مۆبایلی خۆت بنووسە!",
        alertSavedSuccess: "زانیارییەکان بە سەرکەوتوویی پاشەکەوت کران!",
        addToCartBtn: "🛒 سەبەتە",
        emptyFeedTitle: "هیچ کاڵایەک نەدۆزرایەوە!",
        emptyFeedDesc: "سەیری بەشێکی تر بکە یان دووبارە بگەڕێ."
    },
    arabic: {
        dir: "rtl",
        brand: "بازار",
        searchPlaceholder: "ابحث عن منتج أو متجر...",
        pill_all: "الكل", pill_women: "👩 نسائي", pill_men: "👨 رجالي", pill_kids: "👶 أطفال",
        cat_all: "الكل", cat_shoes: "أحذية ورياضة", cat_fashion: "ملابس وأزياء", cat_flowers: "زهور وهدايا",
        cat_beauty: "تجميل وعطور", cat_home: "مستلزمات منزلية", cat_sweets: "حلويات",
        navHome: "الرئيسية", navCategories: "الأقسام", navCart: "السلة", navProfile: "الحساب",
        profileTitle: "الملف الشخصي والحساب",
        welcomeUser: "أهلاً بك في بازار",
        choiceCustomerTitle: "حساب المشتري (الزبون)",
        choiceCustomerDesc: "حفظ الاسم، الهاتف، العنوان وموقع الخريطة GPS",
        choiceGoCustomer: "فتح",
        choiceVendorTitle: "بوابة أصحاب المتاجر",
        choiceVendorDesc: "تسجيل الدخول، إنشاء متجر، وإضافة المنتجات",
        choiceGoVendor: "فتح",
        changeLangLink: "تغيير لغة التطبيق",
        contactLink: "الدعم الفني وتواصل معنا",
        backHub: "رجوع",
        subCustTitle: "بيانات المشتري",
        subVendTitle: "بوابة المتاجر",
        lbl_userName: "الاسم الثلاثي:",
        ph_userName: "اكتب اسمك هنا",
        lbl_userPhone: "رقم الهاتف (واتساب):",
        lbl_userEmail: "البريد الإلكتروني (اختياري):",
        lbl_userGps: "موقع GPS (لتوصيل الطلبات):",
        ph_userGps: "لم يتم تحديد الموقع",
        saveProfileBtn: "حفظ المعلومات",
        vGateTitle: "إدارة المتجر",
        vGateSub: "الدخول عبر رقم الهاتف وكلمة المرور",
        vBtnLogin: "تسجيل الدخول",
        vBtnReg: "تسجيل متجر جديد",
        cartModalTitle: "سلة المشتريات",
        cartEmptyText: "السلة فارغة!",
        rateTitle: "سعر الصرف اليوم (100$):",
        totalIqdTitle: "المجموع الكلي بالدينار:",
        totalUsdTitle: "المجموع بالدولار ($):",
        checkoutBtn: "إرسال الطلب عبر واتساب",
        locModalTitle: "تحديد المحافظة والقضاء",
        govLabel: "المحافظة:",
        distLabel: "القضاء والمركز:",
        confirmLocBtn: "تأكيد وتثبيت الموقع",
        langModalTitle: "اللغة / Language",
        alertEmptyInputs: "يرجى كتابة الاسم ورقم الهاتف أولاً!",
        alertSavedSuccess: "تم حفظ البيانات بنجاح!",
        addToCartBtn: "🛒 السلة",
        emptyFeedTitle: "لم يتم العثور على منتجات!",
        emptyFeedDesc: "يرجى تجربة قسم آخر أو البحث مجدداً."
    },
    english: {
        dir: "ltr",
        brand: "Bazar",
        searchPlaceholder: "Search products or shops...",
        pill_all: "All", pill_women: "👩 Women", pill_men: "👨 Men", pill_kids: "👶 Kids",
        cat_all: "All", cat_shoes: "Shoes & Sport", cat_fashion: "Fashion", cat_flowers: "Flowers & Gifts",
        cat_beauty: "Beauty & Perfumes", cat_home: "Home Decor", cat_sweets: "Sweets",
        navHome: "Home", navCategories: "Categories", navCart: "Cart", navProfile: "Profile",
        profileTitle: "Profile & Account",
        welcomeUser: "Welcome to Bazar",
        choiceCustomerTitle: "Customer Account (Buyer)",
        choiceCustomerDesc: "Save your name, phone, address and GPS location",
        choiceGoCustomer: "Open",
        choiceVendorTitle: "Vendor Portal (Sellers)",
        choiceVendorDesc: "Login, register store, and manage your catalog",
        choiceGoVendor: "Open",
        changeLangLink: "Change Language",
        contactLink: "Support & Contact Us",
        backHub: "Back",
        subCustTitle: "Customer Information",
        subVendTitle: "Vendor Gateway",
        lbl_userName: "Full Name:",
        ph_userName: "Enter your name",
        lbl_userPhone: "Phone Number (WhatsApp):",
        lbl_userEmail: "Email (Optional):",
        lbl_userGps: "GPS Map Location (For Delivery):",
        ph_userGps: "Location not set",
        saveProfileBtn: "Save Information",
        vGateTitle: "Store Management",
        vGateSub: "Sign in with phone and secret password",
        vBtnLogin: "Sign In",
        vBtnReg: "Register Store",
        cartModalTitle: "Shopping Cart",
        cartEmptyText: "Your cart is empty!",
        rateTitle: "Today Exchange Rate ($100):",
        totalIqdTitle: "Total in IQD:",
        totalUsdTitle: "Total in USD ($):",
        checkoutBtn: "Checkout via WhatsApp",
        locModalTitle: "Select City & District",
        govLabel: "Governorate:",
        distLabel: "District / Center:",
        confirmLocBtn: "Confirm & Apply",
        langModalTitle: "Language",
        alertEmptyInputs: "Please enter your name and phone number first!",
        alertSavedSuccess: "Information saved successfully!",
        addToCartBtn: "🛒 Add to Cart",
        emptyFeedTitle: "No products found!",
        emptyFeedDesc: "Try browsing another category or searching again."
    }
};

window.openLanguageModal = function() { 
    document.getElementById("languageModal").classList.add("open"); 
};
window.closeLanguageModal = function() { 
    document.getElementById("languageModal").classList.remove("open"); 
};
window.switchLangFromProfile = function() { 
    closeProfileModal(); 
    openLanguageModal(); 
};

window.selectLanguage = function(langKey) {
    if (!translations[langKey]) return;
    currentLang = langKey;
    localStorage.setItem("bazar_app_lang", langKey);
    applyLanguage(langKey);
    closeLanguageModal();
};

function loadSavedLanguage() {
    const saved = localStorage.getItem("bazar_app_lang") || "badini";
    currentLang = saved;
    applyLanguage(saved);
}

function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.dir = t.dir;
    document.documentElement.lang = (lang === "english") ? "en" : (lang === "arabic" ? "ar" : "ku");

    safeSet("t_brand", t.brand);
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    safeSet("pill_all", t.pill_all);
    safeSet("pill_women", t.pill_women);
    safeSet("pill_men", t.pill_men);
    safeSet("pill_kids", t.pill_kids);

    safeSet("cat_all", t.cat_all);
    safeSet("cat_shoes", t.cat_shoes);
    safeSet("cat_fashion", t.cat_fashion);
    safeSet("cat_flowers", t.cat_flowers);
    safeSet("cat_beauty", t.cat_beauty);
    safeSet("cat_home", t.cat_home);
    safeSet("cat_sweets", t.cat_sweets);

    safeSet("t_navHome", t.navHome);
    safeSet("t_navCategories", t.navCategories);
    safeSet("t_navCart", t.navCart);
    safeSet("t_navProfile", t.navProfile);

    // پرۆفایل
    safeSet("t_profileTitle", t.profileTitle);
    safeSet("t_choiceCustomerTitle", t.choiceCustomerTitle);
    safeSet("t_choiceCustomerDesc", t.choiceCustomerDesc);
    safeSet("t_choiceGoCustomer", t.choiceGoCustomer);
    safeSet("t_choiceVendorTitle", t.choiceVendorTitle);
    safeSet("t_choiceVendorDesc", t.choiceVendorDesc);
    safeSet("t_choiceGoVendor", t.choiceGoVendor);

    safeSet("t_changeLangLink", t.changeLangLink);
    safeSet("t_contactLink", t.contactLink);
    safeSet("t_backHub1", t.backHub);
    safeSet("t_backHub2", t.backHub);
    safeSet("t_subCustTitle", t.subCustTitle);
    safeSet("t_subVendTitle", t.subVendTitle);

    safeSet("lbl_userName", t.lbl_userName);
    const nameInput = document.getElementById("userNameInput");
    if (nameInput) nameInput.placeholder = t.ph_userName;

    safeSet("lbl_userPhone", t.lbl_userPhone);
    safeSet("lbl_userEmail", t.lbl_userEmail);
    safeSet("lbl_userGps", t.lbl_userGps);
    const gpsInput = document.getElementById("userGpsCoordinates");
    if (gpsInput && !gpsInput.value) gpsInput.placeholder = t.ph_userGps;

    safeSet("t_saveProfileBtn", t.saveProfileBtn);
    safeSet("t_vGateTitle", t.vGateTitle);
    safeSet("t_vGateSub", t.vGateSub);
    safeSet("t_vBtnLogin", t.vBtnLogin);
    safeSet("t_vBtnReg", t.vBtnReg);

    // باژێڕ و قەزا
    safeSet("t_locModalTitle", t.locModalTitle);
    safeSet("t_govLabel", t.govLabel);
    safeSet("t_distLabel", t.distLabel);
    safeSet("t_confirmLocBtn", t.confirmLocBtn);
    safeSet("t_langModalTitle", t.langModalTitle);

    // سەبەتە
    safeSet("t_cartModalTitle", t.cartModalTitle);
    safeSet("t_rateTitle", t.rateTitle);
    safeSet("t_totalIqdTitle", t.totalIqdTitle);
    safeSet("t_totalUsdTitle", t.totalUsdTitle);
    const checkBtn = document.getElementById("t_checkoutBtn");
    if (checkBtn) checkBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${t.checkoutBtn}`;

    // ناڤێ کڕیاری
    const savedAcc = localStorage.getItem("bazar_user_account");
    if (savedAcc) {
        try {
            const u = JSON.parse(savedAcc);
            safeSet("displayUserName", u.name || t.welcomeUser);
        } catch(e) { safeSet("displayUserName", t.welcomeUser); }
    } else {
        safeSet("displayUserName", t.welcomeUser);
    }

    document.querySelectorAll(".lang-option-btn").forEach(btn => {
        if (btn.getAttribute("data-lang") === lang) btn.classList.add("active");
        else btn.classList.remove("active");
    });

    renderMainFeed();
    updateCartUI();
    renderGovernorates();
    renderDistricts();
    updateLocationUI();
}

/* ========================================================
   ٤. جهـ و نەخشە (Location System)
======================================================== */
function loadSavedLocation() {
    try {
        const saved = localStorage.getItem("bazar_user_location_idx");
        if (saved) {
            const loc = JSON.parse(saved);
            selectedGovKey = loc.govKey || "duhok";
            selectedDistIndex = loc.distIndex || 0;
        }
    } catch(e) {}
    updateLocationUI();
}

function updateLocationUI() {
    const govObj = kurdistanLocations[selectedGovKey];
    if (!govObj) return;

    const gName = govObj.names[currentLang] || govObj.names.badini;
    const distList = govObj.districts[currentLang] || govObj.districts.badini;
    const dName = distList[selectedDistIndex] || distList[0];

    const kurdCountry = (currentLang === "english") ? "Kurdistan" : (currentLang === "arabic" ? "كوردستان" : "کوردستان");

    safeSet("currentLocationText", `${gName} - ${dName}`);
    safeSet("profileCityText", `${gName} - ${dName}، ${kurdCountry}`);
}

window.openLocationModal = function() {
    document.getElementById("locationModal").classList.add("open");
    renderGovernorates();
    renderDistricts();
};

window.closeLocationModal = function() { 
    document.getElementById("locationModal").classList.remove("open"); 
};

function renderGovernorates() {
    const box = document.getElementById("governorateChips");
    if (!box) return;
    box.innerHTML = Object.keys(kurdistanLocations).map(k => {
        const name = kurdistanLocations[k].names[currentLang] || kurdistanLocations[k].names.badini;
        return `<button class="chip-btn ${k === selectedGovKey ? 'active' : ''}" onclick="selectGov('${k}')">${name}</button>`;
    }).join("");
}

window.selectGov = function(k) {
    selectedGovKey = k;
    selectedDistIndex = 0;
    renderGovernorates();
    renderDistricts();
};

function renderDistricts() {
    const box = document.getElementById("districtChips");
    if (!box) return;
    const distList = kurdistanLocations[selectedGovKey].districts[currentLang] || kurdistanLocations[selectedGovKey].districts.badini;

    box.innerHTML = distList.map((d, idx) => `
        <button class="chip-btn ${idx === selectedDistIndex ? 'active' : ''}" onclick="selectDist(${idx})">${d}</button>
    `).join("");
}

window.selectDist = function(idx) {
    selectedDistIndex = idx;
    renderDistricts();
    localStorage.setItem("bazar_user_location_idx", JSON.stringify({ govKey: selectedGovKey, distIndex: selectedDistIndex }));
    updateLocationUI();
};

window.confirmLocation = function() { 
    closeLocationModal(); 
};

/* ========================================================
   ٥. کۆنترۆلا بەشێن پرۆفایلێ (Hub, Customer, Vendor)
======================================================== */
window.showProfileSection = function(section) {
    const hub = document.getElementById("profileMainHub");
    const cust = document.getElementById("customerSubSection");
    const vend = document.getElementById("vendorSubSection");

    if (section === "customer") {
        hub.style.display = "none";
        cust.style.display = "block";
        vend.style.display = "none";
    } else if (section === "vendor") {
        hub.style.display = "none";
        cust.style.display = "none";
        vend.style.display = "block";
    } else {
        hub.style.display = "block";
        cust.style.display = "none";
        vend.style.display = "none";
    }
};

window.saveUserProfile = function() {
    const name = document.getElementById("userNameInput").value.trim();
    const phone = document.getElementById("userPhoneInput").value.trim();
    const email = document.getElementById("userEmailInput").value.trim();
    const gps = document.getElementById("userGpsCoordinates").value;

    const t = translations[currentLang] || translations.badini;

    if (!name || !phone) {
        alert(t.alertEmptyInputs);
        return;
    }

    localStorage.setItem("bazar_user_account", JSON.stringify({ name, phone, email, gps, avatar: userAvatarBase64 }));
    safeSet("displayUserName", name);
    alert(t.alertSavedSuccess);
};

function loadUserProfile() {
    const t = translations[currentLang] || translations.badini;
    try {
        const saved = localStorage.getItem("bazar_user_account");
        if (saved) {
            const u = JSON.parse(saved);
            if (u.name) {
                document.getElementById("userNameInput").value = u.name;
                safeSet("displayUserName", u.name);
            } else {
                safeSet("displayUserName", t.welcomeUser);
            }
            if (u.phone) document.getElementById("userPhoneInput").value = u.phone;
            if (u.email) document.getElementById("userEmailInput").value = u.email;
            if (u.gps) document.getElementById("userGpsCoordinates").value = u.gps;
            if (u.avatar) {
                userAvatarBase64 = u.avatar;
                showAvatar(u.avatar);
            }
        } else {
            safeSet("displayUserName", t.welcomeUser);
        }
    } catch(e) {}
}

window.logoutUser = function() {
    const t = translations[currentLang] || translations.badini;
    if (confirm("ئایا دڤێت ژ هەژمارا خۆ دەربکەڤی؟")) {
        localStorage.removeItem("bazar_user_account");
        document.getElementById("userNameInput").value = "";
        document.getElementById("userPhoneInput").value = "";
        document.getElementById("userEmailInput").value = "";
        document.getElementById("userGpsCoordinates").value = "";
        safeSet("displayUserName", t.welcomeUser);
        showAvatar("");
        alert("هەژمار هاتە بەتاڵکرن!");
    }
};

window.handleAvatarUpload = function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userAvatarBase64 = e.target.result;
            showAvatar(userAvatarBase64);
        };
        reader.readAsDataURL(file);
    }
};

function showAvatar(src) {
    const img = document.getElementById("userAvatarImg");
    const defaultIcon = document.getElementById("defaultAvatarIcon");
    if (src) {
        img.src = src;
        img.style.display = "block";
        defaultIcon.style.display = "none";
    } else {
        img.style.display = "none";
        defaultIcon.style.display = "flex";
    }
}

window.getUserLiveLocation = function() {
    const statusBox = document.getElementById("gpsStatusMessage");
    if (!navigator.geolocation) {
        alert("مۆبایلا تە پشتگیرییا GPS ناکەت!");
        return;
    }
    statusBox.className = "gps-status";
    statusBox.innerText = "...";

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const url = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
            document.getElementById("userGpsCoordinates").value = url;
            statusBox.className = "gps-status success";
            statusBox.innerHTML = `✓ نەخشە ئامادەیە: <a href="${url}" target="_blank" style="color:#16a34a; font-weight:800;">دیتنا جهی</a>`;
        },
        () => {
            statusBox.className = "gps-status error";
            statusBox.innerText = "لۆکەیشنا مۆبایلێ ڤەکە!";
        },
        { enableHighAccuracy: true }
    );
};

/* ========================================================
   ٦. بەشێ دوکانداران (کۆدێ چاڵاککرنێ، Auth، Reset Pass)
======================================================== */
window.openVendorAuthModal = function(mode) {
    authMode = mode;
    closeProfileModal();
    document.getElementById("vendorAuthModal").classList.add("open");

    const titleEl = document.getElementById("authModalTitle");
    const actGroup = document.getElementById("activationFieldsGroup");
    const submitBtn = document.getElementById("authSubmitBtn");
    const passLabel = document.getElementById("lbl_authPassword");

    if (mode === "register") {
        titleEl.innerText = (currentLang === "english") ? "Activate Store by Key" : ((currentLang === "arabic") ? "تفعيل المتجر عبر الكود" : "چاڵاککرنا دوکانێ ب کۆدی");
        if (actGroup) actGroup.style.display = "block";
        if (passLabel) passLabel.innerText = (currentLang === "english") ? "Create New Password:" : ((currentLang === "arabic") ? "تعيين كلمة مرور جديدة:" : "پاسۆردەکێ نهێنی یێ نوی دانێ:");
        submitBtn.innerText = (currentLang === "english") ? "Activate & Sign In" : ((currentLang === "arabic") ? "تفعيل ودخول" : "چاڵاککرن و چوونەژوور");
    } else {
        titleEl.innerText = (currentLang === "english") ? "Vendor Sign In" : ((currentLang === "arabic") ? "تسجيل دخول المتجر" : "چوونەژوورا دوکانداری");
        if (actGroup) actGroup.style.display = "none";
        if (passLabel) passLabel.innerText = (currentLang === "english") ? "Store Password:" : ((currentLang === "arabic") ? "كلمة مرور المتجر:" : "پاسۆردێ نهێنی یێ دوکانێ:");
        submitBtn.innerText = (currentLang === "english") ? "Sign In" : ((currentLang === "arabic") ? "دخول" : "چوونەژوور");
    }
};

window.closeVendorAuthModal = function() {
    document.getElementById("vendorAuthModal").classList.remove("open");
    const nameInput = document.getElementById("authStoreNameInput");
    const keyInput = document.getElementById("authKeyInput");
    if (nameInput) nameInput.value = "";
    if (keyInput) keyInput.value = "";
    document.getElementById("authPhoneInput").value = "";
    document.getElementById("authPasswordInput").value = "";
};

window.handleVendorAuth = function() {
    const phone = document.getElementById("authPhoneInput").value.trim();
    const password = document.getElementById("authPasswordInput").value.trim();

    if (!phone || !password) {
        alert("تکایە تەلەفۆن و پاسۆردی بنڤیسە!");
        return;
    }

    if (!db) {
        alert("داتابەیس بەردەست نینە!");
        return;
    }

    const submitBtn = document.getElementById("authSubmitBtn");
    submitBtn.innerText = "پشکنین دبیت...";
    submitBtn.disabled = true;

    if (authMode === "register") {
        const storeName = document.getElementById("authStoreNameInput").value.trim();
const enteredKey = document.getElementById("authKeyInput").value.trim();
        if (!storeName || !enteredKey) {
            alert("تکایە ناڤێ دوکانێ و کۆدێ چاڵاککرنێ بنڤیسە!");
            submitBtn.disabled = false;
            submitBtn.innerText = "چاڵاککرن و چوونەژوور";
            return;
        }

        // پشکنینا کۆدێ چاڵاککرنێ د ناڤ داتابەیسێ دا
        db.collection("store_keys").where("key", "==", enteredKey).get().then(snap => {
            if (snap.empty) {
                alert("ئەڤ کۆدە خەلەتە یان بەردەست نینە!");
                submitBtn.disabled = false;
                submitBtn.innerText = "چاڵاککرن و چوونەژوور";
                return;
            }

            const keyDoc = snap.docs[0];
            const keyData = keyDoc.data();

            if (keyData.used === true) {
                alert("ئەڤ کۆدە بەرێ هاتییە بکارئینان!");
                submitBtn.disabled = false;
                submitBtn.innerText = "چاڵاککرن و چوونەژوور";
                return;
            }

            // پشکنینا تەلەفۆنێ
            db.collection("stores").where("phone", "==", phone).get().then(storeSnap => {
                if (!storeSnap.empty) {
                    alert("ئەڤ تەلەفۆنە بەرێ دوکان پێ هاتییە دروستکرن!");
                    submitBtn.disabled = false;
                    submitBtn.innerText = "چاڵاککرن و چوونەژوور";
                    return;
                }

                // دروستکرنا دوکانێ دگەل پاسۆردێ تایبەت
                db.collection("stores").add({
                    storeName: storeName,
                    phone: phone,
                    password: password,
                    bio: "",
                    address: "",
                    insta: "",
                    tiktok: "",
                    activationKeyUsed: enteredKey,
                    createdAt: new Date().toISOString()
                }).then(docRef => {
                    db.collection("store_keys").doc(keyDoc.id).update({
                        used: true,
                        usedByStore: storeName,
                        usedAt: new Date().toISOString()
                    });

                    activeVendor = { id: docRef.id, name: storeName, phone: phone, bio: "", address: "", insta: "", tiktok: "" };
                    localStorage.setItem("bazar_active_vendor", JSON.stringify(activeVendor));
                    closeVendorAuthModal();
                    openVendorDashboard();
                    alert("✓ پیرۆزە! دوکانا تە ب سەرکەفتی هاتە چاڵاککرن.");
                });
            });

        }).catch(() => {
            alert("خەلەتی چێبوو!");
            submitBtn.disabled = false;
        });

    } else {
        db.collection("stores").where("phone", "==", phone).where("password", "==", password).get().then(snap => {
            if (snap.empty) {
                alert("تەلەفۆن یان پاسۆرد خەلەتە!");
                submitBtn.disabled = false;
                submitBtn.innerText = "چوونەژوور";
            } else {
                const doc = snap.docs[0];
                const d = doc.data();
                activeVendor = { id: doc.id, name: d.storeName, phone: d.phone, bio: d.bio || "", address: d.address || "", insta: d.insta || "", tiktok: d.tiktok || "" };
                localStorage.setItem("bazar_active_vendor", JSON.stringify(activeVendor));
                closeVendorAuthModal();
                openVendorDashboard();
            }
        }).catch(() => {
            alert("خەلەتی چێبوو!");
            submitBtn.disabled = false;
        });
    }
};

function openVendorDashboard() {
    safeSet("vendorStoreTitle", activeVendor.name);
    document.getElementById("vBioInput").value = activeVendor.bio || "";
    document.getElementById("vAddressInput").value = activeVendor.address || "";
    document.getElementById("vInstaInput").value = activeVendor.insta || "";
    document.getElementById("vTiktokInput").value = activeVendor.tiktok || "";

    resetUploadBox();
    document.getElementById("vendorManagerModal").classList.add("open");
    renderVendorOwnProducts();
}

window.closeVendorManager = function() { 
    document.getElementById("vendorManagerModal").classList.remove("open"); 
};

window.logoutVendor = function() {
    if (confirm("ئایا دڵنیای دڤێت ژ دوکانا خۆ دەربکەڤی؟")) {
        activeVendor = null;
        localStorage.removeItem("bazar_active_vendor");
        document.getElementById("vendorManagerModal").classList.remove("open");
        resetUploadBox();
        alert("ژ دوکانێ دەرکەفتی!");
    }
};

window.saveVendorStoreProfile = function() {
    if (!activeVendor || !db) return;
    const bio = document.getElementById("vBioInput").value.trim();
    const address = document.getElementById("vAddressInput").value.trim();
    const insta = document.getElementById("vInstaInput").value.trim();
    const tiktok = document.getElementById("vTiktokInput").value.trim();

    db.collection("stores").doc(activeVendor.id).update({ bio, address, insta, tiktok }).then(() => {
        activeVendor.bio = bio;
        activeVendor.address = address;
        activeVendor.insta = insta;
        activeVendor.tiktok = tiktok;
        localStorage.setItem("bazar_active_vendor", JSON.stringify(activeVendor));
        alert("✓ زانیاریێن دوکانێ هاتنە پاراستن!");
    });
};

window.openForgotPasswordModal = function() {
    closeVendorAuthModal();
    document.getElementById("resetPhoneInput").value = "";
    document.getElementById("resetEmailInput").value = "";
    document.getElementById("resetNewPasswordInput").value = "";
    document.getElementById("forgotPasswordModal").classList.add("open");
};

window.closeForgotPasswordModal = function() { 
    document.getElementById("forgotPasswordModal").classList.remove("open"); 
};

window.handleResetPasswordSubmit = function() {
    const phone = document.getElementById("resetPhoneInput").value.trim();
    const email = document.getElementById("resetEmailInput").value.trim().toLowerCase();
    const newPass = document.getElementById("resetNewPasswordInput").value.trim();

    if (!phone || !newPass) {
        alert("تکایە تەلەفۆن و پاسۆردێ نوی بنڤیسە!");
        return;
    }

    const btn = document.getElementById("btnSaveNewPass");
    btn.innerText = "...";
    btn.disabled = true;

    db.collection("stores").where("phone", "==", phone).get().then(snap => {
        if (snap.empty) {
            alert("چ دوکان ب ڤێ تەلەفۆنێ نەهاتە دیتن!");
            btn.disabled = false;
            return;
        }

        const storeDoc = snap.docs[0];
        const storeData = storeDoc.data();

        if (email && storeData.email && storeData.email.toLowerCase() !== email) {
            alert("ئیمەیڵ دگەل تەلەفۆنێ یەکسان نینە!");
            btn.disabled = false;
            return;
        }

        db.collection("stores").doc(storeDoc.id).update({ password: newPass }).then(() => {
            alert("✓ پاسۆرد ب سەرکەفتی هاتە نووکرنەوە!");
            closeForgotPasswordModal();
            openVendorAuthModal("login");
        }).finally(() => { btn.disabled = false; });
    });
};

/* ========================================================
   ٧. بارکرن و سڕینەوەیا کاڵایان
======================================================== */
window.triggerFileInput = function() { 
    document.getElementById("pImgInput").click(); 
};

window.previewProductImage = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            const img = new Image();
            img.src = evt.target.result;
            img.onload = function() {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 500;
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                currentProductBase64 = canvas.toDataURL("image/jpeg", 0.75);

                document.getElementById("uploadPlaceholder").style.display = "none";
                document.getElementById("quickInputsArea").style.display = "flex";
                document.getElementById("pImgPreview").src = currentProductBase64;
            };
        };
        reader.readAsDataURL(file);
    }
};

window.resetUploadBox = function() {
    document.getElementById("uploadPlaceholder").style.display = "flex";
    document.getElementById("quickInputsArea").style.display = "none";
    document.getElementById("pPriceInput").value = "";
    document.getElementById("pSizesInput").value = "";
    document.getElementById("pTitleInput").value = "";
    document.getElementById("pImgInput").value = "";
    currentProductBase64 = "";
};

window.uploadProductToCloud = function() {
    if (!activeVendor) return;

    const price = parseInt(document.getElementById("pPriceInput").value);
    const size = document.getElementById("pSizesInput").value.trim();
    const title = document.getElementById("pTitleInput").value.trim() || activeVendor.name;
    const cat = document.getElementById("pCategoryInput").value;
    const gender = document.getElementById("pGenderInput").value;

    if (isNaN(price) || !currentProductBase64) {
        alert("تکایە وێنە و بهایێ کاڵایی بنڤیسە!");
        return;
    }

    const btn = document.getElementById("publishProductBtn");
    btn.innerText = "بەلاڤ دبیت...";
    btn.disabled = true;

    db.collection("products").add({
        storeId: activeVendor.id,
        storeName: activeVendor.name,
        title, size: size || "گشتی", price,
        category: cat, gender, image: currentProductBase64,
        createdAt: new Date().toISOString()
    }).then(() => {
        resetUploadBox();
        alert("کاڵا ب سەرکەفتی هاتە بەلاڤکرن!");
    }).finally(() => {
        btn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> بەلاڤکرن`;
        btn.disabled = false;
    });
};

window.deleteVendorProduct = function(docId) {
    if (confirm("ئایا دڵنیای دڤێت ئەڤ بەرهەمە بسڕییەوە؟")) {
        db.collection("products").doc(docId).delete().then(() => {
            alert("بەرهەم هاتە سڕینەوە!");
        });
    }
};

function renderVendorOwnProducts() {
    if (!activeVendor) return;
    const grid = document.getElementById("vendorProductsGrid");
    const addBox = document.getElementById("addCardBox");
    if (!grid || !addBox) return;

    grid.innerHTML = "";
    grid.appendChild(addBox);

    const myItems = allLiveProducts.filter(p => String(p.storeId) === String(activeVendor.id));

    myItems.forEach(p => {
        const card = document.createElement("div");
        card.className = "vendor-item-card";
        card.innerHTML = `
            <img src="${p.image}">
            <div class="card-info">
                <span class="item-price">${p.price.toLocaleString()} IQD</span>
                <span class="item-size"><i class="fa-solid fa-ruler"></i> سایز: ${p.size || 'گشتی'}</span>
                <button class="delete-btn" onclick="deleteVendorProduct('${p.id}')">
                    <i class="fa-solid fa-trash"></i> سڕینەوە
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ========================================================
   ٨. لاپەرەیێ سەربەخۆ یێ دوکانێ بۆ کڕیاران
======================================================== */
window.openPublicStore = function(storeId) {
    const store = allStoresList.find(s => s.id === storeId);
    const storeProducts = allLiveProducts.filter(p => p.storeId === storeId);
    const t = translations[currentLang] || translations.badini;

    const storeName = store ? store.storeName : (storeProducts[0] ? storeProducts[0].storeName : "دوکان");
    safeSet("pubStoreName", storeName);
    safeSet("pubStoreBio", (store && store.bio) ? store.bio : "بەخێربێن بۆ دوکانا مە.");

    const addrEl = document.getElementById("pubStoreAddressRow");
    if (store && store.address) {
        addrEl.style.display = "flex";
        safeSet("pubStoreAddressText", store.address);
    } else {
        addrEl.style.display = "none";
    }

    const socialRow = document.getElementById("pubSocialLinksRow");
    let socialHtml = "";

    const phone = store ? store.phone : ADMIN_WHATSAPP_NUMBER;
    socialHtml += `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" class="pub-social-btn wa"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`;

    if (store && store.insta) {
        const handle = store.insta.replace("@", "").trim();
        socialHtml += `<a href="https://instagram.com/${handle}" target="_blank" class="pub-social-btn"><i class="fa-brands fa-instagram"></i> Instagram</a>`;
    }
    if (store && store.tiktok) {
        const handle = store.tiktok.replace("@", "").trim();
        socialHtml += `<a href="https://tiktok.com/@${handle}" target="_blank" class="pub-social-btn"><i class="fa-brands fa-tiktok"></i> TikTok</a>`;
    }
    socialRow.innerHTML = socialHtml;

    const grid = document.getElementById("pubStoreProductsGrid");
    if (storeProducts.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 2; text-align:center; padding:30px 10px; color:#94a3b8;">${t.emptyFeedTitle}</div>`;
    } else {
        grid.innerHTML = storeProducts.map(p => `
            <div class="feed-product-card">
                <img src="${p.image}">
                <div class="feed-card-body">
                    <h4 class="feed-product-title">${p.title}</h4>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="feed-product-price">${p.price.toLocaleString()} IQD</span>
                        <span class="feed-product-size">${p.size}</span>
                    </div>
                    <div class="card-actions-row">
                        <button class="add-cart-btn-sm" onclick="addToCart('${p.id}')">${t.addToCartBtn}</button>
                        <button class="wa-direct-btn-sm" onclick="orderProductViaWhatsApp('${p.id}')"><i class="fa-brands fa-whatsapp"></i></button>
                    </div>
                </div>
            </div>
        `).join("");
    }

    document.getElementById("publicStoreModal").classList.add("open");
};

window.closePublicStore = function() { 
    document.getElementById("publicStoreModal").classList.remove("open"); 
};

/* ========================================================
   ٩. داتابەیس و شاشەیا سەرەکی
======================================================== */
if (db) {
    db.collection("stores").onSnapshot(snap => {
        allStoresList = [];
        snap.forEach(doc => { allStoresList.push({ id: doc.id, ...doc.data() }); });
    });

    db.collection("products").orderBy("createdAt", "desc").onSnapshot(snap => {
        allLiveProducts = [];
        snap.forEach(doc => { allLiveProducts.push({ id: doc.id, ...doc.data() }); });
        renderMainFeed();
        if (activeVendor) renderVendorOwnProducts();
    });
}

function renderMainFeed() {
    const container = document.getElementById("productsContainer");
    if (!container) return;

    const t = translations[currentLang] || translations.badini;

    let filtered = allLiveProducts.filter(p => {
        const matchCategory = (currentCategory === "all" || p.category === currentCategory);
        const matchGender = (currentGender === "all" || p.gender === "all" || p.gender === currentGender);
        const matchSearch = (!searchQuery || 
            (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
            (p.storeName && p.storeName.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchCategory && matchGender && matchSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: span 2; text-align:center; padding:40px 15px; background:#fff; border-radius:14px; border:1px solid #e2e8f0;">
                <div style="font-size:36px; margin-bottom:8px;">🏬✨</div>
                <h3 style="font-size:14px; font-weight:800; color:#0f172a;">${t.emptyFeedTitle}</h3>
                <p style="font-size:12px; color:#64748b;">${t.emptyFeedDesc}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(p => `
        <div class="feed-product-card">
            <img src="${p.image}">
            <div class="feed-card-body">
                <span class="store-badge-clickable" onclick="openPublicStore('${p.storeId}')">
                    <i class="fa-solid fa-store"></i> ${p.storeName}
                </span>
                <h4 class="feed-product-title">${p.title}</h4>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
                    <span class="feed-product-price">${p.price.toLocaleString()} IQD</span>
                    <span class="feed-product-size">${p.size}</span>
                </div>
                <div class="card-actions-row">
                    <button class="add-cart-btn-sm" onclick="addToCart('${p.id}')">${t.addToCartBtn}</button>
                    <button class="wa-direct-btn-sm" onclick="orderProductViaWhatsApp('${p.id}')">
                        <i class="fa-brands fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

window.selectCategory = function(catId, el) {
    currentCategory = catId;
    document.querySelectorAll(".cat-circle-item").forEach(c => c.classList.remove("active"));
    if (el) el.classList.add("active");
    renderMainFeed();
};

window.setGenderFilter = function(g, btn) {
    currentGender = g;
    document.querySelectorAll(".gender-pills .pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    renderMainFeed();
};

const searchInputEl = document.getElementById("searchInput");
if (searchInputEl) {
    searchInputEl.addEventListener("input", function(e) {
        searchQuery = e.target.value.trim();
        renderMainFeed();
    });
}

/* ========================================================
   ١٠. سەبەتە و WhatsApp
======================================================== */
function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem("bazar_user_cart");
        if (saved) cart = JSON.parse(saved);
    } catch(e) { cart = []; }
    updateCartUI();
}

function saveCartToStorage() {
    localStorage.setItem("bazar_user_cart", JSON.stringify(cart));
    updateCartUI();
}

window.addToCart = function(prodId) {
    const prod = allLiveProducts.find(p => p.id === prodId);
    if (!prod) return;

    const existingIndex = cart.findIndex(item => item.id === prodId);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            size: prod.size || 'گشتی',
            storeName: prod.storeName,
            image: prod.image,
            qty: 1
        });
    }

    saveCartToStorage();
    alert("✓ کاڵا چووە ناڤ سەبەتێ!");
};

window.changeCartQty = function(index, delta) {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    saveCartToStorage();
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCartToStorage();
};

function updateCartUI() {
    const listEl = document.getElementById("cartItemsList");
    const countBadge = document.getElementById("cartCountBadge");
    const navCartBadge = document.getElementById("navCartCount");
    const totalIqdEl = document.getElementById("totalIqdPrice");
    const totalUsdEl = document.getElementById("totalUsdPrice");
    const rateLabel = document.getElementById("exchangeRateLabel");

    const t = translations[currentLang] || translations.badini;

    const currUnit = (currentLang === "english") ? "IQD" : "د.ع";
    if (rateLabel) rateLabel.innerText = `${RATE_100_DOLLARS.toLocaleString()} ${currUnit}`;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (countBadge) countBadge.innerText = totalQty;
    if (navCartBadge) navCartBadge.innerText = totalQty;

    if (!listEl) return;

    if (cart.length === 0) {
        listEl.innerHTML = `<div style="text-align:center; padding:40px 10px; color:#94a3b8;"><div style="font-size:40px; margin-bottom:8px;">🛒</div><p style="font-size:13px; font-weight:700;">${t.cartEmptyText}</p></div>`;
        if (totalIqdEl) totalIqdEl.innerText = "0 IQD";
        if (totalUsdEl) totalUsdEl.innerText = "$0.00";
        return;
    }

    let totalIqd = 0;
    listEl.innerHTML = cart.map((item, idx) => {
        const itemTotal = item.price * item.qty;
        totalIqd += itemTotal;
        return `
            <div class="cart-item-row">
                <img src="${item.image}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <div class="item-meta">${item.storeName} | ${item.size}</div>
                    <div class="item-price">${item.price.toLocaleString()} IQD</div>
                </div>
                <div class="cart-qty-controls">
                    <button class="cart-qty-btn" onclick="changeCartQty(${idx}, -1)">-</button>
                    <span style="font-size:12px; font-weight:800;">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
                </div>
                <button class="cart-delete-btn" onclick="removeFromCart(${idx})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }).join("");

    const totalUsd = (totalIqd / RATE_1_DOLLAR).toFixed(2);
    if (totalIqdEl) totalIqdEl.innerText = `${totalIqd.toLocaleString()} IQD`;
    if (totalUsdEl) totalUsdEl.innerText = `$${totalUsd}`;
}

function getUserFullDetailsForMsg() {
    let u = {};
    try { u = JSON.parse(localStorage.getItem("bazar_user_account") || "{}"); } catch(e) {}
    const govObj = kurdistanLocations[selectedGovKey];
    const gName = govObj ? govObj.names[currentLang] : "دهۆک";
    const distList = govObj ? govObj.districts[currentLang] : ["ناوەند"];
    const dName = distList[selectedDistIndex] || "ناوەند";

    return { name: u.name || "دیار نەکرییە", phone: u.phone || "دیار نەکرییە", city: `${gName} - ${dName}`, gps: u.gps || "دیار نەکرییە" };
}

window.checkoutCartViaWhatsApp = function() {
    if (cart.length === 0) return;
    let totalIqd = 0;
    let itemsText = "";

    cart.forEach((item, idx) => {
        const cost = item.price * item.qty;
        totalIqd += cost;
        itemsText += `${idx + 1}. *${item.title}* (${item.storeName})\n   عەدەد: ${item.qty} دانە | سایز: ${item.size}\n   بها: ${cost.toLocaleString()} IQD\n\n`;
    });

    const totalUsd = (totalIqd / RATE_1_DOLLAR).toFixed(2);
    const info = getUserFullDetailsForMsg();

    const invoiceMsg = 
`🧾 *فاکتۆڕا کڕینا سەبەتێ ژ بازاڕێ کوردستانێ*
---------------------------------------
${itemsText}---------------------------------------
💵 *کۆیێ گشتی (دینار):* ${totalIqd.toLocaleString()} IQD
💲 *کۆیێ گشتی ب دۆلار:* $${totalUsd}
*(بهایێ دۆلاری: 100$ = ${RATE_100_DOLLARS.toLocaleString()} د.ع)*
---------------------------------------
📍 *زانیاریێن کڕیاری و جهێ گەهاندنێ:*
👤 *ناڤ:* ${info.name}
📞 *تەلەفۆن:* ${info.phone}
🏘️ *باژێڕ و قەزا:* ${info.city}
🗺️ *نەخشەیێ GPS:* ${info.gps}`;

    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(invoiceMsg)}`, "_blank");
};

window.orderProductViaWhatsApp = function(prodId) {
    const prod = allLiveProducts.find(p => p.id === prodId);
    if (!prod) return;
    const info = getUserFullDetailsForMsg();
    const msg = `🛍️ *داواکارییا کڕینا کاڵایی*\n📦 *کاڵا:* ${prod.title}\n🏬 *دوکان:* ${prod.storeName}\n💰 *بها:* ${prod.price.toLocaleString()} IQD\n📏 *سایز:* ${prod.size || 'گشتی'}\n---------------------------------------\n👤 *کڕیار:* ${info.name}\n📞 *تەلەفۆن:* ${info.phone}\n🏘️ *جهـ:* ${info.city}\n🗺️ *GPS:* ${info.gps}`;
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
};

window.contactSupportWhatsApp = function() {
    const info = getUserFullDetailsForMsg();
    const msg = `💬 *پشتیڤانی - بازاڕێ کوردستانێ*\n👤 *ناڤ:* ${info.name}\n📞 *تەلەفۆن:* ${info.phone}\n📍 *جهـ:* ${info.city}`;
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
};

/* ========================================================
   ١١. مۆداڵ و ناڤیگەیشن
======================================================== */
window.switchTab = function(tab) {
    document.querySelectorAll(".bottom-nav .nav-item").forEach(el => el.classList.remove("active"));
    if (tab === 'home') {
        document.getElementById("navHome").classList.add("active");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'categories') {
        document.getElementById("navCategories").classList.add("active");
        window.scrollTo({ top: 80, behavior: 'smooth' });
    } else if (tab === 'profile') {
        document.getElementById("navProfile").classList.add("active");
        openProfileModal();
    }
};

window.openCart = function() { 
    document.getElementById("cartModal").classList.add("open"); 
};
window.closeCart = function() { 
    document.getElementById("cartModal").classList.remove("open"); 
};

window.openProfileModal = function() {
    showProfileSection("hub");
    loadUserProfile();
    document.getElementById("profileModal").classList.add("open");
};

window.closeProfileModal = function() { 
    document.getElementById("profileModal").classList.remove("open"); 
};

/* دەستپێکرن */
loadSavedLocation();
loadUserProfile();
loadSavedLanguage();
loadCartFromStorage();