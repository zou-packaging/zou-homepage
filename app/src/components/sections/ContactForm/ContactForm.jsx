import { useState, useEffect } from "react";
import { Container, Input, Button, Card } from "../../common";
import { useProducts } from "../../../contexts/ProductsContext";
import { validateForm, formatPhone } from "../../../utils/validators";
import {
  generatePreviewMessage,
  openWhatsApp,
  COMPANY_WHATSAPP,
} from "../../../utils/whatsapp";
import {
  trackWhatsAppConversion,
  trackMicroConversion,
} from "../../../utils/conversionTracking";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const { selectedProducts, clearSelection, toggleProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    businessType: "", // Nuevo campo para segmentar mejor
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMessage, setPreviewMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);

  // Opciones de tipo de negocio para mejor segmentación
  const businessTypes = [
    { value: "", label: "Seleccioná tu tipo de negocio" },
    { value: "cafeteria", label: "☕ Cafetería / Coffee Shop" },
    { value: "panaderia", label: "🥖 Panadería / Pastelería" },
    { value: "restaurante", label: "🍽️ Restaurante / Bar" },
    { value: "eventos", label: "🎉 Organización de Eventos" },
    { value: "delivery", label: "🚚 Delivery / Take Away" },
    { value: "hotel", label: "🏨 Hotel / Alojamiento" },
    { value: "otro", label: "🏢 Otro tipo de negocio" },
  ];

  // Actualizar preview cuando cambian los datos
  useEffect(() => {
    const preview = generatePreviewMessage(formData, selectedProducts);
    setPreviewMessage(preview);
  }, [formData, selectedProducts]);

  // Trackear inicio de formulario
  useEffect(() => {
    if (!formStarted && (formData.name || formData.email || formData.phone)) {
      setFormStarted(true);
      trackMicroConversion("form_start", {
        products_selected: selectedProducts.length,
        business_type: formData.businessType,
      });
    }
  }, [formData, formStarted, selectedProducts.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatear teléfono mientras se escribe
    if (name === "phone") {
      formattedValue = value.replace(/\D/g, ""); // Solo números
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Validar campo en tiempo real si ya fue tocado
    if (touched[name]) {
      const newErrors = validateForm({ ...formData, [name]: formattedValue });
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name] || "",
      }));
    }

    // Trackear progreso del formulario
    if (name === "businessType" && formattedValue) {
      trackMicroConversion("business_type_selected", {
        business_type: formattedValue,
        products_selected: selectedProducts.length,
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validar campo al perder foco
    const newErrors = validateForm(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name] || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Marcar todos los campos como tocados
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      message: true,
      businessType: true,
    };
    setTouched(allTouched);

    // Validar formulario completo
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // Si hay errores, mostrarlos y no continuar
    if (Object.keys(validationErrors).length > 0) {
      // Hacer scroll al primer error
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Trackear conversión ANTES de abrir WhatsApp
      await trackWhatsAppConversion({
        productsCount: selectedProducts.length,
        businessType: formData.businessType,
        estimatedValue: selectedProducts.length * 50, // Valor estimado basado en productos
        userType: "lead",
        source: "contact_form",
      });

      // Simular un pequeño delay para tracking
      setTimeout(() => {
        // Abrir WhatsApp
        openWhatsApp(formData, selectedProducts, COMPANY_WHATSAPP);

        // Limpiar formulario
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          businessType: "",
        });
        setTouched({});
        setErrors({});
        setFormStarted(false);

        setIsSubmitting(false);
        setShowPreview(false);

        // Mostrar mensaje de éxito
        alert(
          "¡Perfecto! Te estamos redirigiendo a WhatsApp para completar tu consulta."
        );
      }, 500);
    } catch (error) {
      console.error("Error al trackear conversión:", error);
      // Abrir WhatsApp igual, aunque falle el tracking
      openWhatsApp(formData, selectedProducts, COMPANY_WHATSAPP);
      setIsSubmitting(false);
    }
  };

  const handleRemoveProduct = (productId) => {
    const product = selectedProducts.find((p) => p.id === productId);
    if (product) {
      toggleProduct(product);
    }
  };

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
    if (!showPreview) {
      trackMicroConversion("preview_message", {
        products_selected: selectedProducts.length,
      });
    }
  };

  return (
    <section id="contacto" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Solicitá tu Presupuesto Gratis</h2>
          <p className={styles.subtitle}>
            📱 Completá el formulario y te contactaremos por WhatsApp en menos
            de 2 horas
          </p>
          <div className={styles.benefits}>
            <span className={styles.benefit}>✅ Respuesta inmediata</span>
            <span className={styles.benefit}>✅ Sin compromiso</span>
            <span className={styles.benefit}>
              ✅ Asesoramiento personalizado
            </span>
          </div>
        </div>

        <div className={styles.content}>
          {/* Formulario */}
          <div className={styles.formSection}>
            <Card variant="elevated" padding="large">
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <Input
                    label="Nombre completo"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    required
                    placeholder="Ej: Juan Pérez"
                    fullWidth
                  />

                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    required
                    placeholder="juan@tucafeteria.com"
                    fullWidth
                  />

                  <Input
                    type="tel"
                    label="Teléfono / WhatsApp"
                    name="phone"
                    value={formatPhone(formData.phone)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone}
                    required
                    placeholder="351 123-4567"
                    hint="Incluí tu código de área"
                    fullWidth
                  />
                </div>

                {/* Campo de tipo de negocio */}
                <div className={styles.businessTypeField}>
                  <label
                    htmlFor="businessType"
                    className={styles.businessTypeLabel}
                  >
                    ¿Qué tipo de negocio tenés? *
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.businessTypeSelect}
                    required
                  >
                    {businessTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <span className={styles.error}>{errors.businessType}</span>
                  )}
                </div>

                <Input
                  type="textarea"
                  label="Contanos sobre tu proyecto (opcional)"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.message}
                  placeholder="Ej: Necesito vasos personalizados para mi nueva cafetería. Aproximadamente 500 unidades por mes..."
                  rows={4}
                  maxLength={500}
                  fullWidth
                />

                <div className={styles.formActions}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="large"
                    onClick={handlePreviewToggle}
                  >
                    {showPreview
                      ? "Ocultar Preview"
                      : "📱 Ver Preview del Mensaje"}
                  </Button>

                  <Button
                    type="submit"
                    variant="whatsapp"
                    size="large"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    icon={
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.201 1.871.123.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    }
                  >
                    {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
                  </Button>
                </div>

                {/* Garantía */}
                <div className={styles.guarantee}>
                  <p>
                    🔒 <strong>Tu información está segura.</strong> Solo la
                    usamos para contactarte sobre tu consulta.
                  </p>
                </div>
              </form>
            </Card>

            {/* Preview del mensaje */}
            {showPreview && (
              <Card variant="filled" className={styles.preview}>
                <h4 className={styles.previewTitle}>
                  📱 Así se verá tu mensaje en WhatsApp:
                </h4>
                <pre className={styles.previewMessage}>{previewMessage}</pre>
              </Card>
            )}
          </div>

          {/* Productos seleccionados */}
          <div className={styles.productsSection}>
            <Card variant="outlined" padding="large">
              <h3 className={styles.productsSectionTitle}>
                🛍️ Productos Seleccionados ({selectedProducts.length})
              </h3>

              {selectedProducts.length > 0 ? (
                <>
                  <div className={styles.productsList}>
                    {selectedProducts.map((product) => (
                      <div key={product.id} className={styles.productItem}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.productImage}
                        />
                        <div className={styles.productInfo}>
                          <h4 className={styles.productName}>{product.name}</h4>
                          <p className={styles.productCategory}>
                            {product.category.charAt(0).toUpperCase() +
                              product.category.slice(1)}
                          </p>
                          {product.customizable && (
                            <span className={styles.productCustomizable}>
                              🎨 Personalizable
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => handleRemoveProduct(product.id)}
                          aria-label={`Quitar ${product.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={clearSelection}
                  >
                    Limpiar selección
                  </button>
                </>
              ) : (
                <div className={styles.emptyProducts}>
                  <p>🎯 Elegí productos para un presupuesto más preciso</p>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      document
                        .getElementById("productos")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Ver Catálogo
                  </Button>
                </div>
              )}
            </Card>

            {/* Información adicional mejorada */}
            <Card variant="filled" className={styles.infoCard}>
              <h4 className={styles.infoTitle}>⚡ Proceso Super Rápido</h4>
              <ol className={styles.infoList}>
                <li>📝 Completás tus datos (2 minutos)</li>
                <li>📱 Te contactamos por WhatsApp (menos de 2 horas)</li>
                <li>🎨 Creamos tu diseño personalizado (24-48hs)</li>
                <li>✅ Aprobás y confirmás tu pedido</li>
                <li>🚚 Recibís tus productos (7-10 días)</li>
              </ol>
              <div className={styles.urgentBadge}>
                <p>
                  🔥 <strong>¿Tenés urgencia?</strong> Llamanos al 351-789-2876
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
