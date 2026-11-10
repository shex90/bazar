/* ژمارەیا واتسئەپێ */
const ADMIN_WHATSAPP_NUMBER = "9647504799202"; 

function safeSet(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function safeHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

/* فەرهەنگا زمانی */
const translations = {
    badini: {
        dir: "rtl",
        brand: "بازاڕ",
        rentHeader: "کرێکرنا دوکانێ",
        search: "ل کاڵا یان دوکانەکێ بگەڕی...",
        pill_all: "هەمی", pill_women: "👩 کچان", pill_men: "👨 کوڕان", pill_kids: "👶 زارۆکان",
        navHome: "سەرەکی", navCategories: "پۆلێنەکان", navCart: "سەبەتە", navProfile: "پرۆفایل",
        mallTitle: "مۆڵ و بازاڕێ نوی یێ کوردستانێ",
        mallDesc: "ئەڤ بازاڕە نوکە ل قۆناغا دەستپێکێیە! هێشتا دوکان ل ڤێرە نەهاتینە تۆمارکرن.<br><strong>تۆ خودانێ دوکانێ یان بزنسەکی ل کوردستانێ؟</strong>",
        mallBtn: "دوکانا خۆ ل ڤێرە کرێ بکە",
        cartTitle: "سەبەتەیا من", cartUnit: "کاڵا", emptyCart: "سەبەتەیا تە یا ڤالایە!",
        saveSuccess: "زانیاری و هەژمار ب سەرکەفتی هاتنە پاراستن!",
        cat_all: "هەمی", cat_shoes: "پێلاڤ و وەرزش", cat_flowers: "گوڵ و دیاری",
        cat_beauty: "جوانکاری و عەتر", cat_home: "ناڤماڵ", cat_sweets: "شیریناهی", cat_fashion: "جلوبەرگ"
    },
    sorani: {
        dir: "rtl",
        brand: "بازاڕ",
        rentHeader: "کرێکردنی دوکان",
        search: "بگەڕێ بۆ کاڵا یان فرۆشگا...",
        pill_all: "هەموو", pill_women: "👩 خانمان", pill_men: "👨 پیاوان", pill_kids: "👶 منداڵان",
        navHome: "سەرەکی", navCategories: "پۆلێنەکان", navCart: "سەبەتە", navProfile: "پرۆفایل",
        mallTitle: "مۆڵ و بازاڕی نوێی کوردستان",
        mallDesc: "ئەم بازاڕە لە قۆناغی دەستپێکدایە! هێشتا دوکانەکان لێرە تۆمار نەکراون.<br><strong>تۆ خاوەنی فرۆشگا یان بزنسێکیت لە کوردستان؟</strong>",
        mallBtn: "دوکانەکەت لێرە کرێ بکە",
        cartTitle: "سەبەتەکەم", cartUnit: "کاڵا", emptyCart: "سەبەتەکەت بەتاڵە!",
        saveSuccess: "زانیاری و هەژمار پاشەکەوت کران!",
        cat_all: "هەموو", cat_shoes: "پێڵاو و وەرزش", cat_flowers: "گوڵ و دیاری",
        cat_beauty: "جوانکاری و بۆن", cat_home: "ماڵ و کەلوپەل", cat_sweets: "شیرینی", cat_fashion: "جلوبەرگ"
    },
    arabic: {
        dir: "rtl",
        brand: "بازار",
        rentHeader: "استئجار متجر",
        search: "ابحث عن منتج أو متجر...",
        pill_all: "الكل", pill_women: "👩 نساء", pill_men: "👨 رجال", pill_kids: "👶 أطفال",
        navHome: "الرئيسية", navCategories: "الأقسام", navCart: "السلة", navProfile: "حسابي",
        mallTitle: "سوق ومول كوردستان الجديد",
        mallDesc: "هذا البازار في مرحلة الإطلاق الأولية! لم يتم إدراج المتاجر بعد.<br><strong>هل أنت صاحب متجر أو مشروع تجاري في كوردستان؟</strong>",
        mallBtn: "استأجر متجرك وابدأ البيع هنا",
        cartTitle: "سلتي", cartUnit: "منتجات", emptyCart: "سلة التسوق فارغة!",
        saveSuccess: "تم حفظ البيانات والحساب بنجاح!",
        cat_all: "الكل", cat_shoes: "أحذية ورياضة", cat_flowers: "زهور وهدايا",
        cat_beauty: "تجميل وعطور", cat_home: "مستلزمات منزلية", cat_sweets: "حلويات ومكسرات", cat_fashion: "أزياء وملابس"
    },
    english: {
        dir: "ltr",
        brand: "Bazar",
        rentHeader: "Rent Store",
        search: "Search products or stores...",
        pill_all: "All", pill_women: "👩 Women", pill_men: "👨 Men", pill_kids: "👶 Kids",
        navHome: "Home", navCategories: "Categories", navCart: "Cart", navProfile: "Profile",
        mallTitle: "Kurdistan Grand Online Bazar",
        mallDesc: "This marketplace is brand new! Stores have not listed their products yet.<br><strong>Are you a business or store owner in Kurdistan?</strong>",
        mallBtn: "Rent Your Store Space Here",
        cartTitle: "My Cart", cartUnit: "items", emptyCart: "Your cart is empty!",
        saveSuccess: "Account details saved successfully!",
        cat_all: "All", cat_shoes: "Shoes & Sports", cat_flowers: "Flowers & Gifts",
        cat_beauty: "Beauty & Perfume", cat_home: "Home Living", cat_sweets: "Sweets & Nuts", cat_fashion: "Fashion & Wear"
    }
};

let currentLang = "badini";

/* پارێزگەهـ */
const kurdistanLocations = {
    duhok: { name: "دهۆک", districts: ["ناوەند", "زاخۆ", "سێمێل", "ئامێدی", "ئاکرێ", "شێخان", "بەردەڕەش"] },
    erbil: { name: "هەولێر", districts: ["ناوەند", "سۆران", "شەقڵاوە", "کۆیە", "خەبات", "ڕەواندوز"] },
    sulaymaniyah: { name: "سلێمانی", districts: ["ناوەند", "ڕانیە", "قەڵادزێ", "کەلار", "دەربەندیخان", "دوکان"] },
    halabja: { name: "هەڵەبجە", districts: ["ناوەند", "شارەزوور", "سەیدسادق", "خورماڵ", "بیارە"] }
};

let selectedGov = "duhok";
let selectedDist = "ناوەند";
let userAvatarBase64 = "";

/* ========================================================
   وەرگرتنا جهێ دەقیق یێ GPS ب نەخشەی (Live Location)
======================================================== */
function getUserLiveLocation() {
    const statusBox = document.getElementById("gpsStatusMessage");
    const gpsBtnText = document.getElementById("gpsBtnText");

    if (!navigator.geolocation) {
        statusBox.className = "gps-status error";
        statusBox.innerText = "مۆبایلا تە پشتگیرییا GPS ناکەت!";
        return;
    }

    gpsBtnText.innerText = "لێگەڕیان ل جهێ تە...";
    statusBox.className = "gps-status";
    statusBox.innerText = "تکایە دەستووری بدە (Allow Location)...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
            
            document.getElementById("userGpsCoordinates").value = mapsUrl;
            gpsBtnText.innerText = "✓ جهێ تە ب سەرکەفتی هاتە دیارکرن";
            statusBox.className = "gps-status success";
            statusBox.innerHTML = `✓ نەخشە ئامادەیە: <a href="${mapsUrl}" target="_blank" style="color:#16a34a; text-decoration:underline;">دیتنا جهی</a>`;
        },
        (error) => {
            gpsBtnText.innerText = "دووبارە هەوڵبدە";
            statusBox.className = "gps-status error";
            statusBox.innerText = "نەهاتە دیتن! تکایە لۆکەیشنێ (Location) مۆبایلا خۆ ڤەکە.";
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

/* ========================================================
   هەڵبژارتن و گۆڕینا وێنەیێ پرۆفایلی (Photo Upload)
======================================================== */
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            userAvatarBase64 = e.target.result;
            showAvatar(userAvatarBase64);
        };
        reader.readAsDataURL(file);
    }
}

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

