# Formulario de Productos - Zou Homepage

## 📋 Descripción

El formulario de productos permite a los usuarios solicitar presupuestos de manera interactiva, seleccionando productos específicos y enviando sus datos tanto por WhatsApp como al backend de la empresa.

## 🚀 Funcionalidades

### ✅ Funcionalidades Implementadas

- **Formulario Interactivo**: Campos para nombre, teléfono y mensaje opcional
- **Selección de Productos**: Los usuarios pueden agregar/quitar productos de su solicitud
- **Validación en Tiempo Real**: Errores se muestran instantáneamente
- **Doble Envío**: 
  - Envío inmediato por WhatsApp
  - Almacenamiento en backend para seguimiento
- **Estados de Loading**: Indicadores visuales durante el envío
- **Responsive Design**: Funciona en móvil, tablet y desktop

### 📱 Integración WhatsApp

```javascript
// Formato del mensaje automático
¡Hola! Me interesa solicitar un presupuesto.

*Datos del cliente:*
Nombre: Juan Pérez
Teléfono: 11 1234-5678

*Productos seleccionados (3):*
1. Vaso Térmico 440cc - Vasos
2. Servilletas Personalizadas - Servilletas
3. Bolsas Ecológicas - Bolsas

*Mensaje adicional:*
Necesito para evento corporativo

¡Gracias por contactarnos!
```

### 🔌 Integración API Backend

**Endpoint**: `POST /v1/contact/createZouContactRequest`

**Estructura de datos enviados**:
```json
{
  "name": "Juan Pérez",
  "enterprise_name": "",
  "email": "",
  "phone": "11 1234-5678", 
  "subject": "Solicitud de Presupuesto - Productos Zou",
  "content": "SOLICITUD DE PRESUPUESTO\n\nCliente: Juan Pérez\nTeléfono: 11 1234-5678\n\nPRODUCTOS SELECCIONADOS (3):\n========================================\n1. Vaso Térmico 440cc\n   Categoría: Vasos\n\n2. Servilletas Personalizadas\n   Categoría: Servilletas\n\n3. Bolsas Ecológicas\n   Categoría: Bolsas\n\nMENSAJE ADICIONAL:\n--------------------\nNecesito para evento corporativo\n\nSolicitud enviada desde: zou-homepage\nFecha: 29/8/2025, 14:30:15"
}
```

## 🛠️ Arquitectura Técnica

### Componentes Principales

```
Form.jsx (src/sections/form/)
├── useQuoteForm() - Hook personalizado para lógica del formulario
├── contactService.js - Servicios API
├── form.css - Estilos específicos
└── apiDebug.js - Herramientas de debugging
```

### Hooks Utilizados

**useQuoteForm()** - Hook personalizado que maneja:
- Estados de loading, errors, success
- Validación de formularios
- Envío a API y WhatsApp
- Manejo de errores

### Servicios API

**contactService.js** incluye:
- `createQuoteRequest()` - Envía presupuesto al backend
- `validateQuoteForm()` - Valida datos del formulario
- `formatQuoteContent()` - Formatea contenido para el backend

## 🔧 Configuración

### Variables de Entorno

Archivo `.env`:
```bash
# API Backend
VITE_API_BASE_URL=https://backend-asuser-production.up.railway.app/v1

# WhatsApp 
VITE_WHATSAPP_NUMBER=5493512341463

# Desarrollo
VITE_DEV_MODE=true
```

### Productos Predefinidos

Los productos están hardcodeados en el componente. Para modificarlos, editar:

```javascript
// En form.jsx - línea ~25
const availableProducts = [
  {
    id: 6,
    name: 'Vaso Cartón 8oz',
    category: 'Vasos',
    image: '/api/placeholder/80/80'
  },
  // Agregar más productos aquí...
];
```

## 🧪 Testing y Debug

### Herramientas de Debug Disponibles

En modo desarrollo, usa la consola del navegador:

