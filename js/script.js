const CONFIG = {
  WEBHOOK_URL: "",
  META_PIXEL_ENABLED: true,
  GA4_ENABLED: true,
  TIKTOK_PIXEL_ENABLED: true
};

const products = [
  { code: "TC6", name: "Tranh Tròn Sen Vân Trời ÁNH SÁNG NỔI", desc: "Hoa sen thanh khiết hòa cùng đường vân trời, gợi tâm an, trí sáng và đời sống thiện lành.", suitable: "Bàn thờ Phật, bàn thờ treo", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "TC209", name: "Tranh Ngang Sen Bồ Đề ÁNH SÁNG NỔI", desc: "Cội bồ đề giác ngộ kết hợp hoa sen thanh tịnh, nhắc giữ tâm sáng và hướng về tỉnh thức.", suitable: "Tủ thờ truyền thống, phòng thờ", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "TC98", name: "Tranh Ngang Sen Tia Trời ÁNH SÁNG NỔI", desc: "Hoa sen vươn trong tia sáng ấm áp, gợi ánh sáng trí tuệ soi rọi tâm thức.", suitable: "Bàn thờ dáng đứng, phòng thờ", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "TC90", name: "Tranh Ngang Sen Nhật Quang ÁNH SÁNG NỔI", desc: "Sắc sen thanh tịnh hòa cùng vầng nhật quang, gợi ánh sáng Phật pháp soi đường.", suitable: "Tủ thờ, bàn thờ Nhị cấp/Tam cấp", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "TC184", name: "Tranh Tròn Sen Tịnh Quang ÁNH SÁNG NỔI", desc: "Hoa sen thanh khiết tỏa sáng trong nguồn quang minh nhẹ nhàng, nhắc giữ tâm thanh tịnh.", suitable: "Bàn thờ treo, bàn thờ dáng đứng", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "HD888", name: "Tranh Ngang Mây Trời ÁNH SÁNG NỔI", desc: "Lấy cảm hứng từ Đức Phật thuyết Vi Diệu Pháp tại cung trời Tam Thập Tam Thiên.", suitable: "Phòng thờ, tủ thờ truyền thống", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "TC51", name: "Tranh Tròn Mandala Chữ Vạn ÁNH SÁNG NỔI", desc: "Bố cục mandala cân xứng cùng biểu tượng chữ Vạn trang nghiêm, gợi sự cát tường và viên mãn.", suitable: "Bàn thờ Phật, không gian thiền", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "TC111", name: "Tranh Ngang Sen Kim Quang ÁNH SÁNG NỔI", desc: "Gợi ánh sáng trí tuệ và phước lành, giúp không gian thờ thêm sáng đẹp, an yên.", suitable: "Tủ thờ, phòng thờ", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "HD868", name: "Tranh Tròn Thanh Liên ÁNH SÁNG NỔI", desc: "Đóa sen xanh biểu tượng cho sự thanh cao, tĩnh tại và tâm hồn trong sạch.", suitable: "Bàn thờ treo, bàn thờ dáng đứng", sizes: "Theo kích thước bàn thờ thực tế" },
  { code: "HD890", name: "Tranh Tròn Quan Âm Ngự Mây ÁNH SÁNG NỔI", desc: "Quan Âm Bồ Tát ngự trên mây lành, toát lên vẻ từ bi, thanh tịnh và hướng tâm về bình an.", suitable: "Bàn thờ Quan Âm, phòng thờ", sizes: "Theo kích thước bàn thờ thực tế" }
];

const quizState = { worship_type: "", altar_type: "", altar_size: "" };
let currentProduct = null;
let scrollDepthTracked = false;

// Gửi sự kiện tới các nền tảng có sẵn; local sẽ log để kiểm thử.
function trackEvent(eventName, eventData = {}) {
  const metaMap = { PageView: "PageView", View_Product: "ViewContent", Open_Product_Popup: "ViewContent", Click_Consult_Button: "Contact", Submit_Form: "Lead" };
  let sent = false;
  try {
    if (CONFIG.META_PIXEL_ENABLED && typeof window.fbq === "function") {
      const metaEvent = metaMap[eventName];
      if (metaEvent) window.fbq("track", metaEvent, eventData);
      else window.fbq("trackCustom", eventName, eventData);
      sent = true;
    }
    if (CONFIG.GA4_ENABLED && typeof window.gtag === "function") { window.gtag("event", eventName, eventData); sent = true; }
    if (CONFIG.TIKTOK_PIXEL_ENABLED && window.ttq && typeof window.ttq.track === "function") { window.ttq.track(eventName, eventData); sent = true; }
  } catch (error) { console.warn("[DecorNow tracking]", error); }
  if (!sent) console.log("[DecorNow event]", eventName, eventData);
}

