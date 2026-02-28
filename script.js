document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 0. CONFIGURATION
    // ---------------------------------------------------------
    const CONFIG = {
        PAYSTACK_PUBLIC_KEY: 'pk_live_6b9968065dc0bd4842c97ffa138e49127c862888', // UPDATED WITH LIVE PUBLIC KEY
        GOOGLE_CLIENT_ID: '233214895227-sug4rhttgo35fr45die0906go676odb2.apps.googleusercontent.com', // UPDATED WITH USER CLIENT ID
        CURRENCY: 'GHS',
        CONVERSION_RATE_USD_TO_GHS: 14.77, // Fixed rate for demonstration (Adjust as needed)
        STORE_NAME: 'Alfred Tech Hub'
    };

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCgbzdVCNPtjjlGNW4ug_3PJ92ajetw3i0",
        authDomain: "donald-laptops.firebaseapp.com",
        projectId: "donald-laptops",
        storageBucket: "donald-laptops.firebasestorage.app",
        messagingSenderId: "856741060528",
        appId: "1:856741060528:web:9c99a0a3a80fb044378075",
        measurementId: "G-VD0G6B1PZG"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // ---------------------------------------------------------
    // 1. DATA & STATE
    // ---------------------------------------------------------
    const laptops = [
        { "id": 1, "name": "MacBook Pro 16", "brand": "Apple", "price": 1, "specs": "M3 Max, 32GB RAM, 1TB SSD", "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 2, "name": "XPS 15", "brand": "Dell", "price": 1, "specs": "i9, 32GB RAM, 1TB SSD, RTX 4060", "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 3, "name": "ThinkPad X1 Carbon", "brand": "Lenovo", "price": 1, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 4, "name": "Zephyrus G14", "brand": "ASUS", "price": 1, "specs": "Ryzen 9, 16GB RAM, 1TB SSD, RTX 4070", "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 5, "name": "Spectre x360", "brand": "HP", "price": 1, "specs": "i7, 16GB RAM, 1TB SSD, OLED", "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400", "category": "Convertible" },
        { "id": 6, "name": "Blade 15", "brand": "Razer", "price": 1, "specs": "i9, 32GB RAM, 1TB SSD, RTX 4080", "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 7, "name": "Surface Laptop 5", "brand": "Microsoft", "price": 1, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Ultrabook" },
        { "id": 8, "name": "Swift Edge 16", "brand": "Acer", "price": 1, "specs": "Ryzen 7, 16GB RAM, 1TB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Ultrabook" },
        { "id": 9, "name": "Stealth 16 Studio", "brand": "MSI", "price": 1, "specs": "i7, 32GB RAM, 1TB SSD, RTX 4070", "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 10, "name": "Galaxy Book3 Ultra", "brand": "Samsung", "price": 1, "specs": "i9, 32GB RAM, 1TB SSD, RTX 4070", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 11, "name": "m18 R1", "brand": "Alienware", "price": 1, "specs": "i9, 32GB RAM, 2TB SSD, RTX 4090", "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 12, "name": "AERO 16 OLED", "brand": "Gigabyte", "price": 1, "specs": "i7, 16GB RAM, 1TB SSD, RTX 4070", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Creative" },
        { "id": 13, "name": "Gram 17", "brand": "LG", "price": 1, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Ultrabook" },
        { "id": 14, "name": "Lifebook U9311", "brand": "Fujitsu", "price": 1, "specs": "i7, 16GB RAM, 512GB SSD, LTE", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 15, "name": "Toughbook 55", "brand": "Panasonic", "price": 1, "specs": "i5, 16GB RAM, 512GB SSD, Rugged", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Rugged" },
        { "id": 16, "name": "MateBook X Pro", "brand": "Huawei", "price": 1, "specs": "i7, 16GB RAM, 1TB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Ultrabook" },
        { "id": 17, "name": "Mi Notebook Pro", "brand": "Xiaomi", "price": 1, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 18, "name": "Portégé X30L-K", "brand": "Dynabook", "price": 1, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 19, "name": "VAIO Z", "brand": "VAIO", "price": 1, "specs": "i7, 32GB RAM, 2TB SSD, Carbon Fiber", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 20, "name": "Framework Laptop 13", "brand": "Framework", "price": 1, "specs": "Modular, i5/i7/Ryzen", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 21, "name": "Lemur Pro", "brand": "System76", "price": 1, "specs": "i5/i7, Coreboot, Linux", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 22, "name": "Librem 14", "brand": "Purism", "price": 1, "specs": "i7, Privacy Switches, Linux", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 23, "name": "B360", "brand": "Getac", "price": 1, "specs": "i7, Fully Rugged, Sunlight Readable", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Rugged" },
        { "id": 24, "name": "CoreBook X", "brand": "Chuwi", "price": 1, "specs": "i5, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 25, "name": "INBook X2", "brand": "Infinix", "price": 1, "specs": "i3/i5, Thin & Light, Colorful", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Student" },
        { "id": 26, "name": "MagicBook 14", "brand": "Honor", "price": 1, "specs": "Ryzen 5, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Student" },
        { "id": 27, "name": "Book Slim", "brand": "Realme", "price": 1, "specs": "i5, 8GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Student" },
        { "id": 28, "name": "ZBook Studio", "brand": "Sony", "price": 1, "specs": "i9, 64GB RAM, 4K Display", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Workstation" },
        { "id": 29, "name": "Tecra A50", "brand": "Toshiba", "price": 1, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 30, "name": "Presario", "brand": "Compaq", "price": 1, "specs": "i3, 8GB RAM, 256GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 31, "name": "NV Series", "brand": "Gateway", "price": 1, "specs": "Pentium Gold, 8GB RAM, 256GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 32, "name": "EasyNote", "brand": "Packard Bell", "price": 1, "specs": "Celeron, 4GB RAM, 128GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 33, "name": "Nightsky RX315", "brand": "Eurocom", "price": 1, "specs": "i9, 64GB RAM, RTX 4090", "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", "category": "Workstation" },
        { "id": 34, "name": "Akoya", "brand": "Medion", "price": 1, "specs": "i5, 8GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 35, "name": "Vision 14", "brand": "Schenker", "price": 1, "specs": "i7, 16GB RAM, 1TB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Workstation" },
        { "id": 36, "name": "InfinityBook", "brand": "TUXEDO", "price": 1, "specs": "i7, Linux, 16GB RAM", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 37, "name": "Pinebook Pro", "brand": "Pine64", "price": 1, "specs": "ARM, Linux, 4GB RAM", "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 38, "name": "Win Max 2", "brand": "GPD", "price": 1, "specs": "Ryzen 7, 16GB RAM, Handheld", "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 39, "name": "OneMix 4", "brand": "One-Netbook", "price": 1, "specs": "i7, 16GB RAM, 10-inch", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Ultrabook" },
        { "id": 40, "name": "MaxBook Y13", "brand": "BMAX", "price": 1, "specs": "i3, 8GB RAM, Convertible", "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400", "category": "Convertible" },
        // Expanded Inventory — 750 dynamically generated laptops (IDs 41–790)
        ...Array.from({ length: 750 }, (_, i) => {
            const id = i + 41;
            const brands = [
                "Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Razer",
                "Microsoft", "Samsung", "LG", "Gigabyte", "Alienware", "Huawei",
                "Sony", "Toshiba", "Honor", "Xiaomi", "Fujitsu", "Schenker"
            ];
            const categories = [
                "Gaming", "Professional", "Business", "Ultrabook",
                "Budget", "Student", "Creative", "Workstation", "Convertible", "Rugged"
            ];
            const cpus = [
                "Intel Core i5-13500H", "Intel Core i7-13700H", "Intel Core i9-13900H",
                "AMD Ryzen 5 7600X", "AMD Ryzen 7 7745HX", "AMD Ryzen 9 7945HX",
                "Intel Core i5-1235U", "Intel Core i7-1265U", "Apple M2 Pro", "Apple M3"
            ];
            const gpus = [
                "RTX 4050", "RTX 4060", "RTX 4070", "RTX 4080", "RTX 4090",
                "Radeon RX 6700M", "Radeon RX 7600M", "Intel Iris Xe", "Apple GPU 19-core", "RTX 3060"
            ];
            const ramOpts = [8, 16, 32, 64];
            const storageOpts = [256, 512, 1024, 2048];
            const workingImageIds = [
                "1517336714731-489689fd1ca8", "1593642632823-8f785ba67e45",
                "1541807084-5c52b6b3adef", "1525547719571-a2d4ac8945e2",
                "1544244015-0df4b3ffc6b0", "1550745165-9bc0b252726f",
                "1496181133206-80ce9b88a853", "1588872657578-7efd1f1555ed",
                "1603302576837-37561b2e2302"
            ];
            const brand = brands[id % brands.length];
            const category = categories[i % categories.length]; // Changed from id to i for stable distribution
            const cpu = cpus[id % cpus.length];
            const gpu = gpus[id % gpus.length];
            const ram = ramOpts[id % ramOpts.length];
            const storage = storageOpts[id % storageOpts.length];
            const imageId = workingImageIds[id % workingImageIds.length];
            return {
                id,
                name: `${brand} ${category} Pro ${id}`,
                brand,
                price: 1,
                specs: `${cpu}, ${ram}GB RAM, ${storage}GB SSD, ${gpu}`,
                image: `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=400`,
                category
            };
        })
    ];

    let cart = [];
    let currentUser = null;
    let pendingUser = null;
    let tempSecret = null;
    let pendingCheckout = false;
    let inactivityTimer;

    // FIREBASE AUTH LISTENER
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = {
                uid: user.uid,
                name: user.displayName || user.email.split('@')[0],
                email: user.email,
                avatar: user.photoURL
            };
        } else {
            currentUser = null;
        }
        checkAuth();
    });

    // ---------------------------------------------------------
    // 2. DOM ELEMENTS
    // ---------------------------------------------------------
    const authGate = document.getElementById('auth-gate');
    const mainApp = document.getElementById('main-app');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const logoutBtn = document.getElementById('logout-btn');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Sections
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link, .categories-nav li');

    // Store elements
    const productGrid = document.getElementById('product-grid');
    const searchInputs = document.querySelectorAll('#search-input, .search-input-field');

    // Cart elements
    const cartToggle = document.getElementById('cart-toggle');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // 2FA Elements
    const tfaFormContainer = document.getElementById('tfa-form-container');
    const tfaForm = document.getElementById('tfa-form');
    const tfaCodeInput = document.getElementById('tfa-code');
    const cancelTfa = document.getElementById('cancel-tfa');

    const enableTfaBtn = document.getElementById('enable-tfa-btn');
    const tfaSetupWizard = document.getElementById('tfa-setup-wizard');
    const tfaVerifyCodeInput = document.getElementById('tfa-verify-code');
    const confirmTfaBtn = document.getElementById('confirm-tfa-btn');
    const tfaActiveStatus = document.getElementById('tfa-active-status');
    const disableTfaBtn = document.getElementById('disable-tfa-btn');
    const qrCodeContainer = document.getElementById('qrcode');

    // Delivery Modal Elements
    const deliveryOverlay = document.getElementById('delivery-overlay');
    const closeDelivery = document.getElementById('close-delivery');
    const proceedToPaymentBtn = document.getElementById('proceed-to-payment');

    // Delivery Inputs
    const deliveryNameInput = document.getElementById('delivery-name');
    const deliveryPhoneInput = document.getElementById('delivery-phone');
    const deliveryAddressInput = document.getElementById('delivery-address');
    const deliveryCityInput = document.getElementById('delivery-city');

    // Password strength elements
    const signupPassInput = document.getElementById('signup-pass');
    const passwordStrengthDiv = document.getElementById('password-strength');
    const strengthText = document.getElementById('strength-text');

    // ---------------------------------------------------------
    // 3. PASSWORD VISIBILITY TOGGLE
    // ---------------------------------------------------------
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);

            if (input) {
                // Toggle input type
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';

                // Toggle icon
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            }
        });
    });

    // ---------------------------------------------------------
    // 4. PASSWORD VALIDATION
    // ---------------------------------------------------------
    function validatePasswordStrength(password) {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);

        const strength = [minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;

        return {
            strength,
            minLength,
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            isValid: strength === 5
        };
    }

    // Real-time password strength indicator
    if (signupPassInput) {
        signupPassInput.addEventListener('input', (e) => {
            const password = e.target.value;
            if (password.length === 0) {
                passwordStrengthDiv.style.display = 'none';
                return;
            }

            passwordStrengthDiv.style.display = 'block';
            const validation = validatePasswordStrength(password);

            let strengthLabel = '';
            let color = '';

            if (validation.strength <= 2) {
                strengthLabel = '❌ Weak - Add uppercase, numbers & special characters';
                color = '#ef4444';
            } else if (validation.strength === 3) {
                strengthLabel = '⚠️ Fair - Add more variety';
                color = '#f59e0b';
            } else if (validation.strength === 4) {
                strengthLabel = '✓ Good - Almost there!';
                color = '#3b82f6';
            } else {
                strengthLabel = '✅ Strong - Perfect!';
                color = '#10b981';
            }

            strengthText.textContent = strengthLabel;
            strengthText.style.color = color;
        });
    }

    // Auth Modal DOM Elements
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');
    const forgotPassContainer = document.getElementById('forgot-pass-container');
    const forgotPassForm = document.getElementById('forgot-pass-form');
    const showForgotPassBtn = document.getElementById('show-forgot-pass');
    const backToLoginBtn = document.getElementById('back-to-login');

    function switchAuthView(viewName) {
        // Hide all containers
        loginFormContainer.style.display = 'none';
        signupFormContainer.style.display = 'none';
        forgotPassContainer.style.display = 'none';
        tfaFormContainer.style.display = 'none';

        // Show requested container
        if (viewName === 'login') loginFormContainer.style.display = 'block';
        else if (viewName === 'signup') signupFormContainer.style.display = 'block';
        else if (viewName === 'forgot') forgotPassContainer.style.display = 'block';
        else if (viewName === 'tfa') tfaFormContainer.style.display = 'block';
    }

    menuToggle.onclick = () => {
        navMenu.classList.toggle('active');
    };

    function initGoogleLogin() {
        if (location.protocol === 'file:') {
            console.warn("Google OAuth will not work when opening the file directly (file://). Please use the 'run_locally.bat' script.");
            const authMsg = document.getElementById('auth-msg');
            if (authMsg) authMsg.innerHTML = '<span style="color:#ef4444">⚠ Error: Opening as file. Use a local server (run_locally.bat) to sign in with Google.</span>';
        }

        const buttons = [
            document.getElementById('google-login-btn'),
            document.getElementById('google-signup-btn'),
            document.getElementById('google-footer-btn')
        ];

        buttons.forEach(btn => {
            if (btn) {
                btn.innerHTML = `
                    <button class="auth-btn google-btn" style="background:#fff; color:#444; border:1px solid #ddd; display:flex; align-items:center; justify-content:center; gap:10px; width:100%; border-radius:50px; padding:12px; font-weight:600; cursor:pointer;">
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20">
                        Continue with Google
                    </button>
                `;
                btn.onclick = handleGoogleSignIn;
            }
        });
    }

    async function handleGoogleSignIn() {
        if (location.protocol === 'file:') {
            alert("Error: You cannot sign in with Google when opening index.html directly. Please use 'run_locally.bat'.");
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider);
            console.log("Firebase: Successfully signed in with Google Popup");
            authGate.style.display = 'none';
        } catch (error) {
            console.error("Firebase Google Auth Error:", error);
            if (error.code === 'auth/unauthorized-domain') {
                alert(`Error: This domain (${window.location.hostname}) is not authorized in your Firebase Console. Please add '${window.location.hostname}' to Authorized Domains in Firebase Authentication settings.`);
            } else {
                alert("Google Sign-in failed: " + error.message);
            }
        }
    }

    function checkAuth() {
        const userFullName = document.getElementById('user-full-name');
        const loginBtn = document.getElementById('login-btn');
        const mobileLoginLinks = document.querySelectorAll('.auth-link-login');
        const mobileLogoutLinks = document.querySelectorAll('.auth-link-logout');

        if (currentUser) {
            authGate.style.display = 'none';
            mainApp.style.display = 'flex';
            if (userFullName) userFullName.textContent = currentUser.name;
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';

            // Mobile Nav Updates
            mobileLoginLinks.forEach(el => el.style.display = 'none');
            mobileLogoutLinks.forEach(el => el.style.display = 'block');

            const footerLoginContainer = document.getElementById('footer-google-login-container');
            if (footerLoginContainer) footerLoginContainer.style.display = 'none';

            const avatarEl = document.getElementById('user-avatar');
            if (avatarEl) avatarEl.src = currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=6366f1&color=fff`;
            renderProducts(laptops);
            resetInactivityTimer();

            if (pendingCheckout) {
                pendingCheckout = false;
                handleCheckout();
            }
        } else {
            authGate.style.display = 'none';
            mainApp.style.display = 'flex';
            if (userFullName) userFullName.textContent = 'Guest';
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';

            mobileLoginLinks.forEach(el => el.style.display = 'block');
            mobileLogoutLinks.forEach(el => el.style.display = 'none');

            const footerLoginContainer = document.getElementById('footer-google-login-container');
            if (footerLoginContainer) footerLoginContainer.style.display = 'flex';

            const avatarEl = document.getElementById('user-avatar');
            if (avatarEl) avatarEl.src = `https://ui-avatars.com/api/?name=Guest&background=94a3b8&color=fff`;
            renderProducts(laptops);
            clearTimeout(inactivityTimer);
        }
    }

    // Auth Switchers
    if (document.getElementById('login-btn')) {
        document.getElementById('login-btn').onclick = () => {
            authGate.style.display = 'flex';
            switchAuthView('login');
        };
    }

    showSignup.onclick = () => switchAuthView('signup');
    showLogin.onclick = () => switchAuthView('login');
    showForgotPassBtn.onclick = () => switchAuthView('forgot');
    backToLoginBtn.onclick = () => switchAuthView('login');
    cancelTfa.onclick = () => switchAuthView('login');

    // Form Submissions
    signupForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        const pass = document.getElementById('signup-pass').value;

        const validation = validatePasswordStrength(pass);
        if (!validation.isValid) {
            alert("Please use a stronger password.");
            return;
        }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
            await userCredential.user.updateProfile({ displayName: name });
            alert(`🎉 Account Created Successfully!\nWelcome, ${name}!`);
            authGate.style.display = 'none';
        } catch (error) {
            alert("Signup failed: " + error.message);
        }
    };

    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        try {
            await auth.signInWithEmailAndPassword(email, pass);
            authGate.style.display = 'none';
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    forgotPassForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        try {
            await auth.sendPasswordResetEmail(email);
            alert('Password reset link sent! Please check your email inbox.');
            switchAuthView('login');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    tfaForm.onsubmit = (e) => {
        e.preventDefault();
        const code = tfaCodeInput.value;
        if (verifyOTP(pendingUser.tfaSecret, code)) {
            currentUser = pendingUser;
            pendingUser = null;
            tfaCodeInput.value = '';
            authGate.style.display = 'none';
            checkAuth();
        } else {
            alert('Invalid 2FA code. Please try again.');
        }
    };

    // ---------------------------------------------------------
    // SESSION TIMEOUT (IDLE LOGOUT)
    // ---------------------------------------------------------
    const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

    function resetInactivityTimer() {
        if (!currentUser) return;

        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            handleLogout(true); // Argument true indicates a timeout
        }, INACTIVITY_LIMIT);
    }

    function handleLogout(isTimeout = false) {
        auth.signOut().then(() => {
            clearTimeout(inactivityTimer);
            if (isTimeout) {
                alert('Your session has timed out due to 10 minutes of inactivity for security.');
            }
        });
    }

    // Event listeners to reset the timer on user activity
    ['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
        window.addEventListener(event, resetInactivityTimer);
    });

    logoutBtn.onclick = () => handleLogout(false);

    // -------------------------------------------------------
    // 4. NAVIGATION LOGIC
    // -------------------------------------------------------
    const catNavItems = document.querySelectorAll('.categories-nav li');

    navLinks.forEach(link => {
        link.onclick = () => {
            const sectionId = link.getAttribute('data-section');
            const filter = link.getAttribute('data-filter');

            // Switch active link (main nav)
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Switch active section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(`${sectionId}-section`).classList.add('active');

            if (sectionId === 'store') {
                // Update category tab highlight
                catNavItems.forEach(c => c.classList.remove('cat-active'));
                const matchingCat = [...catNavItems].find(c => c.getAttribute('data-filter') === (filter || 'all'));
                if (matchingCat) matchingCat.classList.add('cat-active');

                if (!filter || filter === 'all') {
                    renderProducts(laptops);
                } else {
                    renderProducts(laptops.filter(l => l.category === filter));
                }
            } else if (sectionId === 'settings') {
                updateSettingsUI();
            }

            // Close menu after clicking a link
            navMenu.classList.remove('active');
        };
    });

    // Category tab clicks
    catNavItems.forEach(tab => {
        tab.onclick = () => {
            const filter = tab.getAttribute('data-filter');
            catNavItems.forEach(c => c.classList.remove('cat-active'));
            tab.classList.add('cat-active');

            // Also update section to store
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById('store-section').classList.add('active');

            if (!filter || filter === 'all') {
                renderProducts(laptops);
            } else {
                renderProducts(laptops.filter(l => l.category === filter));
            }
        };
    });

    // Close menu when clicking outside
    window.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking mobile-only items
    document.querySelectorAll('.mobile-only').forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ---------------------------------------------------------
    // 5. FAQ & CONTACT INTERACTIVITY
    // ---------------------------------------------------------
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').onclick = () => {
            item.classList.toggle('active');
        };
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.onsubmit = async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Email Error:', error);
                alert('Oops! There was a problem sending your message. Please try again or email us directly at narhsnazzisco@gmail.com');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        };
    }

    // ---------------------------------------------------------
    // 6. STORE & CART LOGIC (REUSED)
    // ---------------------------------------------------------
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <span class="brand">${product.brand}</span>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="specs">${product.specs}</p>
                <div class="footer">
                    <span class="price">$${product.price}</span>
                    <button class="add-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(card);
        });

        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.onclick = () => addToCart(parseInt(btn.getAttribute('data-id')));
        });

        // Update counts UI
        updateCategoryCounts();
    }

    function updateCategoryCounts() {
        catNavItems.forEach(tab => {
            const filter = tab.getAttribute('data-filter');
            let count = 0;
            if (filter === 'all') {
                count = laptops.length;
            } else {
                count = laptops.filter(l => l.category === filter).length;
            }

            const badge = tab.querySelector('.count-badge') || document.createElement('span');
            badge.className = 'count-badge';
            badge.textContent = count;
            if (!tab.querySelector('.count-badge')) tab.appendChild(badge);
        });
    }

    searchInputs.forEach(input => {
        input.oninput = (e) => {
            const term = e.target.value.toLowerCase();

            // Sync all search inputs
            searchInputs.forEach(i => {
                if (i !== e.target) i.value = e.target.value;
            });

            renderProducts(laptops.filter(l =>
                l.name.toLowerCase().includes(term) || l.brand.toLowerCase().includes(term)
            ));
        };
    });

    function addToCart(id) {
        const product = laptops.find(l => l.id === id);
        if (!product) return;
        cart.push(product);
        updateCart();
        // Brief visual feedback instead of blocking alert
        const btn = document.querySelector(`.add-btn[data-id="${id}"]`);
        if (btn) {
            const orig = btn.textContent;
            btn.textContent = '✓ Added!';
            btn.style.background = '#10b981';
            setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1200);
        }
    }

    // Exposed globally so inline onclick in cart HTML can reach it
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    function updateCart() {
        // Update all counters (desktop and mobile)
        document.querySelectorAll('.cart-count-display').forEach(el => {
            el.innerText = cart.length;
        });
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 2rem 0;">Your cart is empty.</p>`;
            cartTotal.innerText = `$0`;
            return;
        }

        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.style.padding = '12px 0';
            div.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.alignItems = 'center';
            div.innerHTML = `
                <div>
                    <h4 style="font-size:0.95rem; margin-bottom:4px;">${item.name}</h4>
                    <p style="color:var(--text-muted); font-size:0.85rem;">$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:1.2rem;">✕</button>
            `;
            cartItemsContainer.appendChild(div);
        });
        cartTotal.innerText = `$${total.toFixed(2)}`;
    }

    cartToggle.onclick = () => cartOverlay.classList.add('active');
    closeCart.onclick = () => cartOverlay.classList.remove('active');

    function handleCheckout() {
        if (cart.length === 0) return alert('Your cart is empty! Add some laptops first.');

        // Check for authentication
        if (!currentUser) {
            pendingCheckout = true;
            cartOverlay.classList.remove('active');
            authGate.style.display = 'flex';
            return;
        }

        // Hide cart and show delivery modal
        cartOverlay.classList.remove('active');
        deliveryOverlay.classList.add('active');
    }

    checkoutBtn.onclick = handleCheckout;

    closeDelivery.onclick = () => deliveryOverlay.classList.remove('active');

    proceedToPaymentBtn.onclick = () => {
        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

        // Collect Delivery Information
        const deliveryData = {
            name: deliveryNameInput.value,
            phone: deliveryPhoneInput.value,
            address: deliveryAddressInput.value,
            city: deliveryCityInput.value
        };

        if (!deliveryData.name || !deliveryData.phone || !deliveryData.address || !deliveryData.city) {
            return alert('Please fill in all delivery details before proceeding to payment.');
        }

        // Trigger Paystack Payment Modal
        payWithPaystack(totalAmount, deliveryData);
    };

    function payWithPaystack(amountUSD, delivery) {
        // Convert USD to GHS for Paystack (if needed for local payment methods like Momo)
        const amountGHS = amountUSD * CONFIG.CONVERSION_RATE_USD_TO_GHS;
        const amountInPesewas = Math.round(amountGHS * 100);

        let handler = PaystackPop.setup({
            key: CONFIG.PAYSTACK_PUBLIC_KEY,
            email: currentUser.email,
            amount: amountInPesewas,
            currency: CONFIG.CURRENCY,
            ref: 'DONALD-' + Math.floor((Math.random() * 1000000000) + 1),
            channels: ['card', 'bank', 'bank_transfer', 'mobile_money'],
            metadata: {
                custom_fields: [
                    {
                        display_name: "Customer Name",
                        variable_name: "customer_name",
                        value: currentUser.name
                    },
                    {
                        display_name: "Delivery Address",
                        variable_name: "delivery_address",
                        value: `${delivery.name}, ${delivery.phone}, ${delivery.address}, ${delivery.city}`
                    },
                    {
                        display_name: "Cart Summary",
                        variable_name: "cart_summary",
                        value: cart.map(item => item.name).join(', ')
                    },
                    {
                        display_name: "Payout Account",
                        variable_name: "payout_account",
                        value: "2061250008399"
                    }
                ]
            },
            callback: function (response) {
                alert(`Payment Success! Reference: ${response.reference}\n\nThank you for choosing ${CONFIG.STORE_NAME}!`);
                cart = [];
                updateCart();
                deliveryOverlay.classList.remove('active');
            },
            onClose: function () {
                alert('Payment was not completed. You can try again from your cart.');
            }
        });
        handler.openIframe();
    }

    // ---------------------------------------------------------
    // 7. 2FA CORE LOGIC
    // ---------------------------------------------------------
    function generateSecret() {
        // Generate a random 20-character base32 secret
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        let secret = '';
        for (let i = 0; i < 20; i++) {
            secret += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return secret;
    }

    function verifyOTP(secret, code) {
        try {
            const totp = new OTPAuth.TOTP({
                issuer: CONFIG.STORE_NAME,
                label: currentUser ? currentUser.email : (pendingUser ? pendingUser.email : 'User'),
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: secret
            });
            const delta = totp.validate({ token: code, window: 1 });
            return delta !== null;
        } catch (err) {
            console.error('TOTP Error:', err);
            return false;
        }
    }

    function updateSettingsUI() {
        if (!currentUser) {
            // Show login prompt in settings if not logged in
            const setupArea = document.getElementById('tfa-setup-area');
            if (setupArea) setupArea.innerHTML = '<p style="color:var(--text-muted)">Please sign in to manage your security settings.</p>';
            return;
        }

        if (currentUser.tfaEnabled) {
            document.getElementById('tfa-setup-area').style.display = 'none';
            if (tfaSetupWizard) tfaSetupWizard.style.display = 'none';
            if (tfaActiveStatus) tfaActiveStatus.style.display = 'block';
        } else {
            document.getElementById('tfa-setup-area').style.display = 'block';
            if (tfaSetupWizard) tfaSetupWizard.style.display = 'none';
            if (tfaActiveStatus) tfaActiveStatus.style.display = 'none';
        }
    }

    enableTfaBtn.onclick = () => {
        tempSecret = generateSecret();
        qrCodeContainer.innerHTML = '';

        const totp = new OTPAuth.TOTP({
            issuer: CONFIG.STORE_NAME,
            label: currentUser.email,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: tempSecret
        });

        new QRCode(qrCodeContainer, {
            text: totp.toString(),
            width: 160,
            height: 160
        });

        document.getElementById('tfa-setup-area').style.display = 'none';
        tfaSetupWizard.style.display = 'block';
    };

    confirmTfaBtn.onclick = () => {
        const code = tfaVerifyCodeInput.value;
        if (verifyOTP(tempSecret, code)) {
            currentUser.tfaEnabled = true;
            currentUser.tfaSecret = tempSecret;

            // Persist to users list
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const index = users.findIndex(u => u.email === currentUser.email);
            if (index !== -1) {
                users[index] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert('Two-Factor Authentication is now active!');
            tempSecret = null;
            tfaVerifyCodeInput.value = '';
            updateSettingsUI();
        } else {
            alert('Invalid code. Please try again.');
        }
    };

    disableTfaBtn.onclick = () => {
        if (confirm('Are you sure you want to disable 2FA? This will make your account less secure.')) {
            currentUser.tfaEnabled = false;
            currentUser.tfaSecret = null;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const index = users.findIndex(u => u.email === currentUser.email);
            if (index !== -1) {
                users[index] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
            }

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateSettingsUI();
            alert('2FA has been disabled.');
        }
    };

    // Initial check
    checkAuth();
    initGoogleLogin();

    // =====================================================
    // LAPTOP BACKGROUND CANVAS ANIMATION - FULL VERSION
    // =====================================================
    (function initBgAnimation() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        /* --- Polyfill-safe rounded rect path --- */
        function rr(x, y, w, h, r) {
            r = Math.min(r, w / 2, h / 2);
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        }

        /* --- Draw a single laptop --- */
        function drawLaptop(item) {
            const { x, y, size, rotation, pulse } = item;
            const a = item.alpha * (0.75 + 0.25 * Math.sin(pulse));

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            const w = size;
            const sh = size * 0.60;   // screen height
            const bh = size * 0.13;   // base height

            /* ---- Screen lid ---- */
            ctx.shadowColor = '#7c3aed';
            ctx.shadowBlur = size * 0.35;
            ctx.globalAlpha = a;
            ctx.strokeStyle = `rgba(139, 92, 246, ${Math.min(a * 9, 1)})`;
            ctx.lineWidth = 1.6;
            rr(-w / 2, -sh - bh, w, sh, 6);
            ctx.stroke();

            /* ---- Screen inner frame (display) ---- */
            ctx.shadowBlur = 0;
            ctx.globalAlpha = a * 0.42;
            ctx.strokeStyle = `rgba(196, 181, 253, 0.9)`;
            ctx.lineWidth = 1;
            rr(-w / 2 + w * 0.07, -sh - bh + sh * 0.09, w * 0.86, sh * 0.74, 4);
            ctx.stroke();

            /* ---- Tiny scanlines on screen ---- */
            ctx.globalAlpha = a * 0.15;
            ctx.strokeStyle = 'rgba(167, 139, 250, 0.8)';
            ctx.lineWidth = 0.5;
            for (let row = 0; row < 4; row++) {
                const sy = -sh - bh + sh * 0.15 + row * (sh * 0.55 / 4);
                ctx.beginPath();
                ctx.moveTo(-w / 2 + w * 0.1, sy);
                ctx.lineTo(w / 2 - w * 0.1, sy);
                ctx.stroke();
            }

            /* ---- Keyboard base ---- */
            ctx.shadowColor = '#6d28d9';
            ctx.shadowBlur = size * 0.25;
            ctx.globalAlpha = a;
            ctx.strokeStyle = `rgba(139, 92, 246, ${Math.min(a * 9, 1)})`;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(-w / 2 - w * 0.07, -bh);
            ctx.lineTo(-w / 2, -bh - 1);
            ctx.lineTo(w / 2, -bh - 1);
            ctx.lineTo(w / 2 + w * 0.07, -bh);
            ctx.lineTo(w / 2 + w * 0.09, bh);
            ctx.lineTo(-w / 2 - w * 0.09, bh);
            ctx.closePath();
            ctx.stroke();

            /* ---- Trackpad ---- */
            ctx.shadowBlur = 0;
            ctx.globalAlpha = a * 0.28;
            ctx.lineWidth = 1;
            rr(-w * 0.14, bh * 0.05, w * 0.28, bh * 0.6, 2);
            ctx.stroke();

            /* ---- Webcam dot ---- */
            ctx.shadowColor = 'rgba(196, 181, 253, 1)';
            ctx.shadowBlur = 6;
            ctx.globalAlpha = a * 0.8;
            ctx.fillStyle = 'rgba(196, 181, 253, 0.95)';
            ctx.beginPath();
            ctx.arc(0, -sh - bh + 5, 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        /* --- Draw faint constellation lines between nearby laptops --- */
        function drawConnections(items) {
            const MAX_DIST = 220;
            for (let i = 0; i < items.length; i++) {
                for (let j = i + 1; j < items.length; j++) {
                    const a = items[i], b = items[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MAX_DIST) {
                        const op = (1 - dist / MAX_DIST) * 0.07;
                        ctx.save();
                        ctx.globalAlpha = op;
                        ctx.strokeStyle = 'rgba(139, 92, 246, 1)';
                        ctx.lineWidth = 0.6;
                        ctx.shadowBlur = 0;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        }

        /* --- Create 30 laptop particles --- */
        const items = Array.from({ length: 30 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 36 + Math.random() * 72,
            vx: (Math.random() - 0.5) * 0.38,
            vy: (Math.random() - 0.5) * 0.38,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.004,
            alpha: 0.10 + Math.random() * 0.14,
            pulse: Math.random() * Math.PI * 2,
            pulseSpd: 0.018 + Math.random() * 0.022
        }));

        /* --- Main animation loop --- */
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawConnections(items);

            const pad = 160;
            items.forEach(item => {
                item.x += item.vx;
                item.y += item.vy;
                item.rotation += item.rotSpeed;
                item.pulse += item.pulseSpd;

                if (item.x < -pad) item.x = canvas.width + pad;
                else if (item.x > canvas.width + pad) item.x = -pad;
                if (item.y < -pad) item.y = canvas.height + pad;
                else if (item.y > canvas.height + pad) item.y = -pad;

                drawLaptop(item);
            });

            requestAnimationFrame(animate);
        }

        animate();
    })();
});


