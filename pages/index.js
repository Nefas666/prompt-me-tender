import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Layout, { GradientBackground } from '../components/Layout';
import { getStaticProps } from '../utils/static-props';
import SEO from '../components/SEO';
import TravelCard from '../components/TravelCard';

export default function Index(globalData) {
  const [numberOfDays, setNumberOfDays] = useState(''); /* */
  const [timeOfYear, setTimeOfYear] = useState('');
  const [typeOfTransport, setTypeOfTransport] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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

      setIsLoading(true);
      const data = await response.json();
      setGeneratedText(data.generatedText);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
      <SEO
        title={globalData.name || `🪂`}
        description={
          globalData.blogDescription ||
          `Prompt me Tender: your one-stop destination for personalized trip planning! Select the number of days, preferred transportation method, desired season, and budget, and let our intelligent platform do the rest. We integrate Google Gemini AI API, Next.js, Node.js, and Cypress to provide a seamless user experience that caters to your unique preferences and requirements.`
        }
      />
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <section className="row-span-1">
        <h1 className="text-3xl font-bold font-mono lg:text-5xl text-center mb-8">
          {globalData.blogTitle || `🪂 Prompt me Tender🪂`}
        </h1>
        <h3 className="font-light font-mono text-l lg:text-xl text-center mb-12">
          {globalData.blogDescription ||
            `Prompt me Tender: your one-stop destination for personalized trip planning! With our innovative integration of Google Gemini AI API, Next.js, Node.js, and Cypress, we offer a seamless user experience for planning your dream getaway.`}
        </h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          <label className="text-center font-medium">
            ⏱️Number of days
            <input
              type="text"
              value={numberOfDays}
              className="appearance-none caret-lime-500 focus:ring-lime-300 focus:ring-1 w-full"
              onChange={(e) => setNumberOfDays(e.target.value)}
            />
          </label>

          <label className="text-center font-medium">
            🌞🌧️Time of year
            <input
              type="text"
              value={timeOfYear}
              className="appearance-none caret-lime-500 focus:ring-lime-300 focus:ring-1 w-full"
              onChange={(e) => setTimeOfYear(e.target.value)}
            />
          </label>

          <label className="text-center font-medium">
            🚗🚂🚆Type of transport
            <input
              type="text"
              value={typeOfTransport}
              className="appearance-none caret-lime-500 focus:ring-lime-300 focus:ring-1 w-full"
              onChange={(e) => setTypeOfTransport(e.target.value)}
            />
          </label>

          <label className="text-center font-medium">
            💰Price range
            <input
              type="text"
              value={priceRange}
              className="appearance-none caret-lime-500 focus:ring-lime-300 focus:ring-1 w-full"
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </label>

          <button className="btn btn-3 col-span-full" type="submit">
            <strong className="font-mono">Suggest!</strong>
          </button>
        </form>
        </section>
        {isLoading && <Loader />}
        {generatedText &&
          <section className="backdrop-blur-sm bg-white/30 mt-4 row-auto">
            <TravelCard
              numberOfDays={numberOfDays}
              timeOfYear={timeOfYear}
              typeOfTransport={typeOfTransport}
              priceRange={priceRange}
            />
          </section>
        }
      </main>
      <Footer
      className="row-span-full"
        copyrightText={
          globalData.footerText || `All rights reserved.\n\n Made with ❤`
        }
      />
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
