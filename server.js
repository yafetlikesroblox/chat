const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static HTML file

const OPENAI_API_KEY = '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';

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'gpt-3.5-turbo',  // Or 'gpt-4', depending on what you have access to
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const botReply = openaiResponse.data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ reply: 'Sorry, something went wrong.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