/* ========================================================
   خەزنکرن و بارکرنا ئەکاونتی د مەمۆریێ دا (LocalStorage)
======================================================== */
function saveUserProfile() {
    const name = document.getElementById("userNameInput").value.trim();
    const email = document.getElementById("userEmailInput").value.trim();
    const phone = document.getElementById("userPhoneInput").value.trim();
    const password = document.getElementById("userPasswordInput").value.trim();
    const gpsUrl = document.getElementById("userGpsCoordinates").value;

    const accountData = {
        name,
        email,
        phone,
        password,
        gpsUrl,
        avatar: userAvatarBase64
    };

    localStorage.setItem("bazar_user_account", JSON.stringify(accountData));

    if (name) safeSet("displayUserName", `سڵاو، ${name}`);
    alert(translations[currentLang].saveSuccess);
}

function loadUserProfile() {
    try {
        const saved = localStorage.getItem("bazar_user_account");
        if (saved) {
            const u = JSON.parse(saved);
            if (u.name) {
                document.getElementById("userNameInput").value = u.name;
                safeSet("displayUserName", `سڵاو، ${u.name}`);
            }
            if (u.email) document.getElementById("userEmailInput").value = u.email;
            if (u.phone) document.getElementById("userPhoneInput").value = u.phone;
            if (u.password) document.getElementById("userPasswordInput").value = u.password;
            if (u.gpsUrl) {
                document.getElementById("userGpsCoordinates").value = u.gpsUrl;
                document.getElementById("gpsBtnText").innerText = "✓ جهێ نەخشەی پاراستییە";
                const st = document.getElementById("gpsStatusMessage");
                st.className = "gps-status success";
                st.innerHTML = `✓ نەخشە ئامادەیە: <a href="${u.gpsUrl}" target="_blank" style="color:#16a34a;">دیتنا جهی</a>`;
            }
            if (u.avatar) {
                userAvatarBase64 = u.avatar;
                showAvatar(u.avatar);
            }
        }
    } catch(e) {}
}

