
import { useEffect, useState } from "react";
import {
  Landmark,
  House,
  BookOpen,
  Users,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import "./App.css";

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const formspreeEndpoint =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mvkkqjoy";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85",
    video: publicAsset("/videos/heritage-h264.mp4"),
    category: "TINH HOA LÀNG NGHỀ",
    title: "Nơi bàn tay kể chuyện di sản",
    description:
      "Mỗi sản phẩm thủ công là một câu chuyện văn hóa được lưu truyền qua nhiều thế hệ.",
  },
  {
    image: publicAsset("/images/banner3.jpg"),
    category: "GỐM BIÊN HÒA",
    title: "Gốm Biên Hòa",
    description:
      "Từ đôi tay nghệ nhân, đất mộc mạc trở thành những tác phẩm mang dấu ấn riêng.",
  },
  {
    image: publicAsset("/images/banner2.jpeg"),
    category: "LÂN SƯ RỒNG",
    title: "Lân Sư Rồng",
    description:
      "Nghệ thuật múa lân kết nối cộng đồng và thắp lên không khí lễ hội truyền thống.",
  },
];

const products = [
  {
    category: "LÀNG NGHỀ TRUYỀN THỐNG",
    title: "Lồng đèn Phú Bình",
    description: "Workshop trải nghiệm, quà tặng thủ công và trang trí không gian bằng lồng đèn Phú Bình.",
    detail: "Lồng đèn Phú Bình là sản phẩm thủ công truyền thống gắn với nghề làm lồng đèn tại TP.HCM. Sự kết hợp giữa khung tre, chất liệu vải và kỹ thuật chế tác thủ công tạo nên sản phẩm giàu giá trị thẩm mỹ, phù hợp cho hoạt động trải nghiệm văn hóa, quà tặng doanh nghiệp và trang trí sự kiện.",
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13].map((n) => publicAsset(`/images/products/long-den/longden${n}.${({ 1: "png", 2: "png", 11: "webp", 12: "jpg", 13: "jpg" })[n] || "jpg"}`)),
    priceSummary: "Gói dịch vụ từ 7.500.000 VNĐ",
    packages: [
      "Workshop trải nghiệm làm lồng đèn · 15.000.000 VNĐ/gói (50 người)",
      "Lồng đèn làm quà tặng doanh nghiệp · 7.500.000 VNĐ/gói (50 phần)",
      "Trang trí không gian bằng lồng đèn · 15.000.000 VNĐ/gói (1 khu vực)",
    ],
    orderSteps: ["Chọn gói workshop, quà tặng hoặc trang trí.", "Gửi thông tin liên hệ, số lượng, thời gian, địa điểm và yêu cầu riêng.", "VICO xác nhận khả năng cung ứng, hạng mục và chi phí với nghệ nhân, đối tác.", "Nhận báo giá chính thức, thống nhất phạm vi, tiến độ và điều kiện hợp đồng."],
  },
  {
    category: "NGHỆ THUẬT TRÌNH DIỄN",
    title: "Múa Lân Sư Rồng",
    description: "Các gói biểu diễn truyền thống cho khai trương, lễ kỷ niệm và sự kiện doanh nghiệp.",
    detail: "Dịch vụ biểu diễn Lân Sư Rồng mang đến không khí sôi động và ý nghĩa may mắn cho sự kiện. VICO kết nối doanh nghiệp với các đoàn biểu diễn, tư vấn số lượng lân, thời lượng và tiết mục theo quy mô, ngân sách, không gian tổ chức. Gói trên website là mức tham khảo; chương trình thực tế sẽ được điều chỉnh theo nhu cầu.",
    images: Array.from({ length: 6 }, (_, index) => publicAsset(`/images/products/lan-su-rong/lsr${index + 1}.${index === 0 || index === 2 ? "jpeg" : index === 5 ? "jpg" : "jpg"}`)),
    priceSummary: "Gói biểu diễn từ 5.000.000 VNĐ",
    packages: [
      "Khai Sắc · 5.000.000 VNĐ · 10–15 phút, 3 con lân và đội trống",
      "Phát Lộc · 7.000.000 VNĐ · 20–25 phút, có Ông Địa và Thần Tài",
      "Đại Hội · 10.000.000 VNĐ · 30–40 phút, đội trống hội mở rộng",
    ],
    orderSteps: ["Chọn gói biểu diễn phù hợp với nhu cầu và ngân sách.", "Gửi thời gian, địa điểm, không gian trong nhà/ngoài trời và mục đích tổ chức.", "VICO xác nhận lịch diễn, điều kiện tổ chức và chi phí với đoàn lân.", "Thống nhất nội dung, chi phí và hợp đồng; VICO điều phối triển khai."],
  },
  {
    category: "GỐM THỦ CÔNG",
    title: "Gốm Biên Hòa",
    description: "Workshop trải nghiệm làm gốm và quà tặng thủ công mang dấu ấn Đồng Nai.",
    detail: "Gốm Biên Hòa mang nét đặc trưng của nghề gốm truyền thống Đồng Nai. Doanh nghiệp có thể tổ chức hoạt động trải nghiệm tạo hình sản phẩm hoặc lựa chọn quà tặng mang giá trị văn hóa. VICO kết nối doanh nghiệp với nghệ nhân và đơn vị cung cấp, hỗ trợ xây dựng gói dịch vụ theo nhu cầu.",
    images: [1, 2, 3, 4, 5].map((n) => publicAsset(`/images/products/gom-bien-hoa/gombienhoa${n}.${n === 2 ? "webp" : "jpg"}`)),
    priceSummary: "Gói dịch vụ từ 7.500.000 VNĐ",
    packages: [
      "Workshop trải nghiệm làm gốm · 12.500.000 VNĐ/gói (50 người)",
      "Gốm Biên Hòa làm quà tặng doanh nghiệp · 7.500.000 VNĐ/gói (50 phần)",
    ],
    orderSteps: ["Chọn sản phẩm hoặc gói workshop.", "Gửi số lượng, thời gian, địa điểm và yêu cầu tùy chỉnh.", "VICO xác nhận khả năng cung ứng, chi phí và phương án.", "Thống nhất báo giá, hợp đồng, thanh toán và lịch bàn giao."],
  },
  {
    category: "ĐAN LÁT THỦ CÔNG",
    title: "Đan lát Thái Mỹ",
    description: "Trải nghiệm kỹ thuật đan lát truyền thống và lựa chọn quà tặng thủ công.",
    detail: "Đan lát Thái Mỹ là nghề thủ công truyền thống tại Củ Chi, TP.HCM, nổi bật với các sản phẩm được tạo nên từ kỹ thuật đan lát thủ công. Doanh nghiệp có thể tổ chức workshop cùng nghệ nhân hoặc đặt sản phẩm làm quà tặng. VICO hỗ trợ kết nối và xây dựng phương án phù hợp với số lượng, thời gian và nhu cầu.",
    images: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14].map((n) => publicAsset(`/images/products/dan-lat-thai-my/danlatthaimy${n}.${({ 1: "webp", 2: "jpeg", 3: "jpg", 4: "jpg", 5: "jpg", 6: "jpg", 7: "jpg", 8: "jpg", 10: "jpg", 11: "png", 12: "png", 13: "png", 14: "png" })[n]}`)),
    priceSummary: "Gói dịch vụ từ 7.500.000 VNĐ",
    packages: [
      "Workshop trải nghiệm đan lát · 12.500.000 VNĐ/gói (50 người)",
      "Sản phẩm đan lát làm quà tặng doanh nghiệp · 7.500.000 VNĐ/gói (50 phần)",
    ],
    orderSteps: ["Chọn gói workshop hoặc quà tặng.", "Gửi số lượng, thời gian, địa điểm và tùy chỉnh nếu có.", "VICO xác nhận nguồn cung, chi phí và phương án với nghệ nhân, đối tác.", "Thống nhất báo giá, hợp đồng và kế hoạch triển khai/bàn giao."],
  },
  {
    category: "SẢN PHẨM TRANG TRÍ",
    title: "Mành trúc Tân Thông Hội",
    description: "Mành trúc trang trí không gian và mành trúc tranh theo kích thước yêu cầu.",
    detail: "Mành trúc Tân Thông Hội là sản phẩm thủ công truyền thống có tính ứng dụng trong trang trí không gian và thiết kế nội thất. Chất liệu trúc mộc mạc tạo điểm nhấn văn hóa cho văn phòng, nhà hàng, sự kiện và khu vực đón khách.",
    priceSummary: "Mành trúc từ 1.000.000 VNĐ",
    packages: [
      "Trang trí không gian: gói nhỏ 5–8 m² · 2.500.000 VNĐ; tiêu chuẩn 10–15 m² · 5.000.000 VNĐ; gói lớn 20–30 m² · 9.000.000 VNĐ",
      "Mành trúc tranh: 1,2 × 2 m · 1.000.000 VNĐ; 1,4 × 2 m · 1.200.000 VNĐ; 1,6 × 2 m · 1.400.000 VNĐ; 1,8 × 2,5 m · 2.000.000 VNĐ/tấm",
    ],
    orderSteps: ["Chọn gói theo diện tích hoặc kích thước mành tranh.", "Gửi số lượng, địa điểm lắp đặt, thời gian và nội dung tranh.", "VICO xác nhận mẫu mã, kích thước và chi phí.", "Thống nhất báo giá, hợp đồng, lịch giao hàng/thi công."],
  },
  {
    category: "QUÀ TẶNG VĂN HÓA",
    title: "Nón lá",
    description: "Workshop trang trí nón lá theo chủ đề và nón lá làm quà tặng doanh nghiệp.",
    detail: "Nón lá gắn liền với hình ảnh và đời sống văn hóa Việt Nam. VICO kết nối doanh nghiệp với hoạt động trải nghiệm trang trí nón lá hoặc lựa chọn nón làm quà tặng, có thể tùy chỉnh họa tiết, thông điệp và bao bì theo yêu cầu.",
    priceSummary: "Gói dịch vụ từ 5.000.000 VNĐ",
    packages: [
      "Workshop trải nghiệm trang trí nón lá · 12.500.000 VNĐ/gói (50 người)",
      "Nón lá làm quà tặng doanh nghiệp · 5.000.000 VNĐ/gói (50 chiếc)",
    ],
    orderSteps: ["Chọn gói workshop hoặc quà tặng.", "Gửi số lượng, thời gian, địa điểm và nội dung tùy chỉnh.", "VICO xác nhận mẫu mã, nguồn cung và chi phí.", "Thống nhất báo giá, hợp đồng và lịch triển khai/bàn giao."],
  },
  {
    category: "DỊCH VỤ THIẾT KẾ THỦ CÔNG",
    title: "Vẽ bảng hiệu thủ công",
    description: "Bảng hiệu vẽ tay, kết hợp chữ nghệ thuật và họa tiết theo nhận diện thương hiệu.",
    detail: "Dịch vụ vẽ bảng hiệu thủ công tạo điểm nhấn riêng cho cửa hàng, quán cà phê, nhà hàng, gian hàng triển lãm và không gian sự kiện. Thiết kế được kết nối theo kích thước, phong cách và ngân sách của doanh nghiệp.",
    priceSummary: "Từ 800.000 VNĐ/bảng",
    packages: [
      "Bảng hiệu cơ bản · 800.000 VNĐ · 60 × 40 cm",
      "Bảng hiệu sáng tạo · 1.500.000 VNĐ · 100 × 60 cm",
      "Bảng hiệu nghệ thuật · 2.500.000 VNĐ · 150 × 80 cm",
    ],
    orderSteps: ["Chọn gói theo kích thước.", "Gửi nội dung, phong cách, chất liệu và địa điểm nhận.", "VICO xác nhận thiết kế, thời gian và chi phí với đơn vị thực hiện.", "Duyệt mẫu, thống nhất báo giá và điều kiện đặt hàng."],
  },
  {
    category: "DỊCH VỤ SỰ KIỆN",
    title: "Thuê trang phục truyền thống",
    description: "Áo dài, áo tứ thân và áo bà ba cho sự kiện, hoạt động văn hóa và chụp ảnh.",
    detail: "Dịch vụ cho thuê trang phục truyền thống giúp doanh nghiệp chuẩn bị trang phục phù hợp cho sự kiện và hoạt động trải nghiệm. VICO hỗ trợ kết nối đơn vị cho thuê, tư vấn số lượng, kích cỡ, thời gian thuê và phương án giao nhận.",
    priceSummary: "Gói thuê từ 800.000 VNĐ/10 người",
    packages: [
      "Áo dài truyền thống · 1.500.000 VNĐ/10 người",
      "Áo tứ thân · 1.000.000 VNĐ/10 người",
      "Áo bà ba · 800.000 VNĐ/10 người",
    ],
    orderSteps: ["Chọn loại trang phục và số lượng.", "Gửi số lượng, kích cỡ, thời gian thuê và địa điểm nhận.", "Xác nhận tình trạng, giá, đặt cọc (nếu có), thời hạn và phương thức giao nhận.", "Nhận, sử dụng và bảo quản trang phục; hoàn trả đúng hạn để đối soát."],
  },
];

