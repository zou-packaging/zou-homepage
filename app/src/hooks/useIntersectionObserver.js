import { useEffect, useRef, useState } from "react";

/**
 * Hook personalizado para detectar cuando un elemento entra en el viewport
 * @param {Object} options - Opciones para el IntersectionObserver
 * @param {number} options.threshold - Porcentaje del elemento visible para activar (0-1)
 * @param {string} options.rootMargin - Margen alrededor del root
 * @param {boolean} options.triggerOnce - Si debe activarse solo una vez
 * @returns {[React.RefObject, boolean]} - Ref para el elemento y estado de visibilidad
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
} = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Si ya ha sido visible y triggerOnce está activo, no observar más
    if (hasBeenVisible && triggerOnce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);

        if (isIntersecting) {
          setHasBeenVisible(true);

          // Si triggerOnce está activo, dejar de observar
          if (triggerOnce) {
            observer.unobserve(element);
          }
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
  }, [threshold, rootMargin, triggerOnce, hasBeenVisible]);

  return [ref, isVisible || (triggerOnce && hasBeenVisible)];
};

export default useIntersectionObserver;
