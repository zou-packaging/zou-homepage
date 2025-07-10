import { useState, useEffect, useRef } from "react";
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
    businessType: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMessage, setPreviewMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estados para dropdown custom
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Opciones de tipo de negocio optimizadas para conversión
  const businessTypes = [
    { value: "", label: "¿Qué tipo de negocio tenés?", icon: "🏢", disabled: true },
    { value: "cafeteria", label: "Cafetería / Coffee Shop", icon: "☕" },
    { value: "panaderia", label: "Panadería / Pastelería", icon: "🥖" },
    { value: "restaurante", label: "Restaurante / Bar", icon: "🍽️" },
    { value: "eventos", label: "Organización de Eventos", icon: "🎉" },
    { value: "delivery", label: "Delivery / Take Away", icon: "🚚" },
    { value: "hotel", label: "Hotel / Alojamiento", icon: "🏨" },
    { value: "oficina", label: "Oficina / Empresa", icon: "🏢" },
    { value: "otro", label: "Otro (contanos en el mensaje)", icon: "✨" },
  ];

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Actualizar preview cuando cambian los datos
  useEffect(() => {
    if (formData.name || formData.phone || selectedProducts.length > 0) {
      const preview = generatePreviewMessage(formData, selectedProducts);
      setPreviewMessage(preview);
    }
  }, [formData, selectedProducts]);

  // Trackear inicio de formulario y progreso
  useEffect(() => {
    if (!formStarted && (formData.name || formData.email || formData.phone)) {
      setFormStarted(true);
      trackMicroConversion("form_start", {
        products_selected: selectedProducts.length,
        business_type: formData.businessType,
        step: currentStep,
      });
    }
  }, [formData, formStarted, selectedProducts.length, currentStep]);

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

    // Trackear progreso del formulario y auto-avanzar steps
    if (name === "businessType" && formattedValue) {
      setCurrentStep(2);
      trackMicroConversion("business_type_selected", {
        business_type: formattedValue,
        products_selected: selectedProducts.length,
      });
    }

    if (name === "name" && formattedValue.length > 2) {
      setCurrentStep(Math.max(currentStep, 2));
    }

    if (name === "phone" && formattedValue.length > 8) {
      setCurrentStep(Math.max(currentStep, 3));
    }
  };

  const handleBusinessTypeSelect = (value, label) => {
    setFormData(prev => ({ ...prev, businessType: value }));
    setIsDropdownOpen(false);
    
    if (value) {
      setCurrentStep(2);
      trackMicroConversion("business_type_selected", {
        business_type: value,
        products_selected: selectedProducts.length,
      });
    }

    // Validar si ya fue tocado
    if (touched.businessType) {
      const newErrors = validateForm({ ...formData, businessType: value });
      setErrors(prev => ({
        ...prev,
        businessType: newErrors.businessType || "",
      }));
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

  const handleQuickWhatsApp = () => {
    trackMicroConversion("quick_whatsapp_cta", {
      source: "contact_form_header",
      products_selected: selectedProducts.length,
    });
    window.open(
      "https://wa.me/5493517892876?text=Hola! Quiero información rápida sobre productos personalizados para mi empresa",
      "_blank"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Marcar todos los campos como tocados
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      businessType: true,
    };
    setTouched(allTouched);

    // Validar formulario completo
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // Si hay errores, mostrarlos y no continuar
    if (Object.keys(validationErrors).length > 0) {
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
        estimatedValue: selectedProducts.length * 75, // Valor estimado aumentado
        userType: "lead_qualified",
        source: "contact_form_optimized",
        step_completed: currentStep,
      });

      // Simular delay para tracking
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
        setCurrentStep(1);
        setIsSubmitting(false);
        setShowPreview(false);

        // Mostrar mensaje de éxito optimizado
        alert(
          "¡Perfecto! 🎉 Te estamos redirigiendo a WhatsApp para finalizar tu consulta. En menos de 2 horas te enviamos tu presupuesto personalizado."
        );
      }, 800);
    } catch (error) {
      console.error("Error al trackear conversión:", error);
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
        form_completion: Math.round((Object.keys(touched).length / 4) * 100),
      });
    }
  };

  // Calcular progreso del formulario
  const formProgress = Math.min(
    100,
    Math.round(
      ((formData.name ? 25 : 0) +
        (formData.phone ? 25 : 0) +
        (formData.email ? 25 : 0) +
        (formData.businessType ? 25 : 0))
    )
  );

  const isFormValid = formData.name && formData.phone && formData.businessType;

  // Obtener el business type seleccionado para mostrar
  const selectedBusinessType = businessTypes.find(type => type.value === formData.businessType);

  return (
    <section id="contacto" className={styles.optimizedSection}>
      <Container>
        {/* Header ultra-optimizado */}
        <div className={styles.optimizedHeader}>
          <div className={styles.urgencyBanner}>
            <span className={styles.urgencyIcon}>⚡</span>
            <span className={styles.urgencyText}>
              <strong>OFERTA LIMITADA:</strong> Primeros 50 clientes del mes con 20% OFF + Diseño GRATIS
            </span>
          </div>

          <h2 className={styles.optimizedTitle}>
            Conseguí tu Presupuesto Personalizado
            <span className={styles.titleHighlight}>en menos de 2 horas</span>
          </h2>
          
          <p className={styles.optimizedSubtitle}>
            📱 Completá el formulario y te contactamos por WhatsApp con tu cotización exacta
          </p>

          {/* Beneficios destacados */}
          <div className={styles.topBenefits}>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✅</span>
              <span>Respuesta en 2hs máximo</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✅</span>
              <span>Diseño gratuito incluido</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✅</span>
              <span>Sin compromiso de compra</span>
            </div>
          </div>

          {/* CTA alternativo */}
          <div className={styles.quickAction}>
            <p className={styles.quickActionText}>
              ¿Necesitás info al instante? 
            </p>
            <Button
              variant="whatsapp"
              size="medium"
              onClick={handleQuickWhatsApp}
              className={styles.quickWhatsApp}
            >
              📱 WhatsApp Directo (1 min)
            </Button>
          </div>
        </div>

        <div className={styles.optimizedContent}>
          {/* Formulario optimizado */}
          <div className={styles.optimizedFormSection}>
            <Card variant="elevated" padding="large" className={styles.formCard}>
              {/* Progress bar */}
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${formProgress}%` }}
                  />
                </div>
                <span className={styles.progressText}>
                  {formProgress}% completado
                </span>
              </div>

              <form onSubmit={handleSubmit} className={styles.optimizedForm}>
                {/* Step 1: Información básica */}
                <div className={styles.formStep}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>1</span>
                    <h3 className={styles.stepTitle}>Información Básica</h3>
                  </div>

                  <div className={styles.formGrid}>
                    <Input
                      label="Tu nombre completo *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.name}
                      required
                      placeholder="Ej: María González"
                      fullWidth
                      autoComplete="name"
                    />

                    <Input
                      type="tel"
                      label="WhatsApp / Teléfono *"
                      name="phone"
                      value={formatPhone(formData.phone)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.phone}
                      required
                      placeholder="351 123-4567"
                      hint="Incluí código de área (ej: 351, 11, etc.)"
                      fullWidth
                      autoComplete="tel"
                    />

                    <Input
                      type="email"
                      label="Email (opcional pero recomendado)"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                      placeholder="maria@tucafeteria.com"
                      hint="Para enviarte la cotización por email también"
                      fullWidth
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Step 2: Tipo de negocio - Dropdown Custom */}
                <div className={styles.formStep}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>2</span>
                    <h3 className={styles.stepTitle}>Sobre tu Negocio</h3>
                  </div>

                  <div className={styles.customDropdownContainer} ref={dropdownRef}>
                    <label className={styles.businessTypeLabel}>
                      Tipo de negocio *
                    </label>
                    
                    <button
                      type="button"
                      className={`${styles.customDropdownButton} ${isDropdownOpen ? styles.open : ''}`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onBlur={() => setTouched(prev => ({ ...prev, businessType: true }))}
                    >
                      <span className={`${styles.customDropdownText} ${!formData.businessType ? styles.placeholder : ''}`}>
                        {selectedBusinessType ? (
                          <>
                            <span style={{ marginRight: '8px' }}>{selectedBusinessType.icon}</span>
                            {selectedBusinessType.label}
                          </>
                        ) : (
                          businessTypes[0].label
                        )}
                      </span>
                      <span className={`${styles.customDropdownIcon} ${isDropdownOpen ? styles.open : ''}`}>
                        ▼
                      </span>
                    </button>

                    {isDropdownOpen && (
                      <div className={styles.customDropdownList}>
                        {businessTypes.slice(1).map((type) => (
                          <div
                            key={type.value}
                            className={`${styles.customDropdownOption} ${
                              formData.businessType === type.value ? styles.selected : ''
                            }`}
                            onClick={() => handleBusinessTypeSelect(type.value, type.label)}
                          >
                            <span style={{ marginRight: '12px', fontSize: '18px' }}>
                              {type.icon}
                            </span>
                            {type.label}
                          </div>
                        ))}
                      </div>
                    )}

                    {errors.businessType && (
                      <span className={styles.error}>{errors.businessType}</span>
                    )}
                  </div>
                </div>

                {/* Step 3: Mensaje opcional */}
                <div className={styles.formStep}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>3</span>
                    <h3 className={styles.stepTitle}>Detalles del Proyecto (Opcional)</h3>
                  </div>

                  <Input
                    type="textarea"
                    label="Contanos sobre tu proyecto"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.message}
                    placeholder="Ej: Necesito vasos personalizados para mi nueva cafetería. Aproximadamente 1000 unidades para empezar..."
                    rows={4}
                    maxLength={500}
                    fullWidth
                    hint="Esto nos ayuda a preparar una cotización más precisa"
                  />
                </div>

                {/* Actions mejoradas */}
                <div className={styles.optimizedActions}>
                  <div className={styles.mainActions}>
                    <Button
                      type="submit"
                      variant="whatsapp"
                      size="large"
                      loading={isSubmitting}
                      disabled={isSubmitting || !isFormValid}
                      className={styles.submitButton}
                      icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.201 1.871.123.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      }
                    >
                      {isSubmitting 
                        ? "Preparando tu consulta..." 
                        : "🚀 Enviar por WhatsApp"}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="large"
                      onClick={handlePreviewToggle}
                      className={styles.previewButton}
                    >
                      {showPreview ? "Ocultar Preview" : "👁️ Ver Mensaje"}
                    </Button>
                  </div>

                  {/* Trust indicators en el form */}
                  <div className={styles.formTrust}>
                    <div className={styles.trustItem}>
                      <span className={styles.trustIcon}>🔒</span>
                      <span>Información 100% segura</span>
                    </div>
                    <div className={styles.trustItem}>
                      <span className={styles.trustIcon}>⚡</span>
                      <span>Respuesta garantizada en 2hs</span>
                    </div>
                  </div>
                </div>

                {/* Garantía mejorada */}
                <div className={styles.optimizedGuarantee}>
                  <div className={styles.guaranteeContent}>
                    <span className={styles.guaranteeIcon}>🛡️</span>
                    <div className={styles.guaranteeText}>
                      <strong>Garantía de Satisfacción Total:</strong>
                      <p>Si no estás 100% conforme con nuestro servicio, te devolvemos el dinero. Sin preguntas, sin problemas.</p>
                    </div>
                  </div>
                </div>
              </form>
            </Card>

            {/* Preview del mensaje */}
            {showPreview && (
              <Card variant="success" className={styles.optimizedPreview}>
                <h4 className={styles.previewTitle}>
                  📱 Así se verá tu mensaje en WhatsApp:
                </h4>
                <pre className={styles.previewMessage}>{previewMessage}</pre>
                <p className={styles.previewHint}>
                  💡 Podés editar este mensaje antes de enviarlo
                </p>
              </Card>
            )}
          </div>

          {/* Sidebar optimizado */}
          <div className={styles.optimizedSidebar}>
            {/* Productos seleccionados */}
            <Card variant="outlined" padding="large" className={styles.productsCard}>
              <h3 className={styles.sidebarTitle}>
                🛍️ Productos de Interés ({selectedProducts.length})
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
                  <p>🎯 Agregá productos para una cotización más precisa</p>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      document
                        .getElementById("productos")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Ver Catálogo
                  </Button>
                </div>
              )}
            </Card>

            {/* Proceso mejorado */}
            <Card variant="primary" className={styles.processCard}>
              <h4 className={styles.sidebarTitle}>⚡ Proceso Express</h4>
              <ol className={styles.processList}>
                <li>📝 Completás el formulario (2 min)</li>
                <li>📱 Te contactamos por WhatsApp (&lt; 2hs)</li>
                <li>🎨 Recibís tu diseño personalizado (24hs)</li>
                <li>✅ Aprobás y confirmás tu pedido</li>
                <li>🚚 Recibís tus productos (7-10 días)</li>
              </ol>
              
              <div className={styles.urgentContact}>
                <p className={styles.urgentText}>
                  🔥 <strong>¿Tenés urgencia?</strong>
                </p>
                <a 
                  href="tel:+5493517892876" 
                  className={styles.urgentPhone}
                >
                  📞 Llamanos: 351-789-2876
                </a>
              </div>
            </Card>

            {/* Testimonial mini */}
            <Card variant="filled" className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p className={styles.testimonialText}>
                  "Increíble calidad y velocidad de respuesta. En 3 días tenía mis vasos personalizados perfectos."
                </p>
                <div className={styles.testimonialAuthor}>
                  <strong>- María, Café Central</strong>
                  <div className={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;