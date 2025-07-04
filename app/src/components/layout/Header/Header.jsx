import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "../../common";
import styles from "./Header.module.css";

const Header = ({
  logo = "ZOU",
  navItems = [],
  ctaButton = null,
  sticky = true,
  transparent = false,
  className = "",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  // Cerrar menú cuando se hace click en un link
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  // Prevenir scroll cuando el menú está abierto en móvil
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const headerClasses = [
    styles.header,
    sticky && styles.sticky,
    transparent && !isScrolled && styles.transparent,
    isScrolled && styles.scrolled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses}>
      <Container>
        <nav
          className={styles.nav}
          role="navigation"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <a href="#" className={styles.logo} aria-label="Ir al inicio">
            {typeof logo === "string" ? (
              <span className={styles.logoText}>{logo}</span>
            ) : (
              logo
            )}
          </a>

          {/* Desktop Navigation */}
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button - Desktop */}
          {ctaButton && <div className={styles.ctaDesktop}>{ctaButton}</div>}

          {/* Mobile Menu Button */}
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.menuIcon}>
              {isMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </span>
          </button>

          {/* Mobile Navigation */}
          <div
            id="mobile-menu"
            className={`${styles.mobileMenu} ${
              isMenuOpen ? styles.mobileMenuOpen : ""
            }`}
            aria-hidden={!isMenuOpen}
          >
            <div className={styles.mobileMenuContent}>
              <ul className={styles.mobileNavList}>
                {navItems.map((item, index) => (
                  <li key={index} className={styles.mobileNavItem}>
                    <a
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={handleNavClick}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* CTA Button - Mobile */}
              {ctaButton && <div className={styles.ctaMobile}>{ctaButton}</div>}
            </div>
          </div>

          {/* Overlay */}
          {isMenuOpen && (
            <div
              className={styles.overlay}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
          )}
        </nav>
      </Container>
    </header>
  );
};

Header.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  ctaButton: PropTypes.node,
  sticky: PropTypes.bool,
  transparent: PropTypes.bool,
  className: PropTypes.string,
};

export default Header;
