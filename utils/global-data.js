export const getGlobalData = () => {
  const name = process.env.local.BLOG_NAME
    ? decodeURI(process.env.local.BLOG_NAME)
    : '🪂';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.local.BLOG_TITLE)
    : '🪂 ESCAPISM 🪂';
  const blogDescription = process.env.local.BLOG_DESCRIPTION
    ? decodeURI(process.env.local.BLOG_DESCRIPTION)
    : 'An app to help you make a decision about where to travel based on weather, finance and distance.';
  const footerText = process.env.local.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.local.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    blogTitle,
    blogDescription,
    footerText,
  };
};
