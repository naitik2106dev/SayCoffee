/**
 * SAY COFFEE LAXMI NAGAR - ECOMMERCE LOGIC
 * High-End Cafe eCommerce & Starbucks App-Style Dynamic Interactions
 */

/* ==========================================================================
   A. WEB AUDIO FEEDBACK (Buttery Micro-Interactions)
   ========================================================================== */
const AudioFeedback = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio fallback silent
    }
  },
  playCartChime() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.12, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.18);
      });
    } catch (e) {
      // Audio fallback silent
    }
  }
};

/* ==========================================================================
   B. DATA: HERO CAROUSEL (Citing Images 13, 14, 15, 16)
   ========================================================================== */
const heroSlides = [
  {
    id: "hero-1",
    tag: "Summer Specialty • Laxmi Nagar",
    titleMain: "MATCHA",
    titleSub: "Strawberry",
    exactName: "Matcha Strawberry",
    price: 164,
    description: "Sweet, earthy, vibrant flavor burst.",
    image: "assets/hero-matcha.jpg",
    accentColor: "#4E8752",
    blobColor: "#A7F3D0",
    glowColor: "rgba(78, 135, 82, 0.22)",
    bgAccent: "#F0FDF4",
    category: "Matcha & Refreshers",
    veg: true,
    customType: "matcha"
  },
  {
    id: "hero-2",
    tag: "Signature Frappe • House Favorite",
    titleMain: "ROASTED",
    titleSub: "Hazelnut",
    exactName: "Roasted Hazelnut",
    price: 134,
    description: "Creamy, nut-rich indulgence.",
    image: "assets/hero-hazelnut.jpg",
    accentColor: "#B45309",
    blobColor: "#FDE68A",
    glowColor: "rgba(217, 119, 6, 0.25)",
    bgAccent: "#FFFBEB",
    category: "Cold Coffee",
    veg: true,
    customType: "coffee"
  },
  {
    id: "hero-3",
    tag: "Artisan Brew • Intense Roast",
    titleMain: "VIETNAMESE",
    titleSub: "Cold Coffee",
    exactName: "Vietnamese Cold Coffee",
    price: 148,
    description: "Bold espresso with sweetened milk.",
    image: "assets/hero-vietnamese.jpg",
    accentColor: "#5B2C84",
    blobColor: "#D8B4FE",
    glowColor: "rgba(91, 44, 132, 0.28)",
    bgAccent: "#FAF5FF",
    category: "Cold Coffee",
    veg: true,
    customType: "coffee"
  }
];

/* ==========================================================================
   C. DATA: FULL CAFE MENU (Categories 0-11, Complete & Authentic)
   ========================================================================== */
