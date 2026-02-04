/**
 * App.js - Gestione dell'interfaccia utente per Eliza
 */

let eliza;
let isTyping = false;
let chatHistory = [];

// Inizializza l'app quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    eliza = new Eliza();
    loadChatHistory();
    initializeChat();
});

function initializeChat() {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatContainer = document.getElementById('chatContainer');
    const clearButton = document.getElementById('clearButton');
    const exportButton = document.getElementById('exportButton');
    const themeToggle = document.getElementById('themeToggle');
    const installButton = document.getElementById('installButton');

    // Event listener per il pulsante invia
    sendButton.addEventListener('click', handleSendMessage);

    // Event listener per il tasto Enter
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isTyping) {
            handleSendMessage();
        }
    });
    
    // Event listener per cancellare la conversazione
    clearButton.addEventListener('click', () => {
        if (chatHistory.length > 0 && confirm('Vuoi davvero cancellare la conversazione?')) {
            clearChatHistory();
        }
    });
    
    // Event listener per esportare la conversazione
    exportButton.addEventListener('click', exportConversation);
    
    // Event listener per cambiare tema
    themeToggle.addEventListener('click', toggleTheme);
    
    // Event listener per installare la PWA
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Scelta utente: ${outcome}`);
        deferredPrompt = null;
        installButton.style.display = 'none';
    });
    
    // Carica il tema salvato
    loadTheme();

    // Focus automatico sull'input
    userInput.focus();
}

function handleSendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (!message || isTyping) return;

    // Aggiungi messaggio utente
    addMessage(message, 'user');
    
    // Pulisci input
    userInput.value = '';
    
    // Mostra indicatore typing
    showTypingIndicator();
    
    // Simula un ritardo per la risposta (più naturale)
    const delay = 800 + Math.random() * 700; // 800-1500ms
    
    setTimeout(() => {
        hideTypingIndicator();
        const response = eliza.getResponse(message);
        addMessage(response, 'eliza');
    }, delay);
}

function addMessage(text, sender, skipSave = false) {
    const chatContainer = document.getElementById('chatContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    const timestamp = document.createElement('div');
    timestamp.className = 'message-timestamp';
    timestamp.textContent = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.appendChild(bubbleDiv);
    messageDiv.appendChild(timestamp);
    chatContainer.appendChild(messageDiv);
    
    // Salva nella cronologia
    if (!skipSave) {
        chatHistory.push({ text, sender, timestamp: Date.now() });
        saveChatHistory();
    }
    
    // Scroll automatico verso il basso
    scrollToBottom();
}

function showTypingIndicator() {
    isTyping = true;
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.classList.add('active');
    scrollToBottom();
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.classList.remove('active');
}

function scrollToBottom() {
    const chatContainer = document.getElementById('chatContainer');
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
}

// Gestione dello stato online/offline della PWA
window.addEventListener('online', () => {
    updateStatus('Online');
});

window.addEventListener('offline', () => {
    updateStatus('Offline - Modalità cache');
});

function updateStatus(status) {
    const statusElement = document.querySelector('.status');
    if (statusElement) {
        statusElement.textContent = status;
    }
}

// Gestione dell'installazione della PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Previeni la visualizzazione automatica
    e.preventDefault();
    // Salva l'evento per usarlo dopo
    deferredPrompt = e;
    
    // Mostra il pulsante di installazione
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.style.display = 'flex';
    }
    
    console.log('PWA installabile');
});

window.addEventListener('appinstalled', () => {
    console.log('PWA installata con successo');
    deferredPrompt = null;
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.style.display = 'none';
    }
});

// Funzioni per gestire la cronologia della chat
function saveChatHistory() {
    try {
        localStorage.setItem('eliza-chat-history', JSON.stringify(chatHistory));
    } catch (e) {
        console.error('Impossibile salvare la cronologia', e);
    }
}

function loadChatHistory() {
    try {
        const saved = localStorage.getItem('eliza-chat-history');
        if (saved) {
            chatHistory = JSON.parse(saved);
            // Ripristina i messaggi salvati
            chatHistory.forEach(msg => {
                addMessage(msg.text, msg.sender, true);
            });
        }
    } catch (e) {
        console.error('Impossibile caricare la cronologia', e);
        chatHistory = [];
    }
}

function clearChatHistory() {
    chatHistory = [];
    localStorage.removeItem('eliza-chat-history');
    
    // Pulisci l'interfaccia
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = `
        <div class="welcome-message">
            <p>Ciao! Sono Eliza, il tuo terapeuta virtuale.</p>
            <p>Parlami di quello che ti preoccupa oggi.</p>
        </div>
    `;
    
    // Reset Eliza
    eliza.reset();
}

function exportConversation() {
    if (chatHistory.length === 0) {
        alert('Non ci sono messaggi da esportare.');
        return;
    }
    
    let text = 'Conversazione con Eliza\n';
    text += '='.repeat(50) + '\n\n';
    
    chatHistory.forEach(msg => {
        const date = new Date(msg.timestamp);
        const time = date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
        const sender = msg.sender === 'user' ? 'Tu' : 'Eliza';
        text += `[${time}] ${sender}: ${msg.text}\n\n`;
    });
    
    // Crea un blob e scaricalo
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eliza-conversazione-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Funzioni per gestire il tema
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    try {
        localStorage.setItem('eliza-theme', theme);
    } catch (e) {
        console.error('Impossibile salvare il tema', e);
    }
}

function loadTheme() {
    try {
        const savedTheme = localStorage.getItem('eliza-theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Rileva preferenza sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    } catch (e) {
        console.error('Impossibile caricare il tema', e);
    }
}
