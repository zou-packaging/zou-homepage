import PropTypes from "prop-types";
import { Container } from "../../common";
import styles from "./Footer.module.css";

const Footer = ({
  companyName = "ZOU",
  description = "Productos descartables personalizados para tu empresa",
  sections = [],
  contactInfo = {},
  socialLinks = [],
  copyright = `© ${new Date().getFullYear()} ZOU. Todos los derechos reservados.`,
  className = "",
}) => {
  const footerClasses = [styles.footer, className].filter(Boolean).join(" ");

  return (
    <footer className={footerClasses}>
      <Container>
        <div className={styles.content}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <h3 className={styles.companyName}>{companyName}</h3>
            <p className={styles.description}>{description}</p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index} className={styles.section}>
              <h4 className={styles.sectionTitle}>{section.title}</h4>
              <ul className={styles.sectionList}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className={styles.sectionItem}>
                    <a href={link.href} className={styles.sectionLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          {Object.keys(contactInfo).length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Contacto</h4>
              <ul className={styles.contactList}>
                {contactInfo.phone && (
                  <li className={styles.contactItem}>
                    <svg
                      className={styles.contactIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className={styles.contactLink}
                    >
                      {contactInfo.phone}
                    </a>
                  </li>
                )}
                {contactInfo.email && (
                  <li className={styles.contactItem}>
                    <svg
                      className={styles.contactIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className={styles.contactLink}
                    >
                      {contactInfo.email}
                    </a>
                  </li>
                )}
                {contactInfo.address && (
                  <li className={styles.contactItem}>
                    <svg
                      className={styles.contactIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className={styles.contactText}>
                      {contactInfo.address}
                    </span>
                  </li>
                )}
                {contactInfo.hours && (
                  <li className={styles.contactItem}>
                    <svg
                      className={styles.contactIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className={styles.contactText}>
                      {contactInfo.hours}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>{copyright}</p>
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  companyName: PropTypes.string,
  description: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  contactInfo: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    hours: PropTypes.string,
  }),
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ),
  copyright: PropTypes.string,
  className: PropTypes.string,
};

export default Footer;
