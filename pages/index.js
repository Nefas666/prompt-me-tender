import { useState } from 'react';
// importfrom "./index.module.css";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index(globalData) {
  //Creo una serie di variabili da riutilizzare all'interno 
  //del body della mia chiamata asincrona
  const [numberOfDays, setNumberOfDays] = useState(''); /* */
  const [timeOfYear, setTimeOfYear] = useState('');
  const [typeOfTransport, setTypeOfTransport] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/generate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numberOfDays,
          timeOfYear,
          typeOfTransport,
          priceRange,
        }),
      });

      const data = await response.json();
      setGeneratedText(data.generatedText);
    } catch (error) {
      //creo una seire di hendler dello stato e del messaggio di errore per eventuali debug da fare
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Layout>
       <SEO title={globalData.name || `🪂` } description={globalData.blogDescription || `🪂`} />
      <Header name={globalData.name || `🪂`} />
      <main className="md:container md:mx-auto">
        <h1 className="text-3xl font-bold font-mono lg:text-5xl text-center mb-8">
          {globalData.blogTitle || `🪂 Prompt me Tender🪂` }
        </h1>
        <h3 className="font-light font-mono text-l lg:text-xl text-center mb-12">
          {globalData.blogDescription}
        </h3>

      <form onSubmit={handleSubmit}>
        <label>
          Number of days:
          <input
            type="text"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
        </label>

        <label>
          Time of year:
          <input
            type="text"
            value={timeOfYear}
            onChange={(e) => setTimeOfYear(e.target.value)}
          />
        </label>

        <label>
          Type of transport:
          <input
            type="text"
            value={typeOfTransport}
            onChange={(e) => setTypeOfTransport(e.target.value)}
          />
        </label>

        <label>
          Price range:
          <input
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </label>

        <button className="m-auto btn btn-3" type="submit"><strong>Suggest!</strong></button>
      </form>

      {generatedText && (
        <div>
          <h2>Generated Text:</h2>
          <p>{generatedText}</p>
        </div>
      )}
      </main>
      <Footer copyrightText={globalData.footerText || `All rights reserved.\n\n Made with ❤`} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();
  console.log(globalData);

  return { props: { globalData } };
}
//   async function onSubmit(event) {
//     event.preventDefault();
//     try {
//       const response = await fetch('/api/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ animal: promptTrigger }),
//       });

//       const data = await response.json();
//       if (response.status !== 200) {
//         throw (
//           data.error ||
//           new Error(`Request failed with status ${response.status}`)
//         );
//       }

//       setResult(data.result);
//       setpromptTrigger('');
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.status);
//         console.log(error.response.data);
//       } else {
//         console.log(error.message);
//       }
//       console.error(error);
//       alert(error.message);
//     }
//   }

//   return (
//     <div>
//       <Head>
//         {/* <title>OpenAI Quickstart</title> */}
//         {/* <link rel="icon" href="/dog.png" /> */}
//       </Head>

//       <main>
//         {/* <img src="/dog.png" /> */}
//         <h3>ESCAPISM</h3>
//         <form onSubmit={onSubmit}>
//           <input
//             type="text"
//             name="trigger"
//             placeholder="Where do you want to go?"
//             value={promptTrigger}
//             onChange={(e) => setpromptTrigger(e.target.value)}
//           />
//           <input type="submit" value="Generate destination" />
//         </form>
//         <div>
//           <h1>{result}</h1>
//         </div>
//       </main>
//     </div>
//   );
// }
