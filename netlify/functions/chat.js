const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'nvidia/nemotron-mini-4b-instruct';

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight
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

    // Knowledge base context
    const knowledgeContext = `
CONTESTO NEGOZIO - RossoTono Market Polla:

INFORMAZIONI BASE:
- Nome: RossoTono Market Polla
- Indirizzo: Via Cotrazzo 2, 84038 Polla (SA)
- Telefono: 0975 1902032
- Email: supermercatort.polla@gmail.com

ORARI:
- Lunedì-Sabato: 08:00-20:30
- Domenica: 09:00-13:00

SERVIZI:
- Parcheggio gratuito
- Macelleria con carne da filiera certificata
- Gastronomia artigianale
- Panetteria
- Prodotti DOP (Parmigiano Reggiano)
- Prodotti italiani di qualità
- Pagamento: Bancomat, carte credito, contanti

SOCIAL:
- Instagram: @rossotono
- TikTok: @rossotonosupermercati
- Facebook: RossotonoSupermercati

VOLANTINO:
- Link: https://promosulweb.it/nuovaperturamarket/
- Aggiornato settimanalmente

POSIZIONE:
- Google Maps: https://maps.app.goo.gl/2vKNSY28oiyXcP2M9
- Coordinate: 40.5145759, 15.5043953
`;

    // Build messages array
    const messages = [
      {
        role: 'system',
        content: `Sei l'assistente virtuale di RossoTono Market Polla, un supermercato italiano di qualità.

${knowledgeContext}

REGOLE:
- Rispondi SOLO in italiano
- Sii cordiale e professionale
- Usa emoji con moderazione
- Se non sai qualcosa, rimanda al numero 0975 1902032
- Non inventare informazioni
- Per il volantino, invita sempre a cliccare sul link ufficiale
- Risposte concise ma complete

Rispondi alla domanda del cliente usando le informazioni fornite sopra.`
      },
      ...conversationHistory.slice(-6), // Keep last 3 exchanges for context
      { role: 'user', content: message }
    ];

    // Call NVIDIA NIM API
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
        max_tokens: 500,
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
