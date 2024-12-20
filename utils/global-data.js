export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
  decodeURI(process.env.BLOG_NAME)
  const blogTitle = process.env.BLOG_TITLE
  decodeURI(process.env.BLOG_TITLE)
  const blogDescription = process.env.BLOG_DESCRIPTION
  decodeURI(process.env.BLOG_DESCRIPTION)
  const footerText = process.env.BLOG_FOOTER_TEXT
  decodeURI(process.env.BLOG_FOOTER_TEXT)

  return {
    name,
    blogTitle,
    blogDescription,
    footerText,
  };
};