const menuData = [
  /* 1. Hot Coffee */
  {
    id: "hc-1",
    name: "Intense Espresso",
    price: 99,
    category: "Hot Coffee",
    veg: true,
    desc: "Single origin dark roast, dense crema with bold chocolate undertones.",
    image: "assets/menu_cappuccino.jpg",
    customType: "coffee"
  },
  {
    id: "hc-2",
    name: "Classic Cappuccino",
    price: 127,
    category: "Hot Coffee",
    veg: true,
    desc: "Rich espresso topped with velvety steamed milk and thick micro-foam.",
    image: "assets/menu_cappuccino.jpg",
    customType: "coffee"
  },
  {
    id: "hc-3",
    name: "Cafe Mocha",
    price: 134,
    category: "Hot Coffee",
    veg: true,
    desc: "Decadent Dutch cocoa blended with double espresso and steamed milk.",
    image: "assets/menu_cappuccino.jpg",
    customType: "coffee"
  },
  {
    id: "hc-4",
    name: "Artisan Flat White",
    price: 139,
    category: "Hot Coffee",
    veg: true,
    desc: "Ristretto espresso shots poured with fine, silky textured whole milk.",
    image: "assets/menu_cappuccino.jpg",
    customType: "coffee"
  },
  {
    id: "hc-5",
    name: "Caffe Americano",
    price: 109,
    category: "Hot Coffee",
    veg: true,
    desc: "Hot filtered water pulled over rich espresso shots for a smooth finish.",
    image: "assets/menu_cappuccino.jpg",
    customType: "coffee"
  },
  {
    id: "hc-6",
    name: "Caramel Macchiato",
    price: 149,
    category: "Hot Coffee",
    veg: true,
    desc: "Steamed vanilla milk marked with espresso and drizzled with caramel.",
    image: "assets/menu_cappuccino.jpg",
    customType: "coffee"
  },

  /* 2. Cold Coffee */
  {
    id: "cc-1",
    name: "Vietnamese Cold Coffee",
    price: 148,
    category: "Cold Coffee",
    veg: true,
    desc: "Slow-drip intense espresso layered over condensed sweetened milk and ice.",
    image: "assets/hero-vietnamese.jpg",
    customType: "coffee",
    popular: true
  },
  {
    id: "cc-2",
    name: "Roasted Hazelnut Frappe",
    price: 134,
    category: "Cold Coffee",
    veg: true,
    desc: "Creamy nut-rich indulgence blended with slow-roasted espresso and whipped cream.",
    image: "assets/hero-hazelnut.jpg",
    customType: "coffee",
    popular: true
  },
  {
    id: "cc-3",
    name: "Classic Creamy Cold Coffee",
    price: 120,
    category: "Cold Coffee",
    veg: true,
    desc: "Delhi's beloved thick, frothy chilled cafe blend made fresh to order.",
    image: "assets/hero-hazelnut.jpg",
    customType: "coffee"
  },
  {
    id: "cc-4",
    name: "Iced Caramel Latte",
    price: 144,
    category: "Cold Coffee",
    veg: true,
    desc: "Double shot espresso over cold milk, salted caramel drizzle and ice.",
    image: "assets/hero-vietnamese.jpg",
    customType: "coffee"
  },
  {
    id: "cc-5",
    name: "Irish Cream Cold Brew",
    price: 154,
    category: "Cold Coffee",
    veg: true,
    desc: "16-hour slow steep cold brew with non-alcoholic Irish cream notes.",
    image: "assets/hero-vietnamese.jpg",
    customType: "coffee"
  },

  /* 3. Matcha & Refreshers */
  {
    id: "mr-1",
    name: "Matcha Strawberry",
    price: 164,
    category: "Matcha & Refreshers",
    veg: true,
    desc: "Sweet, earthy, vibrant flavor burst. Muddled fresh strawberry puree with stone-ground green tea.",
    image: "assets/hero-matcha.jpg",
    customType: "matcha",
    popular: true
  },
  {
    id: "mr-2",
    name: "Classic Japanese Matcha Latte",
    price: 149,
    category: "Matcha & Refreshers",
    veg: true,
    desc: "Pure ceremonial grade Uji matcha whisked with velvety steamed or chilled milk.",
    image: "assets/hero-matcha.jpg",
    customType: "matcha"
  },
  {
    id: "mr-3",
    name: "Iced Lemon Mint Tea",
    price: 99,
    category: "Matcha & Refreshers",
    veg: true,
    desc: "Zesty freshly squeezed lemon, garden mint sprigs, and chilled black tea.",
    image: "assets/hero-matcha.jpg",
    customType: "matcha"
  },
  {
    id: "mr-4",
    name: "Peach Passion Refresher",
    price: 129,
    category: "Matcha & Refreshers",
    veg: true,
    desc: "Sparkling natural peach pulp, passion fruit nectar, and ice.",
    image: "assets/hero-matcha.jpg",
    customType: "matcha"
  },

  /* 4. Handcrafted Fries */
  {
    id: "fr-1",
    name: "Say Cheese Handcrafted Fries",
    price: 129,
    category: "Handcrafted Fries",
    veg: true,
    desc: "Crispy skin-on potato fries smothered in house cheddar cheese sauce.",
    image: "assets/menu_fries.jpg",
    customType: "fries",
    popular: true
  },
  {
    id: "fr-2",
    name: "Fiery Peri Peri Chicken Fries",
    price: 149,
    category: "Handcrafted Fries",
    veg: false,
    desc: "Crispy fries loaded with spiced pulled chicken, fiery peri-peri dusting & herb mayo.",
    image: "assets/menu_fries.jpg",
    customType: "fries"
  },
  {
    id: "fr-3",
    name: "Truffle & Herb Salted Fries",
    price: 119,
    category: "Handcrafted Fries",
    veg: true,
    desc: "Double-fried golden sticks seasoned with roasted garlic, thyme & truffle salt.",
    image: "assets/menu_fries.jpg",
    customType: "fries"
  },
  {
    id: "fr-4",
    name: "Cheesy Bacon & Jalapeño Fries",
    price: 159,
    category: "Handcrafted Fries",
    veg: false,
    desc: "Smoked bacon bits, pickled jalapeño slices, and molten Monterey Jack cheese.",
    image: "assets/menu_fries.jpg",
    customType: "fries"
  },

  /* 5. Burgers */
  {
    id: "bg-1",
    name: "Crispy Herb Aloo Burger",
    price: 69,
    category: "Burgers",
    veg: true,
    desc: "Crispy spiced potato & corn patty with mint mayo, crisp lettuce on toasted brioche.",
    image: "assets/menu_burger.jpg",
    customType: "burger"
  },
  {
    id: "bg-2",
    name: "Chicken Peri Peri Crunch Burger",
    price: 139,
    category: "Burgers",
    veg: false,
    desc: "Juicy golden fried chicken breast fillet tossed in bird's eye chili seasoning.",
    image: "assets/menu_burger.jpg",
    customType: "burger",
    popular: true
  },
  {
    id: "bg-3",
    name: "Veg Double Decker Gourmet Burger",
    price: 139,
    category: "Burgers",
    veg: true,
    desc: "Twin crispy vegetable patties, double slice cheese, caramelized onions, house relish.",
    image: "assets/menu_burger.jpg",
    customType: "burger"
  },
  {
    id: "bg-4",
    name: "Royal Say Grilled Chicken Burger",
    price: 159,
    category: "Burgers",
    veg: false,
    desc: "Char-grilled rosemary chicken patty, smoked chipotle sauce, cheddar slice & pickles.",
    image: "assets/menu_burger.jpg",
    customType: "burger"
  },

  /* 6. Mexican (Quesadillas & Burritos) */
  {
    id: "mx-1",
    name: "Melted Cheesy Quesadilla",
    price: 149,
    category: "Mexican",
    veg: true,
    desc: "Flour tortilla griddled golden with mozzarella, cheddar, bell peppers & charred corn.",
    image: "assets/menu_quesadilla.jpg",
    customType: "mexican",
    popular: true
  },
  {
    id: "mx-2",
    name: "Grilled Chicken Chipotle Quesadilla",
    price: 179,
    category: "Mexican",
    veg: false,
    desc: "Tender chipotle shredded chicken, jalapeños, molten cheese with salsa dip.",
    image: "assets/menu_quesadilla.jpg",
    customType: "mexican"
  },
  {
    id: "mx-3",
    name: "Mexican Burrito Bowl",
    price: 229,
    category: "Mexican",
    veg: false,
    desc: "Cilantro-lime rice, black beans, fajita chicken, pico de gallo & sour cream.",
    image: "assets/menu_quesadilla.jpg",
    customType: "mexican"
  },
  {
    id: "mx-4",
    name: "Loaded Corn & Bean Burrito",
    price: 169,
    category: "Mexican",
    veg: true,
    desc: "Toasted jumbo tortilla rolled with seasoned pinto beans, salsa, cheese & lime crema.",
    image: "assets/menu_quesadilla.jpg",
    customType: "mexican"
  },

  /* 7. Artisan Pizza */
  {
    id: "pz-1",
    name: "Cheese Margherita Royal",
    price: 114,
    category: "Artisan Pizza",
    veg: true,
    desc: "Fresh San Marzano tomato pomodoro, torn whole-milk mozzarella, basil & olive oil.",
    image: "assets/menu_pizza.jpg",
    customType: "pizza"
  },
  {
    id: "pz-2",
    name: "BBQ Chicken & Red Paprika Pizza",
    price: 164,
    category: "Artisan Pizza",
    veg: false,
    desc: "Smoky sweet BBQ chicken strips, pickled red paprika, roasted red onions, cheese.",
    image: "assets/menu_pizza.jpg",
    customType: "pizza",
    popular: true
  },
  {
    id: "pz-3",
    name: "Farmhouse Roasted Veggie Pizza",
    price: 149,
    category: "Artisan Pizza",
    veg: true,
    desc: "Crisp capsicum, mushrooms, black olives, golden corn, and gooey mozzarella blend.",
    image: "assets/menu_pizza.jpg",
    customType: "pizza"
  },
  {
    id: "pz-4",
    name: "Paneer Tikka Makhani Pizza",
    price: 159,
    category: "Artisan Pizza",
    veg: true,
    desc: "Charred tandoori spiced cottage cheese chunks, rich makhani sauce, green chilies.",
    image: "assets/menu_pizza.jpg",
    customType: "pizza"
  },

  /* 8. Wraps & Pita Pockets */
  {
    id: "wp-1",
    name: "Falafel & Garlic Hummus Pita Pocket",
    price: 129,
    category: "Wraps & Pockets",
    veg: true,
    desc: "Warm pocket pita stuffed with crispy chickpea falafels, tahini, hummus & pickled veggies.",
    image: "assets/menu_wrap.jpg",
    customType: "wrap"
  },
  {
    id: "wp-2",
    name: "Grilled Peri Peri Chicken Wrap",
    price: 149,
    category: "Wraps & Pockets",
    veg: false,
    desc: "Succulent spiced chicken tenders, crunchy garden greens, and garlic mayo in tortilla.",
    image: "assets/menu_wrap.jpg",
    customType: "wrap",
    popular: true
  },
  {
    id: "wp-3",
    name: "Crispy Paneer Shawarma Wrap",
    price: 139,
    category: "Wraps & Pockets",
    veg: true,
    desc: "Spiced griddled paneer ribbons, Lebanese garlic toum sauce, crunchy cabbage slaw.",
    image: "assets/menu_wrap.jpg",
    customType: "wrap"
  },

  /* 9. Sandwiches & Salads */
  {
    id: "sd-1",
    name: "Three-Cheese Grilled Sourdough",
    price: 139,
    category: "Sandwiches & Salads",
    veg: true,
    desc: "Sharp English cheddar, Monterey Jack & mozzarella toasted to golden perfection.",
    image: "assets/menu_wrap.jpg",
    customType: "wrap"
  },
  {
    id: "sd-2",
    name: "Smoked Chicken Club Sandwich",
    price: 169,
    category: "Sandwiches & Salads",
    veg: false,
    desc: "Triple-decker sandwich with roasted chicken slices, fried egg, lettuce & dijon mayo.",
    image: "assets/menu_wrap.jpg",
    customType: "wrap"
  },
  {
    id: "sd-3",
    name: "Fresh Cafe Caesar Salad",
    price: 149,
    category: "Sandwiches & Salads",
    veg: true,
    desc: "Crisp romaine hearts, toasted herb croutons, shaved parmesan & creamy dressing.",
    image: "assets/menu_wrap.jpg",
    customType: "wrap"
  },

  /* 10. Thick Shakes & Waffles */
  {
    id: "sw-1",
    name: "Belgian Nutella Crunch Waffle",
    price: 149,
    category: "Shakes & Waffles",
    veg: true,
    desc: "Freshly baked deep-pocket Belgian waffle laden with warm Nutella & crushed hazelnuts.",
    image: "assets/menu_waffle.jpg",
    customType: "waffle",
    popular: true
  },
  {
    id: "sw-2",
    name: "Strawberry Whipped Cream Waffle",
    price: 144,
    category: "Shakes & Waffles",
    veg: true,
    desc: "Warm crisp waffle topped with muddled strawberry coulis and vanilla cream.",
    image: "assets/menu_waffle.jpg",
    customType: "waffle"
  },
  {
    id: "sw-3",
    name: "Oreo Silk Thickshake",
    price: 129,
    category: "Shakes & Waffles",
    veg: true,
    desc: "Rich vanilla cream churned with crushed Oreo biscuits and chocolate drizzle.",
    image: "assets/hero-hazelnut.jpg",
    customType: "shake"
  },
  {
    id: "sw-4",
    name: "KitKat Hazelnut Blast Shake",
    price: 139,
    category: "Shakes & Waffles",
    veg: true,
    desc: "Thick milk shake infused with chunky KitKat wafers and roasted hazelnut syrup.",
    image: "assets/hero-hazelnut.jpg",
    customType: "shake"
  },

  /* 11. Artisan Chai */
  {
    id: "ch-1",
    name: "Desi Kadak Chai",
    price: 44,
    category: "Artisan Chai",
    veg: true,
    desc: "Authentic strong Assam CTC tea brewed with milk and boiled to golden perfection.",
    image: "assets/menu_cappuccino.jpg",
    customType: "chai"
  },
  {
    id: "ch-2",
    name: "Spiced Masala Chai",
    price: 64,
    category: "Artisan Chai",
    veg: true,
    desc: "Infused with crushed cloves, cinnamon, black pepper, nutmeg and cardamom.",
    image: "assets/menu_cappuccino.jpg",
    customType: "chai"
  },
  {
    id: "ch-3",
    name: "Cardamom Elaichi Chai",
    price: 54,
    category: "Artisan Chai",
    veg: true,
    desc: "Fragrant green cardamom pods gently crushed and simmered with fresh tea leaves.",
    image: "assets/menu_cappuccino.jpg",
    customType: "chai"
  },
  {
    id: "ch-4",
    name: "Ginger Adrak Chai",
    price: 54,
    category: "Artisan Chai",
    veg: true,
    desc: "Fresh grated ginger root simmered for that warming, soothing kick.",
    image: "assets/menu_cappuccino.jpg",
    customType: "chai"
  }
];

