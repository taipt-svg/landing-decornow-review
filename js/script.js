const CONFIG = {
  WEBHOOK_URL: "https://decornowglobal.sg.larksuite.com/base/automation/webhook/event/L4cwaA8EzwoKJbhrDCgluRohgog",
  // === Dán ID Pixel thật vào đây khi sẵn sàng chạy quảng cáo ===
  META_PIXEL_ENABLED: true,
  META_PIXEL_ID: "",        // Meta Pixel ID, vd: "1234567890123456"
  GA4_ENABLED: true,
  GA4_ID: "",               // GA4 Measurement ID, vd: "G-XXXXXXXXXX"
  TIKTOK_PIXEL_ENABLED: true,
  TIKTOK_PIXEL_ID: ""       // TikTok Pixel ID, vd: "CabcXYZ123..."
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

// Bảng gợi ý được đối chiếu từ tài liệu tư vấn của DecorNow.
const QUIZ_RECOMMENDATIONS = {
  quan_am: {
    small: [["HD890", "D30 / D40"], ["HD868", "D30"], ["TC6", "D40"]],
    medium: [["HD890", "D40 / D50"], ["TC90", "60×40 / 70×50cm"], ["HD868", "D50"]],
    large: [["TC90", "90×60 / 100×50cm"], ["HD890", "D60"], ["HD888", "90×60cm"]],
    grand: [["TC111", "108×67cm"], ["TC90", "100×50cm"], ["HD890", "D60"]]
  },
  phat: {
    small: [["TC51", "D30 / D40"], ["TC184", "D30"], ["TC209", "60×40cm"]],
    medium: [["TC209", "60×40 / 70×50cm"], ["TC51", "D40 / D50"], ["HD888", "70×50cm"]],
    large: [["TC209", "90×60 / 100×50cm"], ["HD888", "90×60 / 100×50cm"], ["TC51", "D60"]],
    grand: [["TC209", "108×67cm"], ["TC111", "100×50cm"], ["TC98", "90×60cm"]]
  },
  no_statue: {
    small: [["TC6", "D30 / D40"], ["HD888", "60×40cm"], ["TC184", "D30"]],
    medium: [["HD888", "60×40 / 70×50cm"], ["TC184", "D40 / D50"], ["TC6", "D40"]],
    large: [["HD888", "90×60 / 100×50cm"], ["TC90", "90×60cm"], ["TC184", "D60"]],
    grand: [["TC209", "100×50 / 108×67cm"], ["HD888", "100×50cm"], ["TC90", "90×60cm"]]
  }
};

const SIZE_TIERS = {
  "41x61cm": "small", "67x53cm": "small",
  "48x81cm": "medium", "48x88cm": "medium",
  "61x107cm": "large", "61x127cm": "large",
  "81x175cm": "grand"
};

const ALTAR_ALLOWED_TIERS = {
  "Bàn thờ treo": ["small", "medium"],
  "Tủ thờ truyền thống": ["large", "grand"],
  "Bàn thờ dáng đứng": ["large", "grand"],
  "Bàn thờ Nhị cấp/Tam cấp": ["large"]
};

const quizState = { worship_type: "", altar_type: "", altar_size: "" };
let currentProduct = null;
let currentRecommendations = [];
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
    // lead_id + submitted_at để khớp 2 cột đã map sẵn trong automation Larkbase.
    lead_id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    submitted_at: new Date().toISOString(),
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

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

function resetUploadPreview(form) {
  const preview = form.querySelector(".dcn-upload__preview");
  const drop = form.querySelector(".dcn-upload__drop");
  if (preview) preview.hidden = true;
  if (drop) drop.hidden = false;
  const image = preview?.querySelector("img");
  if (image?.src.startsWith("blob:")) URL.revokeObjectURL(image.src);
  if (image) image.removeAttribute("src");
}

function updateUploadPreview(input) {
  const form = input.closest("form");
  const upload = input.closest(".dcn-upload");
  const error = upload?.querySelector(".dcn-upload__error");
  const file = input.files?.[0];
  if (error) error.textContent = "";
  if (!file) { if (form) resetUploadPreview(form); return false; }
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 8 * 1024 * 1024) {
    input.value = "";
    if (error) error.textContent = "Vui lòng chọn ảnh JPG, PNG hoặc WebP có dung lượng không quá 8MB.";
    if (form) resetUploadPreview(form);
    return false;
  }
  const preview = upload?.querySelector(".dcn-upload__preview");
  const drop = upload?.querySelector(".dcn-upload__drop");
  const image = preview?.querySelector("img");
  if (image) image.src = URL.createObjectURL(file);
  const name = preview?.querySelector(".dcn-upload__name");
  const size = preview?.querySelector(".dcn-upload__size");
  if (name) name.textContent = file.name;
  if (size) size.textContent = formatBytes(file.size);
  if (preview) preview.hidden = false;
  if (drop) drop.hidden = true;
  trackEvent("Upload_Altar_Image", { file_type: file.type, file_size: file.size });
  return true;
}

