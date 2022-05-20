var MarkdownIt = require('markdown-it');

function markdownFilter(content) {
  md = new MarkdownIt();
  return md.render(content);
}

module.exports = markdownFilter;
