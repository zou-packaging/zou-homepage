// Google Analytics y tracking utilities

// Configuración
const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Reemplazar con tu ID real
const FACEBOOK_PIXEL_ID = "XXXXXXXXXX"; // Reemplazar con tu Pixel ID

/**
 * Inicializa Google Analytics
 */
export const initGA = () => {
  // Verificar si ya está inicializado
  if (typeof window !== "undefined" && !window.gtag) {
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
  }
};

/**
 * Envía un evento a Google Analytics
 * @param {string} action - Acción del evento
 * @param {string} category - Categoría del evento
 * @param {string} label - Etiqueta del evento
 * @param {number} value - Valor numérico (opcional)
 */
export const trackEvent = (
  action,
  category = "General",
  label = "",
  value = null
) => {
  if (typeof window !== "undefined" && window.gtag) {
    const eventParams = {
      event_category: category,
      event_label: label,
    };

    if (value !== null) {
      eventParams.value = value;
    }

    window.gtag("event", action, eventParams);
  }
};

/**
 * Rastrea vista de página
 * @param {string} page_title - Título de la página
 * @param {string} page_location - URL de la página
 */
export const trackPageView = (page_title, page_location) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title,
      page_location,
    });
  }
};

/**
 * Eventos predefinidos para ZOU
 */
export const trackZouEvents = {
  // Interacciones con productos
  productView: (productName) =>
    trackEvent("product_view", "Products", productName),
  productSelect: (productName) =>
    trackEvent("product_select", "Products", productName),
  productDeselect: (productName) =>
    trackEvent("product_deselect", "Products", productName),

  // Filtros de categoría
  categoryFilter: (category) =>
    trackEvent("category_filter", "Navigation", category),

  // Formulario de contacto
  formStart: () => trackEvent("form_start", "Contact", "quote_form"),
  formSubmit: (productCount) =>
    trackEvent("form_submit", "Contact", "quote_form", productCount),
  formError: (field) => trackEvent("form_error", "Contact", field),

  // WhatsApp
  whatsappClick: (source) => trackEvent("whatsapp_click", "Contact", source),
  whatsappMessage: (productCount) =>
    trackEvent("whatsapp_message", "Contact", "quote_request", productCount),

  // Navegación
  scrollToSection: (section) =>
    trackEvent("scroll_to_section", "Navigation", section),
  ctaClick: (cta_name, location) =>
    trackEvent("cta_click", "Engagement", `${cta_name}_${location}`),

  // Casos de éxito
  caseStudyView: (company) => trackEvent("case_study_view", "Clients", company),

  // Descargas y recursos
  catalogDownload: () =>
    trackEvent("catalog_download", "Resources", "product_catalog"),

  // Tiempo en página (enviar cada 30 segundos)
  timeOnPage: (seconds) =>
    trackEvent("time_on_page", "Engagement", "session_duration", seconds),
};

/**
 * Inicializa Facebook Pixel (opcional)
 */
export const initFacebookPixel = () => {
  if (typeof window !== "undefined" && !window.fbq) {
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${FACEBOOK_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Pixel de seguimiento en noscript
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);
  }
};

/**
 * Rastrea conversiones de Facebook
 */
export const trackFacebookEvent = (eventName, data = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, data);
  }
};

/**
 * Auto-inicialización cuando se importa el módulo
 */
if (typeof window !== "undefined") {
  // Inicializar después de que la página esté cargada
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initGA();
      // initFacebookPixel(); // Descomentar si usas Facebook Pixel
    });
  } else {
    initGA();
    // initFacebookPixel(); // Descomentar si usas Facebook Pixel
  }

  // Rastrear tiempo en página cada 30 segundos
  let timeOnPage = 0;
  setInterval(() => {
    timeOnPage += 30;
    trackZouEvents.timeOnPage(timeOnPage);
  }, 30000);
}