// Thu nhỏ ảnh trước khi đóng gói vào JSON gửi webhook.
async function prepareAltarImage(form) {
  const file = form.querySelector('[name="altar_image"]')?.files?.[0];
  if (!file) return null;
  const bitmap = typeof createImageBitmap === "function" ? await createImageBitmap(file) : await new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Không thể đọc ảnh đã chọn.")); };
    image.src = url;
  });
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();
  return {
    file_name: file.name.replace(/\.[^.]+$/, ".jpg"),
    original_size: file.size,
    mime_type: "image/jpeg",
    width,
    height,
    data_url: canvas.toDataURL("image/jpeg", .82)
  };
}

function initCountdown() {
  const hours = document.getElementById("countdown-hours");
  const minutes = document.getElementById("countdown-minutes");
  const seconds = document.getElementById("countdown-seconds");
  if (!hours || !minutes || !seconds) return;
  const key = "dcn_offer_deadline";
  let deadline = Number(localStorage.getItem(key));
  if (!deadline || deadline <= Date.now()) {
    deadline = Date.now() + 6 * 60 * 60 * 1000;
    localStorage.setItem(key, String(deadline));
  }
  const update = () => {
    const remaining = Math.max(0, deadline - Date.now());
    hours.textContent = String(Math.floor(remaining / 3600000)).padStart(2, "0");
    minutes.textContent = String(Math.floor(remaining % 3600000 / 60000)).padStart(2, "0");
    seconds.textContent = String(Math.floor(remaining % 60000 / 1000)).padStart(2, "0");
    if (remaining <= 0) window.clearInterval(initCountdown.timer);
  };
  update();
  initCountdown.timer = window.setInterval(update, 1000);
}

function initConcerns() {
  const first = document.querySelector(".dcn-concerns article");
  if (!first) return;
  first.classList.add("is-open");
  first.querySelector(".dcn-concern__toggle")?.setAttribute("aria-expanded", "true");
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
    const altarImage = await prepareAltarImage(formElement);
    if (altarImage) data.altar_image = altarImage;
    if (CONFIG.WEBHOOK_URL) {
      // Webhook Lark không trả CORS header cho JS trình duyệt nên dùng no-cors + text/plain
      // để tránh preflight. Response là opaque (không đọc được status), coi như đã gửi nếu
      // không có lỗi mạng. Nếu sau này đổi sang webhook trung gian có CORS, có thể khôi phục
      // kiểm tra response.ok.
      await fetch(CONFIG.WEBHOOK_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(data) });
    } else {
      console.log("[DecorNow lead - local test]", data);
      await new Promise(resolve => window.setTimeout(resolve, 350));
    }
    trackEvent("Submit_Form", { source_section: data.source_section, product_code: data.product_code });
    const success = "DecorNow đã nhận thông tin, tư vấn viên sẽ liên hệ anh/chị trong thời gian sớm nhất.";
    showMessage(formElement, success, "success");
    showToast(success);
    formElement.reset();
    resetUploadPreview(formElement);
    if (formElement.closest(".dcn-modal")) window.setTimeout(closeModal, 1000);
    return true;
  } catch (error) {
    console.error("[DecorNow submit]", error);
    const failure = "Chưa thể gửi thông tin. Anh/chị vui lòng thử lại hoặc gọi 032 888 9398.";
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
  modal.classList.toggle("is-product", Boolean(product));
  modal.classList.toggle("is-consult", !product);
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
  modal.classList.remove("is-product", "is-consult");
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
}

