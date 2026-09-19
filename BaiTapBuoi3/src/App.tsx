import ProductsList from './features/products/ProductsList';
import Cart from './features/cart/Cart';
import { useAppSelector } from './app/hooks';
import './App.css';

function App() {
  const cartItems = useAppSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCart = () => {
    const cartEl = document.getElementById('cart-section-target');
    if (cartEl) {
      cartEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-layout">
      {/* Top Cute Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-inner">
          <span className="sparkle">🌸</span>
          <p className="announcement-text">
            <strong>ƯU ĐÃI THÁNG NÀY:</strong> Nhập mã <code>PINKLOVE</code> giảm thêm 10% & Tặng hộp quà nơ xinh cho mọi đơn hàng! 🎀
          </p>
          <span className="sparkle">✨</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-logo-icon">
              🎀
            </div>
            <div>
              <div className="brand-title-wrap">
                <h1 className="brand-name">PinkyStore</h1>
                <span className="brand-badge">Pastel Edition</span>
              </div>
              <span className="brand-tagline">Thế giới công nghệ & phụ kiện Tone Hồng ngọt ngào 🌸</span>
            </div>
          </div>

          <div className="header-right">
            <button className="cart-header-chip" onClick={scrollToCart}>
              <span className="cart-chip-icon">🛒</span>
              <span className="cart-chip-title">Giỏ hàng</span>
              <span className="cart-chip-count">{totalCartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase Banner */}
      <section className="hero-banner-section">
        <div className="hero-banner-container">
          <div className="hero-content">
            <span className="hero-tag">💖 Bộ sưu tập đặc biệt</span>
            <h2 className="hero-title">Nâng Tầm Không Gian Với Sắc Hồng Pastel 🌸</h2>
            <p className="hero-description">
              Tất cả thiết bị công nghệ & phụ kiện làm việc chuẩn tone hồng ngọt ngào, thời thượng và chính hãng 100%.
            </p>

            <div className="hero-perks">
              <div className="perk-item">
                <span className="perk-icon">🚚</span>
                <div>
                  <strong>Freeship 0Đ</strong>
                  <p>Giao nhanh toàn quốc</p>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">🎁</span>
                <div>
                  <strong>Quà Tặng Kèm</strong>
                  <p>Hộp quà & sticker xinh</p>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">🛡️</span>
                <div>
                  <strong>Bảo Hành 12T</strong>
                  <p>Đổi mới trong 30 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Products Catalog + Sticky Pink Cart */}
      <main className="app-main-content">
        <div className="main-grid">
          {/* Products Column */}
          <section className="products-container-wrapper">
            <ProductsList />
          </section>

          {/* Cart Sidebar Column */}
          <aside className="cart-container-wrapper" id="cart-section-target">
            <Cart />
          </aside>
        </div>
      </main>

      {/* App Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-brand-note">
            <span className="footer-heart">💖</span>
            <strong>PinkyStore</strong> - Thiết kế tone hồng ngọt ngào cho người dùng yêu thích sự tinh tế.
          </div>
          <p className="footer-subtext">Bài tập thực hành Buổi 3 • Lập trình Web Nâng Cao • React + Redux Toolkit</p>
        </div>
      </footer>
    </div>
  );
}

export default App;