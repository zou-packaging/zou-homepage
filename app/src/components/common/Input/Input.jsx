import { useState, useId, forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = forwardRef(
  (
    {
      type = "text",
      label,
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      name,
      id,
      required = false,
      disabled = false,
      readOnly = false,
      error = "",
      hint = "",
      icon = null,
      iconPosition = "left",
      size = "medium",
      fullWidth = false,
      className = "",
      inputClassName = "",
      rows = 4,
      maxLength,
      autoComplete,
      pattern,
      min,
      max,
      step,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id || generatedId;

    const isTextarea = type === "textarea";
    const isPassword = type === "password";

    const containerClasses = [
      styles.container,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const wrapperClasses = [
      styles.inputWrapper,
      styles[size],
      error && styles.hasError,
      disabled && styles.disabled,
      readOnly && styles.readOnly,
      isFocused && styles.focused,
      icon && styles.hasIcon,
      icon && styles[`icon-${iconPosition}`],
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [
      styles.input,
      isTextarea && styles.textarea,
      inputClassName,
    ]
      .filter(Boolean)
      .join(" ");

    const handleFocus = (e) => {
      setIsFocused(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      onBlur && onBlur(e);
    };

    const inputProps = {
      ref,
      id: inputId,
      name,
      value,
      defaultValue,
      onChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      disabled,
      readOnly,
      required,
      placeholder,
      className: inputClasses,
      "aria-invalid": !!error,
      "aria-describedby": error
        ? `${inputId}-error`
        : hint
        ? `${inputId}-hint`
        : undefined,
      maxLength,
      autoComplete,
      ...props,
    };

    const InputComponent = isTextarea ? "textarea" : "input";

    if (!isTextarea) {
      inputProps.type = isPassword
        ? showPassword
          ? "text"
          : "password"
        : type;
      inputProps.pattern = pattern;
      inputProps.min = min;
      inputProps.max = max;
      inputProps.step = step;
    } else {
      inputProps.rows = rows;
    }

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-label="campo requerido">
                *
              </span>
            )}
          </label>
        )}

        <div className={wrapperClasses}>
          {icon && iconPosition === "left" && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}

          <InputComponent {...inputProps} />

          {icon && iconPosition === "right" && !isPassword && (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          )}

          {isPassword && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}

          {maxLength && (
            <span className={styles.counter} aria-live="polite">
              {value?.length || 0}/{maxLength}
            </span>
          )}
        </div>

        {error && (
          <span id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}

        {hint && !error && (
          <span id={`${inputId}-hint`} className={styles.hint}>
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "tel",
    "number",
    "search",
    "url",
    "date",
    "time",
    "datetime-local",
    "textarea",
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.string,
  pattern: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
