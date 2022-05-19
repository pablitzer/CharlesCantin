module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./admin');
  eleventyConfig.addPassthroughCopy('./images');
  eleventyConfig.addPassthroughCopy('./javascript');
  eleventyConfig.addPassthroughCopy('./configuration');
  // Return your Object options:
  return {
    dir: {
      input: '.',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'liquid'],
  };
};
