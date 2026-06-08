export default async function handler(req, res) {
  // Autorise les requêtes depuis ton site
  res.setHeader('Access-Control-Allow-Origin', 'https://www.campusstartop.com')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { messages, profile } = req.body

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,  // clé secrète, jamais visible
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: `Tu es Sofia, conseillère bienveillante de Campus Startop.
Campus Startop est une plateforme de formation en ligne pour femmes entrepreneures.
Ton rôle : comprendre le profil de l'utilisatrice et lui proposer un parcours personnalisé
parmi les formations disponibles. Réponds toujours en français, avec chaleur et encouragement.
Profil actuel de l'utilisatrice : ${JSON.stringify(profile)}`,
      messages: messages
    })
  })

  const data = await response.json()
  res.json({ reply: data.content[0].text })
}