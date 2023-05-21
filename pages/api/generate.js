// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// export default async function (req, res) {
//   if (!configuration.apiKey) {
//     res.status(500).json({
//       error: {
//         message:
//           'OpenAI API key not configured, please follow instructions in README.md',
//       },
//     });
//     return;
//   }
//   const { numberOfDays, timeOfYear, typeOfTransport, priceRange } = req.body;
//   const prompt = `Suggest 3 perfect destinations for a trip in ${timeOfYear}, with a budget of ${priceRange}, lasting ${numberOfDays}, choosing ${typeOfTransport} to move?`;
//   console.log(req.body);
//   console.log(prompt);
//   // const animal = req.body.animal || '';
//   // if (animal.trim().length === 0) {
//   //   res.status(400).json({
//   //     error: {
//   //       message: 'Please enter a valid animal',
//   //     },
//   //   });
//   //   return;
//   // }
//   try {
//     const completion = await openai.createCompletion({
//       model: 'text-davinci-003',
//       prompt:generatePrompt(req.body),
//       temperature: 1,
//       max_tokens: 256,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });
//     const generatedText = completion.data.choices[0].text.trim();
//     res.status(200).json({ result: generatedText });

//   } catch (error) {
//     if (error.response) {
//       console.error(error.response.status, error.response.data);
//       res.status(error.response.status).json(error.response.data);
//     } else {
//       console.error(`Error with OpenAI API request: ${error.message}`);
//       res.status(500).json({
//         error: {
//           message: 'An error occurred during your request.',
//         },
//       });
//     }
//   }
// }


// function generatePrompt(numberOfDays, timeOfYear, typeOfTransport, priceRange) {
//   return `Suggest 3 perfect destinations for a trip in ${timeOfYear}, with a budget of ${priceRange}, lasting ${numberOfDays}, choosing ${typeOfTransport} to move?`;
// };

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
            'Authorization': `Bearer ${process.env.local.NEXT_PUBLIC_OPENAI_API_KEY}`,
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

