# Eliza - Terapeuta Virtuale PWA

Una Progressive Web App (PWA) che implementa Eliza, il famoso chatbot terapeuta.

## Caratteristiche

- 🎨 **Interfaccia Chat Moderna**: Design pulito e intuitivo che simula un'app di messaggistica
- 📱 **Progressive Web App**: Installabile su dispositivi mobili e desktop
- 🔄 **Funzionalità Offline**: Grazie al Service Worker, l'app funziona anche senza connessione
- 🧠 **Logica Estesa**: Pattern matching avanzato per gestire più argomenti e situazioni:
  - Emozioni (tristezza, felicità, ansia)
  - Relazioni (famiglia, amici, partner)
  - Lavoro e carriera
  - Sogni e aspirazioni
  - Ricordi e passato
  - E molto altro...
- 🇮🇹 **Lingua Italiana**: Completamente localizzata in italiano
- ⚡ **Leggera e Veloce**: Nessuna dipendenza esterna, solo JavaScript puro

## Come Usare

### Opzione 1: Apri direttamente nel browser
1. Apri il file `index.html` nel tuo browser
2. Inizia a chattare con Eliza!

### Opzione 2: Usa un server locale
```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js
npx http-server

# Con PHP
php -S localhost:8000
```

Poi apri `http://localhost:8000` nel browser.

### Installazione come PWA
1. Apri l'app nel browser (Chrome, Edge, Safari)
2. Cerca l'icona "Installa" nella barra degli indirizzi
3. Clicca su "Installa" per aggiungere l'app alla home screen

## Tecnologie

- HTML5
- CSS3 (con variabili CSS e animazioni)
- JavaScript ES6+
- Service Worker API
- Web App Manifest

## Struttura del Progetto

```
eliza/
├── index.html          # Pagina principale
├── style.css           # Stili CSS
├── eliza.js            # Logica del chatbot
├── app.js              # Gestione UI e interazioni
├── sw.js               # Service Worker per PWA
├── manifest.json       # Manifest per PWA
├── icon-192.png        # Icona 192x192
├── icon-512.png        # Icona 512x512
└── README.md           # Questo file
```

## Funzionalità PWA

- ✅ Installabile su dispositivi
- ✅ Funziona offline
- ✅ Cache intelligente delle risorse
- ✅ Icone adaptive
- ✅ Tema personalizzato
- ✅ Esperienza standalone

## Licenza

Vedi il file LICENSE per i dettagli.
