/**
 * App.js - Gestione dell'interfaccia utente per Eliza
 */

let eliza;
let isTyping = false;

// Inizializza l'app quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    eliza = new Eliza();
    initializeChat();
});

function initializeChat() {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chatContainer = document.getElementById('chatContainer');

    // Event listener per il pulsante invia
    sendButton.addEventListener('click', handleSendMessage);

    // Event listener per il tasto Enter
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isTyping) {
            handleSendMessage();
        }
    });

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

function addMessage(text, sender) {
    const chatContainer = document.getElementById('chatContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    chatContainer.appendChild(messageDiv);
    
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
    
    // Potresti mostrare un pulsante per installare l'app
    // Per ora lo salviamo solo
    console.log('PWA installabile');
});

window.addEventListener('appinstalled', () => {
    console.log('PWA installata con successo');
    deferredPrompt = null;
});
