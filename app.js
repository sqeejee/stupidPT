const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


const path = require('path');

// Add this line to serve your static files (index.html, CSS, and JS files)
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/generate-response/:question', async (req, res) => {
    const { question } = req.params;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/curie/completions',
        {
          prompt: `The user asked: ${question}\nChatGPT's response: `,
          max_tokens: 250,
          n: 1,
          stop: ["\n"],
          temperature: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        },
      );
  
      const answer = response.data.choices[0].text.trim();
      res.status(200).json({ answer });
    } catch (error) {
      res.status(500).json({error});
    }
  });
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
