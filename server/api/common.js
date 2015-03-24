'use strict';

var markdown = require("markdown").markdown;

/**
 * Returns the HTML of the first highest-level non-empty
 * section with 'Design' in the header or null if not found
 */
exports.getDesignSection = function(data) {
  var tree = markdown.parse(data);  
  var headingLevel = 2;
  var level = null;
  var highestLevel = null;
  var contents = null;
  var newContents = null;

  tree.forEach(function(node) {
    if(level) {
      if(node[0] == 'header' && node[1].level <= level) {
        if(newContents.length > 1) {
          contents = newContents;
          highestLevel = level;
        }
        level = null;
      } else {
        if(node[0] == 'header') {
          node[1].level -= level - headingLevel + 1;
        }
        newContents.push(node);
        return;
      }
    }
    if(node[0] == 'header' && node[2].match(/design/i) && (!highestLevel || node[1].level < highestLevel)) {
      level = node[1].level;
      newContents = ['markdown'];
    }
  });

  if(level && newContents.length > 1) {
    contents = newContents;
  }

  if(!contents) {
    return null;
  }

  return markdown.renderJsonML(markdown.toHTMLTree(contents));
}