function getUTMParams() {
  const query = new URLSearchParams(window.location.search);
  return ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "ttclid", "gclid"].reduce((result, key) => {
    result[key] = query.get(key) || "";
    return result;
  }, {});
}

function getDeviceInfo() {
  const width = window.innerWidth;
  const tablet = /iPad|Tablet/i.test(navigator.userAgent) || (width >= 768 && width < 1024);
  return {
    device_type: tablet ? "tablet" : width < 768 ? "mobile" : "desktop",
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    user_agent: navigator.userAgent,
    page_url: window.location.href,
    referrer: document.referrer || "",
    timestamp: new Date().toISOString()
  };
}

// Chuẩn hóa dữ liệu lead thành JSON sẵn sàng gửi qua webhook trung gian.
function collectLeadData(formElement, extraData = {}) {
  const form = new FormData(formElement);
  const utm = getUTMParams();
  const device = getDeviceInfo();
  return {
    full_name: String(form.get("full_name") || "").trim(),
    phone: String(form.get("phone") || "").trim(),
    worship_type: String(form.get("worship_type") || quizState.worship_type || ""),
    altar_type: String(form.get("altar_type") || quizState.altar_type || ""),
    altar_size: String(form.get("altar_size") || quizState.altar_size || ""),
    product_name: String(form.get("product_name") || currentProduct?.name || ""),
    product_code: String(form.get("product_code") || currentProduct?.code || ""),
    note: String(form.get("note") || "").trim(),
    source_section: extraData.source_section || formElement.dataset.source || "unknown",
    clicked_cta: extraData.clicked_cta || "",
    utm,
    device: { device_type: device.device_type, screen_width: device.screen_width, screen_height: device.screen_height, user_agent: device.user_agent },
    page: { page_url: device.page_url, referrer: device.referrer, timestamp: device.timestamp }
  };
}

function isValidVietnamPhone(phone) {
  return /^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/.test(phone.replace(/[\s.()-]/g, ""));
}

function showMessage(form, message, type) {
  const element = form.querySelector(".dcn-form__message");
  if (!element) return;
  element.textContent = message;
  element.className = `dcn-form__message is-${type}`;
}

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle("is-error", isError);
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 4500);
}

