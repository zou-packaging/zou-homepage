// Tracking de conversiones para Google Ads y Analytics

// Configuración - ACTUALIZAR CON TUS IDs REALES
const GOOGLE_ADS_CONFIG = {
  conversionId: "AW-XXXXXXXXXX", // Reemplazar con tu ID de conversión
  conversionLabel: "XXXXXXXXXXXX", // Reemplazar con tu etiqueta de conversión
  enabled: false, // Cambiar a true cuando tengas los IDs reales
};

const GA_CONFIG = {
  trackingId: "G-XXXXXXXXXX", // Reemplazar con tu ID de GA4
  enabled: false, // Cambiar a true cuando tengas el ID real
};

/**
 * Inicializa Google Ads Conversion Tracking
 */
export const initGoogleAdsTracking = () => {
  if (!GOOGLE_ADS_CONFIG.enabled || typeof window === "undefined") return;

  // Cargar script de Google Ads
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONFIG.conversionId}`;
  document.head.appendChild(script);

  // Configurar gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GOOGLE_ADS_CONFIG.conversionId);

  console.log("🎯 Google Ads Tracking inicializado");
};

/**
 * Trackea la conversión principal (envío de formulario por WhatsApp)
 */
export const trackWhatsAppConversion = (data = {}) => {
  const conversionData = {
    send_to: `${GOOGLE_ADS_CONFIG.conversionId}/${GOOGLE_ADS_CONFIG.conversionLabel}`,
    value: data.estimatedValue || 1.0, // Valor estimado de la conversión
    currency: "ARS",
    transaction_id: `zou_${Date.now()}`, // ID único de transacción
    custom_parameters: {
      products_count: data.productsCount || 0,
      user_type: data.userType || "new_visitor",
      source: data.source || "website",
    },
  };

  if (GOOGLE_ADS_CONFIG.enabled && window.gtag) {
    // Enviar conversión a Google Ads
    window.gtag("event", "conversion", conversionData);

    // También enviar como evento personalizado para GA4
    window.gtag("event", "lead_form_submit", {
      event_category: "conversion",
      event_label: "whatsapp_form",
      value: conversionData.value,
      currency: "ARS",
      products_count: data.productsCount || 0,
    });

    console.log("🎯 Conversión trackeada:", conversionData);
  } else {
    // En desarrollo, solo loggear
    console.log("🎯 [DEV] Conversión trackeada:", conversionData);
  }

  // Trackear en Facebook Pixel si está disponible
  if (window.fbq) {
    window.fbq("track", "Lead", {
      content_name: "Solicitud de Presupuesto",
      value: conversionData.value,
      currency: "ARS",
    });
  }
};

/**
 * Trackea micro-conversiones (acciones que indican interés)
 */
export const trackMicroConversion = (action, data = {}) => {
  const microConversions = {
    product_selection: {
      event_name: "select_content",
      event_category: "engagement",
      event_label: "product_selected",
    },
    catalog_view: {
      event_name: "view_item_list",
      event_category: "engagement",
      event_label: "catalog_viewed",
    },
    phone_click: {
      event_name: "generate_lead",
      event_category: "engagement",
      event_label: "phone_clicked",
    },
    whatsapp_button_click: {
      event_name: "generate_lead",
      event_category: "engagement",
      event_label: "whatsapp_clicked",
    },
    form_start: {
      event_name: "begin_checkout",
      event_category: "engagement",
      event_label: "form_started",
    },
    scroll_to_products: {
      event_name: "view_item_list",
      event_category: "engagement",
      event_label: "products_section_viewed",
    },
  };

  const conversionConfig = microConversions[action];
  if (!conversionConfig) return;

  if (GA_CONFIG.enabled && window.gtag) {
    window.gtag("event", conversionConfig.event_name, {
      event_category: conversionConfig.event_category,
      event_label: conversionConfig.event_label,
      ...data,
    });
  }

  console.log("🎯 Micro-conversión trackeada:", action, data);
};

/**
 * Trackea el tiempo en página (importante para calidad de tráfico)
 */
export const trackTimeOnPage = () => {
  let startTime = Date.now();
  let tracked30s = false;
  let tracked60s = false;

  const checkTime = () => {
    const timeSpent = Date.now() - startTime;

    if (!tracked30s && timeSpent > 30000) {
      tracked30s = true;
      trackMicroConversion("time_on_page", {
        duration: "30_seconds",
        engagement_level: "medium",
      });
    }

    if (!tracked60s && timeSpent > 60000) {
      tracked60s = true;
      trackMicroConversion("time_on_page", {
        duration: "60_seconds",
        engagement_level: "high",
      });
    }
  };

  // Revisar cada 10 segundos
  const interval = setInterval(checkTime, 10000);

  // Limpiar al salir de la página
  window.addEventListener("beforeunload", () => {
    clearInterval(interval);
    const finalTime = Math.round((Date.now() - startTime) / 1000);
    trackMicroConversion("page_exit", {
      time_spent: finalTime,
      engagement_level:
        finalTime > 60 ? "high" : finalTime > 30 ? "medium" : "low",
    });
  });
};

/**
 * Inicialización automática
 */
export const initConversionTracking = () => {
  if (typeof window === "undefined") return;

  // Inicializar Google Ads
  initGoogleAdsTracking();

  // Inicializar tracking de tiempo
  trackTimeOnPage();

  // Trackear carga de página
  trackMicroConversion("page_load", {
    page_title: document.title,
    user_agent: navigator.userAgent.includes("Mobile") ? "mobile" : "desktop",
  });

  console.log("🎯 Sistema de conversiones inicializado");
};

// Auto-inicializar si estamos en el browser
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initConversionTracking);
  } else {
    initConversionTracking();
  }
}
