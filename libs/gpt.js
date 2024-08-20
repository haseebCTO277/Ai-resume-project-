import axios from "axios";

export const sendOpenAi = async (messages, userId, callback, max = 300, temp = 1) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const apiKey = "sk-proj-PyLnGauyFW86rpf2JwIbT3BlbkFJ4oVHWAkwaGiliMUiPV5E"; // Hardcoded API key

  console.log("Ask GPT >>>");
  messages.map((m) =>
    console.log(" - " + m.role.toUpperCase() + ": " + m.content)
  );

  const body = JSON.stringify({
    // model: "gpt-4",
    // model: "gpt-4o-2024-05-13",
    model: "gpt-4o-mini",
    messages,
    max_tokens: max,
    temperature: temp,
    user: userId,
    stream: true // Enable streaming
  });

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      console.error('Error:', res.statusText);
      return null;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        const message = line.trim();
        if (message.startsWith('data: ')) {
          const json = message.substring(6);
          if (json === '[DONE]') {
            return null;
          }
          const content = JSON.parse(json)?.choices?.[0]?.delta?.content;
          if (content) {
            callback(content);
          }
        }
      }
    }
  } catch (e) {
    console.error("GPT Error: ", e);
    return null;
  }
};