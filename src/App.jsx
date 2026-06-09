import { useState, useEffect, useRef } from "react";


// ─── DATA ────────────────────────────────────────────────────────────────────
const MENU = {
  "Hot Drinks": [
    { id: 1, name: "Espresso", price: 2.5, desc: "Rich, bold single shot", emoji: "☕", cal: 5 },
    { id: 2, name: "Cappuccino", price: 4.0, desc: "Espresso with silky steamed milk foam", emoji: "🍵", cal: 120 },
    { id: 3, name: "Flat White", price: 4.5, desc: "Velvety microfoam espresso", emoji: "☕", cal: 150 },
    { id: 4, name: "Latte", price: 4.5, desc: "Creamy espresso & steamed milk", emoji: "🥛", cal: 190 },
    { id: 5, name: "Matcha Latte", price: 5.0, desc: "Ceremonial grade matcha & oat milk", emoji: "🍵", cal: 160 },
    { id: 6, name: "Chai Latte", price: 4.5, desc: "Spiced black tea with steamed milk", emoji: "🫖", cal: 180 },
  ],
  "Cold Drinks": [
    { id: 7, name: "Cold Brew", price: 4.5, desc: "12-hour slow-steeped coffee", emoji: "🧊", cal: 5 },
    { id: 8, name: "Iced Latte", price: 5.0, desc: "Espresso over ice with milk", emoji: "🧊", cal: 130 },
    { id: 9, name: "Mango Smoothie", price: 6.0, desc: "Fresh mango, banana, coconut milk", emoji: "🥭", cal: 280 },
    { id: 10, name: "Berry Blast", price: 6.0, desc: "Mixed berries, yogurt, honey", emoji: "🫐", cal: 240 },
    { id: 11, name: "Lemonade", price: 3.5, desc: "Freshly squeezed with mint", emoji: "🍋", cal: 90 },
  ],
  "Food": [
    { id: 12, name: "Avocado Toast", price: 9.0, desc: "Sourdough, smashed avo, poached egg", emoji: "🥑", cal: 420 },
    { id: 13, name: "Croissant", price: 4.0, desc: "Buttery flaky pastry, freshly baked", emoji: "🥐", cal: 320 },
    { id: 14, name: "Blueberry Muffin", price: 3.5, desc: "Loaded with wild blueberries", emoji: "🫐", cal: 380 },
    { id: 15, name: "Granola Bowl", price: 8.0, desc: "House granola, seasonal fruit, yogurt", emoji: "🥣", cal: 460 },
    { id: 16, name: "Club Sandwich", price: 12.0, desc: "Chicken, bacon, lettuce, tomato", emoji: "🥪", cal: 580 },
    { id: 17, name: "Brownie", price: 3.5, desc: "Dark chocolate, gooey center", emoji: "🍫", cal: 290 },
  ],
  "Specials": [
    { id: 18, name: "Dalgona Coffee", price: 5.5, desc: "Whipped instant coffee over milk", emoji: "☁️", cal: 200 },
    { id: 19, name: "Rose Latte", price: 5.5, desc: "Rose syrup, espresso, oat milk", emoji: "🌹", cal: 170 },
    { id: 20, name: "Lavender Fog", price: 5.5, desc: "Earl grey, lavender, vanilla milk", emoji: "💜", cal: 150 },
  ],
};

const ALL_ITEMS = Object.values(MENU).flat();