async function submitLead(formElement, extraData = {}) {
  const phoneInput = formElement.querySelector('[name="phone"]');
  const phone = phoneInput?.value.trim() || "";
  phoneInput?.classList.remove("is-invalid");
  if (!isValidVietnamPhone(phone)) {
    phoneInput?.classList.add("is-invalid");
    phoneInput?.focus();
    showMessage(formElement, "Vui lòng nhập số điện thoại Việt Nam hợp lệ.", "error");
    return false;
  }
  const data = collectLeadData(formElement, extraData);
  const button = formElement.querySelector('[type="submit"]');
  if (button) { button.disabled = true; button.dataset.label = button.textContent; button.textContent = "Đang gửi..."; }
  try {
    if (CONFIG.WEBHOOK_URL) {
      const response = await fetch(CONFIG.WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } else {
      console.log("[DecorNow lead - local test]", data);
      await new Promise(resolve => window.setTimeout(resolve, 350));
    }
    trackEvent("Submit_Form", { source_section: data.source_section, product_code: data.product_code });
    const success = "DecorNow đã nhận thông tin, tư vấn viên sẽ liên hệ anh/chị trong thời gian sớm nhất.";
    showMessage(formElement, success, "success");
    showToast(success);
    formElement.reset();
    if (formElement.closest(".dcn-modal")) window.setTimeout(closeModal, 1000);
    return true;
  } catch (error) {
    console.error("[DecorNow submit]", error);
    const failure = "Chưa thể gửi thông tin. Anh/chị vui lòng thử lại hoặc gọi 0865 898 247.";
    showMessage(formElement, failure, "error");
    showToast(failure, true);
    return false;
  } finally {
    if (button) { button.disabled = false; button.textContent = button.dataset.label || "Gửi thông tin"; }
  }
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = products.map((product, index) => `<article class="dcn-product"><div class="dcn-product__image"><img src="images/products/${product.code}.png" alt="${product.name} ${product.code}" loading="lazy"><span>${product.code}</span></div><div class="dcn-product__body"><h3>${product.name}</h3><p>${product.desc}</p><small>Bảo hành khung 2 năm · đèn 1 năm</small><button class="dcn-btn dcn-btn--gold product-trigger" type="button" data-index="${index}">Xem chi tiết</button></div></article>`).join("");
}

function populateModalForm(product = null) {
  const form = document.querySelector(".dcn-form--modal");
  if (!form) return;
  const values = { worship_type: quizState.worship_type, altar_type: quizState.altar_type, altar_size: quizState.altar_size, product_name: product?.name || "", product_code: product?.code || "" };
  Object.entries(values).forEach(([name, value]) => { const input = form.elements[name]; if (input) input.value = value; });
}

function openModal(product = null, title = "Nhận tư vấn chọn tranh") {
  const modal = document.getElementById("product-modal");
  if (!modal) return;
  currentProduct = product;
  document.getElementById("modal-title").textContent = product?.name || title;
  document.getElementById("modal-code").textContent = product ? `Mã sản phẩm: ${product.code}` : "Tư vấn DecorNow";
  document.getElementById("modal-desc").textContent = product?.desc || "DecorNow gợi ý mẫu phù hợp với không gian thờ của anh/chị.";
  const modalImage = document.getElementById("modal-image");
  if (modalImage) {
    modalImage.src = product ? `images/products-detail/${product.code}.png` : "images/hero-mobile.png";
    modalImage.alt = product ? `${product.name} ${product.code}` : "Không gian thờ DecorNow";
  }
  document.getElementById("modal-details").innerHTML = product ? `<li>Phù hợp: ${product.suitable}</li><li>Kích thước gợi ý: ${product.sizes}</li><li>Công nghệ ÁNH SÁNG NỔI dịu nhẹ</li>` : "<li>Gợi ý theo tôn thờ và không gian</li><li>Tư vấn kích thước cân đối</li><li>Ghép thử tranh miễn phí</li>";
  populateModalForm(product);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
  modal.querySelector('[name="phone"]')?.focus();
  if (product) trackEvent("Open_Product_Popup", { product_name: product.name, product_code: product.code });
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
}

function initInteractions() {
  const menuButton = document.querySelector(".dcn-menu-toggle");
  const nav = document.querySelector(".dcn-nav");
  menuButton?.addEventListener("click", () => { const open = nav?.classList.toggle("is-open"); menuButton.setAttribute("aria-expanded", String(Boolean(open))); });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("is-open"); menuButton?.setAttribute("aria-expanded", "false"); }));

  document.querySelectorAll(".dcn-question").forEach(question => question.addEventListener("change", event => {
    const input = event.target.closest("input");
    if (!input) return;
    const group = question.dataset.group;
    const firstChoice = !quizState[group];
    quizState[group] = input.value;
    if (firstChoice) trackEvent("Click_Quiz_Start", { source: group });
    trackEvent(question.dataset.event, { value: input.value });
  }));

  document.addEventListener("click", event => {
    const productButton = event.target.closest(".product-trigger");
    if (productButton) {
      const product = products[Number(productButton.dataset.index)];
      trackEvent("View_Product", { product_name: product.name, product_code: product.code });
      openModal(product);
      return;
    }
    const consultButton = event.target.closest(".consult-trigger");
    if (consultButton) {
      if (consultButton.dataset.source === "quiz") trackEvent("Click_Quiz_Start", { source: "quiz_cta" });
      trackEvent("Click_Consult_Button", { source_section: consultButton.dataset.source || "page", clicked_cta: consultButton.dataset.cta || "" });
      if (consultButton.getAttribute("href") === "#chon-tranh") return;
      openModal(null, consultButton.dataset.title || "Nhận tư vấn chọn tranh");
    }
    if (event.target.closest(".track-hotline")) trackEvent("Click_Hotline", { phone: "0865898247" });
    if (event.target.closest("[data-zalo]")) trackEvent("Click_Zalo");
    if (event.target.closest("[data-close-modal]")) closeModal();
  });

  document.querySelectorAll("[data-lead-form]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const clicked = event.submitter?.dataset.cta || "submit_form";
    submitLead(form, { source_section: form.dataset.source, clicked_cta: clicked });
  }));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
  window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (!scrollDepthTracked && maxScroll > 0 && window.scrollY / maxScroll >= .5) { scrollDepthTracked = true; trackEvent("ScrollDepth_50"); }
  }, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initInteractions();
  trackEvent("PageView", { ...getUTMParams(), device_type: getDeviceInfo().device_type });
});

// Expose integration helpers for later WordPress/webhook setup.
window.DecorNow = { CONFIG, trackEvent, getUTMParams, getDeviceInfo, collectLeadData, submitLead };