function getWorshipGroup(value) {
  if (value === "Quan Thế Âm") return "quan_am";
  if (value === "Chưa có tượng Phật") return "no_statue";
  return ["Phật Thích Ca", "A Di Đà", "Tây Phương Tam Thánh"].includes(value) ? "phat" : "";
}

function setQuizMessage(message = "", type = "") {
  const element = document.getElementById("quiz-message");
  if (!element) return;
  element.textContent = message;
  element.className = `dcn-quiz__message${type ? ` is-${type}` : ""}`;
}

function closeQuizResultsModal() {
  const modal = document.getElementById("quiz-result-modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
}

// Chỉ cho phép chọn kích thước có trong bảng tư vấn của loại bàn thờ.
function updateAllowedSizes() {
  const allowed = ALTAR_ALLOWED_TIERS[quizState.altar_type] || Object.values(SIZE_TIERS);
  document.querySelectorAll('input[name="quiz_size"]').forEach(input => {
    const disabled = !allowed.includes(SIZE_TIERS[input.value]);
    input.disabled = disabled;
    input.closest("label")?.classList.toggle("is-disabled", disabled);
    if (disabled && input.checked) {
      input.checked = false;
      quizState.altar_size = "";
    }
  });
  document.getElementById("quiz-results")?.setAttribute("hidden", "");
  if (quizState.altar_type) setQuizMessage("Các kích thước không phù hợp với loại bàn thờ đã được làm mờ.", "info");
}

function renderQuizResults() {
  const missing = [];
  if (!quizState.worship_type) missing.push("đang thờ ai");
  if (!quizState.altar_type) missing.push("loại bàn thờ");
  if (!quizState.altar_size) missing.push("kích thước bàn thờ");
  if (missing.length) {
    setQuizMessage(`Đạo hữu vui lòng chọn ${missing.join(", ")} trước khi nhận gợi ý.`, "error");
    return;
  }

  const group = getWorshipGroup(quizState.worship_type);
  const tier = SIZE_TIERS[quizState.altar_size];
  const recommendationRows = QUIZ_RECOMMENDATIONS[group]?.[tier];
  if (!recommendationRows) {
    setQuizMessage("Chưa có bộ gợi ý cho lựa chọn này. Đạo hữu vui lòng chọn lại hoặc liên hệ DecorNow.", "error");
    return;
  }

  currentRecommendations = recommendationRows.map(([code, suggestedSize], index) => ({
    product: products.find(item => item.code === code), suggestedSize, priority: index + 1
  })).filter(item => item.product);

  const grid = document.getElementById("quiz-result-grid");
  const results = document.getElementById("quiz-results");
  const summary = document.getElementById("quiz-result-summary");
  if (!grid || !results || !summary) return;
  summary.textContent = `${quizState.worship_type} • ${quizState.altar_type} • Bàn thờ ${quizState.altar_size}`;
  grid.innerHTML = currentRecommendations.map(({ product, suggestedSize, priority }) => {
    const index = products.findIndex(item => item.code === product.code);
    return `<article class="dcn-quiz-result-card${priority === 1 ? " is-primary" : ""}"><div class="dcn-quiz-result-card__image"><img src="images/products/${product.code}.png" alt="${product.name} ${product.code}" loading="lazy"><span>${priority === 1 ? "Phù hợp nhất" : `Gợi ý ${priority}`}</span></div><div class="dcn-quiz-result-card__body"><small>${product.code}</small><h4>${product.name}</h4><p>Kích thước tranh gợi ý: <b>${suggestedSize}</b></p><button class="dcn-btn dcn-btn--gold product-trigger" type="button" data-index="${index}">Xem chi tiết & tư vấn</button></div></article>`;
  }).join("");
  results.hidden = false;
  const resultModal = document.getElementById("quiz-result-modal");
  resultModal?.classList.add("is-open");
  resultModal?.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
  setQuizMessage("Đã tìm thấy 3 mẫu phù hợp với lựa chọn của đạo hữu.", "success");
  trackEvent("View_Quiz_Result", {
    worship_type: quizState.worship_type,
    altar_type: quizState.altar_type,
    altar_size: quizState.altar_size,
    product_codes: currentRecommendations.map(item => item.product.code).join(",")
  });
}

function initInteractions() {
  const menuButton = document.querySelector(".dcn-menu-toggle");
  const nav = document.querySelector(".dcn-nav");
  menuButton?.addEventListener("click", () => { const open = nav?.classList.toggle("is-open"); menuButton.setAttribute("aria-expanded", String(Boolean(open))); });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("is-open"); menuButton?.setAttribute("aria-expanded", "false"); }));

  document.querySelectorAll(".dcn-feedback-video").forEach(video => {
    let playTracked = false;
    video.addEventListener("play", () => {
      if (playTracked) return;
      playTracked = true;
      trackEvent("Play_Feedback_Video", { source_section: "feedback", duration: Math.round(video.duration || 48) });
    });
    video.addEventListener("ended", () => trackEvent("Complete_Feedback_Video", { source_section: "feedback" }));
  });

  document.querySelectorAll(".dcn-question").forEach(question => question.addEventListener("change", event => {
    const input = event.target.closest("input");
    if (!input) return;
    const group = question.dataset.group;
    const firstChoice = !quizState[group];
    quizState[group] = input.value;
    currentRecommendations = [];
    document.getElementById("quiz-results")?.setAttribute("hidden", "");
    setQuizMessage();
    if (group === "altar_type") updateAllowedSizes();
    if (firstChoice) trackEvent("Click_Quiz_Start", { source: group });
    trackEvent(question.dataset.event, { value: input.value });
  }));

  document.addEventListener("click", event => {
    const concernToggle = event.target.closest(".dcn-concern__toggle");
    if (concernToggle) {
      const article = concernToggle.closest("article");
      const willOpen = !article?.classList.contains("is-open");
      article?.classList.toggle("is-open", willOpen);
      concernToggle.setAttribute("aria-expanded", String(willOpen));
      const allCards = [...document.querySelectorAll(".dcn-concerns article")];
      const allOpen = allCards.length > 0 && allCards.every(item => item.classList.contains("is-open"));
      const allButton = document.querySelector(".dcn-concern-all");
      allButton?.setAttribute("aria-expanded", String(allOpen));
      const label = allButton?.querySelector("b");
      if (label) label.textContent = allOpen ? "Thu gọn tất cả" : "Xem tất cả giải pháp";
      return;
    }
    const concernAll = event.target.closest(".dcn-concern-all");
    if (concernAll) {
      const openAll = concernAll.getAttribute("aria-expanded") !== "true";
      document.querySelectorAll(".dcn-concerns article").forEach(article => {
        article.classList.toggle("is-open", openAll);
        article.querySelector(".dcn-concern__toggle")?.setAttribute("aria-expanded", String(openAll));
      });
      concernAll.setAttribute("aria-expanded", String(openAll));
      const label = concernAll.querySelector("b");
      if (label) label.textContent = openAll ? "Thu gọn tất cả" : "Xem tất cả giải pháp";
      return;
    }
    const removeUpload = event.target.closest(".dcn-upload__remove");
    if (removeUpload) {
      const form = removeUpload.closest("form");
      const input = form?.querySelector('[name="altar_image"]');
      if (input) input.value = "";
      if (form) resetUploadPreview(form);
      return;
    }
    const quizResultButton = event.target.closest(".quiz-result-trigger");
    if (quizResultButton) {
      trackEvent("Click_Quiz_Start", { source: "quiz_cta" });
      renderQuizResults();
      return;
    }
    const quizConsultButton = event.target.closest(".quiz-consult-trigger");
    if (quizConsultButton) {
      const names = currentRecommendations.map(item => item.product.name).join("; ");
      const codes = currentRecommendations.map(item => item.product.code).join(", ");
      trackEvent("Click_Consult_Button", { source_section: "quiz_results", product_codes: codes });
      closeQuizResultsModal();
      openModal(null, "Tư vấn các mẫu tranh được gợi ý");
      const form = document.querySelector(".dcn-form--modal");
      if (form) {
        form.elements.product_name.value = names;
        form.elements.product_code.value = codes;
      }
      return;
    }
    const productButton = event.target.closest(".product-trigger");
    if (productButton) {
      const product = products[Number(productButton.dataset.index)];
      trackEvent("View_Product", { product_name: product.name, product_code: product.code });
      if (productButton.closest("#quiz-result-modal")) closeQuizResultsModal();
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
    if (event.target.closest(".track-hotline")) trackEvent("Click_Hotline", { phone: "0328889398" });
    if (event.target.closest("[data-zalo]")) trackEvent("Click_Zalo");
    if (event.target.closest("[data-close-modal]")) closeModal();
    if (event.target.closest("[data-close-quiz-results]")) closeQuizResultsModal();
  });

  document.querySelectorAll("[data-lead-form]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const clicked = event.submitter?.dataset.cta || "submit_form";
    submitLead(form, { source_section: form.dataset.source, clicked_cta: clicked });
  }));
  document.querySelectorAll('[name="altar_image"]').forEach(input => input.addEventListener("change", () => updateUploadPreview(input)));
  document.querySelectorAll(".dcn-upload__drop").forEach(drop => {
    ["dragenter", "dragover"].forEach(type => drop.addEventListener(type, event => { event.preventDefault(); drop.classList.add("is-dragging"); }));
    ["dragleave", "drop"].forEach(type => drop.addEventListener(type, event => { event.preventDefault(); drop.classList.remove("is-dragging"); }));
    drop.addEventListener("drop", event => {
      const input = drop.closest(".dcn-upload")?.querySelector('input[type="file"]');
      const file = event.dataTransfer?.files?.[0];
      if (!input || !file) return;
      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
      updateUploadPreview(input);
    });
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { closeModal(); closeQuizResultsModal(); } });
  window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (!scrollDepthTracked && maxScroll > 0 && window.scrollY / maxScroll >= .5) { scrollDepthTracked = true; trackEvent("ScrollDepth_50"); }
  }, { passive: true });
}

