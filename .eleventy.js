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

  // add global photo list data as a collection
  eleventyConfig.addCollection('photos', function (collectionApi) {
    console.log(collectionApi.items[0].data);

    return Object.entries(collectionApi.items[0].data['photos']).map((e) => e[1]);
  });

  // add category photo list data as a collection
  eleventyConfig.addCollection('photocategories', function (collectionApi) {
    console.log(collectionApi.items[0].data);

    return Object.entries(collectionApi.items[0].data['photocategories']).map((e) => e[1]);
  });

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