/* Categories for Navigation Pills */
const categoriesList = [
  "All",
  "Hot Coffee",
  "Cold Coffee",
  "Matcha & Refreshers",
  "Burgers",
  "Handcrafted Fries",
  "Mexican",
  "Artisan Pizza",
  "Wraps & Pockets",
  "Sandwiches & Salads",
  "Shakes & Waffles",
  "Artisan Chai"
];

/* ==========================================================================
   D. STATE MANAGEMENT
   ========================================================================== */
let currentHeroIndex = 0;
let heroTimer = null;
let activeCategory = "All";
let dietaryFilter = "all"; // 'all', 'veg', 'nonveg'
let searchQuery = "";
let cart = []; // Array of cart items

// Currently customized item state
let modalItem = null;
let modalQuantity = 1;
let modalSelections = {
  size: "regular", // regular (0), large (+49)
  cheese: false, // +20
  burgerPatty: false, // +45
  flavor: "none", // none (0), hazelnut (+30), vanilla (+30), caramel (+30), irish (+30)
  espressoShot: 0, // 0 (0), 1 (+50)
  iceCreamScoop: false, // +40
  milkOption: "regular", // regular (0), oat (+45), almond (+45)
  extraCheese: false, // +39
  dip: false // +20
};

/* ==========================================================================
   E. HERO CAROUSEL IMPLEMENTATION
   ========================================================================== */
