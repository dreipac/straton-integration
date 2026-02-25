import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { BaseModalA } from "@straton/ui";

function buildUrl(path) {
  const repoBase = import.meta.env.VITE_REPO_BASE || "";
  return `${repoBase}${path}`;
}

export default function App() {
  const [email, setEmail] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    let alive = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session) {
        window.location.replace(buildUrl("/login/"));
        return;
      }

      if (alive) setEmail(session.user?.email ?? "");
    }

    checkSession();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) window.location.replace(buildUrl("/login/"));
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.replace(buildUrl("/login/"));
  }

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Overview</h1>
      <p>Willkommen! Du bist eingeloggt{email ? ` als ${email}` : ""}.</p>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={handleLogout} style={{ padding: "10px 14px", cursor: "pointer" }}>
          Logout
        </button>

        <button
          onClick={() => setSettingsOpen(true)}
          style={{ padding: "10px 14px", cursor: "pointer" }}
        >
          Settings
        </button>
      </div>

      <BaseModalA
        open={settingsOpen}
        title="Einstellungen"
        onClose={() => setSettingsOpen(false)}
        left={null}
        right={null}
      />
    </div>
  );
}