const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'nvidia/nemotron-mini-4b-instruct';

// FAQ COMPLETE INTEGRATE NEL PROMPT
const FAQ_CONTEXT = `
FAQ COMPLETE - RossoTono Market Polla:

## ORARI E APERTURA
Q: Quali sono gli orari?
A: Lunedì-Sabato: 08:30-20:00. Domenica: 08:30-12:00.

Q: Siete aperti la domenica?
A: Sì, siamo aperti la domenica dalle 08:30 alle 12:00.

Q: Siete aperti i festivi?
A: Per i giorni festivi gli orari possono variare. Contattaci al 0975 1902032.

## POSIZIONE
Q: Dove vi trovate?
A: Via Cotrazzo 2, 84038 Polla (SA). Parcheggio gratuito disponibile.

Q: Come arrivo?
A: Imposta il navigatore su Via Cotrazzo 2, Polla (SA). Link Google Maps: https://maps.app.goo.gl/2vKNSY28oiyXcP2M9

## CONTATTI
Q: Qual è il telefono?
A: 0975 1902032

Q: Qual è l'email?
A: supermercatort.polla@gmail.com

## VOLANTINO E OFFERTE
Q: Dove trovo il volantino?
A: Clicca su "Sfoglia il Volantino" sul sito https://rossotono-polla.netlify.app/ oppure vai su https://promosulweb.it/nuovaperturamarket/

Q: Quali offerte ci sono?
A: Le offerte cambiano settimanalmente. Controlla il volantino online per tutte le promozioni attive.

Q: Avete sconti?
A: Sì! Controlla il volantino per 3x2, seconde unità scontate e altre promozioni.

## REPARTI E PRODOTTI
Q: Quali reparti avete?
A: Frutta e Verdura, Gastronomia e piatti pronti, Macelleria (banco assistito + self), Panetteria, Salumi e formaggi, Surgelati, Vini e liquori, Pet.

Q: Cosa vendete in gastronomia?
A: Prosciutto di Parma, Parmigiano 30 mesi, Grana Padano 20 mesi, mortadella, bresaola, capocollo, prosciutto cotto, piatti pronti.

Q: Avete la macelleria?
A: Sì! Macelleria con banco assistito e self service. Carne da filiera certificata.

Q: Avete prodotti senza glutine?
A: Come supermercato completo possiamo avere prodotti per esigenze specifiche. Verifica disponibilità in negozio.

Q: Avete prodotti tipici?
A: Sì! Prosciutto di Parma, Parmigiano, Grana Padano, vini Rossotono legati al territorio pugliese.

Q: Avete prodotti biologici?
A: Controlla il reparto Frutta e Verdura per prodotti bio e locali.

Q: Avete il pane?
A: Sì, reparto Panetteria. Per tipi specifici e orari sfornata, chiedi in negozio.

## PAGAMENTI
Q: Quali pagamenti accettate?
A: Contanti, Bancomat, Carte di credito (Visa, Mastercard), Contactless, Apple Pay, Google Pay, Buoni pasto, Ticket Restaurant.

Q: Accettate buoni pasto?
A: Sì! Accettiamo buoni pasto e Ticket Restaurant.

Q: Accettate Apple Pay?
A: Sì, accettiamo pagamenti contactless inclusi Apple Pay e Google Pay.

## SERVIZI
Q: Quali servizi offrite?
A: Parcheggio gratuito, ricariche telefoniche, pagamento bollette, carte di credito, buoni pasto, domenica aperti, App Speasy.

Q: Fate consegne a domicilio?
A: No, non offriamo consegna a domicilio. Vieni a trovarci in negozio!

Q: Fate vassoi per feste?
A: Per ordini speciali, vassoi e cesti, contattaci al 0975 1902032.

Q: Avete il parcheggio?
A: Sì, parcheggio gratuito per tutti i clienti.

## SOCIAL
Q: Avete Instagram?
A: Sì! @rossotono - https://instagram.com/rossotono

Q: Avete Facebook?
A: Sì! Rossotono Supermercati - https://facebook.com/RossotonoSupermercati

Q: Avete TikTok?
A: Sì! @rossotonosupermercati - https://tiktok.com/@rossotonosupermercati

## SITO WEB
Q: Avete un sito?
A: Sì! https://rossotono-polla.netlify.app/

## MARCHE
Q: Quali marche vendete?
A: Selezione Rossotono (premium), linea RT (qualità a prezzo competitivo), marchi nazionali.

## ALTRO
Q: Posso entrare con il cane?
A: Per motivi igienici, verifica la policy direttamente in negozio.

Q: Fate prezzi all'ingrosso?
A: Siamo un supermercato al dettaglio, non cash & carry.
`;

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { message, conversationHistory = [] } = JSON.parse(event.body);

    if (!message) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message required' }) };
    }

    // System prompt con FAQ integrate
    const systemPrompt = `Sei l'assistente virtuale di RossoTono Market Polla, un supermercato italiano di qualità situato a Polla (SA).

INFORMAZIONI BASE:
- Indirizzo: Via Cotrazzo 2, 84038 Polla (SA)
- Telefono: 0975 1902032
- Email: supermercatort.polla@gmail.com
- Sito web: https://rossotono-polla.netlify.app/
- Volantino: https://promosulweb.it/nuovaperturamarket/

ORARI:
- Lunedì-Sabato: 08:30-20:00
- Domenica: 08:30-12:00

${FAQ_CONTEXT}

REGOLE IMPORTANTI:
1. Rispondi SOLO in italiano
2. Sii cordiale, professionale e conciso (2-4 frasi)
3. Usa poche emoji (massimo 1-2 per risposta)
4. Usa le informazioni delle FAQ sopra per rispondere
5. Per domande su offerte specifiche, rimanda sempre al volantino online
6. Se non conosci la risposta, rimanda al telefono 0975 1902032
7. NON inventare MAI informazioni
8. Per prodotti specifici non menzionati, invita a verificare in negozio

Rispondi alla domanda del cliente in modo utile e preciso.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6),
      { role: 'user', content: message }
    ];

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 400,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('NVIDIA API Error:', errorData);
      throw new Error(`NVIDIA API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'Mi dispiace, non riesco a rispondere ora. Chiamaci al 0975 1902032!';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: aiResponse.trim(),
        model: MODEL
      })
    };

  } catch (error) {
    console.error('Chat function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Errore temporaneo. Chiamaci al 0975 1902032!',
        fallback: true
      })
    };
  }
};
