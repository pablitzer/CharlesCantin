module.exports = function (eleventyConfig) {
  let markdownIt = require('markdown-it');
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.addNunjucksFilter('md', require('./filters/markdown_filter'));

  eleventyConfig.setLibrary('md', markdownIt(options));

  eleventyConfig.addPassthroughCopy('./admin');
  eleventyConfig.addPassthroughCopy('./images');
  eleventyConfig.addPassthroughCopy('./javascript');
  eleventyConfig.addPassthroughCopy('./configuration');
  // Return your Object options:
  return {
    dir: {
      input: '.',
      output: '_site',
      data: 'configuration',
    },
    templateFormats: ['md', 'njk', 'liquid'],
  };
};
