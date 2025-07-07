/**
 * Genera el enlace de WhatsApp con el mensaje formateado
 * @param {Object} formData - Datos del formulario
 * @param {Array} selectedProducts - Productos seleccionados
 * @param {string} phoneNumber - Número de WhatsApp de la empresa
 * @returns {string} URL de WhatsApp
 */
export const generateWhatsAppLink = (
  formData,
  selectedProducts = [],
  phoneNumber
) => {
  // Limpiar el número de teléfono (quitar espacios, guiones, etc.)
  const cleanPhone = phoneNumber.replace(/\D/g, "");

  // Construir el mensaje
  let message = `¡Hola! Me gustaría solicitar un presupuesto.\n\n`;
  message += `*Mis datos:*\n`;
  message += `• Nombre: ${formData.name}\n`;
  message += `• Email: ${formData.email}\n`;
  message += `• Teléfono: ${formData.phone}\n\n`;

  // Agregar productos seleccionados si hay
  if (selectedProducts.length > 0) {
    message += `*Productos de interés:*\n`;
    selectedProducts.forEach((product) => {
      message += `• ${product.name}`;
      if (product.customizable) {
        message += ` (Personalizable)`;
      }
      message += `\n`;
    });
    message += `\n`;
  }

  // Agregar mensaje adicional si existe
  if (formData.message && formData.message.trim()) {
    message += `*Mensaje adicional:*\n`;
    message += `${formData.message}\n\n`;
  }

  message += `Espero su respuesta. ¡Gracias!`;

  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);

  // Construir la URL de WhatsApp
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

/**
 * Genera un mensaje de preview para mostrar al usuario
 * @param {Object} formData - Datos del formulario
 * @param {Array} selectedProducts - Productos seleccionados
 * @returns {string} Mensaje formateado
 */
export const generatePreviewMessage = (formData, selectedProducts = []) => {
  let preview = `¡Hola! Me gustaría solicitar un presupuesto.\n\n`;
  preview += `Mis datos:\n`;
  preview += `• Nombre: ${formData.name || "(sin completar)"}\n`;
  preview += `• Email: ${formData.email || "(sin completar)"}\n`;
  preview += `• Teléfono: ${formData.phone || "(sin completar)"}\n\n`;

  if (selectedProducts.length > 0) {
    preview += `Productos de interés:\n`;
    selectedProducts.forEach((product) => {
      preview += `• ${product.name}`;
      if (product.customizable) {
        preview += ` (Personalizable)`;
      }
      preview += `\n`;
    });
    preview += `\n`;
  } else {
    preview += `Productos de interés: (ninguno seleccionado)\n\n`;
  }

  if (formData.message && formData.message.trim()) {
    preview += `Mensaje adicional:\n`;
    preview += `${formData.message}\n\n`;
  }

  preview += `Espero su respuesta. ¡Gracias!`;

  return preview;
};

/**
 * Abre WhatsApp con el mensaje generado
 * @param {Object} formData - Datos del formulario
 * @param {Array} selectedProducts - Productos seleccionados
 * @param {string} phoneNumber - Número de WhatsApp de la empresa
 */
export const openWhatsApp = (formData, selectedProducts, phoneNumber) => {
  const url = generateWhatsAppLink(formData, selectedProducts, phoneNumber);
  window.open(url, "_blank", "noopener,noreferrer");
};

/**
 * Número de WhatsApp de la empresa (configuración)
 */
export const COMPANY_WHATSAPP = "5493517892876"; // Cambiar por el número real
