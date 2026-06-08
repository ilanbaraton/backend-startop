// Widget Sofia — Campus Startop
// N'oublie pas de changer 'ton-projet' par le vrai lien généré par Vercel !
const BACKEND_URL = 'https://backend-startop-bods.vercel.app/api/chat'
let conversationHistory = []
let userProfile = {}

async function sendMessage(userMessage) { 
  conversationHistory.push({ role: 'user', content: userMessage }) 
  const response = await fetch(BACKEND_URL, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ 
      messages: conversationHistory, 
      profile: userProfile 
    }) 
  }) 
  
  const data = await response.json() 
  conversationHistory.push({ role: 'assistant', content: data.reply }) 
  return data.reply
}
