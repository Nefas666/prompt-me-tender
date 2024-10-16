import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { numberOfDays, timeOfYear, typeOfTransport, priceRange } = req.body;
    const prompt = `Suggest 3 perfect destinations for a trip in ${timeOfYear}, with a budget of ${priceRange}, lasting ${numberOfDays}, choosing ${typeOfTransport} to move.`;

    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(prompt);
      const generatedText = result.response.text();

      res.status(200).json({ generatedText });
    } catch (error) {
      console.error(`Error with Google Gemini API request: ${error.message}`);
      if (error.response) {
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
      }
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  } else {
    res.status(404).json({ error: 'Invalid request method.' });
  }
}