const TEAM = [
  { name: "Sofia Chen", role: "Head Barista & Founder", emoji: "👩‍🍳", bio: "15 years crafting specialty coffee. Trained in Melbourne and Tokyo." },
  { name: "Marcus Webb", role: "Pastry Chef", emoji: "👨‍🍳", bio: "Former Michelin-star sous chef obsessed with croissants." },
  { name: "Layla Hassan", role: "Coffee Sourcer", emoji: "👩‍🌾", bio: "Travels to origin farms ensuring ethical, single-origin beans." },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Nav({ page, setPage, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "Menu", "Order", "About", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(15,10,5,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(210,160,80,0.2)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2rem", height: "64px",
    }}>
      <div onClick={() => setPage("Home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "1.6rem" }}>☕</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#D2A050", fontWeight: 700, letterSpacing: "0.02em" }}>Dusk & Brew</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
        {links.map(l => (
          <button key={l} onClick={() => setPage(l)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: page === l ? "#D2A050" : "rgba(255,255,255,0.7)",
            fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: page === l ? 600 : 400,
            padding: "0.5rem 0.9rem", borderRadius: "4px",
            borderBottom: page === l ? "2px solid #D2A050" : "2px solid transparent",
            transition: "all 0.2s",
          }}>{l}</button>
        ))}
        <button onClick={() => setPage("Order")} style={{
          marginLeft: "0.8rem", background: "#D2A050", border: "none", cursor: "pointer",
          color: "#0F0A05", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
          fontSize: "1rem", padding: "0.5rem 1.1rem", borderRadius: "20px",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          🛒 {cartCount > 0 && <span style={{ background: "#0F0A05", color: "#D2A050", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800 }}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

function Hero({ setPage }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 30% 50%, #2a1a05 0%, #0F0A05 60%)",
      position: "relative", overflow: "hidden", textAlign: "center", padding: "2rem",
    }}>
      {/* decorative circles */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${120 + i * 80}px`, height: `${120 + i * 80}px`,
          borderRadius: "50%", border: `1px solid rgba(210,160,80,${0.06 - i * 0.01})`,
          top: "50%", left: "30%", transform: "translate(-50%,-50%)",
          animation: `pulse ${3 + i}s ease-in-out infinite alternate`,
        }} />
      ))}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#D2A050", fontSize: "1rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.2rem", opacity: 0.9 }}>
          Est. 2018 · Specialty Coffee
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, color: "#fff", lineHeight: 1.05, marginBottom: "1.5rem" }}>
          Where Every<br /><span style={{ color: "#D2A050", fontStyle: "italic" }}>Cup</span> Tells a Story
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "rgba(255,255,255,0.65)", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Single-origin beans. Hand-crafted drinks. A sanctuary from the everyday noise.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("Menu")} style={{
            background: "#D2A050", color: "#0F0A05", border: "none", cursor: "pointer",
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.1rem",
            padding: "0.9rem 2.2rem", borderRadius: "30px", letterSpacing: "0.05em",
            boxShadow: "0 4px 20px rgba(210,160,80,0.35)", transition: "transform 0.2s, box-shadow 0.2s",
          }} onMouseEnter={e => e.target.style.transform = "translateY(-2px)"} onMouseLeave={e => e.target.style.transform = ""}>
            View Menu
          </button>
          <button onClick={() => setPage("Order")} style={{
            background: "transparent", color: "#D2A050", border: "2px solid #D2A050", cursor: "pointer",
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.1rem",
            padding: "0.9rem 2.2rem", borderRadius: "30px", letterSpacing: "0.05em", transition: "all 0.2s",
          }} onMouseEnter={e => { e.target.style.background = "rgba(210,160,80,0.1)"; }} onMouseLeave={e => { e.target.style.background = "transparent"; }}>
            Order Now
          </button>
        </div>
        <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap" }}>
          {[["☕", "20+", "Signature Drinks"], ["🌱", "100%", "Organic Milk"], ["🏆", "5★", "Rated Café"], ["🚀", "15min", "Fast Pickup"]].map(([icon, num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 800, color: "#D2A050" }}>{num}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", letterSpacing: "0.1em" }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuPage({ addToCart, cart }) {
  const [activeCategory, setActiveCategory] = useState("Hot Drinks");
  const [search, setSearch] = useState("");
  const categories = Object.keys(MENU);

  const items = MENU[activeCategory].filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0F0A05", paddingTop: "80px", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "clamp(2rem,5vw,3.5rem)", textAlign: "center", marginBottom: "0.5rem" }}>Our Menu</h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", marginBottom: "2rem" }}>Fresh, seasonal, crafted with love every day</p>

        {/* Search */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search drinks, food…" style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(210,160,80,0.3)",
            borderRadius: "25px", padding: "0.7rem 1.5rem", color: "#fff", width: "100%", maxWidth: "380px",
            fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", outline: "none",
          }} />
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setSearch(""); }} style={{
              background: activeCategory === cat ? "#D2A050" : "rgba(255,255,255,0.05)",
              color: activeCategory === cat ? "#0F0A05" : "rgba(255,255,255,0.7)",
              border: "1px solid rgba(210,160,80,0.3)", cursor: "pointer", borderRadius: "20px",
              padding: "0.5rem 1.3rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600,
              transition: "all 0.2s",
            }}>{cat}</button>
          ))}
        </div>

        {/* Items grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {items.map(item => {
            const inCart = cart.find(c => c.id === item.id);
            return (
              <div key={item.id} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,160,80,0.15)",
                borderRadius: "16px", padding: "1.5rem", transition: "transform 0.2s, border-color 0.2s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "rgba(210,160,80,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(210,160,80,0.15)"; }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>{item.emoji}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.15rem", margin: 0 }}>{item.name}</h3>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#D2A050", fontWeight: 700, fontSize: "1.1rem", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>${item.price.toFixed(2)}</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", margin: "0 0 0.5rem", lineHeight: 1.5 }}>{item.desc}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "monospace", marginBottom: "1rem" }}>{item.cal} cal</p>
                <button onClick={() => addToCart(item)} style={{
                  width: "100%", background: inCart ? "rgba(210,160,80,0.2)" : "#D2A050",
                  color: inCart ? "#D2A050" : "#0F0A05", border: inCart ? "1px solid #D2A050" : "none",
                  borderRadius: "10px", padding: "0.6rem", fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s",
                }}>{inCart ? `✓ In Cart (${inCart.qty})` : "Add to Cart"}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrderPage({ cart, setCart, addToCart, removeFromCart, setPage }) {
  const [step, setStep] = useState("cart"); // cart → details → payment → confirm
  const [orderType, setOrderType] = useState("dine-in");
  const [details, setDetails] = useState({ name: "", email: "", phone: "", note: "" });
  const [payMethod, setPayMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [orderNum] = useState(() => Math.floor(Math.random() * 9000) + 1000);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const inp = (label, val, onChange, placeholder = "") => (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", marginBottom: "0.3rem", letterSpacing: "0.05em" }}>{label}</label>
      <input value={val} onChange={onChange} placeholder={placeholder} style={{
        width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(210,160,80,0.3)",
        borderRadius: "8px", padding: "0.7rem 1rem", color: "#fff",
        fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", outline: "none", boxSizing: "border-box",
      }} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0F0A05", paddingTop: "80px", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "2.5rem", marginBottom: "0.5rem" }}>Your Order</h2>

        {/* Steps indicator */}
        <div style={{ display: "flex", gap: "0", marginBottom: "2.5rem", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(210,160,80,0.2)" }}>
          {[["cart", "1. Cart"], ["details", "2. Details"], ["payment", "3. Payment"], ["confirm", "4. Done"]].map(([s, label]) => (
            <div key={s} style={{
              flex: 1, textAlign: "center", padding: "0.7rem 0.3rem",
              background: step === s ? "#D2A050" : step > s ? "rgba(210,160,80,0.15)" : "transparent",
              color: step === s ? "#0F0A05" : "rgba(255,255,255,0.5)",
              fontFamily: "'Cormorant Garamond', serif", fontWeight: step === s ? 700 : 400,
              fontSize: "0.9rem", borderRight: "1px solid rgba(210,160,80,0.2)",
            }}>{label}</div>
          ))}
        </div>

        {/* STEP: CART */}
        {step === "cart" && (
          <div>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 0" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>Your cart is empty</p>
                <button onClick={() => setPage("Menu")} style={{ marginTop: "1rem", background: "#D2A050", border: "none", color: "#0F0A05", padding: "0.7rem 1.8rem", borderRadius: "20px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>Browse Menu</button>
              </div>
            ) : (
              <>
                {/* Order type */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                  {["dine-in", "takeaway"].map(t => (
                    <button key={t} onClick={() => setOrderType(t)} style={{
                      flex: 1, padding: "0.8rem", borderRadius: "10px", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1rem",
                      background: orderType === t ? "#D2A050" : "rgba(255,255,255,0.05)",
                      color: orderType === t ? "#0F0A05" : "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(210,160,80,0.3)", transition: "all 0.2s",
                    }}>{t === "dine-in" ? "🪑 Dine In" : "🥡 Takeaway"}</button>
                  ))}
                </div>

                {cart.map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1rem" }}>{item.name}</div>
                      <div style={{ color: "#D2A050", fontSize: "0.9rem" }}>${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "28px", height: "28px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem" }}>−</button>
                      <span style={{ color: "#fff", fontFamily: "monospace", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => addToCart(item)} style={{ background: "#D2A050", border: "none", color: "#0F0A05", width: "28px", height: "28px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem", fontWeight: 800 }}>+</button>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(210,160,80,0.07)", borderRadius: "10px", border: "1px solid rgba(210,160,80,0.15)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem", fontFamily: "'Cormorant Garamond', serif" }}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.6)", marginBottom: "0.8rem", fontFamily: "'Cormorant Garamond', serif" }}><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#D2A050", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.2rem" }}><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <button onClick={() => setStep("details")} style={{ width: "100%", marginTop: "1.2rem", background: "#D2A050", border: "none", color: "#0F0A05", padding: "1rem", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>Continue →</button>
              </>
            )}
          </div>
        )}

        {/* STEP: DETAILS */}
        {step === "details" && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", marginBottom: "1.5rem" }}>Your Details</h3>
            {inp("Full Name *", details.name, e => setDetails({ ...details, name: e.target.value }), "Jane Smith")}
            {inp("Email *", details.email, e => setDetails({ ...details, email: e.target.value }), "jane@email.com")}
            {inp("Phone", details.phone, e => setDetails({ ...details, phone: e.target.value }), "+1 555 0000")}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", marginBottom: "0.3rem" }}>Special Instructions</label>
              <textarea value={details.note} onChange={e => setDetails({ ...details, note: e.target.value })} rows={3} placeholder="Allergies, extra shots, no sugar…" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(210,160,80,0.3)", borderRadius: "8px", padding: "0.7rem 1rem", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep("cart")} style={{ flex: 1, background: "transparent", border: "1px solid rgba(210,160,80,0.4)", color: "#D2A050", padding: "0.9rem", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1rem", cursor: "pointer" }}>← Back</button>
              <button onClick={() => { if (details.name && details.email) setStep("payment"); }} style={{ flex: 2, background: details.name && details.email ? "#D2A050" : "rgba(210,160,80,0.3)", border: "none", color: "#0F0A05", padding: "0.9rem", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem", cursor: details.name && details.email ? "pointer" : "default" }}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP: PAYMENT */}
        {step === "payment" && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", marginBottom: "1.5rem" }}>Payment</h3>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              {[["card", "💳 Card"], ["cash", "💵 Cash"], ["apple", "🍎 Apple Pay"], ["google", "🔵 Google Pay"]].map(([m, label]) => (
                <button key={m} onClick={() => setPayMethod(m)} style={{
                  flex: "1 1 120px", padding: "0.8rem", borderRadius: "10px", cursor: "pointer",
                  background: payMethod === m ? "#D2A050" : "rgba(255,255,255,0.05)",
                  color: payMethod === m ? "#0F0A05" : "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(210,160,80,0.3)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "0.95rem", transition: "all 0.2s",
                }}>{label}</button>
              ))}
            </div>

            {payMethod === "card" && (
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "1.2rem", border: "1px solid rgba(210,160,80,0.15)", marginBottom: "1rem" }}>
                {inp("Card Number", card.number, e => setCard({ ...card, number: e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim() }), "1234 5678 9012 3456")}
                {inp("Cardholder Name", card.name, e => setCard({ ...card, name: e.target.value }), "JANE SMITH")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {inp("Expiry (MM/YY)", card.expiry, e => setCard({ ...card, expiry: e.target.value }), "12/27")}
                  {inp("CVV", card.cvv, e => setCard({ ...card, cvv: e.target.value.slice(0, 3) }), "123")}
                </div>
              </div>
            )}
            {(payMethod === "cash") && (
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "1.2rem", border: "1px solid rgba(210,160,80,0.15)", marginBottom: "1rem", color: "rgba(255,255,255,0.6)", fontFamily: "'Cormorant Garamond', serif" }}>
                Pay ${total.toFixed(2)} at the counter when you collect your order. Please have the exact amount ready.
              </div>
            )}
            {(payMethod === "apple" || payMethod === "google") && (
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "1.2rem", border: "1px solid rgba(210,160,80,0.15)", marginBottom: "1rem", color: "rgba(255,255,255,0.6)", fontFamily: "'Cormorant Garamond', serif", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{payMethod === "apple" ? "🍎" : "🔵"}</div>
                Tap confirm to authenticate with {payMethod === "apple" ? "Apple Pay" : "Google Pay"}
              </div>
            )}

            {/* Order summary */}
            <div style={{ padding: "1rem", background: "rgba(210,160,80,0.07)", borderRadius: "10px", border: "1px solid rgba(210,160,80,0.15)", marginBottom: "1.2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#D2A050", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem" }}><span>Total to Pay</span><span>${total.toFixed(2)}</span></div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setStep("details")} style={{ flex: 1, background: "transparent", border: "1px solid rgba(210,160,80,0.4)", color: "#D2A050", padding: "0.9rem", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, cursor: "pointer" }}>← Back</button>
              <button onClick={() => { setStep("confirm"); setCart([]); }} style={{ flex: 2, background: "#D2A050", border: "none", color: "#0F0A05", padding: "0.9rem", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" }}>
                Place Order 🎉
              </button>
            </div>
          </div>
        )}

        {/* STEP: CONFIRM */}
        {step === "confirm" && (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem", animation: "bounce 0.6s ease" }}>✅</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "2rem", marginBottom: "0.5rem" }}>Order Confirmed!</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", marginBottom: "1rem" }}>Thank you, {details.name}! We're preparing your order.</p>
            <div style={{ background: "rgba(210,160,80,0.1)", border: "1px solid rgba(210,160,80,0.3)", borderRadius: "12px", padding: "1.5rem", maxWidth: "320px", margin: "0 auto 2rem" }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", letterSpacing: "0.1em" }}>ORDER NUMBER</div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "3rem", fontWeight: 900 }}>#{orderNum}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif" }}>{orderType === "dine-in" ? "🪑 Dine In" : "🥡 Takeaway"} · {payMethod.toUpperCase()}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", fontFamily: "monospace", fontSize: "0.8rem" }}>Estimated: 12–18 minutes</div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Confirmation sent to {details.email}</p>
            <button onClick={() => { setStep("cart"); }} style={{ background: "#D2A050", border: "none", color: "#0F0A05", padding: "0.8rem 2rem", borderRadius: "20px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>Place Another Order</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F0A05", paddingTop: "80px", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Hero banner */}
        <div style={{ background: "linear-gradient(135deg, #2a1a05 0%, #1a0d02 100%)", borderRadius: "20px", padding: "3rem 2rem", textAlign: "center", marginBottom: "3rem", border: "1px solid rgba(210,160,80,0.2)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 30%, rgba(210,160,80,0.08), transparent 60%)" }} />
          <span style={{ fontSize: "3.5rem" }}>☕</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "clamp(2rem,5vw,3rem)", margin: "1rem 0 0.5rem" }}>Our Story</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.65)", fontSize: "1.15rem", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
            Born in 2018 from a shared obsession with extraordinary coffee, Dusk & Brew started as a tiny corner spot with two espresso machines and a dream. Today we're a beloved neighborhood institution — but the obsession hasn't changed.
          </p>
        </div>

        {/* Values */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {[["🌱", "Sustainability", "We source directly from family farms, pay fair wages, and use 100% compostable packaging."],
            ["☕", "Craft", "Every drink is made to order. No batch brews, no shortcuts. Just skill and patience."],
            ["🤝", "Community", "10% of profits go to local youth coding & arts programs. We grow together."]].map(([icon, title, text]) => (
            <div key={title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,160,80,0.15)", borderRadius: "14px", padding: "1.8rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>Meet the Team</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {TEAM.map(m => (
            <div key={m.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,160,80,0.15)", borderRadius: "14px", padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "0.8rem" }}>{m.emoji}</div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.15rem", marginBottom: "0.2rem" }}>{m.name}</h4>
              <p style={{ color: "#D2A050", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", marginBottom: "0.8rem", letterSpacing: "0.05em" }}>{m.role}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.6, fontSize: "0.95rem" }}>{m.bio}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>Milestones</h3>
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          <div style={{ position: "absolute", left: "0.8rem", top: 0, bottom: 0, width: "2px", background: "rgba(210,160,80,0.2)" }} />
          {[["2018", "Opened our first 12-seat café on Maple Street"],
            ["2019", "Won Best New Café — City Food Awards"],
            ["2020", "Launched curbside & contactless ordering during the pandemic"],
            ["2021", "Expanded to 45 seats + outdoor terrace"],
            ["2023", "Opened Dusk & Brew Roastery — our own micro-roastery"],
            ["2024", "Launched community coffee school — free brewing classes monthly"]].map(([year, event]) => (
            <div key={year} style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#D2A050", marginTop: "4px", flexShrink: 0, boxShadow: "0 0 10px rgba(210,160,80,0.5)" }} />
              <div>
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontWeight: 700, marginRight: "0.8rem" }}>{year}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.65)" }}>{event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  const inp = (label, val, onChange, placeholder = "", type = "text") => (
    <div style={{ marginBottom: "1.2rem" }}>
      <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>{label}</label>
      <input type={type} value={val} onChange={onChange} placeholder={placeholder} style={{
        width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(210,160,80,0.3)",
        borderRadius: "8px", padding: "0.8rem 1rem", color: "#fff",
        fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", outline: "none", boxSizing: "border-box",
        transition: "border-color 0.2s",
      }}
        onFocus={e => e.target.style.borderColor = "#D2A050"}
        onBlur={e => e.target.style.borderColor = "rgba(210,160,80,0.3)"} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0F0A05", paddingTop: "80px", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "clamp(2rem,5vw,3rem)", textAlign: "center", marginBottom: "0.5rem" }}>Get in Touch</h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", marginBottom: "3rem" }}>We'd love to hear from you — events, catering, feedback, or just saying hello</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Contact info */}
          <div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,160,80,0.15)", borderRadius: "14px", padding: "2rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.2rem", marginBottom: "1.2rem" }}>Visit Us</h3>
              {[["📍", "Location", "42 Maple Street\nSunset District, CA 94122"],
                ["🕐", "Hours", "Mon–Fri: 7am – 8pm\nSat–Sun: 8am – 9pm"],
                ["📞", "Phone", "+1 (415) 555-0192"],
                ["✉️", "Email", "hello@duskbrew.com"]].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem" }}>
                  <span style={{ fontSize: "1.3rem" }}>{icon}</span>
                  <div>
                    <div style={{ color: "#D2A050", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{label.toUpperCase()}</div>
                    <div style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Cormorant Garamond', serif", whiteSpace: "pre-line", lineHeight: 1.6 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Social */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,160,80,0.15)", borderRadius: "14px", padding: "1.5rem" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1rem", marginBottom: "1rem" }}>Follow Us</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                {[["📸", "Instagram"], ["🐦", "Twitter"], ["👤", "Facebook"]].map(([icon, name]) => (
                  <button key={name} style={{ flex: 1, background: "rgba(210,160,80,0.1)", border: "1px solid rgba(210,160,80,0.2)", borderRadius: "8px", padding: "0.6rem", cursor: "pointer", color: "#D2A050", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem" }}>
                    {icon} {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(210,160,80,0.15)", borderRadius: "14px", padding: "2rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💌</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif" }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} style={{ marginTop: "1rem", background: "transparent", border: "1px solid #D2A050", color: "#D2A050", padding: "0.6rem 1.5rem", borderRadius: "20px", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>Send Another</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.2rem", marginBottom: "1.5rem" }}>Send a Message</h3>
                {inp("Your Name *", form.name, e => setForm({ ...form, name: e.target.value }), "Jane Smith")}
                {inp("Email *", form.email, e => setForm({ ...form, email: e.target.value }), "jane@email.com", "email")}
                {inp("Subject", form.subject, e => setForm({ ...form, subject: e.target.value }), "Catering enquiry…")}
                <div style={{ marginBottom: "1.2rem" }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>Message *</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Tell us what you have in mind…" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(210,160,80,0.3)", borderRadius: "8px", padding: "0.8rem 1rem", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <button onClick={submit} style={{ width: "100%", background: form.name && form.email && form.message ? "#D2A050" : "rgba(210,160,80,0.3)", border: "none", color: "#0F0A05", padding: "0.9rem", borderRadius: "10px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.1rem", cursor: form.name && form.email && form.message ? "pointer" : "default", transition: "background 0.2s" }}>
                  Send Message ✉️
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#080503", borderTop: "1px solid rgba(210,160,80,0.15)", padding: "3rem 2rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: "#D2A050", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.8rem" }}>☕ Dusk & Brew</div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.7, fontSize: "0.95rem" }}>Specialty coffee & seasonal food. A sanctuary in the city.</p>
        </div>
        <div>
          <h4 style={{ color: "#D2A050", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginBottom: "0.8rem", letterSpacing: "0.1em", fontSize: "0.9rem" }}>NAVIGATE</h4>
          {["Home", "Menu", "Order", "About", "Contact"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", cursor: "pointer", marginBottom: "0.4rem", padding: 0, textAlign: "left" }}>{p}</button>
          ))}
        </div>
        <div>
          <h4 style={{ color: "#D2A050", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginBottom: "0.8rem", letterSpacing: "0.1em", fontSize: "0.9rem" }}>HOURS</h4>
          {[["Mon – Fri", "7:00 am – 8:00 pm"], ["Saturday", "8:00 am – 9:00 pm"], ["Sunday", "8:00 am – 9:00 pm"]].map(([day, time]) => (
            <div key={day} style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.45)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", marginBottom: "0.4rem" }}>
              <span>{day}</span><span>{time}</span>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ color: "#D2A050", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, marginBottom: "0.8rem", letterSpacing: "0.1em", fontSize: "0.9rem" }}>CONTACT</h4>
          <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.8, fontSize: "0.95rem" }}>
            42 Maple Street<br />Sunset District, CA 94122<br />+1 (415) 555-0192<br />hello@duskbrew.com
          </p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", textAlign: "center", color: "rgba(255,255,255,0.25)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem" }}>
        © 2025 Dusk & Brew. All rights reserved. Made with ❤️ and great coffee.
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing.qty <= 1) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ background: "#0F0A05", minHeight: "100vh", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0F0A05; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: #0F0A05; }
        ::-webkit-scrollbar-thumb { background: rgba(210,160,80,0.4); border-radius: 3px; }
        @keyframes pulse { from { opacity: 0.3; transform: translate(-50%,-50%) scale(0.95); } to { opacity: 0.7; transform: translate(-50%,-50%) scale(1.05); } }
        @keyframes bounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
      `}</style>
      <Nav page={page} setPage={setPage} cartCount={cartCount} />
      {page === "Home" && <><Hero setPage={setPage} /></>}
      {page === "Menu" && <MenuPage addToCart={addToCart} cart={cart} />}
      {page === "Order" && <OrderPage cart={cart} setCart={setCart} addToCart={addToCart} removeFromCart={removeFromCart} setPage={setPage} />}
      {page === "About" && <AboutPage />}
      {page === "Contact" && <ContactPage />}
      <Footer setPage={setPage} />
    </div>
  );
}
