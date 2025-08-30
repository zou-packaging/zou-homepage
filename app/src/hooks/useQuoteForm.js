import { useState } from 'react';
import { createQuoteRequest, validateQuoteForm } from '../services/contactService';

/**
 * Hook personalizado para manejar el formulario de presupuesto de productos
 * @returns {Object} Estado y funciones del formulario de presupuesto
 */
export const useQuoteForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Envía el formulario de presupuesto al backend
   * @param {Object} quoteData - Datos del formulario de presupuesto
   * @returns {Promise<boolean>} true si fue exitoso, false si hubo error
   */
  const submitQuote = async (quoteData) => {
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Validar datos
      const validation = validateQuoteForm(quoteData);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        setLoading(false);
        return false;
      }

      // Enviar al backend
      const result = await createQuoteRequest(quoteData);
      
      if (result.success) {
        setSuccessMessage('¡Solicitud de presupuesto enviada exitosamente! Te contactaremos pronto.');
        return true;
      } else {
        setErrors({ general: result.error || 'Error al enviar la solicitud de presupuesto' });
        return false;
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión. Por favor intenta nuevamente.' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Envía solo por WhatsApp sin guardar en backend
   * @param {Object} quoteData - Datos del formulario
   * @returns {string} URL de WhatsApp
   */
  const sendToWhatsApp = (quoteData) => {
    const { name, phone, message, selectedProducts } = quoteData;
    
    // Crear mensaje para WhatsApp
    let whatsappMessage = `¡Hola! Me interesa solicitar un presupuesto.\n\n`;
    whatsappMessage += `*Datos del cliente:*\n`;
    whatsappMessage += `Nombre: ${name}\n`;
    whatsappMessage += `Teléfono: ${phone}\n\n`;
    
    if (selectedProducts && selectedProducts.length > 0) {
      whatsappMessage += `*Productos seleccionados (${selectedProducts.length}):*\n`;
      selectedProducts.forEach((product, index) => {
        whatsappMessage += `${index + 1}. ${product.name} - ${product.category}\n`;
      });
      whatsappMessage += `\n`;
    }
    
    if (message) {
      whatsappMessage += `*Mensaje adicional:*\n${message}\n\n`;
    }
    
    whatsappMessage += `¡Gracias por contactarnos!`;

    // Número de WhatsApp desde variables de entorno o fallback
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5493512341463';
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    return whatsappURL;
  };

  /**
   * Envía por WhatsApp y también guarda en backend
   * @param {Object} quoteData - Datos del formulario
   * @returns {Promise<{whatsappUrl: string, backendSuccess: boolean}>}
   */
  const submitQuoteAndWhatsApp = async (quoteData) => {
    // Validar primero
    const validation = validateQuoteForm(quoteData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return { whatsappUrl: null, backendSuccess: false };
    }

    // Enviar por WhatsApp (siempre funciona)
    const whatsappUrl = sendToWhatsApp(quoteData);

    // Intentar enviar al backend (opcional)
    const backendResult = await submitQuote(quoteData);

    return { 
      whatsappUrl, 
      backendSuccess: backendResult 
    };
  };

  /**
   * Limpia un error específico del campo
   * @param {string} fieldName - Nombre del campo
   */
  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  /**
   * Limpia todos los mensajes
   */
  const clearMessages = () => {
    setErrors({});
    setSuccessMessage('');
  };

  /**
   * Resetea el formulario completo
   */
  const resetForm = () => {
    setLoading(false);
    setErrors({});
    setSuccessMessage('');
  };

  return {
    loading,
    errors,
    successMessage,
    submitQuote,
    sendToWhatsApp,
    submitQuoteAndWhatsApp,
    clearFieldError,
    clearMessages,
    resetForm
  };
};
