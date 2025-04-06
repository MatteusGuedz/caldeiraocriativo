const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export async function sendMessageToOpenAI(message: string) {
   
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });
  
    const data = await res.json();

console.log("OpenAI response:", JSON.stringify(data, null, 2));

if (!res.ok) {
  console.error("Erro HTTP da OpenAI:", res.status, data);
  return `Erro: ${data.error?.message || "Resposta da API inesperada."}`;
}

if (!data.choices || !data.choices.length || !data.choices[0].message) {
  console.error("Resposta inválida da OpenAI:", data);
  return "Erro: Resposta da API inesperada.";
}

return data.choices[0].message.content;
  }
