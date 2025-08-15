import React, { useState } from 'react';
import { createContactRequest } from '../../services/contactService';

/**
 * Componente para probar la API de contacto
 * Solo para desarrollo - remover en producción
 */
const ContactTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setTestResult('Enviando solicitud de prueba...');

    const testData = {
      name: 'Juan Pérez',
      enterprise_name: 'Empresa Test S.A.',
      email: 'test@email.com',
      phone: '1123456789',
      subject: 'Prueba de API',
      content: 'Este es un mensaje de prueba para verificar la conexión con la API de ZOU.'
    };

    try {
      const result = await createContactRequest(testData);
      
      if (result.success) {
        setTestResult(`✅ API funcionando correctamente!\nRespuesta: ${JSON.stringify(result.data, null, 2)}`);
      } else {
        setTestResult(`❌ Error en la API:\n${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error de conexión:\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px dashed #007bff', 
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3>🧪 Test de API de Contacto</h3>
      <p>Este componente es solo para desarrollo</p>
      
      <button 
        onClick={testAPI} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Probando...' : 'Probar API'}
      </button>
      
      {testResult && (
        <pre style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: 'white', 
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          {testResult}
        </pre>
      )}
    </div>
  );
};

export default ContactTest;
