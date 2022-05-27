const { object } = require('sharp/lib/is');

module.exports = function (eleventyConfig) {
  let markdownIt = require('markdown-it');
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.addNunjucksFilter('md', require('./_filters/markdown_filter'));

  eleventyConfig.setLibrary('md', markdownIt(options));

  eleventyConfig.addPassthroughCopy('./admin');
  eleventyConfig.addPassthroughCopy('./images');
  eleventyConfig.addPassthroughCopy('./javascripts');
  eleventyConfig.addPassthroughCopy('./stylesheets');
  eleventyConfig.addPassthroughCopy('./configuration');
  eleventyConfig.addPassthroughCopy('node_modules/bootstrap');
  eleventyConfig.addPassthroughCopy('node_modules/jquery');

  eleventyConfig.ignores.add('README.md');

  // add prestations data as a collection
  eleventyConfig.addCollection('prestations', function (collectionApi) {
    console.log(collectionApi.items[0].data);

    return Object.entries(collectionApi.items[0].data['prestations']).map((e) => e[1]);
  });

  // add global photo list data as a collection
  eleventyConfig.addCollection('photos', function (collectionApi) {
    console.log(collectionApi.items[0].data);

    return Object.entries(collectionApi.items[0].data['photos']).map((e) => Object.assign({ filename: e[1].image.replace(/^.*[\\\/]/, '') }, e[1]));
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