const readPageFromUrl = () => {
  const page = new URLSearchParams(window.location.search).get("page");
  return page === "products" || page === "about" || page === "contact" ? page : "home";
};

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [currentPage, setCurrentPage] = useState(readPageFromUrl);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeProductImage, setActiveProductImage] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [emailDraft, setEmailDraft] = useState("");
  const [formNotice, setFormNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const syncPageWithUrl = () => setCurrentPage(readPageFromUrl());
    window.addEventListener("popstate", syncPageWithUrl);
    return () => window.removeEventListener("popstate", syncPageWithUrl);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [currentPage]);

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
    if (currentPage !== "home") return undefined;
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
  }, [currentPage]);

  const slide = slides[activeSlide];
  const closeMenu = () => setMenuOpen(false);
  const navigateToPage = (page, sectionId = "", productTitle = "") => {
    const nextUrl = new URL(window.location.href);
    if (page === "home") nextUrl.searchParams.delete("page");
    else nextUrl.searchParams.set("page", page);
    nextUrl.hash = sectionId;
    window.history.pushState({}, "", nextUrl);
    setCurrentPage(page);
    setSelectedProduct(null);
    setContactForm((current) => ({ ...current, topic: productTitle }));
    setEmailDraft("");
    setFormNotice("");
    closeMenu();

    window.requestAnimationFrame(() => {
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setIsSubmitting(true);
    setEmailDraft("");

    if (formspreeEndpoint) {
      try {
        const response = await fetch(formspreeEndpoint, {
          method: "POST",
          body: new FormData(formElement),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Form submission failed");

        setFormNotice("Cảm ơn bạn! Yêu cầu tư vấn đã được gửi tới VICO.");
        setContactForm({ name: "", email: "", phone: "", topic: "", message: "" });
        formElement.reset();
      } catch {
        setFormNotice("Chưa gửi được yêu cầu. Bạn vui lòng thử lại hoặc liên hệ VICO qua email và số điện thoại bên cạnh.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const subject = contactForm.topic
      ? `Tư vấn ${contactForm.topic}`
      : "Yêu cầu liên hệ VICO";
    const body = [
      `Họ và tên: ${contactForm.name}`,
      `Email: ${contactForm.email}`,
      `Số điện thoại: ${contactForm.phone || "Chưa cung cấp"}`,
      `Quan tâm: ${contactForm.topic || "Chưa chọn"}`,
      "",
      "Nội dung:",
      contactForm.message,
    ].join("\n");

    setEmailDraft(
      `mailto:vicoketnoidisanviet@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setFormNotice(
      "Thông tin đã được chuẩn bị. Bấm nút bên dưới để mở email và gửi yêu cầu tới VICO.",
    );
    setIsSubmitting(false);
  };

  return (
    <div className="vico-site">
      {/* HEADER */}
      <header className="navbar">
        <a
          href="#home"
          className="brand"
          onClick={(event) => {
            event.preventDefault();
            navigateToPage("home");
          }}
        >
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
            className={currentPage === "home" && activeSection === "home" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              navigateToPage("home");
            }}
          >
            <House size={15} />
            Trang chủ
          </a>

          <a
            href="?page=products"
            className={currentPage === "products" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              navigateToPage("products");
            }}
          >
            <BookOpen size={15} />
            Sản phẩm
          </a>

          <a
            href="?page=about"
            className={currentPage === "about" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              navigateToPage("about");
            }}
          >
            <Users size={15} />
            Về chúng tôi
          </a>

          <a
            href="?page=contact"
            className={currentPage === "contact" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault();
              navigateToPage("contact");
            }}
          >
            <Mail size={15} />
            Liên hệ
          </a>
        </nav>

        <a
          href="?page=contact"
          className="nav-cta"
          onClick={(event) => {
            event.preventDefault();
            navigateToPage("contact");
          }}
        >
          Kết nối cùng VICO <ArrowUpRight size={16} />
        </a>
      </header>

      {currentPage === "home" && (
      <main className="home-page" id="home">
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

            <a
              href="?page=contact"
              className="button-secondary"
              onClick={(event) => {
                event.preventDefault();
                navigateToPage("contact");
              }}
            >
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
      <section className="intro-section" id="heritage" data-reveal>
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
      <section className="artisans-section" id="artisans" data-reveal>
        <p className="eyebrow">NHỮNG NGƯỜI GIỮ HỒN DI SẢN</p>
        <h2>Tôn vinh bàn tay tài hoa Việt.</h2>

        <p>
          Mỗi nghệ nhân, mỗi làng nghề đều mang trong mình một câu chuyện
          đáng được lắng nghe và lan tỏa.
        </p>
      </section>

      {/* LIÊN HỆ */}
      <section className="contact-section" id="contact" data-reveal>
        <p className="eyebrow">CÙNG VICO NỐI DÀI GIÁ TRỊ</p>
        <h2>Bạn muốn kết nối cùng di sản Việt?</h2>
        <p>Hãy cùng nhau tạo nên những cơ hội phát triển bền vững.</p>

        <a href="mailto:vicoketnoidisanviet@gmail.com" className="button-primary">
          Liên hệ với VICO <ArrowUpRight size={18} />
        </a>
      </section>
      </main>
      )}

      {currentPage === "about" && (
        <main className="about-page" id="about">
          <section className="about-hero" data-reveal>
            <div className="about-hero-copy">
              <p className="eyebrow">VICO — KẾT NỐI DI SẢN VIỆT</p>
              <h1>
                Kết nối những người giữ nghề.
                <span> Lan tỏa câu chuyện Việt.</span>
              </h1>
              <p>
                VICO là dự án sinh viên hướng đến việc gìn giữ và đưa câu
                chuyện của nghệ nhân, làng nghề truyền thống đến gần hơn với
                cộng đồng và doanh nghiệp.
              </p>
              <div className="about-hero-actions">
                <button
                  className="product-detail-button"
                  type="button"
                  onClick={() => navigateToPage("products")}
                >
                  Khám phá sản phẩm <ArrowUpRight size={17} />
                </button>
                <button
                  className="about-contact-link"
                  type="button"
                  onClick={() => navigateToPage("contact")}
                >
                  Kết nối cùng VICO
                </button>
              </div>
            </div>
            <div className="about-hero-visual">
              <img src={publicAsset("/images/banner3.jpg")} alt="Nghệ nhân đang tạo hình gốm" />
              <div className="about-visual-caption">
                <Landmark size={19} aria-hidden="true" />
                <span>Gìn giữ tinh hoa từ bàn tay nghệ nhân</span>
              </div>
            </div>
          </section>

          <section className="about-purpose" data-reveal>
            <div className="about-section-heading">
              <p className="eyebrow">ĐIỀU VICO THEO ĐUỔI</p>
              <h2>Di sản sống khi được gìn giữ, kết nối và sẻ chia.</h2>
            </div>
            <div className="about-pillars">
              <article className="about-pillar">
                <span className="about-pillar-icon"><Landmark size={22} /></span>
                <h3>Gìn giữ giá trị</h3>
                <p>
                  Tôn vinh tri thức, kỹ thuật và câu chuyện được lưu truyền
                  trong từng nghề truyền thống.
                </p>
              </article>
              <article className="about-pillar">
                <span className="about-pillar-icon"><Users size={22} /></span>
                <h3>Kết nối con người</h3>
                <p>
                  Tạo nhịp cầu để nghệ nhân, làng nghề, khách hàng và doanh
                  nghiệp có thể tìm thấy nhau.
                </p>
              </article>
              <article className="about-pillar">
                <span className="about-pillar-icon"><BookOpen size={22} /></span>
                <h3>Lan tỏa bằng câu chuyện</h3>
                <p>
                  Dùng nền tảng số để giới thiệu sản phẩm và đưa những giá trị
                  văn hóa đến gần cộng đồng hơn.
                </p>
              </article>
            </div>
          </section>

          <section className="about-journey" data-reveal>
            <div className="about-journey-image">
              <img src={publicAsset("/images/banner2.jpeg")} alt="Nghệ thuật múa Lân Sư Rồng truyền thống" />
            </div>
            <div className="about-journey-copy">
              <p className="eyebrow">HÀNH TRÌNH DỰ ÁN</p>
              <h2>Từ tìm hiểu thực tế đến website demo.</h2>
              <p>
                Trong quá trình thực hiện, nhóm xây dựng kế hoạch khảo sát và
                thu thập thông tin thực tế với sự hướng dẫn của giảng viên và
                hỗ trợ từ khoa chuyên môn.
              </p>
              <p>
                Năm 2026, nhóm hoàn thiện website demo và trang truyền thông,
                đồng thời tham gia vòng bán kết Cuộc thi “Sinh viên với ý
                tưởng sáng tạo & khởi nghiệp”.
              </p>
            </div>
          </section>

          <section className="about-team" data-reveal>
            <div className="about-section-heading">
              <p className="eyebrow">ĐỘI NGŨ DỰ ÁN</p>
              <h2>Ba góc nhìn, cùng hướng về di sản Việt.</h2>
              <p>
                Nhóm kết hợp các lĩnh vực khoa học xã hội, công nghệ thông tin
                và quản trị kinh doanh để phát triển ý tưởng VICO.
              </p>
            </div>
            <div className="about-team-grid">
              <article className="about-team-card">
                <span className="about-team-initial">Q</span>
                <h3>Nguyễn Quang Quân</h3>
                <p>Trưởng nhóm · Khoa học xã hội</p>
              </article>
              <article className="about-team-card">
                <span className="about-team-initial">T</span>
                <h3>Nguyễn Thị Tuyết Trinh</h3>
                <p>Công nghệ thông tin</p>
              </article>
              <article className="about-team-card">
                <span className="about-team-initial">D</span>
                <h3>Trần Ngọc Diệp</h3>
                <p>Quản trị kinh doanh</p>
              </article>
            </div>
          </section>
        </main>
      )}

      {currentPage === "products" && (
        <main className="products-page" id="products">
          <div className="page-heading" data-reveal>
            <p className="eyebrow">TINH HOA TRUYỀN THỐNG</p>
            <h1>
              Sản phẩm và câu chuyện
              <br className="page-title-break" /> về di sản Việt
            </h1>
            <p>
              Khám phá giá trị thủ công và nghệ thuật truyền thống.
              <br className="page-description-break" /> Cùng gìn giữ câu
              chuyện văn hóa Việt.
            </p>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
              <article
                className="product-card"
                data-reveal
                key={product.title}
                style={{ "--reveal-delay": `${index * 120}ms` }}
              >
                <div className="product-card-image">
                  {product.images?.length ? (
                    <img src={product.images[0]} alt={product.title} loading="lazy" />
                  ) : (
                    <div className="product-image-pending" aria-label="Chưa có hình ảnh sản phẩm">
                      <span>Hình ảnh sẽ được cập nhật</span>
                    </div>
                  )}
                </div>
                <div className="product-card-content">
                  <p className="eyebrow">{product.category}</p>
                  <h2>{product.title}</h2>
                  <p className="product-card-description">{product.description}</p>
                  <p className="product-price-summary">{product.priceSummary}</p>
                  <div className="product-card-actions">
                    <button
                      className="product-detail-button"
                      type="button"
                      onClick={() => {
                        setSelectedProduct(product);
                        setActiveProductImage(0);
                      }}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className="product-consult-button"
                      type="button"
                      onClick={() => navigateToPage("contact", "", product.title)}
                    >
                      Liên hệ tư vấn
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {selectedProduct && (
            <div
              className="product-modal-backdrop"
              onClick={() => setSelectedProduct(null)}
            >
              <section
                className="product-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                  <button
                  className="product-modal-close"
                  type="button"
                  aria-label="Đóng chi tiết sản phẩm"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X size={21} />
                </button>
                {selectedProduct.images?.length ? (
                  <div className="product-modal-gallery">
                    <img
                      className="product-modal-main-image"
                      src={selectedProduct.images[activeProductImage]}
                      alt={`${selectedProduct.title} ${activeProductImage + 1}`}
                    />
                    {selectedProduct.images.length > 1 && (
                      <div className="product-modal-thumbnails" aria-label="Ảnh sản phẩm">
                        {selectedProduct.images.map((image, imageIndex) => (
                          <button
                            className={imageIndex === activeProductImage ? "is-active" : ""}
                            key={image}
                            type="button"
                            aria-label={`Xem ảnh ${imageIndex + 1}`}
                            aria-pressed={imageIndex === activeProductImage}
                            onClick={() => setActiveProductImage(imageIndex)}
                          >
                            <img src={image} alt="" loading="lazy" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="product-modal-no-image">Sản phẩm chưa có hình ảnh</div>
                )}
                <div className="product-modal-content">
                  <p className="eyebrow">{selectedProduct.category}</p>
                  <h2 id="product-modal-title">{selectedProduct.title}</h2>
                  <p>{selectedProduct.detail}</p>
                  <h3 className="product-packages-heading">Gói dịch vụ tham khảo</h3>
                  <ul className="product-packages-list">
                    {selectedProduct.packages.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <h3 className="product-packages-heading">Cách đặt dịch vụ</h3>
                  <ol className="product-order-steps">
                    {selectedProduct.orderSteps.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                  <button
                    className="product-consult-button"
                    type="button"
                    onClick={() => navigateToPage("contact", "", selectedProduct.title)}
                  >
                    Liên hệ tư vấn
                  </button>
                </div>
              </section>
            </div>
          )}
        </main>
      )}

      {currentPage === "contact" && (
        <main className="contact-page" id="contact">
          <div className="page-heading contact-page-heading" data-reveal>
            <p className="eyebrow">VICO LUÔN SẴN SÀNG LẮNG NGHE</p>
            <h1>Liên hệ tư vấn</h1>
            <p>
              Để lại thông tin và điều bạn quan tâm. VICO sẽ giúp kết nối bạn
              với câu chuyện, sản phẩm và nghệ nhân phù hợp.
            </p>
          </div>

          <div className="contact-page-layout" data-reveal>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Họ và tên <span aria-hidden="true">*</span>
                <input
                  autoComplete="name"
                  name="name"
                  required
                  value={contactForm.name}
                  onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })}
                />
              </label>
              <label>
                Email <span aria-hidden="true">*</span>
                <input
                  autoComplete="email"
                  name="email"
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                />
              </label>
              <label>
                Số điện thoại
                <input
                  autoComplete="tel"
                  name="phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(event) => setContactForm({ ...contactForm, phone: event.target.value })}
                />
              </label>
              <label>
                Bạn quan tâm đến
                <select
                  name="topic"
                  value={contactForm.topic}
                  onChange={(event) => setContactForm({ ...contactForm, topic: event.target.value })}
                >
                  <option value="">Chọn nội dung quan tâm</option>
                  {products.map((product) => (
                    <option key={product.title} value={product.title}>{product.title}</option>
                  ))}
                  <option value="Hợp tác khác">Hợp tác khác</option>
                </select>
              </label>
              <label className="contact-form-message">
                Nội dung cần tư vấn <span aria-hidden="true">*</span>
                <textarea
                  name="message"
                  rows="5"
                  required
                  value={contactForm.message}
                  onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                />
              </label>
              <div className="contact-form-submit-row">
                <button className="contact-submit-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Đang gửi..."
                    : formspreeEndpoint
                      ? "Gửi yêu cầu tư vấn"
                      : "Tạo email tư vấn"}
                  {!isSubmitting && <ArrowUpRight size={18} />}
                </button>
                <p>
                  {formspreeEndpoint
                    ? <>Yêu cầu sẽ được chuyển tới <strong>vicoketnoidisanviet@gmail.com</strong>.</>
                    : <>Chưa cấu hình dịch vụ gửi trực tiếp. Email nháp sẽ được gửi tới <strong>vicoketnoidisanviet@gmail.com</strong>.</>}
                </p>
              </div>
              {formNotice && (
                <div className="contact-form-notice" aria-live="polite">
                  <p>{formNotice}</p>
                  {emailDraft && <a href={emailDraft}>Mở email gửi VICO</a>}
                </div>
              )}
            </form>

            <aside className="contact-page-info">
              <h2>Kết nối trực tiếp</h2>
              <p>VICO — KẾT NỐI DI SẢN VIỆT</p>
              <div className="footer-contact-item">
                <MapPin size={19} aria-hidden="true" />
                <span>97 Võ Văn Tần, phường Xuân Hòa, TP. HCM</span>
              </div>
              <a className="footer-contact-item" href="tel:0783741057">
                <Phone size={18} aria-hidden="true" />
                <span>0783741057</span>
              </a>
              <a className="footer-contact-item" href="mailto:vicoketnoidisanviet@gmail.com">
                <Mail size={18} aria-hidden="true" />
                <span>vicoketnoidisanviet@gmail.com</span>
              </a>
            </aside>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-about">
        <a
          href="#home"
          className="footer-brand"
          onClick={(event) => { event.preventDefault(); navigateToPage("home"); }}
        >
            <strong>VICO</strong>
            <span>KẾT NỐI DI SẢN VIỆT</span>
          </a>
          <p>
            VICO kết nối nghệ nhân, làng nghề và doanh nghiệp để gìn giữ,
            phát triển và lan tỏa những giá trị di sản Việt Nam.
          </p>
        </div>

        <nav className="footer-navigation" aria-label="Điều hướng chân trang">
          <h2>Khám phá</h2>
          <a href="#home" onClick={(event) => { event.preventDefault(); navigateToPage("home"); }}>Trang chủ</a>
          <a href="?page=products" onClick={(event) => { event.preventDefault(); navigateToPage("products"); }}>Sản phẩm</a>
          <a href="?page=about" onClick={(event) => { event.preventDefault(); navigateToPage("about"); }}>Về chúng tôi</a>
          <a href="?page=contact" onClick={(event) => { event.preventDefault(); navigateToPage("contact"); }}>Liên hệ</a>
        </nav>

        <div className="footer-policies">
          <h2>Chính sách</h2>
          <details>
            <summary>Điều khoản sử dụng</summary>
            <p>
              Website cung cấp thông tin giới thiệu về VICO, di sản và làng
              nghề. Nội dung có thể được cập nhật; vui lòng liên hệ VICO để
              xác nhận thông tin trước khi sử dụng cho hoạt động hợp tác.
            </p>
          </details>
          <details>
            <summary>Chính sách bảo mật</summary>
            <p>
              Website không lưu dữ liệu form trên máy chủ riêng. Thông tin
              được gửi qua Formspree để chuyển tới VICO; dịch vụ có thể xử
              lý dữ liệu theo chính sách riêng của họ. Vui lòng không nhập
              thông tin nhạy cảm vào biểu mẫu.
            </p>
          </details>
        </div>

        <div className="footer-contact">
          <h2>Liên hệ</h2>
          <div className="footer-contact-item">
            <MapPin size={19} aria-hidden="true" />
            <span>97 Võ Văn Tần, phường Xuân Hòa, TP. HCM</span>
          </div>
          <a className="footer-contact-item" href="tel:0783741057">
            <Phone size={18} aria-hidden="true" />
            <span>0783741057</span>
          </a>
          <a className="footer-contact-item" href="mailto:vicoketnoidisanviet@gmail.com">
            <Mail size={18} aria-hidden="true" />
            <span>vicoketnoidisanviet@gmail.com</span>
          </a>
        </div>

        <div className="footer-bottom">
          <span>© VICO — KẾT NỐI DI SẢN VIỆT</span>
          <a href="#home" onClick={(event) => { event.preventDefault(); navigateToPage("home"); }}>Trở về đầu trang ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
