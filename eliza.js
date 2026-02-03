/**
 * Eliza - Terapeuta Virtuale
 * Implementazione estesa con supporto per più argomenti e situazioni
 */

class Eliza {
    constructor() {
        this.memory = [];
        this.previousInput = '';
        this.reflections = {
            'sono': 'sei',
            'ero': 'eri',
            'io': 'tu',
            'me': 'te',
            'mio': 'tuo',
            'mia': 'tua',
            'miei': 'tuoi',
            'mie': 'tue',
            'mi': 'ti',
            'tu': 'io',
            'tuo': 'mio',
            'tua': 'mia',
            'tuoi': 'miei',
            'tue': 'mie',
            'ti': 'mi',
            'sei': 'sono',
            'eri': 'ero',
            'te': 'me',
        };
        
        this.patterns = this.initializePatterns();
        this.quitWords = ['quit', 'esci', 'bye', 'ciao', 'addio', 'arrivederci'];
    }

    initializePatterns() {
        return [
            // Saluti e introduzione
            {
                pattern: /ciao|salve|buongiorno|buonasera|hey|ehi/i,
                responses: [
                    'Ciao! Come ti senti oggi?',
                    'Salve! Cosa ti porta qui oggi?',
                    'Ciao! Parlami di te.',
                    'Salve! Come posso aiutarti?'
                ]
            },
            
            // Stato emotivo - tristezza
            {
                pattern: /(?:sono|mi sento|sto) (?:triste|depresso|gi[uù]|male|abbattuto|melanconico)/i,
                responses: [
                    'Mi dispiace che tu ti senta così. Puoi dirmi di più su cosa ti fa sentire triste?',
                    'Capisco che ti senti giù. Da quanto tempo ti senti così?',
                    'È normale sentirsi tristi a volte. Cosa pensi abbia causato questo sentimento?',
                    'Mi dispiace. Cosa succede nella tua vita in questo momento?'
                ]
            },
            
            // Stato emotivo - felicità
            {
                pattern: /(?:sono|mi sento|sto) (?:felice|contento|bene|allegro|euforico|entusiasta)/i,
                responses: [
                    'È meraviglioso sentirti così! Cosa ti ha reso felice?',
                    'Che bello! Raccontami di più su quello che ti fa stare bene.',
                    'Sono contento per te! Cos\'è successo di positivo?',
                    'Ottimo! Vuoi condividere con me la tua gioia?'
                ]
            },
            
            // Ansia e preoccupazione
            {
                pattern: /(?:sono|mi sento) (?:ansioso|preoccupato|stressato|nervoso|agitato)/i,
                responses: [
                    'L\'ansia può essere difficile da gestire. Cosa ti preoccupa in particolare?',
                    'Capisco che tu sia preoccupato. Vuoi parlarmene?',
                    'Lo stress può accumularsi. Quali sono le tue principali fonti di stress?',
                    'Cosa ti fa sentire ansioso? Parliamone insieme.'
                ]
            },
            
            // Problemi con persone specifiche
            {
                pattern: /(?:mio|mia) (madre|padre|fratello|sorella|marito|moglie|fidanzato|fidanzata|amico|amica|capo|collega) (.*)/i,
                responses: [
                    'Parlami di più del tuo {1}. Che tipo di {2}?',
                    'Come ti fa sentire il tuo {1} quando {2}?',
                    'Quanto è importante per te il tuo {1}?',
                    'Da quanto tempo hai questi problemi con il tuo {1}?'
                ]
            },
            
            // Famiglia
            {
                pattern: /famiglia|genitori|padre|madre|fratello|sorella/i,
                responses: [
                    'La famiglia è importante. Parlami della tua famiglia.',
                    'Come vanno le cose con la tua famiglia?',
                    'La tua famiglia ti supporta?',
                    'Vuoi dirmi di più sulla tua situazione familiare?'
                ]
            },
            
            // Lavoro e carriera
            {
                pattern: /lavoro|carriera|professione|ufficio|capo|collega|dipendente/i,
                responses: [
                    'Il lavoro può essere stressante. Come vanno le cose sul lavoro?',
                    'Parlami della tua situazione lavorativa.',
                    'Cosa ti piace o non ti piace del tuo lavoro?',
                    'Come ti senti riguardo alla tua carriera?'
                ]
            },
            
            // Relazioni sentimentali
            {
                pattern: /(?:amore|relazione|partner|fidanzato|fidanzata|marito|moglie|innamorato)/i,
                responses: [
                    'Le relazioni possono essere complicate. Vuoi parlare della tua?',
                    'Come va la tua relazione sentimentale?',
                    'L\'amore può portare gioia e dolore. Come ti senti?',
                    'Parlami del tuo partner. Come vanno le cose tra voi?'
                ]
            },
            
            // Ricordi e passato
            {
                pattern: /ricordo|ricordare|passato|quando ero|una volta/i,
                responses: [
                    'I ricordi sono importanti. Cosa ricordi in particolare?',
                    'Questo ricordo è significativo per te?',
                    'Come ti fa sentire pensare al passato?',
                    'Vuoi esplorare di più questo ricordo?'
                ]
            },
            
            // Sogni e aspirazioni
            {
                pattern: /sogno|desiderio|vorrei|speranza|futuro|obiettivo/i,
                responses: [
                    'È importante avere sogni. Qual è il tuo sogno?',
                    'Cosa ti impedisce di realizzare questo desiderio?',
                    'Parlami delle tue aspirazioni per il futuro.',
                    'Come pensi di raggiungere i tuoi obiettivi?'
                ]
            },
            
            // Problemi di sonno
            {
                pattern: /sonno|dormire|insonnia|incubi|riposo/i,
                responses: [
                    'Il sonno è importante per il benessere. Hai problemi a dormire?',
                    'Parlami dei tuoi problemi di sonno.',
                    'Da quanto tempo hai difficoltà a dormire?',
                    'Cosa pensi causi i tuoi problemi di sonno?'
                ]
            },
            
            // Negazione
            {
                pattern: /no|non|mai|niente|nessuno/i,
                responses: [
                    'Perché no?',
                    'Sei sicuro?',
                    'Puoi elaborare?',
                    'Sembra molto definitivo. Puoi spiegarmi meglio?'
                ]
            },
            
            // Domande dirette ad Eliza
            {
                pattern: /(?:tu|eliza) (?:chi|cosa|come|perch[eé]|quando|dove)(.*)/i,
                responses: [
                    'Non parliamo di me. Parliamo di te.',
                    'Perché ti interessa sapere questo di me?',
                    'Preferirei parlare di te. Come ti senti?',
                    'Io sono qui per ascoltarti. Parlami di te.'
                ]
            },
            
            // Perché
            {
                pattern: /perch[eé] (.*)/i,
                responses: [
                    'Perché pensi che {1}?',
                    'Tu perché credi?',
                    'È questa la vera ragione?',
                    'Cosa ti fa pensare che sia a causa di questo?'
                ]
            },
            
            // Mi sembra / Penso che
            {
                pattern: /(?:mi sembra|penso|credo|ritengo|immagino) (?:che )?(.*)/i,
                responses: [
                    'Sei sicuro che {1}?',
                    'Cosa ti fa pensare che {1}?',
                    'Come ti fa sentire il fatto che {1}?',
                    'Puoi dirmi di più su questo?'
                ]
            },
            
            // Sempre
            {
                pattern: /sempre (.*)/i,
                responses: [
                    'Davvero sempre?',
                    'Puoi pensare a un momento specifico in cui {1}?',
                    'Sempre è una parola forte. Sei sicuro?',
                    'Cosa ti fa dire sempre?'
                ]
            },
            
            // Pattern generali con "io"
            {
                pattern: /io (.*)/i,
                responses: [
                    'Tu {1}?',
                    'Perché tu {1}?',
                    'Come ti fa sentire il fatto che tu {1}?',
                    'Da quanto tempo tu {1}?'
                ]
            },
            
            // Scuse
            {
                pattern: /scusa|scusami|mi dispiace|perdona/i,
                responses: [
                    'Non c\'è bisogno di scusarsi.',
                    'Cosa ti fa sentire in dovere di scusarti?',
                    'Va bene. Continua pure.',
                    'Non preoccuparti. Dimmi di più.'
                ]
            },
            
            // Grazie
            {
                pattern: /grazie|ti ringrazio/i,
                responses: [
                    'Prego. Come ti senti ora?',
                    'Sono qui per questo. Vuoi parlare d\'altro?',
                    'Di niente. C\'è altro che vuoi condividere?',
                    'È un piacere aiutarti. Continua pure.'
                ]
            },
            
            // Pattern di default - risposta generica
            {
                pattern: /.*/,
                responses: [
                    'Interessante. Puoi dirmi di più?',
                    'Capisco. Come ti fa sentire questo?',
                    'Continua, ti ascolto.',
                    'Dimmi di più su questo.',
                    'Come mai dici questo?',
                    'E questo cosa significa per te?',
                    'Parlami di più di questo aspetto.',
                    'Sto seguendo. Vai avanti.'
                ]
            }
        ];
    }

