Straton Platform (Monorepo)

Dieses Repository enthält die Straton Plattform als Monorepo-Struktur.
Mehrere React-Module (Login, Overview, Bucket, Chat) werden unter einer gemeinsamen GitHub Pages Domain bereitgestellt.

Module laufen unter Unterpfaden:
/login/
/overview/
/bucket/
/chat/

Monorepo Struktur:
apps/
    login/
    overview/
dist/
node_modules/
packages/
    ui/
    node_modules/
    src/
        Button/
            Button.jsx
            Button.module.css
        Input/
            Input.jsx
            Input.module.css
        index.js
    package.json 
.github/   
    workflows/
        deploy.yml


Jede App ist ein eigenständiges Vite + React Projekt.
Beispiel:

apps/login
  src/
  index.html
  vite.config.js
  package.json

Jede App hat:
- eigenes vite.config.js
- eigenes index.html
- eigenen Build-Prozess
- eigenen base Pfad

Shared Code liegt in packages/.
Beispiel: packages/ui
Import in Apps:
import { Button, Input } from "@straton/ui";

npm Workspaces
Root package.json:
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}

Installation erfolgt immer im Root:
npm install

Development
Login starten: npm run dev -w apps/login

Build
Einzelne App bauen: npm run build -w apps/login
Build Output liegt in: apps/login/dist


Deployment (GitHub Pages)
Deployment läuft über GitHub Actions.

Workflow:
npm install --include=optional
npm run build -w apps/login
Build wird kopiert nach: dist/login
dist/ wird als Pages Artifact deployed

Root Redirect
Da nur Module deployt werden (z.B. /login), wird im Workflow automatisch
eine Root index.html erzeugt, die weiterleitet: /straton-integration/ → /login/


Wichtige Regeln
Vite base muss stimmen
In jeder App: base: "/straton-integration/login/"


React-Versionen müssen identisch sein
Alle Workspaces müssen dieselbe React-Version nutzen.


Shared Packages benötigen peerDependencies
packages/ui/package.json:
"peerDependencies": {
  "react": "^19.x",
  "react-dom": "^19.x"
}

Environment Variables
.env.local liegt pro App: apps/login/.env.local
Wird nicht committed.
Production nutzt GitHub Secrets: 
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY


Supabase
Eine Supabase-Instanz
Mehrere Tabellen
Gemeinsame Auth