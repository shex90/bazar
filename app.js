/* ========================================================
   گرێدانا ڕاستەوخۆ یا داتابەیسا Firebase
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

/* کلیل و کۆدێن دوکانداران (تۆ ل ڤێرە کلیلێن نوی زێدە دکەی) */
const STORE_ACCESS_KEYS = {
    "101": { id: "store_1", name: "دوکانا وەرزشی" },
    "102": { id: "store_2", name: "کۆگەها جلوبەرگان" },
    "103": { id: "store_3", name: "گوڵ و دیاریێن کوردستانێ" }
};

let activeVendor = null;
let currentProductBase64 = "";
let allLiveProducts = [];

function safeSet(id, text) { const el = document.getElementById(id); if (el) el.innerText = text; }

/* ========================================================
   بەشێ چوارگۆشەیی یێ دوکانداران (Vendor Grid Panel)
======================================================== */
function vendorKeyLogin() {
    const key = prompt("تکایە کلیلێ تایبەت یێ دوکانا خۆ بنڤیسە:");
    if (!key) return;

    if (STORE_ACCESS_KEYS[key.trim()]) {
        activeVendor = STORE_ACCESS_KEYS[key.trim()];
        safeSet("vendorStoreTitle", `دوکانا: ${activeVendor.name}`);
        closeProfileModal();
        document.getElementById("vendorManagerModal").classList.add("open");
        renderVendorOwnProducts();
    } else {
        alert("ئەڤ کلیلە یا خەلەتە! تکایە پەیوەندیێ ب بەڕێوەبەری بکە.");
    }
}

function closeVendorManager() {
    document.getElementById("vendorManagerModal").classList.remove("open");
}

/* کلیک ل سەر مڕەبەعا دەستپێکێ دکەت دا گەلەری ڤەبیت */
function triggerFileInput() {
    document.getElementById("pImgInput").click();
}

/* دەمێ وێنە دهێتە هەڵبژاردن: بچووککرن و نیشاندان د ناڤ مڕەبەعێ دا */
function previewProductImage(e) {
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

                // گۆڕینا مڕەبەعێ بۆ فۆڕما سڤک
                document.getElementById("uploadPlaceholder").style.display = "none";
                document.getElementById("quickInputsArea").style.display = "flex";
                document.getElementById("pImgPreview").src = currentProductBase64;
            };
        };
        reader.readAsDataURL(file);
    }
}

