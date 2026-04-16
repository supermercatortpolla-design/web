# RossoTono Market Polla - Sito Web

Sito web promozionale per RossoTono Market di Polla (SA), affiliato a RossoTono.

## 🚀 Deploy su Netlify

### Metodo 1: Drag & Drop (il più semplice)

1. Vai su [Netlify Drop](https://app.netlify.com/drop)
2. Trascina la cartella contenente `index.html` nell'area indicata
3. Il sito sarà online in pochi secondi!

### Metodo 2: Git (per sviluppo continuo)

1. Crea un repository GitHub
2. Collega il repository a Netlify
3. Netlify rileverà automaticamente le impostazioni

### Metodo 3: CLI Netlify

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## 📱 Funzionalità

- **Volantino Interattivo**: Offerte della settimana con effetti flip
- **Social Media**: Link diretti a Instagram, TikTok, Facebook
- **Chatbot Intelligente**: Risponde a domande su volantino, orari, posizione, contatti
- **Google Maps**: Indicazioni stradali
- **Contatti Funzionali**: Click-to-call e click-to-email

## 🎨 Personalizzazione

### Modificare le offerte del volantino
Cerca la sezione `<!-- Volantino Section -->` nel file HTML e modifica:
- Il prezzo vecchio (`price-old`)
- Il prezzo nuovo (`price-new`)
- Le descrizioni dei prodotti

### Modificare i contatti
Cerca la sezione `<!-- Contatti Section -->` e aggiorna:
- Numero di telefono: `tel:+39-0975-970123`
- Email: `mailto:info.rossotonopolla@apuliadistribuzione.com`

### Modificare la posizione sulla mappa
Cerca l'iframe di Google Maps e sostituisci l'URL con le coordinate esatte del tuo negozio.

### Modificare gli orari
Cerca la sezione `orari-section` nel file HTML.

## 📋 Requisiti

- Nessun server richiesto (statico al 100%)
- Nessuna dipendenza esterna se non quelle caricate da CDN (Google Fonts, Font Awesome)

## 📞 Supporto

Per domande sul sito, contatta il sviluppatore.