function initHeroCarousel() {
  renderHeroSlide(currentHeroIndex);
  startHeroTimer();

  // Touch Swipe Handling on Hero
  const track = document.getElementById("hero-card");
  if (!track) return;

  let startX = 0;
  let endX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].screenX;
    if (startX - endX > 45) {
      nextHeroSlide();
    } else if (endX - startX > 45) {
      prevHeroSlide();
    }
  }, { passive: true });

  track.addEventListener("mouseenter", stopHeroTimer);
  track.addEventListener("mouseleave", startHeroTimer);
}

function renderHeroSlide(index) {
  const slide = heroSlides[index];
  if (!slide) return;

  const glowLayer = document.getElementById("hero-glow-layer");
  const blob = document.getElementById("hero-blob");
  const cupImg = document.getElementById("hero-cup-img");
  const tagEl = document.getElementById("hero-badge");
  const titleMain = document.getElementById("hero-title-main");
  const titleSub = document.getElementById("hero-title-sub");
  const descEl = document.getElementById("hero-desc");
  const priceEl = document.getElementById("hero-price");
  const divider = document.getElementById("hero-divider");

  // Dynamic Theme Shift
  if (glowLayer) glowLayer.style.background = `radial-gradient(circle at 70% 50%, ${slide.glowColor} 0%, transparent 65%)`;
  if (blob) blob.style.backgroundColor = slide.blobColor;
  if (titleSub) titleSub.style.color = slide.accentColor;
  if (divider) divider.style.backgroundColor = slide.accentColor;

  if (tagEl) {
    tagEl.innerText = slide.tag;
    tagEl.style.color = slide.accentColor;
    tagEl.style.backgroundColor = slide.bgAccent;
    tagEl.style.borderColor = `${slide.accentColor}33`;
  }

  if (titleMain) titleMain.innerText = slide.titleMain;
  if (titleSub) titleSub.innerText = slide.titleSub;
  if (descEl) descEl.innerText = slide.description;
  if (priceEl) priceEl.innerText = `₹${slide.price}`;

  if (cupImg) {
    cupImg.style.opacity = "0";
    cupImg.src = slide.image;
    cupImg.onload = () => {
      cupImg.style.opacity = "1";
    };
  }

  // Dots
  const dotsContainer = document.getElementById("hero-dots");
  if (dotsContainer) {
    dotsContainer.innerHTML = heroSlides.map((_, i) => `
      <div class="hero-dot ${i === index ? 'active' : ''}" onclick="goToHeroSlide(${i})"></div>
    `).join('');
  }

  // Update dynamic CSS root accent
  document.documentElement.style.setProperty('--accent-current', slide.accentColor);
}

function nextHeroSlide() {
  AudioFeedback.playClick();
  currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
  renderHeroSlide(currentHeroIndex);
  resetHeroTimer();
}

function prevHeroSlide() {
  AudioFeedback.playClick();
  currentHeroIndex = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
  renderHeroSlide(currentHeroIndex);
  resetHeroTimer();
}

function goToHeroSlide(index) {
  AudioFeedback.playClick();
  currentHeroIndex = index;
  renderHeroSlide(currentHeroIndex);
  resetHeroTimer();
}

function startHeroTimer() {
  stopHeroTimer();
  heroTimer = setInterval(() => {
    currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
    renderHeroSlide(currentHeroIndex);
  }, 5000);
}

function stopHeroTimer() {
  if (heroTimer) clearInterval(heroTimer);
}

function resetHeroTimer() {
  stopHeroTimer();
  startHeroTimer();
}

/**
 * Direct Add from Hero slide:
 * "Clicking 'Add to Order' in any slide must automatically update the Navbar Cart count and briefly open the Cart Drawer."
 */
function handleHeroAdd() {
  const currentSlide = heroSlides[currentHeroIndex];
  AudioFeedback.playCartChime();

  // Find corresponding menu item or construct base item
  const existingMenuItem = menuData.find(m => m.name.toLowerCase() === currentSlide.exactName.toLowerCase());
  const itemToAdd = existingMenuItem || {
    id: currentSlide.id,
    name: currentSlide.exactName,
    price: currentSlide.price,
    category: currentSlide.category,
    desc: currentSlide.description,
    image: currentSlide.image,
    veg: currentSlide.veg,
    customType: currentSlide.customType
  };

  // Add default version to cart
  addCartItemDirect({
    id: itemToAdd.id,
    name: itemToAdd.name,
    basePrice: itemToAdd.price,
    totalItemPrice: itemToAdd.price,
    qty: 1,
    customizations: ["Standard Barista Serve"],
    customType: itemToAdd.customType
  });

  showToast(`Added ${itemToAdd.name} to cart!`);

  // Briefly open the slide-over cart drawer as requested in prompt!
  openCartDrawer();
}

function handleHeroCustomize() {
  const currentSlide = heroSlides[currentHeroIndex];
  const existingMenuItem = menuData.find(m => m.name.toLowerCase() === currentSlide.exactName.toLowerCase()) || {
    id: currentSlide.id,
    name: currentSlide.exactName,
    price: currentSlide.price,
    category: currentSlide.category,
    desc: currentSlide.description,
    image: currentSlide.image,
    veg: currentSlide.veg,
    customType: currentSlide.customType
  };
  openCustomizationModal(existingMenuItem);
}

/* ==========================================================================
   F. MENU GRID RENDERING & FILTERING
   ========================================================================== */
function initMenu() {
  renderCategoryPills();
  renderMenuGrid();
}

function renderCategoryPills() {
  const container = document.getElementById("category-filter-bar");
  if (!container) return;

  container.innerHTML = categoriesList.map(cat => `
    <button 
      class="category-pill ${cat === activeCategory ? 'active' : ''}" 
      onclick="selectCategory('${cat}')"
    >
      ${cat}
    </button>
  `).join('');
}

function selectCategory(cat) {
  AudioFeedback.playClick();
  activeCategory = cat;
  renderCategoryPills();
  renderMenuGrid();
}

function setDietaryFilter(filterType) {
  AudioFeedback.playClick();
  dietaryFilter = filterType;

  const btn = document.getElementById("dietary-filter-btn");
  if (btn) {
    btn.className = "dietary-toggle-btn";
    if (filterType === 'veg') {
      btn.classList.add("active-veg");
      btn.innerHTML = `<span style="color:#16A34A">●</span> Veg Only`;
    } else if (filterType === 'nonveg') {
      btn.classList.add("active-nonveg");
      btn.innerHTML = `<span style="color:#DC2626">▲</span> Non-Veg`;
    } else {
      btn.innerHTML = `<span>◒</span> All Diets`;
    }
  }

  renderMenuGrid();
}

