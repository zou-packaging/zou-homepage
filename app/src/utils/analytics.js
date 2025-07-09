// Google Analytics y tracking utilities - Versión simplificada

// Configuración - REEMPLAZAR CON TU ID REAL
const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Cambiar por tu ID de Google Analytics
const ENABLE_ANALYTICS = false; // Cambiar a true cuando tengas el ID real

/**
 * Inicializa Google Analytics
 */
export const initGA = () => {
  if (!ENABLE_ANALYTICS || typeof window === "undefined") return;

  // Cargar script de Google Analytics
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Configurar gtag
  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_title: document.title,
      page_location: window.location.href
    });
  `;
  document.head.appendChild(script2);

  console.log("Google Analytics inicializado");
};

/**
 * Envía un evento a Google Analytics
 */
export const trackEvent = (
  action,
  category = "General",
  label = "",
  value = null
) => {
  if (!ENABLE_ANALYTICS || typeof window === "undefined" || !window.gtag) {
    // En desarrollo, solo loggeamos
    console.log("📊 Analytics Event:", { action, category, label, value });
    return;
  }

  const eventParams = {
    event_category: category,
    event_label: label,
  };

  if (value !== null) {
    eventParams.value = value;
  }

  window.gtag("event", action, eventParams);
};

/**
 * Eventos específicos para ZOU
 */
export const trackZouEvents = {
  // Productos
  productView: (productName) =>
    trackEvent("product_view", "Products", productName),
  productSelect: (productName) =>
    trackEvent("product_select", "Products", productName),

  // Navegación
  sectionView: (section) => trackEvent("section_view", "Navigation", section),
  ctaClick: (ctaName, location) =>
    trackEvent("cta_click", "Engagement", `${ctaName}_${location}`),

  // Formularios
  formStart: () => trackEvent("form_start", "Contact", "quote_form"),
  formSubmit: (productCount) =>
    trackEvent("form_submit", "Contact", "quote_form", productCount),

  // WhatsApp
  whatsappClick: (source) => trackEvent("whatsapp_click", "Contact", source),

  // FAQ
  faqOpen: (question) => trackEvent("faq_open", "FAQ", question),
  faqCategoryView: (category) =>
    trackEvent("faq_category_view", "FAQ", category),

  // Casos de éxito
  caseStudyView: (company) => trackEvent("case_study_view", "Clients", company),

  // Proceso
  processStepView: (step) => trackEvent("process_step_view", "Process", step),
};

/**
 * Hook simple para tracking en componentes
 */
export const useSimpleTracking = (componentName) => {
  const track = {
    view: () => trackZouEvents.sectionView(componentName),
    cta: (ctaName) => trackZouEvents.ctaClick(ctaName, componentName),
    product: (action, productName) => {
      if (action === "view") trackZouEvents.productView(productName);
      if (action === "select") trackZouEvents.productSelect(productName);
    },
  };

  return track;
};

/**
 * Inicialización automática
 */
if (typeof window !== "undefined") {
  // Solo inicializar si está habilitado
  if (ENABLE_ANALYTICS) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initGA);
    } else {
      initGA();
    }
  } else {
    console.log("📊 Analytics en modo desarrollo - eventos solo se loggean");
  }
}
