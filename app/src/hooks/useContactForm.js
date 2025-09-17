import { useState } from 'react';
import { createContactRequest, validateContactForm } from '../services/contactService';

/**
 * Hook personalizado para manejar el formulario de contacto
 * @returns {Object} Estado y funciones del formulario
 */
export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Envía el formulario al backend
   * @param {Object} formData - Datos del formulario
   * @returns {Promise<boolean>} true si fue exitoso, false si hubo error
   */
  const submitForm = async (formData) => {
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Validar datos
      const validation = validateContactForm(formData);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        setLoading(false);
        return false;
      }

      // Enviar al backend
      const result = await createContactRequest(formData);
      
      if (result.success) {
        setSuccessMessage('¡Solicitud enviada exitosamente! Te contactaremos pronto.');
        return true;
      } else {
        setErrors({ general: result.error || 'Error al enviar la solicitud' });
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

  return {
    loading,
    errors,
    successMessage,
    submitForm,
    clearFieldError,
    clearMessages
  };
};
