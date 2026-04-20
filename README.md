# RossoTono Market Polla - Sito Web

Sito web promozionale per RossoTono Market di Polla (SA), affiliato a RossoTono.

## Funzionalita

- **Header Sticky** con menu di navigazione responsive
- **Hero Section** con elementi floating animati
- **Volantino Interattivo** con effetto flip 3D
- **Social Media**: Link diretti a Instagram, TikTok, Facebook
- **Chatbot Intelligente**: Risponde a domande su volantino, orari, posizione, contatti (AI NVIDIA NIM + fallback locale)
- **Google Maps**: Indicazioni stradali
- **Contatti Funzionali**: Click-to-call e click-to-email
- **Galleria Foto**: Showcase della struttura

## Struttura Progetto

```
Web/
├── index.html              # Sito principale
├── js/
│   └── chatbot.js          # Script chatbot AI (client)
├── netlify/
│   └── functions/
│       └── chat.js         # API serverless NVIDIA NIM
├── data/
│   └── knowledge.json      # Knowledge base per AI
├── Foto/                   # Immagini galleria
├── netlify.toml            # Config Netlify
├── package.json            # Dipendenze
└── .env.example            # Template variabili ambiente
```

## Quick Start

```bash
# Installa dipendenze
npm install

# Avvia dev server (con Netlify functions)
netlify dev

# Oppure apri index.html direttamente nel browser
```

## Deploy su Netlify

### Metodo 1: Drag & Drop (il piu semplice)

1. Vai su [Netlify Drop](https://app.netlify.com/drop)
2. Trascina la cartella contenente `index.html` nell'area indicata
3. Il sito sara online in pochi secondi!

### Metodo 2: Git (per sviluppo continuo)

1. Crea repository GitHub
2. Collega il repository a Netlify
3. Netlify rilevera automaticamente `netlify.toml`

### Metodo 3: CLI Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Configurazione Environment Variables su Netlify

La API key NVIDIA e gia configurata su Netlify. Per istruzioni dettagliate di deploy consulta [README-DEPLOY.md](README-DEPLOY.md).

## Personalizzazione

### Modificare le offerte del volantino
Cerca la sezione `<!-- VOLANTINO SECTION -->` in `index.html`.

### Modificare i contatti
Cerca la sezione `<!-- CONTATTI SECTION -->`:
- Telefono: `tel:+39-0975-1902032`
- Email: `mailto:supermercatort.polla@gmail.com`

### Modificare orari
Cerca `.orari-grid` in `index.html`:
- Lun - Sab: 08:30 - 20:00
- Domenica: 08:30 - 12:00

## Requisiti

- Nessun server richiesto (statico al 100%)
- Nessuna dipendenza esterna se non quelle caricate da CDN (Google Fonts, Font Awesome)

## Tech Stack

- HTML5 + CSS3 (custom, no framework)
- JavaScript vanilla
- Netlify Functions (serverless)
- NVIDIA NIM API (nemotron-mini-4b-instruct)
- node-fetch per le API calls

## Supporto

Per domande sul sito, contatta lo sviluppatore.
