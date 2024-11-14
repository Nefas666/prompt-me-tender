import { useState } from 'react';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Layout, { GradientBackground } from '../components/Layout';
import SEO from '../components/SEO';
import TravelCard from '../components/TravelCard';
import Header from '../components/Header';

export default function Index(globalData) {
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTripSubmit = async (tripData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
      });

      const data = await response.json();
      setGeneratedText(data.generatedText);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
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
      <Header globalData={globalData} onSubmit={handleTripSubmit} /> 
        {isLoading && <Loader />}
        {generatedText && (
          <section>
            <TravelCard generatedText={generatedText} />
          </section>
        )}
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
