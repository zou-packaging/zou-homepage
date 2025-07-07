import { useState, useEffect } from "react";
import { Container, Input, Button, Card } from "../../common";
import { useProducts } from "../../../contexts/ProductsContext";
import { validateForm, formatPhone } from "../../../utils/validators";
import {
  generatePreviewMessage,
  openWhatsApp,
  COMPANY_WHATSAPP,
} from "../../../utils/whatsapp";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const { selectedProducts, clearSelection, toggleProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMessage, setPreviewMessage] = useState("");

  // Actualizar preview cuando cambian los datos
  useEffect(() => {
    const preview = generatePreviewMessage(formData, selectedProducts);
    setPreviewMessage(preview);
  }, [formData, selectedProducts]);

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

    // Simular envío (aquí podrías agregar una llamada a API)
    setTimeout(() => {
      // Abrir WhatsApp
      openWhatsApp(formData, selectedProducts, COMPANY_WHATSAPP);

      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTouched({});
      setErrors({});

      // Limpiar productos seleccionados (opcional)
      // clearSelection();

      setIsSubmitting(false);
      setShowPreview(false);
    }, 500);
  };

  const handleRemoveProduct = (productId) => {
    const product = selectedProducts.find((p) => p.id === productId);
    if (product) {
      toggleProduct(product);
    }
  };

  return (
    <section id="contacto" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Solicitá tu Presupuesto</h2>
          <p className={styles.subtitle}>
            Completá el formulario y te contactaremos por WhatsApp con toda la
            información
          </p>
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
                    placeholder="Juan Pérez"
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
                    placeholder="juan@empresa.com"
                    fullWidth
                  />

                  <Input
                    type="tel"
                    label="Teléfono"
                    name="phone"
                    value={formatPhone(formData.phone)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone}
                    required
                    placeholder="11 1234-5678"
                    hint="Incluí tu código de área"
                    fullWidth
                  />
                </div>

                <Input
                  type="textarea"
                  label="Mensaje adicional (opcional)"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.message}
                  placeholder="Contanos más sobre lo que necesitás..."
                  rows={4}
                  maxLength={500}
                  fullWidth
                />

                <div className={styles.formActions}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="large"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview
                      ? "Ocultar Preview"
                      : "Ver Preview del Mensaje"}
                  </Button>

                  <Button
                    type="submit"
                    variant="whatsapp"
                    size="large"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Enviar por WhatsApp
                  </Button>
                </div>
              </form>
            </Card>

            {/* Preview del mensaje */}
            {showPreview && (
              <Card variant="filled" className={styles.preview}>
                <h4 className={styles.previewTitle}>
                  📱 Preview del mensaje de WhatsApp:
                </h4>
                <pre className={styles.previewMessage}>{previewMessage}</pre>
              </Card>
            )}
          </div>

          {/* Productos seleccionados */}
          <div className={styles.productsSection}>
            <Card variant="outlined" padding="large">
              <h3 className={styles.productsSectionTitle}>
                Productos Seleccionados ({selectedProducts.length})
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
                  <p>No has seleccionado ningún producto aún.</p>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      document
                        .getElementById("productos")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explorar Productos
                  </Button>
                </div>
              )}
            </Card>

            {/* Información adicional */}
            <Card variant="filled" className={styles.infoCard}>
              <h4 className={styles.infoTitle}>¿Cómo funciona?</h4>
              <ol className={styles.infoList}>
                <li>Completá tus datos de contacto</li>
                <li>Revisá los productos seleccionados</li>
                <li>Agregá un mensaje si querés</li>
                <li>Hacé clic en "Enviar por WhatsApp"</li>
                <li>Se abrirá WhatsApp con el mensaje listo</li>
              </ol>
              <p className={styles.infoNote}>
                💡 <strong>Tip:</strong> Podés editar el mensaje en WhatsApp
                antes de enviarlo.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
