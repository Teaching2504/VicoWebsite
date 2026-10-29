
import { useEffect, useState } from "react";
import {
  Landmark,
  House,
  BookOpen,
  Users,
  Mail,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import "./App.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85",
    video: "/videos/heritage-h264.mp4",
    category: "TINH HOA LÀNG NGHỀ",
    title: "Nơi bàn tay kể chuyện di sản",
    description:
      "Mỗi sản phẩm thủ công là một câu chuyện văn hóa được lưu truyền qua nhiều thế hệ.",
  },
  {
    image: "/images/banner3.jpg",
    category: "GỐM BIÊN HÒA",
    title: "Gốm Biên Hòa",
    description:
      "Từ đôi tay nghệ nhân, đất mộc mạc trở thành những tác phẩm mang dấu ấn riêng.",
  },
  {
    image: "/images/banner2.jpeg",
    category: "LÂN SƯ RỒNG",
    title: "Lân Sư Rồng",
    description:
      "Nghệ thuật múa lân kết nối cộng đồng và thắp lên không khí lễ hội truyền thống.",
  },
];

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Theo dõi section đang hiển thị để cập nhật menu.
  useEffect(() => {
    const sections = ["home", "heritage", "artisans", "contact"];

    const updateActiveSection = () => {
      let currentSection = "home";

      sections.forEach((id) => {
        const element = document.getElementById(id);

        if (element && element.getBoundingClientRect().top <= 160) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  // Chuyển slide banner.
  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  // Tự động chuyển ảnh mỗi 5 giây.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) =>
        slides[current]?.video ? current : (current + 1) % slides.length
      );
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  // Keep both hero states on one pinned canvas and tie the blend to scroll.
  useEffect(() => {
    const scene = document.querySelector(".hero-transition");
    if (!scene) return;

    let rafId;
    const updateTransition = () => {
      rafId = null;
      const rect = scene.getBoundingClientRect();
      const scrollDistance = scene.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(scrollDistance, 1)));
      const mobile = window.innerWidth <= 760;
      const hero = scene.querySelector(".hero");
      const heroRect = hero?.getBoundingClientRect();
      const layoutWidth = heroRect?.width > 1 ? heroRect.width : window.innerWidth;
      const vh = window.innerHeight;
      const copyLeft = mobile ? 6 : 5.5 + progress * 14.5;
      const copyWidth = mobile ? 88 : 42 + progress * 18;
      const copyTop = mobile ? 28 - progress * 12 : 42 - progress * 34;
      const finalFrameHeight = Math.max(0, vh * 0.82 - 108);
      const finalVideoWidth = mobile
        ? layoutWidth * 0.94
        : Math.min(layoutWidth * 0.98, finalFrameHeight * (16 / 9));
      // The visual is positioned inside .hero, so calculate both endpoints in
      // that same coordinate space. This keeps the expanded card centered even
      // when the browser viewport and the hero's layout width differ slightly.
      const startVideoWidth = layoutWidth * (mobile ? 0.90 : 0.42);
      const startVideoLeft = layoutWidth * (mobile ? 0.05 : 0.52);
      const finalVideoLeft = (layoutWidth - finalVideoWidth) / 2;
      const expandProgress = 1 - (1 - progress) ** 3;
      const videoLeft = startVideoLeft * (1 - expandProgress) + finalVideoLeft * expandProgress;
      const videoWidth = startVideoWidth * (1 - expandProgress) + finalVideoWidth * expandProgress;
      const finalVideoTop = mobile ? 66 : 58;
      const videoTop = (mobile ? 78 : 48) * (1 - expandProgress) + finalVideoTop * expandProgress;

      scene.style.setProperty("--copy-left", `${copyLeft}%`);
      scene.style.setProperty("--copy-width", `${copyWidth}%`);
      scene.style.setProperty("--copy-top", `${copyTop}%`);
      scene.style.setProperty("--video-left", `${videoLeft}px`);
      scene.style.setProperty("--video-width", `${videoWidth}px`);
      scene.style.setProperty("--video-top", `${videoTop}%`);
      scene.style.setProperty("--copy-details-opacity", (1 - progress).toFixed(4));
      document.documentElement.style.setProperty("--hero-transition", progress.toFixed(4));
      scene.querySelector(".hero-transition-stage")?.classList.toggle("is-expanded", progress > 0.65);
    };
    const onScroll = () => {
      if (rafId === null) rafId = window.requestAnimationFrame(updateTransition);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateTransition();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(rafId);
      document.documentElement.style.removeProperty("--hero-transition");
      ["--copy-left", "--copy-width", "--copy-top", "--video-left", "--video-width", "--video-top", "--copy-details-opacity"].forEach((property) => scene.style.removeProperty(property));
    };
  }, []);

  const slide = slides[activeSlide];
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="vico-site" id="home">
      {/* HEADER */}
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-icon">
            <img
              src={`${import.meta.env.BASE_URL}images/vicologo.png`}
              alt="Logo VICO"
            />
          </span>

          <span className="brand-text">
            <strong>VICO</strong>
            <small>KẾT NỐI DI SẢN VIỆT</small>
          </span>
        </a>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "menu-open" : ""}`}>
          <a
            href="#home"
            className={activeSection === "home" ? "active" : ""}
            onClick={closeMenu}
          >
            <House size={15} />
            Trang chủ
          </a>

          <a
            href="#heritage"
            className={activeSection === "heritage" ? "active" : ""}
            onClick={closeMenu}
          >
            <BookOpen size={15} />
            Sản Phẩm
          </a>

          <a
            href="#artisans"
            className={activeSection === "artisans" ? "active" : ""}
            onClick={closeMenu}
          >
            <Users size={15} />
            Về chúng tôi
          </a>

          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
            onClick={closeMenu}
          >
            <Mail size={15} />
            Liên hệ
          </a>
        </nav>

        <a href="#contact" className="nav-cta">
          Kết nối cùng VICO <ArrowUpRight size={16} />
        </a>
      </header>

      <div className="hero-transition">
        <div className="hero-transition-stage">
      {/* HERO */}
      <section className="hero">
        <div className="hero-copy" data-transition-copy>
          <div className="availability">
            <span className="status-dot" />
            GÌN GIỮ GIÁ TRỊ VIỆT
          </div>

          <p className="eyebrow">TINH HOA TRUYỀN THỐNG</p>

          <h1>
            Kết nối
            <br className="hero-title-break" />
            {" "}<span className="highlight">tinh hoa.</span>
            <br className="hero-title-break" />
            Lan tỏa di sản Việt.
          </h1>

          <p className="hero-description">
            VICO là cầu nối giữa những nghệ nhân thủ công truyền thống
            và doanh nghiệp, cùng gìn giữ giá trị văn hóa Việt Nam
            và đưa tinh hoa làng nghề vươn xa.
          </p>

          <div className="hero-actions">
            <a href="#heritage" className="button-primary">
              Khám phá di sản <ArrowUpRight size={18} />
            </a>

            <a href="#contact" className="button-secondary">
              Kết nối cùng VICO
            </a>
          </div>
        </div>

        {/* BANNER: hiệu ứng cuộn được xử lý trong component riêng */}
        <div className="hero-visual">
          <div className="hero-banner-source">
            <div className="visual-frame">
              <div className="image-topline">
                <span>KHÁM PHÁ DI SẢN VIỆT</span>
                <strong>
                  {String(activeSlide + 1).padStart(2, "0")}
                  <span> / {String(slides.length).padStart(2, "0")}</span>
                </strong>
              </div>

              <div
                className={`slide-image ${slide.video ? "has-video" : ""}`}
                key={activeSlide}
              >
                {slide.video ? (
                  <video
                    src={slide.video}
                    controls
                    playsInline
                    preload="auto"
                    aria-label={slide.title}
                  />
                ) : (
                  <img src={slide.image} alt={slide.title} />
                )}

                <div className="image-overlay" />

                <div className="floating-label">
                  <span className="floating-icon">
                    <Landmark size={20} />
                  </span>

                  <div>
                    <strong>{slide.category}</strong>
                    <p>{slide.title}</p>
                  </div>
                </div>

                <div className="image-caption">
                  <span>{slide.description}</span>
                  <ArrowUpRight size={22} />
                </div>
              </div>

              {/* Chỉ có một bộ điều khiển carousel */}
              <div className="carousel-controls">
                <div
                  className="carousel-dots"
                  aria-label="Chọn ảnh banner"
                >
                  {slides.map((item, index) => (
                    <button
                      type="button"
                      key={item.category}
                      className={`carousel-dot ${
                        activeSlide === index ? "active" : ""
                      }`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Chuyển đến banner ${index + 1}`}
                      aria-current={
                        activeSlide === index ? "true" : undefined
                      }
                    />
                  ))}
                </div>

                <div className="carousel-arrows">
                  <button
                    type="button"
                    className="triangle-arrow triangle-arrow-previous"
                    onClick={prevSlide}
                    aria-label="Banner trước"
                  >
                    <ChevronLeft size={21} />
                  </button>

                  <button
                    type="button"
                    className="triangle-arrow triangle-arrow-next"
                    onClick={nextSlide}
                    aria-label="Banner tiếp theo"
                  >
                    <ChevronRight size={21} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </div>
      </section>

      {/* HERO FOOTER */}
      <div className="hero-footer">
        <span>DI SẢN VĂN HÓA VIỆT NAM</span>
        <span>KẾT NỐI NGHỆ NHÂN VÀ DOANH NGHIỆP</span>
        <a href="#heritage">KHÁM PHÁ THÊM ↓</a>
      </div>

        </div>
      </div>

      {/* GIỚI THIỆU DI SẢN */}
      <section className="intro-section" id="heritage">
        <p className="eyebrow">GIÁ TRỊ TỪ CỘI NGUỒN</p>

        <h2>
          Di sản không chỉ thuộc về quá khứ.
          <span> Đó là cảm hứng cho tương lai.</span>
        </h2>

        <p>
          VICO mong muốn góp phần đưa những giá trị văn hóa và sản phẩm
          thủ công truyền thống đến gần hơn với cộng đồng và thị trường.
        </p>
      </section>

      {/* NGHỆ NHÂN */}
      <section className="artisans-section" id="artisans">
        <p className="eyebrow">NHỮNG NGƯỜI GIỮ HỒN DI SẢN</p>
        <h2>Tôn vinh bàn tay tài hoa Việt.</h2>

        <p>
          Mỗi nghệ nhân, mỗi làng nghề đều mang trong mình một câu chuyện
          đáng được lắng nghe và lan tỏa.
        </p>
      </section>

      {/* LIÊN HỆ */}
      <section className="contact-section" id="contact">
        <p className="eyebrow">CÙNG VICO NỐI DÀI GIÁ TRỊ</p>
        <h2>Bạn muốn kết nối cùng di sản Việt?</h2>
        <p>Hãy cùng nhau tạo nên những cơ hội phát triển bền vững.</p>

        <a href="mailto:contact@vico.vn" className="button-primary">
          Liên hệ với VICO <ArrowUpRight size={18} />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <a href="#home" className="footer-brand">
          VICO.
        </a>

        <span>KẾT NỐI DI SẢN VIỆT</span>

        <a href="#home">Trở về đầu trang ↑</a>
      </footer>
    </main>
  );
}

export default App;
