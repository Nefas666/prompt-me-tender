import { useState } from 'react';
// importfrom "./index.module.css";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index(globalData) {

  /**
   * TODO: pulire il generatedText della chiamata precedente quando c'è una nuova chiamata
   */
  /**
   * TODO: fixare stile loader
   */

  //*Creo una serie di variabili da riutilizzare all'interno 
  //*del body della mia chiamata asincrona

  const [numberOfDays, setNumberOfDays] = useState(''); /* */
  const [timeOfYear, setTimeOfYear] = useState('');
  const [typeOfTransport, setTypeOfTransport] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      const response = await fetch('/api/generate', {
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

      setIsLoader(true);
      const data = await response.json();
      setGeneratedText(data.generatedText);
      setIsLoader(false);

    } catch (error) {
      setIsLoader(false);
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
       <SEO title={globalData.name || `🪂` } description={globalData.blogDescription || `Prompt me Tender: your one-stop destination for personalized trip planning! Select the number of days, preferred transportation method, desired season, and budget, and let our intelligent platform do the rest. We integrate OpenAI API, Next.js, Node.js, and Cypress to provide a seamless user experience that caters to your unique preferences and requirements.`} />
      <Header name={globalData.name || `🪂`} />
      <main className="md:container md:mx-auto p-4">
        <h1 className="text-3xl font-bold font-mono lg:text-5xl text-center mb-8">
          {globalData.blogTitle || `🪂 Prompt me Tender🪂` }
        </h1>
        <h3 className="font-light font-mono text-l lg:text-xl text-center mb-12">
          {globalData.blogDescription || `Prompt me Tender: your one-stop destination for personalized trip planning! With our innovative integration of OpenAI API, Next.js, Node.js, and Cypress, we offer a seamless user experience for planning your dream getaway.`}
        </h3>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-medium">
        ⏱️Number of days:
          <input
            type="text"
            value={numberOfDays}
            className="appearance-none caret-lime-500 focus:ring-lime-300 focus:ring-1 w-full"
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
        </label>

        <label className="font-medium">
        🌞🌧️Time of year:
          <input
            type="text"
            value={timeOfYear}
            className="appearance-none caret-lime-500 focus:ring-lime-300 focus:ring-1 w-full"
            onChange={(e) => setTimeOfYear(e.target.value)}
          />
        </label>

        <label className="font-medium">
        🚗🚂🚆Type of transport:
          <input
            type="text"
            value={typeOfTransport}
            className="appearance-none caret-lime-500 focus:ring-lime-300 focus:ring-1 w-full"
            onChange={(e) => setTypeOfTransport(e.target.value)}
          />
        </label>

        <label className="font-medium">
        💰Price range:
          <input
            type="text"
            value={priceRange}
            className="appearance-none caret-lime-500 focus:ring-lime-300 focus:ring-1 w-full"
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </label>

        <button className="m-auto btn btn-3" type="submit"><strong className="font-mono">Suggest!</strong></button>
      </form>
      {isLoader && <Loader />}
      {generatedText && (
        <div>
          <h2 className="text-3xl font-bold font-mono lg:text-5xl text-center mb-8">The suggestions are:</h2>
          <p className="font-default font-medium text-base">{((isLoader != true) ? generatedText : isLoader != false)}</p>
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
