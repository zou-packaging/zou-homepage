import { useEffect, useCallback } from "react";
import { trackZouEvents } from "../utils/analytics";

/**
 * Hook para integrar analytics en componentes React
 * @param {string} componentName - Nombre del componente para tracking
 * @returns {Object} - Funciones de tracking específicas
 */
export const useAnalytics = (componentName = "Unknown") => {
  // Rastrear cuando el componente se monta
  useEffect(() => {
    trackZouEvents.scrollToSection(componentName.toLowerCase());
  }, [componentName]);

  // Funciones de tracking específicas
  const track = useCallback(
    {
      // Tracking de productos
      productInteraction: (action, productName) => {
        switch (action) {
          case "view":
            trackZouEvents.productView(productName);
            break;
          case "select":
            trackZouEvents.productSelect(productName);
            break;
          case "deselect":
            trackZouEvents.productDeselect(productName);
            break;
          default:
            console.warn(`Unknown product action: ${action}`);
        }
      },

      // Tracking de navegación
      navigation: (action, target) => {
        switch (action) {
          case "cta_click":
            trackZouEvents.ctaClick(target, componentName);
            break;
          case "section_scroll":
            trackZouEvents.scrollToSection(target);
            break;
          case "category_filter":
            trackZouEvents.categoryFilter(target);
            break;
          default:
            console.warn(`Unknown navigation action: ${action}`);
        }
      },

      // Tracking de formulario
      form: (action, data = {}) => {
        switch (action) {
          case "start":
            trackZouEvents.formStart();
            break;
          case "submit":
            trackZouEvents.formSubmit(data.productCount || 0);
            break;
          case "error":
            trackZouEvents.formError(data.field || "unknown");
            break;
          default:
            console.warn(`Unknown form action: ${action}`);
        }
      },

      // Tracking de WhatsApp
      whatsapp: (action, data = {}) => {
        switch (action) {
          case "click":
            trackZouEvents.whatsappClick(data.source || componentName);
            break;
          case "message":
            trackZouEvents.whatsappMessage(data.productCount || 0);
            break;
          default:
            console.warn(`Unknown WhatsApp action: ${action}`);
        }
      },

      // Tracking de casos de éxito
      caseStudy: (company) => {
        trackZouEvents.caseStudyView(company);
      },

      // Tracking de descargas
      download: (type) => {
        switch (type) {
          case "catalog":
            trackZouEvents.catalogDownload();
            break;
          default:
            console.warn(`Unknown download type: ${type}`);
        }
      },
    },
    [componentName]
  );

  return {
    track,
    // Acceso directo a eventos comunes
    trackProductView: (productName) =>
      track.productInteraction("view", productName),
    trackProductSelect: (productName) =>
      track.productInteraction("select", productName),
    trackCTA: (ctaName) => track.navigation("cta_click", ctaName),
    trackFormSubmit: (productCount) => track.form("submit", { productCount }),
    trackWhatsApp: (productCount, source) =>
      track.whatsapp("message", { productCount, source }),
  };
};

/**
 * Hook específico para tracking de performance
 * @returns {Object} - Funciones de performance tracking
 */
export const usePerformanceTracking = () => {
  useEffect(() => {
    // Medir performance de la página
    if (typeof window !== "undefined" && window.performance) {
      const measurePerformance = () => {
        const navigation = performance.getEntriesByType("navigation")[0];
        if (navigation) {
          // Rastrear métricas de carga
          trackZouEvents.timeOnPage(Math.round(navigation.loadEventEnd));
        }
      };

      // Medir cuando la página esté completamente cargada
      if (document.readyState === "complete") {
        measurePerformance();
      } else {
        window.addEventListener("load", measurePerformance);
      }
    }
  }, []);

  const trackPageLoad = useCallback((pageName) => {
    if (typeof window !== "undefined" && window.performance) {
      const loadTime = window.performance.now();
      trackZouEvents.timeOnPage(Math.round(loadTime));
    }
  }, []);

  return {
    trackPageLoad,
  };
};

export default useAnalytics;
