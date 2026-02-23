import { useState } from "react";
import styles from "./Input.module.css";

export default function Input({
  label,
  id,
  name,
  type = "text",
  isPassword = false,

  // NEW:
  floatingLabel = true, // standardmäßig an, wenn label da ist

  value,
  defaultValue,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  autoComplete,
  inputMode,
  maxLength,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputId = id ?? name;

  const resolvedType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  const useFloating = Boolean(label) && floatingLabel;

  // Trick für CSS :placeholder-shown (damit wir "hat Text?" erkennen können)
  // Wenn floating aktiv ist, setzen wir placeholder auf ein Leerzeichen.
  const resolvedPlaceholder = useFloating ? " " : placeholder;

  // Text, der als Floating Label angezeigt wird:
  const floatingText = label ?? placeholder ?? "";

  return (
    <div className={styles.field}>
      {/* Klassisches Label nur wenn Floating AUS ist */}
      {!useFloating && label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          name={name}
          type={resolvedType}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={resolvedPlaceholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined
          }
          className={`${styles.input} ${error ? styles.inputError : ""} ${
            useFloating ? styles.inputFloating : ""
          }`}
          {...rest}
        />

        {/* Floating Label sitzt im Feld */}
        {useFloating && (
          <label htmlFor={inputId} className={styles.floatingLabel}>
            {floatingText}
            {required && <span className={styles.required}> *</span>}
          </label>
        )}

        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}
      </div>

      {error && (
        <p className={styles.error} id={`${inputId}-error`}>
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className={styles.helper} id={`${inputId}-help`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
