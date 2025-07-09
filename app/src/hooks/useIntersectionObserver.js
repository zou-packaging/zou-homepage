import { useEffect, useRef, useState } from "react";
import { trackZouEvents } from "../utils/analytics";

/**
 * Hook para detectar cuando un elemento entra en viewport
 * Incluye tracking automático para analytics
 */
export const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    trackSection = null, // Nombre de la sección para analytics
    trackDelay = 2000, // Delay para considerar que el usuario "vio" la sección
  } = options;

  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const trackingTimer = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);

        if (isVisible && !hasBeenSeen) {
          setHasBeenSeen(true);

          // Tracking de analytics con delay
          if (trackSection) {
            trackingTimer.current = setTimeout(() => {
              trackZouEvents.sectionView(trackSection);
            }, trackDelay);
          }

          // Si triggerOnce, dejar de observar
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!isVisible && trackingTimer.current) {
          // Si sale de vista antes del delay, cancelar tracking
          clearTimeout(trackingTimer.current);
          trackingTimer.current = null;
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (trackingTimer.current) {
        clearTimeout(trackingTimer.current);
      }
    };
  }, [
    threshold,
    rootMargin,
    triggerOnce,
    trackSection,
    trackDelay,
    hasBeenSeen,
  ]);

  return [ref, isIntersecting, hasBeenSeen];
};

/**
 * Hook para lazy loading de imágenes con placeholder
 */
export const useLazyImage = (src, placeholder = null) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  useEffect(() => {
    if (!isIntersecting || !src) return;

    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      setHasError(false);
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isIntersecting, src]);

  return { ref, imageSrc, isLoaded, hasError };
};

/**
 * Hook para animar elementos cuando entran en vista
 */
export const useAnimateOnView = (
  animationClass = "animate-in",
  options = {}
) => {
  const [ref, isIntersecting, hasBeenSeen] = useIntersectionObserver(options);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (hasBeenSeen && !shouldAnimate) {
      // Pequeño delay para efectos más suaves
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [hasBeenSeen, shouldAnimate]);

  return {
    ref,
    isIntersecting,
    hasBeenSeen,
    shouldAnimate,
    className: shouldAnimate ? animationClass : "",
  };
};

/**
 * Hook para medir performance de componentes
 */
export const usePerformanceTracking = (componentName) => {
  const mountTime = useRef(Date.now());
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  });

  useEffect(() => {
    // Track mount time
    const loadTime = Date.now() - mountTime.current;
    console.log(`🚀 ${componentName} cargó en ${loadTime}ms`);

    return () => {
      // Track unmount
      const totalTime = Date.now() - mountTime.current;
      console.log(
        `📊 ${componentName} estuvo activo ${totalTime}ms con ${renderCount} renders`
      );
    };
  }, [componentName, renderCount]);

  return { renderCount };
};

export default useIntersectionObserver;
