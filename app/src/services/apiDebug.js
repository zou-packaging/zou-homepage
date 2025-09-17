/**
 * Utilidades para testing y debugging de la API
 */

import { createContactRequest, createQuoteRequest } from './contactService';

/**
 * Test básico para verificar la conectividad con la API
 */
export const testAPIConnection = async () => {
  console.log('🔧 Iniciando test de conectividad API...');
  
  const testData = {
    name: 'Test Usuario',
    enterprise_name: 'Test Company',
    email: 'test@example.com',
    phone: '1234567890',
    subject: 'Test de conectividad API',
    content: 'Este es un mensaje de prueba para verificar la conectividad con la API.'
  };

  try {
    const result = await createContactRequest(testData);
    console.log('✅ Test de API exitoso:', result);
    return result;
  } catch (error) {
    console.error('❌ Error en test de API:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Test para el formulario de presupuestos
 */
export const testQuoteAPI = async () => {
  console.log('🔧 Iniciando test de API de presupuestos...');
  
  const testQuoteData = {
    name: 'Cliente Test',
    phone: '1234567890',
    message: 'Mensaje de prueba',
    selectedProducts: [
      {
        id: 1,
        name: 'Vaso Test',
        category: 'Vasos'
      },
      {
        id: 2,
        name: 'Plato Test',
        category: 'Platos'
      }
    ]
  };

  try {
    const result = await createQuoteRequest(testQuoteData);
    console.log('✅ Test de presupuesto exitoso:', result);
    return result;
  } catch (error) {
    console.error('❌ Error en test de presupuesto:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Función para debuggear requests
 */
export const debugAPICall = async (endpoint, data) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend-asuser-production.up.railway.app/v1';
  
  console.group('🔍 Debug API Call');
  console.log('Endpoint:', `${API_BASE_URL}${endpoint}`);
  console.log('Method: POST');
  console.log('Headers:', {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });
  console.log('Body:', JSON.stringify(data, null, 2));
  console.groupEnd();
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    console.group('📥 API Response');
    console.log('Status:', response.status, response.statusText);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Raw Response:', responseText);
    
    try {
      const jsonResponse = JSON.parse(responseText);
      console.log('Parsed JSON:', jsonResponse);
    } catch (e) {
      console.log('Response no es JSON válido');
    }
    
    console.groupEnd();
    
    return response;
  } catch (error) {
    console.error('❌ Error en debug API call:', error);
    throw error;
  }
};

/**
 * Verificar configuración de variables de entorno
 */
export const checkEnvironmentConfig = () => {
  console.group('🌍 Configuración de Entorno');
  
  const config = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    WHATSAPP_NUMBER: import.meta.env.VITE_WHATSAPP_NUMBER,
    DEV_MODE: import.meta.env.VITE_DEV_MODE,
    NODE_ENV: import.meta.env.MODE
  };
  
  console.log('Variables de entorno:', config);
  
  // Verificar que las variables críticas estén configuradas
  const missingVars = [];
  if (!config.API_BASE_URL) missingVars.push('VITE_API_BASE_URL');
  if (!config.WHATSAPP_NUMBER) missingVars.push('VITE_WHATSAPP_NUMBER');
  
  if (missingVars.length > 0) {
    console.warn('⚠️ Variables de entorno faltantes:', missingVars);
  } else {
    console.log('✅ Todas las variables de entorno están configuradas');
  }
  
  console.groupEnd();
  
  return { config, missingVars };
};

// Exportar función para usar en consola del navegador
if (typeof window !== 'undefined') {
  window.ZouDebug = {
    testAPI: testAPIConnection,
    testQuote: testQuoteAPI,
    debugCall: debugAPICall,
    checkEnv: checkEnvironmentConfig
  };
  
  console.log('🔧 ZouDebug tools disponibles en window.ZouDebug');
  console.log('Uso: window.ZouDebug.testAPI() para probar la conexión');
}
