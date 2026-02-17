import { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/straton-logo.png";
import { supabase } from "../../lib/supabaseClient";



// Importpfad ggf. an dein Projekt anpassen:
// Wenn du `src/components/ui/index.js` hast:
import { Input, Button } from "../../components/ui";

// Falls du KEIN ui/index.js hast, nimm stattdessen:
// import Input from "../../components/ui/Input/Input.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");


  // Optional simple Frontend-Validierung (ohne "Login-Logik")
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError =
    touched.email && !email.trim() ? "Bitte gib deine E-Mail ein." : "";

  const passwordError =
    touched.password && !password.trim() ? "Bitte gib dein Passwort ein." : "";

const onSubmit = async (e) => {
  e.preventDefault();
  setTouched({ email: true, password: true });
  setFormError("");

  if (!email.trim() || !password.trim()) return;

  setLoading(true);
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password.trim(),
  });
  setLoading(false);

  if (error) {
    setFormError(error.message || "Login fehlgeschlagen.");
    return;
  }

  // ✅ Redirect nach Login:
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");

  // Vanilla Default (wenn kein next)
  const fallback = "https://dreipac.github.io/Bucket-Prod/";

  // next kommt z.B. als "/Bucket-Prod/index.html"
  const target = next ? new URL(next, window.location.origin).toString() : fallback;
  window.location.href = target;
};


  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        

        <div className={styles.right}>
          <img src={logo} alt="Straton Logo" className={styles.logo} />
          <div className={styles.content}>
            <header className={styles.header}>
              <h1 className={styles.title}>Hallo, Willkommen</h1>
              <p className={styles.subtitle}>
                Melde dich mit deinem Konto an.
              </p>
            </header>

            <form className={styles.form} onSubmit={onSubmit}>
              <Input
                label="E-Mail"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                error={emailError}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              />

              <Input
                label="Passwort"
                name="password"
                isPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                error={passwordError}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              />

              {formError && <div style={{ color: "#ef4444", fontSize: "0.9rem" }}>{formError}</div>}
             <Button type="submit" fullWidth loading={loading} disabled={loading}>
              Login
            </Button>


              <div className={styles.meta}>
                <a className={styles.link} href="#">
                  Passwort vergessen?
                </a>
                <span className={styles.divider}>•</span>
                <a className={styles.link} href="#">
                  Konto erstellen
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.left} aria-hidden="true" />
      </div>
    </div>
  );
}
