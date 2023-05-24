export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : '🪂';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : '🪂 ESCAPISM 🪂';
  const blogDescription = process.env.BLOG_DESCRIPTION
    ? decodeURI(process.env.BLOG_DESCRIPTION)
    : 'Prompt me Tender: your one-stop destination for personalized trip planning! Select the number of days, preferred transportation method, desired season, and budget, and let our intelligent platform do the rest. We integrate OpenAI API, Next.js, Node.js, and Cypress to provide a seamless user experience that caters to your unique preferences and requirements.';
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    blogTitle,
    blogDescription,
    footerText,
  };
};
