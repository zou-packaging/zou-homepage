import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Importar herramientas de debug en desarrollo
if (import.meta.env.DEV) {
  import('./services/apiDebug.js').then((debug) => {
    console.log('🚀 Zou Homepage - Modo desarrollo activado');
    console.log('📡 API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('📱 WhatsApp Number:', import.meta.env.VITE_WHATSAPP_NUMBER);
    console.log('🔧 Para probar la API, usa: window.ZouDebug.testAPI()');
    
    // Verificar configuración automáticamente
    debug.checkEnvironmentConfig();
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
