import TripForm from './TripForm';

const Header = ({ globalData, onSubmit }) => {
  return (
    <section className="row-span-1">
      <h1 className="text-3xl font-bold lg:text-5xl text-center mb-8">
        {globalData.blogTitle || `🪂 Prompt me Tender🪂`}
      </h1>
      <h3 className="font-light text-l lg:text-xl text-center mb-12">
        {globalData.blogDescription ||
          `Prompt me Tender: your one-stop destination for personalized trip planning! With our innovative integration of Google Gemini AI API, Next.js, Node.js, and Cypress, we offer a seamless user experience for planning your dream getaway.`}
      </h3>
      <TripForm onSubmit={onSubmit} />
    </section>
  );
};

export default Header;