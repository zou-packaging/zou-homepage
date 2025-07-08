import { useEffect } from "react";
import PropTypes from "prop-types";

const SEO = ({
  title = "ZOU - Productos Descartables Personalizados",
  description = "Vasos térmicos, servilletas, bolsas y palitos personalizados para tu empresa. Calidad premium, diseño único y atención personalizada.",
  keywords = "vasos térmicos personalizados, servilletas empresariales, bolsas papel kraft, productos descartables, personalización corporativa, argentina",
  image = "/og-image.jpg",
  url = "https://zou.com.ar",
  type = "website",
}) => {
  useEffect(() => {
    // Actualizar título
    document.title = title;

    // Meta tags básicos
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", image, "property");
    updateMetaTag("og:url", url, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:site_name", "ZOU", "property");

    // Twitter Cards
    updateMetaTag("twitter:card", "summary_large_image", "name");
    updateMetaTag("twitter:title", title, "name");
    updateMetaTag("twitter:description", description, "name");
    updateMetaTag("twitter:image", image, "name");

    // Meta adicionales
    updateMetaTag("robots", "index, follow");
    updateMetaTag("author", "ZOU");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Schema.org JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ZOU",
      description: description,
      url: url,
      logo: `${url}/logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+54-351-789-2876",
        contactType: "customer service",
        availableLanguage: "Spanish",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "AR",
        addressRegion: "Córdoba",
      },
      sameAs: ["https://facebook.com/zou", "https://instagram.com/zou"],
    };

    updateJSONLD(schema);
  }, [title, description, keywords, image, url, type]);

  return null;
};

// Helper functions
const updateMetaTag = (name, content, attribute = "name") => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const updateJSONLD = (schema) => {
  let script = document.querySelector('script[type="application/ld+json"]');

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
};

export default SEO;