/* ========================================================
   واتسئەپ: کرێکرنا دوکانێ دگەل لینکا نەخشەی (GPS)
======================================================== */
function rentStoreWhatsApp() {
    const govName = kurdistanLocations[selectedGov].name;
    let name = "";
    let phone = "";
    let email = "";
    let gpsLink = "";

    try {
        const saved = localStorage.getItem("bazar_user_account");
        if (saved) {
            const user = JSON.parse(saved);
            name = user.name || "";
            phone = user.phone || "";
            email = user.email || "";
            gpsLink = user.gpsUrl || "";
        }
    } catch(e) {}

    let msg = `🛒 *داواکارییا کرێکرنا دوکانێ (بازاڕ)*\n`;
    msg += `• ناڤ: ${name || 'نەهاتییە دیارکرن'}\n`;
    msg += `• ژمارە: ${phone || 'نەهاتییە دیارکرن'}\n`;
    if (email) msg += `• ئیمەیڵ: ${email}\n`;
    msg += `• باژێڕ: ${govName} - ${selectedDist}\n`;
    if (gpsLink) {
        msg += `📍 *جهێ نەخشەی (Google Maps):*\n${gpsLink}\n`;
    }
    msg += `--------------------------------\n`;
    msg += `سڵاو، دڤێت دوکانا خۆ د ئەپێ بازاڕێ دا کرێ بکەم. تکایە مەرج و هوورکارییان بۆ من بنێرە.`;

    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ========================================================
   بەشێ زمان، سەلک و ناڤبڕ
======================================================== */
function openLanguageModal() { document.getElementById("languageModal").classList.add("open"); }
function closeLanguageModal() { document.getElementById("languageModal").classList.remove("open"); }
function switchLangFromProfile() { closeProfileModal(); openLanguageModal(); }

function selectLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    const t = translations[lang];

    document.documentElement.dir = t.dir;
    safeSet("t_brand", t.brand);
    safeSet("t_rentHeader", t.rentHeader);
    const search = document.getElementById("searchInput");
    if (search) search.placeholder = t.search;

    safeSet("pill_all", t.pill_all);
    safeSet("pill_women", t.pill_women);
    safeSet("pill_men", t.pill_men);
    safeSet("pill_kids", t.pill_kids);

    safeSet("t_navHome", t.navHome);
    safeSet("t_navCategories", t.navCategories);
    safeSet("t_navCart", t.navCart);
    safeSet("t_navProfile", t.navProfile);

    safeSet("t_mallTitle", t.mallTitle);
    safeHTML("t_mallDesc", t.mallDesc);
    safeSet("t_mallBtn", t.mallBtn);

    safeSet("t_cartTitle", t.cartTitle);
    safeSet("t_cartUnit", t.cartUnit);
    safeSet("t_emptyCartMsg", t.emptyCart);

    safeSet("cat_all", t.cat_all);
    safeSet("cat_shoes", t.cat_shoes);
    safeSet("cat_flowers", t.cat_flowers);
    safeSet("cat_beauty", t.cat_beauty);
    safeSet("cat_home", t.cat_home);
    safeSet("cat_sweets", t.cat_sweets);
    safeSet("cat_fashion", t.cat_fashion);

    document.querySelectorAll(".lang-option").forEach(btn => {
        if (btn.getAttribute("data-lang") === lang) btn.classList.add("active");
        else btn.classList.remove("active");
    });

    closeLanguageModal();
}

