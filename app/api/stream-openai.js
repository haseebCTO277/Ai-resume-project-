// app/api/stream-openai.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  const { messages, userId } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*'); // CORS header

  const apiKey = "sk-proj-PyLnGauyFW86rpf2JwIbT3BlbkFJ4oVHWAkwaGiliMUiPV5E"; // Hardcoded API key

  console.log('Received request to /api/stream-openai');
  console.log('Messages:', messages);
  console.log('User ID:', userId);

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        model: 'gpt-4',
        messages,
        max_tokens: 100,  // Adjust based on your needs
        temperature: 1,
        stream: true,
      }),
      responseType: 'stream',
    });

    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine) {
          console.log('Streaming data:', trimmedLine);
          res.write(`data: ${trimmedLine}\n\n`);
        }
      });
    });

    response.data.on('end', () => {
      console.log('Streaming ended');
      res.write('data: [DONE]\n\n');
      res.end();
    });

    response.data.on('error', (error) => {
      console.error('Streaming error:', error);
      res.write(`event: error\ndata: ${JSON.stringify(error)}\n\n`);
      res.end();
    });

  } catch (error) {
    console.error('Request error:', error);
    res.write(`event: error\ndata: ${JSON.stringify(error)}\n\n`);
    res.end();
  }
}
