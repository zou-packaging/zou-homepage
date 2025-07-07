// Validadores para el formulario

/**
 * Valida un email
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida un número de teléfono argentino
 * @param {string} phone
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  // Eliminar espacios y guiones
  const cleanPhone = phone.replace(/[\s-]/g, "");

  // Regex para números argentinos (con o sin código de país)
  // Acepta formatos: +54 9 11 1234 5678, 11 1234-5678, etc.
  const regex = /^(?:\+?54)?(?:9)?(?:11|[2-9]\d{1,3})\d{6,8}$/;

  return regex.test(cleanPhone);
};

/**
 * Valida que un campo no esté vacío
 * @param {string} value
 * @returns {boolean}
 */
export const validateRequired = (value) => {
  return value.trim().length > 0;
};

/**
 * Valida la longitud mínima de un campo
 * @param {string} value
 * @param {number} minLength
 * @returns {boolean}
 */
export const validateMinLength = (value, minLength) => {
  return value.trim().length >= minLength;
};

/**
 * Valida la longitud máxima de un campo
 * @param {string} value
 * @param {number} maxLength
 * @returns {boolean}
 */
export const validateMaxLength = (value, maxLength) => {
  return value.trim().length <= maxLength;
};

/**
 * Mensajes de error predefinidos
 */
export const errorMessages = {
  required: "Este campo es requerido",
  email: "Ingresá un email válido",
  phone: "Ingresá un teléfono válido",
  minLength: (min) => `Mínimo ${min} caracteres`,
  maxLength: (max) => `Máximo ${max} caracteres`,
};

/**
 * Valida todo el formulario
 * @param {Object} values
 * @returns {Object} errors
 */
export const validateForm = (values) => {
  const errors = {};

  // Validar nombre
  if (!validateRequired(values.name)) {
    errors.name = errorMessages.required;
  } else if (!validateMinLength(values.name, 3)) {
    errors.name = errorMessages.minLength(3);
  }

  // Validar email
  if (!validateRequired(values.email)) {
    errors.email = errorMessages.required;
  } else if (!validateEmail(values.email)) {
    errors.email = errorMessages.email;
  }

  // Validar teléfono
  if (!validateRequired(values.phone)) {
    errors.phone = errorMessages.required;
  } else if (!validatePhone(values.phone)) {
    errors.phone = errorMessages.phone;
  }

  // Validar mensaje (opcional pero con longitud mínima si se completa)
  if (values.message && !validateMinLength(values.message, 10)) {
    errors.message = errorMessages.minLength(10);
  }

  return errors;
};

/**
 * Formatea un número de teléfono para mostrar
 * @param {string} phone
 * @returns {string}
 */
export const formatPhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, "");

  if (cleanPhone.length <= 10) {
    // Formato: 11 1234-5678
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2-$3");
  }

  // Formato con código de país: +54 9 11 1234-5678
  return cleanPhone.replace(
    /(\d{2})(\d{1})(\d{2})(\d{4})(\d{4})/,
    "+$1 $2 $3 $4-$5"
  );
};