// Nạp các Pixel quảng cáo. Chỉ nạp pixel nào có ID trong CONFIG (bật cờ + có ID).
// Các loader chỉ init, KHÔNG bắn PageView; PageView được bắn 1 lần duy nhất qua
// trackEvent("PageView") bên dưới để tránh đếm trùng (quan trọng với Meta).
function initPixels() {
  // Meta Pixel
  if (CONFIG.META_PIXEL_ENABLED && CONFIG.META_PIXEL_ID) {
    try {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CONFIG.META_PIXEL_ID);
    } catch (e) { console.warn("[Pixel] Meta init lỗi", e); }
  }
  // Google Analytics 4 (gtag). send_page_view:false để trackEvent lo PageView, tránh đếm trùng.
  if (CONFIG.GA4_ENABLED && CONFIG.GA4_ID) {
    try {
      var gs = document.createElement("script");
      gs.async = true;
      gs.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.GA4_ID;
      document.head.appendChild(gs);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", CONFIG.GA4_ID, { send_page_view: false });
    } catch (e) { console.warn("[Pixel] GA4 init lỗi", e); }
  }
  // TikTok Pixel
  if (CONFIG.TIKTOK_PIXEL_ENABLED && CONFIG.TIKTOK_PIXEL_ID) {
    try {
      !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var s=d.createElement("script");s.type="text/javascript",s.async=!0,s.src=r+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(s,a)};ttq.load(CONFIG.TIKTOK_PIXEL_ID)}(window,document,'ttq');
    } catch (e) { console.warn("[Pixel] TikTok init lỗi", e); }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initPixels();
  renderProducts();
  initConcerns();
  initInteractions();
  initCountdown();
  trackEvent("PageView", { ...getUTMParams(), device_type: getDeviceInfo().device_type });
});

// Expose integration helpers for later WordPress/webhook setup.
window.DecorNow = { CONFIG, trackEvent, getUTMParams, getDeviceInfo, collectLeadData, submitLead, initPixels };