function openCart() { document.getElementById("cartModal").classList.add("open"); }
function closeCart() { document.getElementById("cartModal").classList.remove("open"); }
function checkoutWhatsApp() { alert(translations[currentLang].emptyCart); }

function openCategoriesModal() { document.getElementById("categoriesModal").classList.add("open"); }
function closeCategoriesModal() { document.getElementById("categoriesModal").classList.remove("open"); }

function selectCategory(catId, el) {
    document.querySelectorAll(".cat-circle-item").forEach(c => c.classList.remove("active"));
    if (el) el.classList.add("active");
    closeCategoriesModal();
}

function setGenderFilter(g, btn) {
    document.querySelectorAll(".gender-pills .pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
}

function openProfileModal() {
    loadUserProfile();
    document.getElementById("profileModal").classList.add("open");
}
function closeProfileModal() { document.getElementById("profileModal").classList.remove("open"); }

function contactSupportWhatsApp() {
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent("سڵاو، پرسیارەکم هەبوو دەربارەی ئەپێ بازاڕی:")}`, "_blank");
}

function openLocationModal() {
    document.getElementById("locationModal").classList.add("open");
    renderGovernorates();
    renderDistricts();
}
function closeLocationModal() { document.getElementById("locationModal").classList.remove("open"); }

function renderGovernorates() {
    const box = document.getElementById("governorateChips");
    box.innerHTML = Object.keys(kurdistanLocations).map(k => `
        <button class="chip-btn ${k === selectedGov ? 'active' : ''}" onclick="selectGov('${k}')">
            ${kurdistanLocations[k].name}
        </button>
    `).join("");
}

function selectGov(k) {
    selectedGov = k;
    selectedDist = kurdistanLocations[k].districts[0];
    renderGovernorates();
    renderDistricts();
}

function renderDistricts() {
    const box = document.getElementById("districtChips");
    const dists = kurdistanLocations[selectedGov].districts;
    box.innerHTML = dists.map(d => `
        <button class="chip-btn ${d === selectedDist ? 'active' : ''}" onclick="selectDist('${d}')">${d}</button>
    `).join("");
}

function selectDist(d) {
    selectedDist = d;
    renderDistricts();
}

function confirmLocation() {
    const gName = kurdistanLocations[selectedGov].name;
    safeSet("currentLocationText", `${gName} - ${selectedDist}`);
    safeSet("profileCityText", `${gName} - ${selectedDist}، کوردستان`);
    closeLocationModal();
}

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

/* دەستپێکرن */
loadUserProfile();
renderGovernorates();
renderDistricts();