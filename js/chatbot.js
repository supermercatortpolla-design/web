// ========================================
// AI CHATBOT - RossoTono Market Polla
// Powered by NVIDIA NIM (nemotron-mini-4b)
// ========================================

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const typingIndicator = document.getElementById('typingIndicator');
const quickBtns = document.querySelectorAll('.quick-btn');

// Conversation history for context
let conversationHistory = [];

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.toggle('active');
  chatbotToggle.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
  chatbotContainer.classList.remove('active');
  chatbotToggle.classList.remove('active');
});

// Add message to chat
function addMessage(text, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + (isUser ? 'user' : 'bot');
  messageDiv.innerHTML = text.replace(/\n/g, '<br>');
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Typing indicator
function showTyping() {
  typingIndicator.classList.add('active');
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTyping() {
  typingIndicator.classList.remove('active');
}

// Local fallback responses (when API fails)
function getLocalResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('ciao') || msg.includes('buongiorno') || msg.includes('buonasera') || msg.includes('salve') || msg.includes('hello')) {
    return "Ciao! Benvenuto da RossoTono Market Polla! 👋 Sono qui per aiutarti. Cosa vorresti sapere?";
  }

  if (msg.includes('volantino') || msg.includes('offerta') || msg.includes('scont') || msg.includes('promozion') || msg.includes('prezzo')) {
    return "📰 Clicca sul pulsante 'Sfoglia il Volantino' per vedere tutte le offerte della settimana!\n\nIl volantino si apre in una nuova pagina con tutte le promozioni attive.";
  }

  if (msg.includes('orari') || msg.includes('apert') || msg.includes('chiuso') || msg.includes('orario')) {
    return "🕐 I nostri orari:\n\n📅 Lunedì - Sabato: 08:00 - 20:30\n📅 Domenica: 09:00 - 13:00\n\nTi aspettiamo!";
  }

  if (msg.includes('dove') || msg.includes('indirizzo') || msg.includes('mappa') || msg.includes('polla') || msg.includes('ubicazione')) {
    return "📍 Ci trovi a Polla (SA)!\n\n📌 Via Cotrazzo 2, 84038 Polla SA\n\nClicca su 'Indicazioni' nella sezione mappa per navigare direttamente da Google Maps.";
  }

  if (msg.includes('contatt') || msg.includes('telefono') || msg.includes('mail') || msg.includes('cellulare')) {
    return "📞 I nostri contatti:\n\n📱 Telefono: 0975 1902032\n📧 Email: supermercatort.polla@gmail.com\n\nClicca sui pulsanti per chiamarci o scriverci!";
  }

  if (msg.includes('servizi') || msg.includes('macelleria') || msg.includes('gastronomia')) {
    return "🛒 I nostri servizi:\n\n🥩 Macelleria con carne da filiera certificata\n🧀 Gastronomia artigianale\n🍞 Panetteria\n🧈 Parmigiano Reggiano DOP\n🇮🇹 Prodotti italiani di qualità\n\nParcheggio gratuito disponibile!";
  }

  if (msg.includes('pagamento') || msg.includes('bancomat') || msg.includes('carta')) {
    return "💳 Accettiamo:\n\n✅ Contanti\n✅ Bancomat\n✅ Carte di credito (Visa, Mastercard)\n✅ POS\n\nPagamenti sicuri e comodi!";
  }

  if (msg.includes('parcheggio')) {
    return "🅿️ Sì! Abbiamo un parcheggio gratuito per tutti i nostri clienti.";
  }

  if (msg.includes('grazie') || msg.includes('grazie mille') || msg.includes('ok') || msg.includes('perfetto')) {
    return "😊 Di nulla! È un piacere aiutarti!\n\nBuona spesa da RossoTono! 🛒";
  }

  return "Non ho capito bene. Prova a chiedere di:\n\n📰 Volantino e offerte\n🕐 Orari di apertura\n📍 Dove siamo\n📞 Contatti\n🛒 Servizi disponibili\n💳 Metodi di pagamento\n\nOppure chiamaci al 0975 1902032!";
}

// Call AI API
async function callAI(userMessage) {
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        conversationHistory: conversationHistory
      })
    });

    if (!response.ok) {
      throw new Error('API error: ' + response.status);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('AI API error:', error);
    return null; // Will trigger fallback
  }
}

// Handle user message
async function handleUserMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, true);
  chatbotInput.value = '';

  // Update conversation history
  conversationHistory.push({ role: 'user', content: message });

  showTyping();

  // Try AI first, fallback to local
  let response = await callAI(message);

  if (!response) {
    // Fallback to local responses
    await new Promise(resolve => setTimeout(resolve, 800));
    response = getLocalResponse(message);
  }

  hideTyping();
  addMessage(response, false);

  // Update conversation history
  conversationHistory.push({ role: 'assistant', content: response });

  // Keep only last 10 messages for context
  if (conversationHistory.length > 10) {
    conversationHistory = conversationHistory.slice(-10);
  }
}

// Event listeners
chatbotSend.addEventListener('click', handleUserMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleUserMessage();
  }
});

// Quick buttons
quickBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    const question = btn.dataset.question;
    addMessage(btn.textContent, true);

    conversationHistory.push({ role: 'user', content: question });

    showTyping();

    let response = await callAI(question);

    if (!response) {
      await new Promise(resolve => setTimeout(resolve, 800));
      response = getLocalResponse(question);
    }

    hideTyping();
    addMessage(response, false);

    conversationHistory.push({ role: 'assistant', content: response });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