    reflect(text) {
        const words = text.split(' ');
        const reflected = words.map(word => {
            const lowerWord = word.toLowerCase();
            return this.reflections[lowerWord] || word;
        });
        return reflected.join(' ');
    }

    transform(text) {
        // Controlla ogni pattern
        for (let i = 0; i < this.patterns.length; i++) {
            const pattern = this.patterns[i];
            const match = text.match(pattern.pattern);
            
            if (match) {
                // Scegli una risposta casuale
                const response = pattern.responses[
                    Math.floor(Math.random() * pattern.responses.length)
                ];
                
                // Sostituisci i placeholder {1}, {2}, etc. con i gruppi catturati
                let finalResponse = response;
                for (let j = 1; j < match.length; j++) {
                    if (match[j]) {
                        const reflected = this.reflect(match[j].trim());
                        finalResponse = finalResponse.replace(`{${j}}`, reflected);
                    }
                }
                
                // Salva in memoria per riferimento futuro
                if (match[1]) {
                    this.memory.push(match[1]);
                    if (this.memory.length > 5) {
                        this.memory.shift();
                    }
                }
                
                return finalResponse;
            }
        }
        
        // Fallback
        return this.patterns[this.patterns.length - 1].responses[0];
    }

    getResponse(input) {
        // Pulisci l'input
        let cleanInput = input.trim().toLowerCase();
        
        // Controlla se l'utente vuole uscire
        if (this.quitWords.some(word => cleanInput.includes(word))) {
            return 'È stato un piacere parlare con te. Prenditi cura di te stesso. Torna quando vuoi!';
        }
        
        // Controlla input vuoto
        if (!cleanInput) {
            return 'Dimmi qualcosa. Sono qui per ascoltarti.';
        }
        
        // Genera la risposta
        const response = this.transform(cleanInput);
        
        this.previousInput = cleanInput;
        return response;
    }

    reset() {
        this.memory = [];
        this.previousInput = '';
    }
}

// Esporta per uso in altri file
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Eliza;
}
