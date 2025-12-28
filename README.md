# The Algorithmic Firmament

Eine elegante Single-Page-Webanwendung über AI-Astrologie mit dunklem Design, Animationen und interaktiven Inhalten.

## 🚀 Quick Start

### Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Preview
npm run preview
```

### Voraussetzungen

- Node.js 18+ 
- npm oder yarn

## 🎨 Features

- **Responsive Design** - Mobile-first mit Sidebar-Navigation
- **Audio-Management** - Ambient-Soundscapes mit Playback-Kontrolle
- **Animationen** - GSAP-basierte Scroll-Animationen
- **Datenvisualisierung** - Chart.js für Market-Projektionen
- **Dark Mode** - Modernes dunkles Theme mit Glassmorphismus
- **Zugänglichkeit** - ARIA-Labels und Keyboard-Navigation

## 📁 Projektstruktur

```
.
├── AlgoFirm-index.html    # Haupt-HTML
├── algofirm-style.css     # Custom Styles
├── main.js                # App-Initialisierung
├── components.js          # UI-Komponenten
├── data.js                # Content-Daten
├── package.json           # Dependencies
├── vite.config.js         # Vite-Konfiguration
├── tailwind.config.js     # Tailwind-Konfiguration
└── postcss.config.js      # PostCSS-Setup
```

## 🛠️ Technologie-Stack

- **Frontend**: Vanilla JavaScript (ES6 Modules)
- **Styling**: Tailwind CSS v3 + Custom CSS
- **Animationen**: GSAP + ScrollTrigger
- **Charts**: Chart.js
- **Icons**: Lucide
- **Build**: Vite
- **Fonts**: Google Fonts (Space Grotesk, Playfair Display, Inter)

## 📦 Build & Deployment

```bash
# Production Build
npm run build

# Output in ./dist/
# Kann auf jedem Static-Hosting deployed werden
# (Vercel, Netlify, GitHub Pages, etc.)
```

## 🎯 Entwickler-Workflows

### Code-Qualität

```bash
# Linting
npm run lint

# Formatierung
npm run format
```

### Neue Module hinzufügen

1. Daten in `data.js` unter `MODULES` hinzufügen
2. Rendering-Logik in `renderContentFlow()` in `main.js` erweitern
3. Optional: Neue Komponenten in `components.js` erstellen

## 🔧 Konfiguration

### Tailwind erweitern

Bearbeiten Sie `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      // Neue Farben
    }
  }
}
```

### Vite-Einstellungen

Bearbeiten Sie `vite.config.js` für Build-Optimierungen.

## 📝 Lizenz

MIT

## 🤝 Contributing

Pull Requests sind willkommen. Für größere Änderungen bitte zuerst ein Issue öffnen.

---

© 2025 Algorithmic Firmament Research