```javascript
// Probar conectividad API
window.ZouDebug.testAPI()

// Probar envío de presupuesto
window.ZouDebug.testQuote()

// Verificar configuración
window.ZouDebug.checkEnv()

// Debug manual de llamada API
window.ZouDebug.debugCall('/contact/createZouContactRequest', data)
```

### Casos de Prueba

1. **Envío exitoso**: Completar formulario con datos válidos
2. **Validación**: Dejar campos vacíos y verificar errores
3. **WhatsApp**: Verificar que se abre WhatsApp con mensaje formateado
4. **API Fallback**: Si API falla, WhatsApp debe seguir funcionando
5. **Productos**: Agregar/quitar productos y verificar contador

## 🚨 Manejo de Errores

### Tipos de Error Manejados

1. **Validación de Campos**:
   - Nombre < 2 caracteres
   - Teléfono < 8 dígitos
   - Mensaje > 120 caracteres

2. **Errores de Red**:
   - Sin conexión a internet
   - API no disponible (404)
   - Error interno servidor (500)

3. **Fallbacks**:
   - Si API falla → Solo WhatsApp funciona
   - Si WhatsApp falla → Mostrar error al usuario

### Estados del Formulario

```javascript
// Estados posibles
const formStates = {
  idle: 'Formulario listo para usar',
  loading: 'Enviando datos...',
  success: 'Enviado exitosamente',
  error: 'Error en el envío',
  partialSuccess: 'Enviado por WhatsApp, falló en backend'
};
```

## 📱 Responsive Design

### Breakpoints

- **Desktop**: > 1024px - Grid 2 columnas
- **Tablet**: 768px - 1024px - Grid 2 columnas compactas  
- **Mobile**: < 768px - Una sola columna
- **Small Mobile**: < 480px - Elementos más compactos

### Elementos Responsive

- Formulario se adapta a pantalla completa en móvil
- Botones se apilan verticalmente en pantallas pequeñas
- Productos seleccionados scroll vertical automático
- Imágenes de productos se escalan proporcionalmente

## 🔄 Flujo de Usuario

1. **Llegada**: Usuario llega a sección "Solicita tu presupuesto"
2. **Selección**: (Opcional) Agrega productos desde catálogo disponible
3. **Datos**: Completa nombre y teléfono (requeridos)
4. **Mensaje**: (Opcional) Agrega mensaje adicional
5. **Envío**: Presiona "Enviar solicitud" o "Solo WhatsApp"
6. **Resultado**: 
   - ✅ WhatsApp se abre con mensaje predefinido
   - ✅ Datos se guardan en backend (si API disponible)
   - ✅ Mensaje de confirmación al usuario

## 🔮 Próximas Mejoras

### Funcionalidades Planificadas

- [ ] **Catálogo Dinámico**: Cargar productos desde API
- [ ] **Imágenes Reales**: Reemplazar placeholders con fotos reales
- [ ] **Cantidades**: Permitir especificar cantidad por producto
- [ ] **Categorías**: Filtrar productos por categoría
- [ ] **Favoritos**: Guardar productos favoritos del usuario
- [ ] **Historial**: Ver solicitudes anteriores
- [ ] **Email Backup**: Envío por email si WhatsApp falla
- [ ] **Analytics**: Tracking de productos más solicitados

### Mejoras Técnicas

- [ ] **TypeScript**: Migrar a TypeScript para mejor tipado
- [ ] **Tests**: Implementar tests unitarios con Jest/Vitest
- [ ] **Cache**: Implementar cache para productos frecuentes
- [ ] **Offline**: Funcionalidad básica sin conexión
- [ ] **PWA**: Convertir en Progressive Web App

## 📞 Contacto y Soporte

Para problemas técnicos o sugerencias:
- **Desarrollador**: [Tu nombre]
- **Email técnico**: dev@zoupackaging.com
- **Repositorio**: zou-packaging/zou-homepage

---

*Última actualización: Agosto 2025*
