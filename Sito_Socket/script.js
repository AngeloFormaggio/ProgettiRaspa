// Definizioni dei termini con link
const termini = [
    { termine: 'Socket', definizione: 'Interfaccia software che consente la comunicazione tra due dispositivi in rete. Utilizzato per creare connessioni client-server.', link: 'https://it.wikipedia.org/wiki/Socket_(reti)', linkInterno:'index.html' },
    { termine: 'LAN', definizione: 'Local Area Network, una rete locale che collega dispositivi in una piccola area geografica come una casa o un ufficio.', link: 'https://it.wikipedia.org/wiki/Local_area_network' , linkInterno:'socket.html' },
    { termine: 'Indirizzo IP', definizione: 'Identificativo numerico univoco assegnato a ogni dispositivo in rete per consentire la comunicazione.', link: 'https://it.wikipedia.org/wiki/Indirizzo_IP', linkInterno:'socket.html'  },
    { termine: 'Porta', definizione: 'Punto di accesso numerico utilizzato dai protocolli per distinguere i tipi di traffico su un dispositivo.', link: 'https://it.wikipedia.org/wiki/Porta_(informatica)' , linkInterno:'socket.html' },
    { termine: 'Client', definizione: 'Dispositivo o software che richiede servizi o risorse da un server in una rete.', link: 'https://it.wikipedia.org/wiki/Client' , linkInterno:'socket.html' },
    { termine: 'Server', definizione: 'Dispositivo o software che fornisce servizi, risorse o dati ai client in una rete.', link: 'https://it.wikipedia.org/wiki/Server' , linkInterno:'socket.html' },
    { termine: 'HTTP', definizione: 'Protocollo usato per la trasmissione di informazioni su reti web. È alla base della navigazione internet.', link: 'https://it.wikipedia.org/wiki/Hypertext_Transfer_Protocol' , linkInterno:'osi.html' },
    { termine: 'SMTP', definizione: 'Simple Mail Transfer Protocol, usato per inviare e-mail tra server di posta elettronica.', link: 'https://it.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol' , linkInterno:'osi.html' },
    { termine: 'FTP', definizione: 'File Transfer Protocol, utilizzato per trasferire file tra client e server su una rete.', link: 'https://it.wikipedia.org/wiki/File_Transfer_Protocol' , linkInterno:'osi.html' },
    { termine: 'DNS', definizione: 'Domain Name System, traduce i nomi dei domini in indirizzi IP per localizzare i server su internet.', link: 'https://it.wikipedia.org/wiki/Domain_Name_System' , linkInterno:'osi.html' },
    { termine: 'IMAP', definizione: 'Internet Message Access Protocol, permette agli utenti di accedere alle e-mail direttamente dal server.', link: 'https://it.wikipedia.org/wiki/Internet_Message_Access_Protocol' , linkInterno:'tcp.html' },
    { termine: 'Cifratura', definizione: 'Processo di trasformazione dei dati in una forma protetta per prevenire accessi non autorizzati.', link: 'https://it.wikipedia.org/wiki/Crittografia' , linkInterno:'osi.html' },
    { termine: 'Codifica', definizione: 'Conversione di dati da un formato all’altro per facilitarne la trasmissione o la rappresentazione.', link: 'https://it.wikipedia.org/wiki/Codice_(teoria_dell%27informazione)' , linkInterno:'osi.html' },
    { termine: 'ICMP', definizione: 'Internet Control Message Protocol, usato per diagnosticare errori e problemi di rete.', link: 'https://it.wikipedia.org/wiki/Internet_Control_Message_Protocol' , linkInterno:'osi.html' },
    { termine: 'RJ-45', definizione: 'Tipo di connettore utilizzato per le reti cablate, come Ethernet.', link: 'https://it.wikipedia.org/wiki/RJ-45', linkInterno:'osi.html'  },
    { termine: 'Payload', definizione: 'Parte del codice di un exploit che viene eseguita sulla macchina vittima, ad esempio in un attacco.', link: 'https://it.wikipedia.org/wiki/Carico_utile_(informatica)' , linkInterno:'shell.html' },
    { termine: 'Metasploit', definizione: 'Framework per test di penetrazione che aiuta a sfruttare vulnerabilità di rete e sistemi.', link: 'https://www.metasploit.com' , linkInterno:'shell.html' },
    { termine: 'MSFVenom', definizione: 'Strumento di Metasploit per generare payload malevoli e file eseguibili per test di sicurezza.', link: 'https://www.offsec.com/metasploit-unleashed/msfvenom/' , linkInterno:'shell.html' }
];

// Funzione per creare le card dinamicamente
function caricaGlossario() {
    const contenitore = document.getElementById('glossario-container');

    termini.forEach(termino => {
        // Creazione della card
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');

        card.innerHTML = `
            <div class="card text-light bg-dark h-100">
                <div class="card-header"><a style = "text-decoration: none;" href = "${termino.linkInterno}">${termino.termine}</a></div>
                <div class="card-body">
                    <p class="card-text">${termino.definizione}</p>
                    <p><strong>Link alla definizione: </strong><a href="${termino.link}" target="_blank" class="text-warning">${termino.link}</a></p>
                </div>
            </div>
        `;

        // Aggiungi la card al contenitore
        contenitore.appendChild(card);
    });
}

// Carica il glossario al caricamento della pagina
window.onload = caricaGlossario;
