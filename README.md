# Eliza - Terapeuta Virtuale PWA

Una Progressive Web App (PWA) che implementa Eliza, il famoso chatbot terapeuta.

## Caratteristiche

- 🎨 **Interfaccia Chat Moderna**: Design pulito e intuitivo che simula un'app di messaggistica
- 📱 **Progressive Web App**: Installabile su dispositivi mobili e desktop con prompt di installazione integrato
- 🔄 **Funzionalità Offline**: Grazie al Service Worker, l'app funziona anche senza connessione
- 💾 **Persistenza delle Conversazioni**: Le chat vengono salvate automaticamente e ripristinate al riavvio
- 🌓 **Tema Chiaro/Scuro**: Supporto per modalità chiara e scura con salvataggio preferenze
- ⏰ **Timestamp sui Messaggi**: Ogni messaggio mostra l'orario di invio
- 📤 **Esporta Conversazioni**: Salva le tue conversazioni come file di testo
- 🗑️ **Cancella Conversazione**: Inizia una nuova sessione quando vuoi
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
2. Clicca sul pulsante "Installa App" nella parte inferiore dell'interfaccia
3. Oppure cerca l'icona "Installa" nella barra degli indirizzi del browser
4. Clicca su "Installa" per aggiungere l'app alla home screen

### Funzionalità dell'App
- **Cambia Tema**: Clicca sull'icona del sole in alto a destra per alternare tra modalità chiara e scura
- **Esporta Conversazione**: Clicca sull'icona di download per salvare la conversazione come file di testo
- **Cancella Conversazione**: Clicca sull'icona del cestino per iniziare una nuova sessione
- **Persistenza Automatica**: Le tue conversazioni vengono salvate automaticamente e ripristinate quando riapri l'app

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

- ✅ Installabile su dispositivi con prompt dedicato
- ✅ Funziona offline
- ✅ Cache intelligente delle risorse
- ✅ Persistenza delle conversazioni con localStorage
- ✅ Tema chiaro/scuro con salvataggio preferenze
- ✅ Esportazione conversazioni
- ✅ Timestamp sui messaggi
- ✅ Icone adaptive
- ✅ Tema personalizzato
- ✅ Esperienza standalone
- ✅ Supporto safe area per dispositivi mobili

## Licenza

Vedi il file LICENSE per i dettagli.
