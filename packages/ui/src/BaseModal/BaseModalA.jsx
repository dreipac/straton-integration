import { useEffect } from "react";
import styles from "./BaseModalA.module.css";

export default function BaseModalA({
  open,
  title,
  onClose,
  left,
  right,
  closeOnBackdrop = true,
  closeOnEsc = true,
  width = 1120, // optional: Modalbreite
}) {
  useEffect(() => {
    if (!open) return;

    // Scroll lock
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (closeOnEsc && e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={() => closeOnBackdrop && onClose?.()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles.modal}
        style={{ maxWidth: width }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Schliessen"
          >
            <span className={styles.closeIcon}>×</span>
          </button>
        </div>

        <div className={styles.body}>
          <aside className={styles.left}>{left}</aside>
          <section className={styles.right}>{right}</section>
        </div>
      </div>
    </div>
  );
}