/* بەلاڤکرنا ڕاستەوخۆ بۆ ناو داتابەیسێ */
function uploadProductToCloud() {
    if (!activeVendor) return;
    const price = parseInt(document.getElementById("pPriceInput").value);
    const size = document.getElementById("pSizesInput").value.trim();
    const title = document.getElementById("pTitleInput").value.trim() || activeVendor.name;

    if (isNaN(price) || !currentProductBase64) {
        alert("تکایە وێنە و بهایێ بەرهەمی بنڤیسە!");
        return;
    }

    const btn = document.getElementById("publishProductBtn");
    btn.innerText = "بەلاڤ دبیت...";
    btn.disabled = true;

    if (!db) {
        alert("داتابەیس هێشتا نەگەهشتییە!");
        btn.disabled = false;
        return;
    }

    db.collection("products").add({
        storeId: activeVendor.id,
        storeName: activeVendor.name,
        title: title,
        size: size || "دیارنەکری",
        price: price,
        image: currentProductBase64,
        createdAt: new Date().toISOString()
    }).then(() => {
        // ڤەگەڕاندنا مڕەبەعێ بۆ [+] دا بەرهەمێ دویڤدا دانێت
        document.getElementById("uploadPlaceholder").style.display = "flex";
        document.getElementById("quickInputsArea").style.display = "none";
        document.getElementById("pPriceInput").value = "";
        document.getElementById("pSizesInput").value = "";
        document.getElementById("pTitleInput").value = "";
        currentProductBase64 = "";
    }).catch(err => {
        alert("خەلەتییەک چێبوو د بەلاڤکرنێ دا!");
    }).finally(() => {
        btn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> بەلاڤکرن`;
        btn.disabled = false;
    });
}

/* سڕینەوەیا کاڵایی ژ لایێ دوکانداری ڤە */
function deleteVendorProduct(docId) {
    if (confirm("ئایا دڵنیای دڤێت ئەڤ بەرهەمە بسڕییەوە؟")) {
        db.collection("products").doc(docId).delete().then(() => {
            alert("بەرهەم هاتە سڕینەوە!");
        });
    }
}

/* نیشاندانا مڕەبەعێن کاڵایێن دوکانداری (Grid View) */
function renderVendorOwnProducts() {
    if (!activeVendor) return;
    const grid = document.getElementById("vendorProductsGrid");
    const addBox = document.getElementById("addCardBox");
    if (!grid || !addBox) return;

    grid.innerHTML = "";
    grid.appendChild(addBox);

    const myItems = allLiveProducts.filter(p => p.storeId === activeVendor.id);

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
   وەرگرتنا زندی یا کاڵایان بۆ هەموو کڕیاران (Realtime Mall)
======================================================== */
if (db) {
    db.collection("products").onSnapshot((snapshot) => {
        allLiveProducts = [];
        snapshot.forEach(doc => {
            allLiveProducts.push({ id: doc.id, ...doc.data() });
        });
        renderMainFeed();
        if (activeVendor) renderVendorOwnProducts();
    });
}

function renderMainFeed() {
    const container = document.getElementById("productsContainer");
    if (!container) return;

    if (allLiveProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-mall-card">
                <div class="mall-icon">🏬✨</div>
                <h3>مۆڵ و بازاڕێ نوی یێ کوردستانێ</h3>
                <p>هێشتا هیچ کاڵایەک نەهاتییە بەلاڤکرن.<br>دوکاندار دشێن ب کلیلێ خۆ بەرهەمان دانێن.</p>
                <button class="cta-btn" onclick="rentStoreWhatsApp()">
                    <i class="fa-brands fa-whatsapp"></i> دوکانا خۆ ل ڤێرە کرێ بکە
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = allLiveProducts.map(p => `
        <div style="background:#fff; border-radius:14px; overflow:hidden; border:1px solid #e2e8f0; padding:10px; box-shadow:0 2px 8px rgba(0,0,0,0.03); margin-bottom:10px;">
            <img src="${p.image}" style="width:100%; height:180px; object-fit:cover; border-radius:10px;">
            <div style="margin-top:8px;">
                <span style="font-size:11px; color:#f27a1a; font-weight:800; background:#fff4ec; padding:2px 8px; border-radius:6px;">${p.storeName}</span>
                <h4 style="font-size:14px; font-weight:700; margin:6px 0 4px; color:#1e293b;">${p.title}</h4>
                <div style="font-size:14px; font-weight:900; color:#0f172a;">${p.price.toLocaleString()} د.ع</div>
            </div>
        </div>
    `).join("");
}

/* ========================================================
   بەشێ ئەکاونت، GPS و لۆکەیشن
======================================================== */
let userAvatarBase64 = "";

function getUserLiveLocation() {
    const statusBox = document.getElementById("gpsStatusMessage");
    const gpsBtnText = document.getElementById("gpsBtnText");
    if (!navigator.geolocation) {
        alert("مۆبایلا تە پشتگیرییا GPS ناکەت!");
        return;
    }
    gpsBtnText.innerText = "لێگەڕیان ل جهێ تە...";
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const url = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
            document.getElementById("userGpsCoordinates").value = url;
            gpsBtnText.innerText = "✓ جهێ نەخشەی هاتە وەرگرتن";
            statusBox.className = "gps-status success";
            statusBox.innerHTML = `✓ نەخشە ئامادەیە: <a href="${url}" target="_blank" style="color:#16a34a;">دیتنا جهی</a>`;
        },
        () => {
            gpsBtnText.innerText = "دووبارە هەوڵبدە";
            statusBox.className = "gps-status error";
            statusBox.innerText = "نەهاتە دیتن! لۆکەیشنێ مۆبایلێ ڤەکە.";
        },
        { enableHighAccuracy: true }
    );
}

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

function saveUserProfile() {
    const name = document.getElementById("userNameInput").value.trim();
    const phone = document.getElementById("userPhoneInput").value.trim();
    const email = document.getElementById("userEmailInput").value.trim();
    const gps = document.getElementById("userGpsCoordinates").value;
    localStorage.setItem("bazar_user_account", JSON.stringify({ name, phone, email, gps, avatar: userAvatarBase64 }));
    if (name) safeSet("displayUserName", `سڵاو، ${name}`);
    alert("زانیاری ب سەرکەفتی هاتنە پاراستن!");
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
            if (u.phone) document.getElementById("userPhoneInput").value = u.phone;
            if (u.email) document.getElementById("userEmailInput").value = u.email;
            if (u.gps) {
                document.getElementById("userGpsCoordinates").value = u.gps;
                safeSet("gpsBtnText", "✓ جهێ نەخشەی پاراستییە");
            }
            if (u.avatar) {
                userAvatarBase64 = u.avatar;
                showAvatar(u.avatar);
            }
        }
    } catch(e) {}
}

/* ========================================================
   بەشێ پارێزگەهان و ناڤچەیان
======================================================== */
const kurdistanLocations = {
    duhok: { name: "دهۆک", districts: ["ناوەند", "زاخۆ", "سێمێل", "ئامێدی", "ئاکرێ", "شێخان", "بەردەڕەش"] },
    erbil: { name: "هەولێر", districts: ["ناوەند", "سۆران", "شەقڵاوە", "کۆیە", "خەبات"] },
    sulaymaniyah: { name: "سلێمانی", districts: ["ناوەند", "ڕانیە", "قەڵادزێ", "کەلار"] },
    halabja: { name: "هەڵەبجە", districts: ["ناوەند", "شارەزوور", "خورماڵ"] }
};

let selectedGov = "duhok";
let selectedDist = "ناوەند";

function openLocationModal() {
    document.getElementById("locationModal").classList.add("open");
    renderGovernorates();
    renderDistricts();
}
function closeLocationModal() { document.getElementById("locationModal").classList.remove("open"); }

function renderGovernorates() {
    const box = document.getElementById("governorateChips");
    box.innerHTML = Object.keys(kurdistanLocations).map(k => `
        <button class="chip-btn ${k === selectedGov ? 'active' : ''}" onclick="selectGov('${k}')">${kurdistanLocations[k].name}</button>
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
    box.innerHTML = kurdistanLocations[selectedGov].districts.map(d => `
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

/* ========================================================
   ناڤیگەیشن و مۆداڵێن دی
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

function openCategoriesModal() { document.getElementById("categoriesModal").classList.add("open"); }
function closeCategoriesModal() { document.getElementById("categoriesModal").classList.remove("open"); }

function openCart() { document.getElementById("cartModal").classList.add("open"); }
function closeCart() { document.getElementById("cartModal").classList.remove("open"); }

function openLanguageModal() { document.getElementById("languageModal").classList.add("open"); }
function closeLanguageModal() { document.getElementById("languageModal").classList.remove("open"); }
function switchLangFromProfile() { closeProfileModal(); openLanguageModal(); }
function selectLanguage() { closeLanguageModal(); }

function openProfileModal() {
    loadUserProfile();
    document.getElementById("profileModal").classList.add("open");
}
function closeProfileModal() { document.getElementById("profileModal").classList.remove("open"); }

function rentStoreWhatsApp() {
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent("سڵاو، دڤێت دوکانا خۆ ل بازاڕی کرێ بکەم:")}`, "_blank");
}

function contactSupportWhatsApp() {
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent("سڵاو، پسیارەکم هەبوو دەربارەی بازاڕی:")}`, "_blank");
}

function selectCategory(catId, el) {
    document.querySelectorAll(".cat-circle-item").forEach(c => c.classList.remove("active"));
    if (el) el.classList.add("active");
    closeCategoriesModal();
}

function setGenderFilter(g, btn) {
    document.querySelectorAll(".gender-pills .pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
}

/* دەستپێکرنا ئەپێ */
loadUserProfile();
renderGovernorates();
renderDistricts();