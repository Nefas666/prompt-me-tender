
import axios from 'axios';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { numberOfDays, timeOfYear, typeOfTransport, priceRange } = req.body;
    const prompt = `Suggest 3 perfect destinations for a trip in ${timeOfYear}, with a budget of ${priceRange}, lasting ${numberOfDays}, choosing ${typeOfTransport} to move?`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const generatedText = response.data.choices[0].text.trim();

      res.status(200).json({ generatedText });
    } catch (error) {
      if (error.response) {
              console.error(error.response.status, error.response.data);
              res.status(error.response.status).json(error.response.data);
            } else {
              console.error(`Error with OpenAI API request: ${error.message}`);
              res.status(500).json({
                error: {
                  message: 'An error occurred during your request.',
                },
              });
            }
    }
  } else {
    res.status(404).json({ error: 'Invalid request method.' });
  }
}

