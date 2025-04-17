const fetch = require('node-fetch'); // You might need to install this if it's not already available in your environment

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;

        const openaiAPIKey = process.env.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; // Make sure to set your API key in environment variables on Vercel

        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiAPIKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{"role": "user", "content": message}],
                    max_tokens: 150,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            res.status(200).json({ reply: data.choices[0].message.content.trim() });

        } catch (error) {
            console.error("OpenAI API Error:", error);
            res.status(500).json({ reply: "Sorry, there was an error with the API request." });
        }
    } else {
        res.status(405).json({ reply: "Method Not Allowed" });
    }
}
