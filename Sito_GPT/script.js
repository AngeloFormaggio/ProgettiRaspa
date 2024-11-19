// Variabili per il timer
let seconds = parseInt(sessionStorage.getItem("timer")) || 0;

// Funzione per aggiornare il timer
function updateTimer() {
    seconds++;
    sessionStorage.setItem("timer", seconds);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime =
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

    document.getElementById("timer").textContent = formattedTime;
}

// Aggiorna il timer ogni secondo
setInterval(updateTimer, 1000);
updateTimer(); // Aggiorna subito per evitare ritardi

// Logica dei bottoni (solo per index.html)
if (document.body.contains(document.querySelector('.content'))) {
    const buttons = document.querySelectorAll('.content button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(`Bottone "${button.textContent}" premuto`);
        });
    });
}

const answerField = document.getElementById("answer");
const letterCount = document.getElementById("letter-count");

answerField.addEventListener("input", () => {
    letterCount.textContent = answerField.value.length;
});

// Pulsante "Invia"
document.getElementById("send").addEventListener("click", () => {
    const answer = answerField.value.trim();
    if (answer) {
        alert("Risposta inviata: " + answer);
        answerField.value = ""; // Pulisce la risposta
        letterCount.textContent = "0"; // Resetta il contatore
    } else {
        alert("La risposta è vuota!");
    }
});


if (window.location.pathname.includes("domanda.html")) {
    const params = new URLSearchParams(window.location.search);
    const questionId = params.get("id");

    // Carica il file JSON delle domande
    fetch("domanda.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore nel caricamento del file JSON");
            }
            return response.json();
        })
        .then(data => {
            const questionText = data[questionId];
            if (questionText) {
                document.querySelector(".domanda-box p").textContent = questionText;
            } else {
                document.querySelector(".domanda-box p").textContent = "Domanda non trovata!";
            }
        })
        .catch(error => {
            console.error("Errore:", error);
            document.querySelector(".domanda-box p").textContent = "Errore nel caricamento della domanda.";
        });
}


//===================================================

 // Funzione per caricare il file JSON e mostrare le domande
async function caricaDomande() {
    try {
      const response = await fetch('domande.json');
      const domande = await response.json();
  
      const quizContainer = document.getElementById('quiz-container');
      quizContainer.innerHTML = '';
  
      domande.forEach((domanda, index) => {
        const domandaDiv = document.createElement('div');
        domandaDiv.classList.add('domanda');
  
        const titolo = document.createElement('h3');
        titolo.textContent = `Domanda ${index + 1}: ${domanda.domanda}`;
        domandaDiv.appendChild(titolo);
  
        domanda.opzioni.forEach((opzione, i) => {
          const label = document.createElement('label');
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = `domanda${index}`;
          radio.value = i;
  
          label.appendChild(radio);
          label.appendChild(document.createTextNode(opzione));
          domandaDiv.appendChild(label);
          domandaDiv.appendChild(document.createElement('br'));
        });
  
        quizContainer.appendChild(domandaDiv);
      });
    } catch (error) {
      console.error('Errore nel caricamento delle domande:', error);
    }
  }
  
  // Funzione per verificare le risposte
  async function verificaRisposte() {
    const response = await fetch('domande.json');
    const domande = await response.json();
  
    let punteggio = 0;
  
    domande.forEach((domanda, index) => {
      const rispostaSelezionata = document.querySelector(`input[name="domanda${index}"]:checked`);
      if (rispostaSelezionata && parseInt(rispostaSelezionata.value) === domanda.corretta) {
        punteggio++;
      }
    });
  
    document.getElementById('risultato').textContent = `Hai risposto correttamente a ${punteggio} su ${domande.length} domande.`;
  }
  
  // Carica le domande al caricamento della pagina
  document.addEventListener('DOMContentLoaded', caricaDomande);