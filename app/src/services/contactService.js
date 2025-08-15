/**
 * Servicio para manejar las solicitudes de contacto a la API de ZOU
 */

// Usar variable de entorno o fallback al URL directo
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend-asuser-production.up.railway.app/v1';

/**
 * Envía una solicitud de contacto al backend
 * @param {Object} contactData - Datos del formulario de contacto
 * @param {string} contactData.name - Nombre del cliente
 * @param {string} contactData.enterprise_name - Nombre de la empresa (opcional)
 * @param {string} contactData.email - Email del cliente
 * @param {string} contactData.phone - Teléfono del cliente
 * @param {string} contactData.subject - Asunto del mensaje
 * @param {string} contactData.content - Contenido del mensaje
 * @returns {Promise<Object>} Respuesta de la API
 */
export const createContactRequest = async (contactData) => {
  try {
    console.log('Enviando solicitud a:', `${API_BASE_URL}/contact/createZouContactRequest`);
    console.log('Datos a enviar:', contactData);

    const response = await fetch(`${API_BASE_URL}/contact/createZouContactRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    console.log('Status de respuesta:', response.status);
    console.log('Headers de respuesta:', Object.fromEntries(response.headers.entries()));

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // Si no se puede parsear como JSON, usar el texto de la respuesta
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      console.error('Error data:', errorData);
      throw new Error(
        errorData?.message || 
        errorData?.error ||
        `Error ${response.status}: ${response.statusText}`
      );
    }

    // Intentar parsear la respuesta como JSON
    const result = await response.json();
    console.log('Respuesta exitosa:', result);
    
    return {
      success: true,
      data: result
    };

  } catch (error) {
    console.error('Error al enviar solicitud de contacto:', error);
    
    // Proporcionar mensajes de error más específicos
    let errorMessage = 'Error de conexión';
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    } else if (error.message.includes('404')) {
      errorMessage = 'El servicio no está disponible en este momento.';
    } else if (error.message.includes('500')) {
      errorMessage = 'Error interno del servidor. Intenta nuevamente más tarde.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Valida los datos del formulario antes de enviar
 * @param {Object} formData - Datos del formulario
 * @returns {Object} Objeto con validación y errores si los hay
 */
export const validateContactForm = (formData) => {
  const errors = {};

  // Validaciones requeridas
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Por favor ingresa un email válido';
  }

  if (!formData.phone || formData.phone.trim().length < 8) {
    errors.phone = 'El teléfono debe tener al menos 8 dígitos';
  }

  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = 'El asunto debe tener al menos 3 caracteres';
  }

  if (!formData.content || formData.content.trim().length < 10) {
    errors.content = 'El mensaje debe tener al menos 10 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Función de utilidad para limpiar y formatear los datos del formulario
 * @param {Object} rawFormData - Datos en bruto del formulario
 * @returns {Object} Datos formateados y limpios
 */
export const formatFormData = (rawFormData) => {
  return {
    name: rawFormData.name?.trim() || '',
    enterprise_name: rawFormData.enterprise_name?.trim() || '',
    email: rawFormData.email?.trim().toLowerCase() || '',
    phone: rawFormData.phone?.trim() || '',
    subject: rawFormData.subject?.trim() || '',
    content: rawFormData.content?.trim() || ''
  };
};