function toggleDietaryFilter() {
  if (dietaryFilter === 'all') {
    setDietaryFilter('veg');
  } else if (dietaryFilter === 'veg') {
    setDietaryFilter('nonveg');
  } else {
    setDietaryFilter('all');
  }
}

function handleSearch(query) {
  searchQuery = query.trim().toLowerCase();
  renderMenuGrid();
}

function renderMenuGrid() {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  let filtered = menuData.filter(item => {
    // Category match
    const matchCategory = (activeCategory === "All") || (item.category === activeCategory);

    // Dietary match
    let matchDiet = true;
    if (dietaryFilter === 'veg') matchDiet = item.veg === true;
    if (dietaryFilter === 'nonveg') matchDiet = item.veg === false;

    // Search query match
    let matchSearch = true;
    if (searchQuery) {
      matchSearch = item.name.toLowerCase().includes(searchQuery) ||
                    item.desc.toLowerCase().includes(searchQuery) ||
                    item.category.toLowerCase().includes(searchQuery);
    }

    return matchCategory && matchDiet && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-menu-box">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        <h3 style="font-size:1.2rem;font-weight:900;color:var(--color-text-main);margin-bottom:0.5rem">No items found</h3>
        <p style="color:var(--color-text-muted);font-size:0.9rem">Try adjusting your search terms or dietary filter.</p>
        <button onclick="resetFilters()" style="margin-top:1rem;color:var(--brand-purple);font-weight:800;text-decoration:underline">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card" onclick="openCustomizationModalById('${item.id}')">
      <div>
        <div class="card-top-row">
          <span class="veg-indicator ${item.veg ? 'veg' : 'nonveg'}" title="${item.veg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
          <span class="card-category-tag">${item.category}</span>
        </div>

        <div class="card-media-frame">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>

        <div class="card-content-body">
          <h3 class="card-item-title">${item.name}</h3>
          <p class="card-item-desc">${item.desc}</p>
        </div>
      </div>

      <div class="card-footer-action">
        <span class="card-price-val">₹${item.price}</span>
        <button 
          class="card-add-btn" 
          onclick="event.stopPropagation(); openCustomizationModalById('${item.id}')"
        >
          <span>Customize & Add</span>
          <svg style="width:14px;height:14px;fill:currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function resetFilters() {
  activeCategory = "All";
  dietaryFilter = "all";
  searchQuery = "";
  const searchInput = document.getElementById("menu-search-input");
  if (searchInput) searchInput.value = "";
  setDietaryFilter('all');
  renderCategoryPills();
  renderMenuGrid();
}

/* ==========================================================================
   G. ITEM CUSTOMIZATION MODAL (Critical Conversion Engine)
   ========================================================================== */
function openCustomizationModalById(itemId) {
  const item = menuData.find(i => i.id === itemId);
  if (item) openCustomizationModal(item);
}

function openCustomizationModal(item) {
  AudioFeedback.playClick();
  modalItem = item;
  modalQuantity = 1;

  // Reset modal selections with defaults
  modalSelections = {
    size: "regular",
    cheese: false,
    burgerPatty: false,
    flavor: "none",
    espressoShot: 0,
    iceCreamScoop: false,
    milkOption: "regular",
    extraCheese: false,
    dip: false
  };

  const modalBackdrop = document.getElementById("customization-modal");
  const titleEl = document.getElementById("modal-item-title");
  const descEl = document.getElementById("modal-item-desc");
  const optionsContainer = document.getElementById("modal-dynamic-options");

  if (!modalBackdrop || !titleEl || !optionsContainer) return;

  titleEl.innerText = item.name;
  descEl.innerText = item.desc;

  // Build specific options based on item customType and user prompt specifications
  optionsContainer.innerHTML = buildModalOptionsHTML(item);

  updateModalTotal();

  modalBackdrop.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeModal() {
  AudioFeedback.playClick();
  const modalBackdrop = document.getElementById("customization-modal");
  if (modalBackdrop) modalBackdrop.classList.remove("open");
  document.body.classList.remove("modal-open");
  modalItem = null;
}

/**
 * Builds specific selector options matching the user prompt requirements:
 * - Matcha Refresher / Shakes / Fries Modal: Mandatory multiple-choice dynamic selector for Large Size Upgrade (+₹49) [cite: 3]
 * - Burgers Modal: Dynamic selector for Add Cheese Slice (+₹20) [cite: 6]
 * - Coffee Modal: Dynamic selectors for Flavors (Hazelnut, Caramel, etc.), Espresso Shot (+₹50), Ice-cream Scoop, or Milk options [cite: 8]
 * - Modal Button: Must be specific: Confirm & Add ₹X (showing calculated price after selection) [cite: 11]
 */
function buildModalOptionsHTML(item) {
  let html = '';
  const type = item.customType;

  // 1. Mandatory Size Option for Matcha Refreshers, Shakes, Fries, and Coffees
  if (type === 'matcha' || type === 'shake' || type === 'fries' || type === 'coffee') {
    html += `
      <div class="modal-option-section">
        <div class="modal-section-title">
          <h4>Choose Size</h4>
          <span class="badge-req">Mandatory</span>
        </div>
        <div class="custom-options-grid">
          <label class="option-choice-label ${modalSelections.size === 'regular' ? 'selected' : ''}" onclick="setModalSize('regular')">
            <div class="option-choice-left">
              <input type="radio" name="modal_size" value="regular" ${modalSelections.size === 'regular' ? 'checked' : ''}>
              <span class="option-name-text">Regular Standard Serve</span>
            </div>
            <span class="option-price-tag">+₹0</span>
          </label>
          <label class="option-choice-label ${modalSelections.size === 'large' ? 'selected' : ''}" onclick="setModalSize('large')">
            <div class="option-choice-left">
              <input type="radio" name="modal_size" value="large" ${modalSelections.size === 'large' ? 'checked' : ''}>
              <div>
                <span class="option-name-text">Large Size Upgrade</span>
                <span style="display:block;font-size:0.7rem;color:var(--color-text-muted)">Extra portion & richer blend</span>
              </div>
            </div>
            <span class="option-price-tag">+₹49</span>
          </label>
        </div>
      </div>
    `;
  }

  // 2. Specific Coffee Options
  if (type === 'coffee') {
    html += `
      <div class="modal-option-section">
        <div class="modal-section-title">
          <h4>Artisan Flavors</h4>
          <span style="font-size:0.75rem;color:var(--color-text-muted)">Optional</span>
        </div>
        <div class="custom-options-grid">
          <label class="option-choice-label ${modalSelections.flavor === 'none' ? 'selected' : ''}" onclick="setModalFlavor('none')">
            <div class="option-choice-left">
              <input type="radio" name="modal_flavor" value="none" ${modalSelections.flavor === 'none' ? 'checked' : ''}>
              <span class="option-name-text">No Flavor Syrup</span>
            </div>
            <span class="option-price-tag">+₹0</span>
          </label>
          <label class="option-choice-label ${modalSelections.flavor === 'hazelnut' ? 'selected' : ''}" onclick="setModalFlavor('hazelnut')">
            <div class="option-choice-left">
              <input type="radio" name="modal_flavor" value="hazelnut" ${modalSelections.flavor === 'hazelnut' ? 'checked' : ''}>
              <span class="option-name-text">Roasted Hazelnut Syrup</span>
            </div>
            <span class="option-price-tag">+₹30</span>
          </label>
          <label class="option-choice-label ${modalSelections.flavor === 'caramel' ? 'selected' : ''}" onclick="setModalFlavor('caramel')">
            <div class="option-choice-left">
              <input type="radio" name="modal_flavor" value="caramel" ${modalSelections.flavor === 'caramel' ? 'checked' : ''}>
              <span class="option-name-text">Salted Caramel Syrup</span>
            </div>
            <span class="option-price-tag">+₹30</span>
          </label>
          <label class="option-choice-label ${modalSelections.flavor === 'vanilla' ? 'selected' : ''}" onclick="setModalFlavor('vanilla')">
            <div class="option-choice-left">
              <input type="radio" name="modal_flavor" value="vanilla" ${modalSelections.flavor === 'vanilla' ? 'checked' : ''}>
              <span class="option-name-text">French Vanilla Syrup</span>
            </div>
            <span class="option-price-tag">+₹30</span>
          </label>
        </div>
      </div>

      <div class="modal-option-section">
        <div class="modal-section-title">
          <h4>Milk Choice</h4>
          <span style="font-size:0.75rem;color:var(--color-text-muted)">Dairy & Plant Options</span>
        </div>
        <div class="custom-options-grid">
          <label class="option-choice-label ${modalSelections.milkOption === 'regular' ? 'selected' : ''}" onclick="setModalMilk('regular')">
            <div class="option-choice-left">
              <input type="radio" name="modal_milk" value="regular" ${modalSelections.milkOption === 'regular' ? 'checked' : ''}>
              <span class="option-name-text">Full Cream Fresh Milk</span>
            </div>
            <span class="option-price-tag">+₹0</span>
          </label>
          <label class="option-choice-label ${modalSelections.milkOption === 'oat' ? 'selected' : ''}" onclick="setModalMilk('oat')">
            <div class="option-choice-left">
              <input type="radio" name="modal_milk" value="oat" ${modalSelections.milkOption === 'oat' ? 'checked' : ''}>
              <span class="option-name-text">Barista Oat Milk (Vegan)</span>
            </div>
            <span class="option-price-tag">+₹45</span>
          </label>
          <label class="option-choice-label ${modalSelections.milkOption === 'almond' ? 'selected' : ''}" onclick="setModalMilk('almond')">
            <div class="option-choice-left">
              <input type="radio" name="modal_milk" value="almond" ${modalSelections.milkOption === 'almond' ? 'checked' : ''}>
              <span class="option-name-text">Almond Milk (Keto Friendly)</span>
            </div>
            <span class="option-price-tag">+₹45</span>
          </label>
        </div>
      </div>

      <div class="modal-option-section">
        <div class="modal-section-title">
          <h4>Power Add-ons</h4>
        </div>
        <div class="custom-options-grid">
          <label class="option-choice-label ${modalSelections.espressoShot ? 'selected' : ''}" onclick="toggleModalEspresso()">
            <div class="option-choice-left">
              <input type="checkbox" ${modalSelections.espressoShot ? 'checked' : ''}>
              <div>
                <span class="option-name-text">Extra Espresso Shot</span>
                <span style="display:block;font-size:0.7rem;color:var(--color-text-muted)">Intense caffeine boost</span>
              </div>
            </div>
            <span class="option-price-tag">+₹50</span>
          </label>
          <label class="option-choice-label ${modalSelections.iceCreamScoop ? 'selected' : ''}" onclick="toggleModalIceCream()">
            <div class="option-choice-left">
              <input type="checkbox" ${modalSelections.iceCreamScoop ? 'checked' : ''}>
              <span class="option-name-text">Vanilla Ice-cream Scoop</span>
            </div>
            <span class="option-price-tag">+₹40</span>
          </label>
        </div>
      </div>
    `;
  }

  // 3. Specific Burger Options
  if (type === 'burger') {
    html += `
      <div class="modal-option-section">
        <div class="modal-section-title">
          <h4>Burger Customizations</h4>
          <span style="font-size:0.75rem;color:var(--color-text-muted)">Select Add-ons</span>
        </div>
        <div class="custom-options-grid">
          <label class="option-choice-label ${modalSelections.cheese ? 'selected' : ''}" onclick="toggleModalCheese()">
            <div class="option-choice-left">
              <input type="checkbox" ${modalSelections.cheese ? 'checked' : ''}>
              <span class="option-name-text">Add Melted Cheese Slice</span>
            </div>
            <span class="option-price-tag">+₹20</span>
          </label>
          <label class="option-choice-label ${modalSelections.burgerPatty ? 'selected' : ''}" onclick="toggleModalBurgerPatty()">
            <div class="option-choice-left">
              <input type="checkbox" ${modalSelections.burgerPatty ? 'checked' : ''}>
              <span class="option-name-text">Add Extra Patty</span>
            </div>
            <span class="option-price-tag">+₹45</span>
          </label>
          <label class="option-choice-label ${modalSelections.dip ? 'selected' : ''}" onclick="toggleModalDip()">
            <div class="option-choice-left">
              <input type="checkbox" ${modalSelections.dip ? 'checked' : ''}>
              <span class="option-name-text">Jalapeño & Garlic Herb Dip</span>
            </div>
            <span class="option-price-tag">+₹25</span>
          </label>
        </div>
      </div>
    `;
  }

  // 4. Pizza, Mexican & Wrap Options
  if (type === 'pizza' || type === 'mexican' || type === 'wrap') {
    html += `
      <div class="modal-option-section">
        <div class="modal-section-title">
          <h4>Custom Add-ons & Dips</h4>
        </div>
        <div class="custom-options-grid">
          <label class="option-choice-label ${modalSelections.extraCheese ? 'selected' : ''}" onclick="toggleModalExtraCheese()">
            <div class="option-choice-left">
              <input type="checkbox" ${modalSelections.extraCheese ? 'checked' : ''}>
              <span class="option-name-text">Extra Gooey Mozzarella / Cheese</span>
            </div>
            <span class="option-price-tag">+₹39</span>
          </label>
          <label class="option-choice-label ${modalSelections.dip ? 'selected' : ''}" onclick="toggleModalDip()">
            <div class="option-choice-left">
              <input type="checkbox" ${modalSelections.dip ? 'checked' : ''}>
              <span class="option-name-text">Specialty Garlic Dip / Salsa</span>
            </div>
            <span class="option-price-tag">+₹25</span>
          </label>
        </div>
      </div>
    `;
  }

  // 5. Chai additions
  if (type === 'chai') {
    html += `
      <div class="modal-option-section">
        <div class="modal-section-title">
          <h4>Chai Preparation</h4>
        </div>
        <div class="custom-options-grid">
          <label class="option-choice-label selected">
            <div class="option-choice-left">
              <input type="radio" checked>
              <span class="option-name-text">Kulhad Clay Cup Tradition</span>
            </div>
            <span class="option-price-tag">Included</span>
          </label>
        </div>
      </div>
    `;
  }

  return html;
}

/* Modal Option Setters */
function setModalSize(size) {
  AudioFeedback.playClick();
  modalSelections.size = size;
  refreshModalOptionClasses();
  updateModalTotal();
}

function setModalFlavor(flavor) {
  AudioFeedback.playClick();
  modalSelections.flavor = flavor;
  refreshModalOptionClasses();
  updateModalTotal();
}

function setModalMilk(milk) {
  AudioFeedback.playClick();
  modalSelections.milkOption = milk;
  refreshModalOptionClasses();
  updateModalTotal();
}

function toggleModalCheese() {
  AudioFeedback.playClick();
  modalSelections.cheese = !modalSelections.cheese;
  refreshModalOptionClasses();
  updateModalTotal();
}

function toggleModalBurgerPatty() {
  AudioFeedback.playClick();
  modalSelections.burgerPatty = !modalSelections.burgerPatty;
  refreshModalOptionClasses();
  updateModalTotal();
}

function toggleModalEspresso() {
  AudioFeedback.playClick();
  modalSelections.espressoShot = modalSelections.espressoShot ? 0 : 1;
  refreshModalOptionClasses();
  updateModalTotal();
}

function toggleModalIceCream() {
  AudioFeedback.playClick();
  modalSelections.iceCreamScoop = !modalSelections.iceCreamScoop;
  refreshModalOptionClasses();
  updateModalTotal();
}

function toggleModalExtraCheese() {
  AudioFeedback.playClick();
  modalSelections.extraCheese = !modalSelections.extraCheese;
  refreshModalOptionClasses();
  updateModalTotal();
}

function toggleModalDip() {
  AudioFeedback.playClick();
  modalSelections.dip = !modalSelections.dip;
  refreshModalOptionClasses();
  updateModalTotal();
}

function refreshModalOptionClasses() {
  const container = document.getElementById("modal-dynamic-options");
  if (!container || !modalItem) return;
  container.innerHTML = buildModalOptionsHTML(modalItem);
}

function changeModalQty(delta) {
  AudioFeedback.playClick();
  modalQuantity = Math.max(1, modalQuantity + delta);
  const qtyEl = document.getElementById("modal-qty-num");
  if (qtyEl) qtyEl.innerText = modalQuantity;
  updateModalTotal();
}

function calculateModalItemUnitPrice() {
  if (!modalItem) return 0;
  let unitPrice = modalItem.price;

  if (modalSelections.size === 'large') unitPrice += 49;
  if (modalSelections.cheese) unitPrice += 20;
  if (modalSelections.burgerPatty) unitPrice += 45;
  if (modalSelections.flavor !== 'none') unitPrice += 30;
  if (modalSelections.espressoShot) unitPrice += 50;
  if (modalSelections.iceCreamScoop) unitPrice += 40;
  if (modalSelections.milkOption === 'oat' || modalSelections.milkOption === 'almond') unitPrice += 45;
  if (modalSelections.extraCheese) unitPrice += 39;
  if (modalSelections.dip) unitPrice += 25;

  return unitPrice;
}

function updateModalTotal() {
  const unitPrice = calculateModalItemUnitPrice();
  const totalPrice = unitPrice * modalQuantity;

  // "Modal Button: Must be specific: Confirm & Add ₹X (showing calculated price after selection)."
  const confirmBtn = document.getElementById("modal-confirm-btn");
  if (confirmBtn) {
    confirmBtn.innerHTML = `
      <span>Confirm & Add ₹${totalPrice}</span>
      <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    `;
  }
}

function confirmModalAdd() {
  if (!modalItem) return;
  AudioFeedback.playCartChime();

  const unitPrice = calculateModalItemUnitPrice();
  const customizationTags = [];

  if (modalSelections.size === 'large') customizationTags.push("Large (+₹49)");
  if (modalSelections.cheese) customizationTags.push("Cheese Slice (+₹20)");
  if (modalSelections.burgerPatty) customizationTags.push("Extra Patty (+₹45)");
  if (modalSelections.flavor !== 'none') {
    const flavName = modalSelections.flavor.charAt(0).toUpperCase() + modalSelections.flavor.slice(1);
    customizationTags.push(`${flavName} Flavor (+₹30)`);
  }
  if (modalSelections.espressoShot) customizationTags.push("Extra Shot (+₹50)");
  if (modalSelections.iceCreamScoop) customizationTags.push("Ice Cream Scoop (+₹40)");
  if (modalSelections.milkOption === 'oat') customizationTags.push("Oat Milk (+₹45)");
  if (modalSelections.milkOption === 'almond') customizationTags.push("Almond Milk (+₹45)");
  if (modalSelections.extraCheese) customizationTags.push("Extra Cheese (+₹39)");
  if (modalSelections.dip) customizationTags.push("Special Dip (+₹25)");

  addCartItemDirect({
    id: `${modalItem.id}-${Date.now()}`,
    baseId: modalItem.id,
    name: modalItem.name,
    basePrice: modalItem.price,
    totalItemPrice: unitPrice,
    qty: modalQuantity,
    customizations: customizationTags.length > 0 ? customizationTags : ["Standard"],
    customType: modalItem.customType
  });

  showToast(`Added ${modalQuantity}x ${modalItem.name} (₹${unitPrice * modalQuantity}) to cart!`);
  closeModal();

  // Open cart drawer to reveal addition
  openCartDrawer();
}

/* ==========================================================================
   H. SLIDE-OVER CART DRAWER & WHATSAPP CHECKOUT
   ========================================================================== */
function addCartItemDirect(item) {
  // Check if identical item with identical customizations already exists
  const customKey = item.customizations.join('|');
  const existing = cart.find(c => c.name === item.name && c.customizations.join('|') === customKey);

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }

  updateCartUI();
  bumpCartBadge();
}

function updateCartItemQty(index, delta) {
  AudioFeedback.playClick();
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function removeCartItem(index) {
  AudioFeedback.playClick();
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + (item.totalItemPrice * item.qty), 0);

  // Update Navbar Badge
  const badge = document.getElementById("navbar-cart-badge");
  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  // Update Drawer Subtotal & Total
  const subtotalEl = document.getElementById("cart-subtotal-val");
  const totalEl = document.getElementById("cart-total-val");
  if (subtotalEl) subtotalEl.innerText = `₹${total}`;
  if (totalEl) totalEl.innerText = `₹${total}`;

  // Render Drawer Items List
  const itemsContainer = document.getElementById("cart-items-container");
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <svg viewBox="0 0 24 24"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/></svg>
        <h4 style="font-size:1.1rem;font-weight:900;color:var(--color-text-main)">Your basket is empty</h4>
        <p style="font-size:0.85rem">Explore our menu and add your favorite brews and bites.</p>
        <button onclick="closeCartDrawer()" style="background:var(--brand-purple);color:#fff;padding:0.6rem 1.4rem;border-radius:999px;font-size:0.85rem;font-weight:800;margin-top:0.5rem">Browse Menu</button>
      </div>
    `;
  } else {
    itemsContainer.innerHTML = cart.map((item, idx) => `
      <div class="cart-item-card">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <div class="cart-item-custom-tags">
            ${item.customizations.map(c => `<span class="custom-tag-chip">${c}</span>`).join('')}
          </div>
          <div class="cart-item-price-calc">
            ₹${item.totalItemPrice * item.qty}
            <span style="font-size:0.75rem;font-weight:500;color:var(--color-text-muted)"> (₹${item.totalItemPrice} each)</span>
          </div>
        </div>

        <div class="cart-item-ctrls">
          <div class="cart-item-qty-box">
            <button class="cart-qty-btn" onclick="updateCartItemQty(${idx}, -1)">-</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn" onclick="updateCartItemQty(${idx}, 1)">+</button>
          </div>
          <button class="cart-item-remove-btn" onclick="removeCartItem(${idx})">
            <svg style="width:12px;height:12px;fill:currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            <span>Remove</span>
          </button>
        </div>
      </div>
    `).join('');
  }
}

function bumpCartBadge() {
  const badge = document.getElementById("navbar-cart-badge");
  if (badge) {
    badge.classList.remove("bump");
    void badge.offsetWidth;
    badge.classList.add("bump");
  }
}

function openCartDrawer() {
  AudioFeedback.playClick();
  const overlay = document.getElementById("cart-drawer-overlay");
  const panel = document.getElementById("cart-drawer-panel");
  if (overlay) overlay.classList.add("open");
  if (panel) panel.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeCartDrawer() {
  AudioFeedback.playClick();
  const overlay = document.getElementById("cart-drawer-overlay");
  const panel = document.getElementById("cart-drawer-panel");
  if (overlay) overlay.classList.remove("open");
  if (panel) panel.classList.remove("open");
  document.body.classList.remove("modal-open");
}

let selectedDiningType = "Home Delivery (Laxmi Nagar)";
function setDiningType(type, btn) {
  AudioFeedback.playClick();
  selectedDiningType = type;
  document.querySelectorAll(".dining-pill-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

/**
 * WhatsApp Checkout Generation (Citing Prompt Specification)
 * Formats a clean order receipt and sends via WhatsApp to 9990940010
 */
function proceedToWhatsAppCheckout() {
  AudioFeedback.playCartChime();

  if (cart.length === 0) {
    showToast("Please add items to your basket first!");
    return;
  }

  const custName = (document.getElementById("cust-name-input")?.value || "").trim() || "Guest Customer";
  const custAddress = (document.getElementById("cust-address-input")?.value || "").trim() || "Laxmi Nagar Hub";

  let grandTotal = 0;
  let itemsBreakdown = "";

  cart.forEach((item, index) => {
    const lineTotal = item.totalItemPrice * item.qty;
    grandTotal += lineTotal;
    const customStr = item.customizations.join(", ");
    itemsBreakdown += `${index + 1}. *${item.name}* [x${item.qty}]\n   ↳ _Options: ${customStr}_\n   ↳ Sub: ₹${lineTotal}\n\n`;
  });

  const messageText = 
`☕ *NEW ORDER - SAY COFFEE LAXMI NAGAR*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${custName}
📍 *Order Type:* ${selectedDiningType}
🏠 *Address / Notes:* ${custAddress}
📞 *Store Phone:* 9990940010

📦 *ORDER DETAILS:*
${itemsBreakdown}━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL AMOUNT:* ₹${grandTotal}
*(Taxes calculated at store counter)*
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Thank you for ordering with Say Coffee Laxmi Nagar!_
_Please confirm preparation time and payment._`;

  const phone = "919990940010";
  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

  window.open(whatsappUrl, "_blank");
}

/* Direct Quick WhatsApp Message */
function quickWhatsAppOrder() {
  AudioFeedback.playClick();
  const phone = "919990940010";
  const defaultText = encodeURIComponent("Hello Say Coffee Laxmi Nagar! I'd like to place an order from your cafe menu.");
  window.open(`https://wa.me/${phone}?text=${defaultText}`, "_blank");
}

/* ==========================================================================
   I. FAQ ACCORDION LOGIC
   ========================================================================== */
function toggleFaqAccordion(element) {
  AudioFeedback.playClick();
  const parentCard = element.closest(".faq-card-item");
  if (!parentCard) return;

  const isActive = parentCard.classList.contains("active");

  // Close all other open accordions
  document.querySelectorAll(".faq-card-item").forEach(card => {
    card.classList.remove("active");
  });

  if (!isActive) {
    parentCard.classList.add("active");
  }
}

/* ==========================================================================
   J. TOAST NOTIFICATION UTILITY
   ========================================================================== */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById("toast-notice");
  const msgEl = document.getElementById("toast-message-text");
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/* ==========================================================================
   K. NAVBAR SCROLL EFFECT
   ========================================================================== */
window.addEventListener("scroll", () => {
  const nav = document.getElementById("site-navbar");
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}, { passive: true });

/* ==========================================================================
   L. INITIALIZATION ON DOM READY
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initHeroCarousel();
  initMenu();
  updateCartUI();
});
