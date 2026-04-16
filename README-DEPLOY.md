# RossoTono Market Polla - Deploy su Netlify

## Struttura Progetto

```
Web/
├── index.html              # Sito principale
├── js/
│   └── chatbot.js          # Script chatbot AI
├── data/
│   └── knowledge.json      # Knowledge base per AI
├── netlify/
│   └── functions/
│       └── chat.js         # API serverless NVIDIA NIM
├── Foto/                   # Immagini galleria
├── netlify.toml            # Config Netlify
└── package.json            # Dipendenze
```

## Passaggi per il Deploy

### 1. Configurare Environment Variables su Netlify

Vai su Netlify Dashboard → Site Settings → Environment Variables:

| Variabile | Valore |
|-----------|--------|
| `NVIDIA_API_KEY` | `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` |

⚠️ **IMPORTANTE**: Non condividere mai la API key pubblicamente!

### 2. Deploy da GitHub

1. Crea repository su GitHub
2. Connetti a Netlify (New site from Git)
3. Seleziona il repository
4. Netlify rileverà automaticamente `netlify.toml`

### 3. Deploy da CLI (alternativa)

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Test Locale

```bash
# Installa dipendenze
npm install

# Avvia dev server con functions
netlify dev
```

## Note Importanti

- Il piano gratuito Netlify include **125.000 function calls/mese**
- Il modello `nvidia/nemotron-mini-4b-instruct` è ottimizzato per risposte veloci
- Se l'API fallisce, il chatbot usa automaticamente il fallback locale
- Le FAQ e le informazioni del negozio sono in `data/knowledge.json`

## Aggiornare la Knowledge Base

Per aggiungere nuove informazioni, modifica `data/knowledge.json`:

```json
{
  "faq": [
    {
      "question": "Nuova domanda?",
      "answer": "Risposta..."
    }
  ]
}
```

## Costi Stimati

- Netlify Functions: GRATIS (fino a 125K chiamate/mese)
- NVIDIA NIM API: Variabile (verificare pricing attuale)
- Hosting: GRATIS su Netlify
