document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 0. CONFIGURATION
    // ---------------------------------------------------------
    const CONFIG = {
        PAYSTACK_PUBLIC_KEY: 'pk_live_6b9968065dc0bd4842c97ffa138e49127c862888', // UPDATED WITH LIVE PUBLIC KEY
        GOOGLE_CLIENT_ID: '233214895227-sug4rhttgo35fr45die0906go676odb2.apps.googleusercontent.com', // UPDATED WITH USER CLIENT ID
        CURRENCY: 'GHS',
        CONVERSION_RATE_USD_TO_GHS: 14.77, // Fixed rate for demonstration (Adjust as needed)
        STORE_NAME: 'DonaldLaptops'
    };

    // ---------------------------------------------------------
    // 1. DATA & STATE
    // ---------------------------------------------------------
    const laptops = [
        { "id": 1, "name": "MacBook Pro 16", "brand": "Apple", "price": 2499, "specs": "M3 Max, 32GB RAM, 1TB SSD", "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400", "category": "Premium" },
        { "id": 2, "name": "XPS 15", "brand": "Dell", "price": 1899, "specs": "i9, 32GB RAM, 1TB SSD, RTX 4060", "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 3, "name": "ThinkPad X1 Carbon", "brand": "Lenovo", "price": 1699, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 4, "name": "Zephyrus G14", "brand": "ASUS", "price": 1599, "specs": "Ryzen 9, 16GB RAM, 1TB SSD, RTX 4070", "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 5, "name": "Spectre x360", "brand": "HP", "price": 1499, "specs": "i7, 16GB RAM, 1TB SSD, OLED", "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400", "category": "Convertible" },
        { "id": 6, "name": "Blade 15", "brand": "Razer", "price": 2799, "specs": "i9, 32GB RAM, 1TB SSD, RTX 4080", "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 7, "name": "Surface Laptop 5", "brand": "Microsoft", "price": 1299, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Ultrabook" },
        { "id": 8, "name": "Swift Edge 16", "brand": "Acer", "price": 1199, "specs": "Ryzen 7, 16GB RAM, 1TB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Thin & Light" },
        { "id": 9, "name": "Stealth 16 Studio", "brand": "MSI", "price": 1999, "specs": "i7, 32GB RAM, 1TB SSD, RTX 4070", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 10, "name": "Galaxy Book3 Ultra", "brand": "Samsung", "price": 2199, "specs": "i9, 32GB RAM, 1TB SSD, RTX 4070", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 11, "name": "m18 R1", "brand": "Alienware", "price": 2999, "specs": "i9, 32GB RAM, 2TB SSD, RTX 4090", "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 12, "name": "AERO 16 OLED", "brand": "Gigabyte", "price": 1799, "specs": "i7, 16GB RAM, 1TB SSD, RTX 4070", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Creator" },
        { "id": 13, "name": "Gram 17", "brand": "LG", "price": 1599, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Thin & Light" },
        { "id": 14, "name": "Lifebook U9311", "brand": "Fujitsu", "price": 1899, "specs": "i7, 16GB RAM, 512GB SSD, LTE", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 15, "name": "Toughbook 55", "brand": "Panasonic", "price": 2199, "specs": "i5, 16GB RAM, 512GB SSD, Rugged", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Rugged" },
        { "id": 16, "name": "MateBook X Pro", "brand": "Huawei", "price": 1699, "specs": "i7, 16GB RAM, 1TB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Ultrabook" },
        { "id": 17, "name": "Mi Notebook Pro", "brand": "Xiaomi", "price": 1199, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 18, "name": "Portégé X30L-K", "brand": "Dynabook", "price": 1499, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 19, "name": "VAIO Z", "brand": "VAIO", "price": 3299, "specs": "i7, 32GB RAM, 2TB SSD, Carbon Fiber", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Luxury" },
        { "id": 20, "name": "Framework Laptop 13", "brand": "Framework", "price": 949, "specs": "Modular, i5/i7/Ryzen", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Modular" },
        { "id": 21, "name": "Lemur Pro", "brand": "System76", "price": 1149, "specs": "i5/i7, Coreboot, Linux", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Linux" },
        { "id": 22, "name": "Librem 14", "brand": "Purism", "price": 1570, "specs": "i7, Privacy Switches, Linux", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Privacy" },
        { "id": 23, "name": "B360", "brand": "Getac", "price": 3500, "specs": "i7, Fully Rugged, Sunlight Readable", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Rugged" },
        { "id": 24, "name": "CoreBook X", "brand": "Chuwi", "price": 499, "specs": "i5, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 25, "name": "INBook X2", "brand": "Infinix", "price": 450, "specs": "i3/i5, Thin & Light, Colorful", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 26, "name": "MagicBook 14", "brand": "Honor", "price": 750, "specs": "Ryzen 5, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Mainstream" },
        { "id": 27, "name": "Book Slim", "brand": "Realme", "price": 699, "specs": "i5, 8GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Mainstream" },
        { "id": 28, "name": "ZBook Studio", "brand": "Sony", "price": 3500, "specs": "i9, 64GB RAM, 4K Display", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 29, "name": "Tecra A50", "brand": "Toshiba", "price": 1200, "specs": "i7, 16GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Business" },
        { "id": 30, "name": "Presario", "brand": "Compaq", "price": 400, "specs": "i3, 8GB RAM, 256GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 31, "name": "NV Series", "brand": "Gateway", "price": 600, "specs": "Pentium Gold, 8GB RAM, 256GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 32, "name": "EasyNote", "brand": "Packard Bell", "price": 500, "specs": "Celeron, 4GB RAM, 128GB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Budget" },
        { "id": 33, "name": "Nightsky RX315", "brand": "Eurocom", "price": 3200, "specs": "i9, 64GB RAM, RTX 4090", "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", "category": "Workstation" },
        { "id": 34, "name": "Akoya", "brand": "Medion", "price": 750, "specs": "i5, 8GB RAM, 512GB SSD", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Mainstream" },
        { "id": 35, "name": "Vision 14", "brand": "Schenker", "price": 1400, "specs": "i7, 16GB RAM, 1TB SSD", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=400", "category": "Professional" },
        { "id": 36, "name": "InfinityBook", "brand": "TUXEDO", "price": 1300, "specs": "i7, Linux, 16GB RAM", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400", "category": "Linux" },
        { "id": 37, "name": "Pinebook Pro", "brand": "Pine64", "price": 220, "specs": "ARM, Linux, 4GB RAM", "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400", "category": "Linux" },
        { "id": 38, "name": "Win Max 2", "brand": "GPD", "price": 1100, "specs": "Ryzen 7, 16GB RAM, Handheld", "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=400", "category": "Gaming" },
        { "id": 39, "name": "OneMix 4", "brand": "One-Netbook", "price": 1200, "specs": "i7, 16GB RAM, 10-inch", "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400", "category": "Ultrabook" },
        { "id": 40, "name": "MaxBook Y13", "brand": "BMAX", "price": 450, "specs": "i3, 8GB RAM, Convertible", "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400", "category": "Convertible" }
    ];

    let cart = [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    let pendingUser = null; // Used during 2FA verification step
    let tempSecret = null; // Used during 2FA setup

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

    // Sections
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link, .categories-nav li');

    // Store elements
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');

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

    // ---------------------------------------------------------
    // 3. AUTHENTICATION LOGIC
    // ---------------------------------------------------------
    function initGoogleLogin() {
        if (typeof google === 'undefined') return;

        google.accounts.id.initialize({
            client_id: CONFIG.GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("google-login-btn"),
            { theme: "outline", size: "large", width: "100%" }
        );
    }

    function handleGoogleResponse(response) {
        // In a real app, you'd send this JWT to your server to verify
        // For this local demo, we'll decode the JWT payload to get user info
        const payload = JSON.parse(atob(response.credential.split('.')[1]));

        const gUser = {
            name: payload.name,
            email: payload.email,
            avatar: payload.picture
        };

        localStorage.setItem('currentUser', JSON.stringify(gUser));
        currentUser = gUser;
        checkAuth();
    }

    function checkAuth() {
        if (currentUser) {
            authGate.style.display = 'none';
            mainApp.style.display = 'flex';
            document.getElementById('user-avatar').src = `https://ui-avatars.com/api/?name=${currentUser.name}&background=6366f1&color=fff`;
            renderProducts(laptops);
        } else {
            authGate.style.display = 'flex';
            mainApp.style.display = 'none';
        }
    }

    showSignup.onclick = () => {
        document.getElementById('login-form-container').style.display = 'none';
        document.getElementById('signup-form-container').style.display = 'block';
    };

    showLogin.onclick = () => {
        document.getElementById('signup-form-container').style.display = 'none';
        document.getElementById('tfa-form-container').style.display = 'none';
        document.getElementById('login-form-container').style.display = 'block';
    };

    cancelTfa.onclick = () => showLogin.onclick();

    signupForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const pass = document.getElementById('signup-pass').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // OWNER EMAIL PROTECTION RULE
        const sanitizedEmail = email.trim().toLowerCase();
        console.log("Signup Attempt:", sanitizedEmail); // Debugging
        if (sanitizedEmail === 'narhsnazzisco@gmail.com') {
            alert('CRITICAL SECURITY ALERT: This email address (narhsnazzisco@gmail.com) is reserved for the store owner and cannot be used to create new accounts.');
            return;
        }

        if (users.find(u => u.email === email)) return alert('Email already registered!');

        const newUser = { name, email, pass };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        currentUser = newUser;
        checkAuth();
    };

    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Block owner email from logging in via public form if needed (Optional security)
        if (email.trim().toLowerCase() === 'narhsnazzisco@gmail.com') {
            return alert('Access Denied: The administrator email cannot be used via this form.');
        }

        const user = users.find(u => u.email === email && u.pass === pass);

        if (user) {
            if (user.tfaEnabled) {
                pendingUser = user;
                document.getElementById('login-form-container').style.display = 'none';
                tfaFormContainer.style.display = 'block';
            } else {
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUser = user;
                checkAuth();
            }
        } else {
            alert('Invalid email or password!');
        }
    };

    tfaForm.onsubmit = (e) => {
        e.preventDefault();
        const code = tfaCodeInput.value;
        if (verifyOTP(pendingUser.tfaSecret, code)) {
            localStorage.setItem('currentUser', JSON.stringify(pendingUser));
            currentUser = pendingUser;
            pendingUser = null;
            tfaCodeInput.value = '';
            checkAuth();
        } else {
            alert('Invalid 2FA code. Please try again.');
        }
    };

    logoutBtn.onclick = () => {
        localStorage.removeItem('currentUser');
        currentUser = null;
        checkAuth();
    };

    // ---------------------------------------------------------
    // 4. NAVIGATION LOGIC
    // ---------------------------------------------------------
    navLinks.forEach(link => {
        link.onclick = () => {
            const sectionId = link.getAttribute('data-section');
            const filter = link.getAttribute('data-filter');

            // Switch active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Switch active section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(`${sectionId}-section`).classList.add('active');

            if (sectionId === 'store') {
                if (filter === 'all') {
                    renderProducts(laptops);
                } else {
                    renderProducts(laptops.filter(l => l.category === filter));
                }
            } else if (sectionId === 'settings') {
                updateSettingsUI();
            }
        };
    });

    // ---------------------------------------------------------
    // 5. FAQ INTERACTIVITY
    // ---------------------------------------------------------
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').onclick = () => {
            item.classList.toggle('active');
        };
    });

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
    }

    searchInput.oninput = (e) => {
        const term = e.target.value.toLowerCase();
        renderProducts(laptops.filter(l =>
            l.name.toLowerCase().includes(term) || l.brand.toLowerCase().includes(term)
        ));
    };

    function addToCart(id) {
        cart.push(laptops.find(l => l.id === id));
        updateCart();
        alert('Added to cart!');
    }

    function updateCart() {
        cartCount.innerText = cart.length;
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.style.padding = '10px';
            div.style.borderBottom = '1px solid #333';
            div.innerHTML = `<h4>${item.name}</h4><p>$${item.price}</p>`;
            cartItemsContainer.appendChild(div);
        });
        cartTotal.innerText = `$${total}`;
    }

    cartToggle.onclick = () => cartOverlay.classList.add('active');
    closeCart.onclick = () => cartOverlay.classList.remove('active');
    checkoutBtn.onclick = () => {
        if (cart.length === 0) return alert('Cart is empty!');

        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

        // Trigger Paystack Payment Modal
        payWithPaystack(totalAmount);
    };

    function payWithPaystack(amountUSD) {
        // Convert USD to GHS for Paystack (if needed for local payment methods like Momo)
        const amountGHS = amountUSD * CONFIG.CONVERSION_RATE_USD_TO_GHS;
        const amountInPesewas = Math.round(amountGHS * 100);

        let handler = PaystackPop.setup({
            key: CONFIG.PAYSTACK_PUBLIC_KEY,
            email: currentUser.email,
            amount: amountInPesewas,
            currency: CONFIG.CURRENCY,
            ref: 'LUXE-' + Math.floor((Math.random() * 1000000000) + 1),
            metadata: {
                custom_fields: [
                    {
                        display_name: "Customer Name",
                        variable_name: "customer_name",
                        value: currentUser.name
                    },
                    {
                        display_name: "Cart Summary",
                        variable_name: "cart_summary",
                        value: cart.map(item => item.name).join(', ')
                    }
                ]
            },
            callback: function (response) {
                alert(`Payment Success! Reference: ${response.reference}\n\nThank you for choosing ${CONFIG.STORE_NAME}!`);
                cart = [];
                updateCart();
                cartOverlay.classList.remove('active');
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
        if (!currentUser) return;

        if (currentUser.tfaEnabled) {
            document.getElementById('tfa-setup-area').style.display = 'none';
            tfaSetupWizard.style.display = 'none';
            tfaActiveStatus.style.display = 'block';
        } else {
            document.getElementById('tfa-setup-area').style.display = 'block';
            tfaSetupWizard.style.display = 'none';
            tfaActiveStatus.style.display = 'none';
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
});
