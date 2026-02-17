import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  variant = "primary", // primary | secondary | ghost | danger
  size = "md",         // sm | md | lg
  fullWidth = false,
  disabled = false,
  loading = false,
  className = "",
  ...rest
}) {
  const isDisabled = disabled || loading;

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      {...rest}
    >
      <span className={styles.label}>{children}</span>

      {loading && (
        <span className={styles.spinner} aria-hidden="true" />
      )}
    </button>
  );
}
