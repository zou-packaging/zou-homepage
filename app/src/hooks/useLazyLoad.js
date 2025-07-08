import { useEffect, useRef, useState } from "react";

/**
 * Hook para lazy loading optimizado con Intersection Observer
 * @param {Object} options - Opciones de configuración
 * @returns {[React.RefObject, boolean]} - Ref del elemento y estado de carga
 */
export const useLazyLoad = (options = {}) => {
  const { threshold = 0.1, rootMargin = "50px", triggerOnce = true } = options;

  const ref = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || (isLoaded && triggerOnce)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setIsLoaded(true);

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, isLoaded]);

  return [ref, isLoaded, isInView];
};

/**
 * Hook para precargar imágenes
 * @param {string} src - URL de la imagen
 * @returns {[boolean, boolean]} - [isLoaded, hasError]
 */
export const useImagePreload = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    img.onerror = () => {
      setIsLoaded(false);
      setHasError(true);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return [isLoaded, hasError];
};

export default useLazyLoad;
