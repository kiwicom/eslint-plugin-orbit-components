import parse from "postcss/lib/parse";
import { getTaggedTemplateLiteralContent } from "./tagged-template-literal";
import { fixIndentation, removeBaseIndentation, wrapKeyframes, wrapSelector } from "./general";
import { isHelper } from "./styled";
import { getSourceMap } from "./parse";

const parser = node => {
  const extractedCSS = [];
  let sourceMap = {};
  let ignoreRuleComments = [];
  const taggedTemplateLocs = [];
  const interpolationLines = [];

  let importedNames = {
    default: "styled",
    css: "css",
    keyframes: "keyframes",
    injectGlobal: "injectGlobal",
    createGlobalStyle: "createGlobalStyle",
  };

  const content = getTaggedTemplateLiteralContent(node);

  const fixedContent = fixIndentation(content).text;

  const helper = isHelper(node, importedNames);

  const processedNode = Object.assign({}, node);

  let wrappedContent;
  switch (helper) {
    case "keyframes":
      // wrap it in a @keyframes block
      wrappedContent = wrapKeyframes(fixedContent);
      break;

    case "injectGlobal":
      // Don't wrap it as it goes in global scope, but put it to
      // base line to avoid indentation errors
      wrappedContent = removeBaseIndentation(fixedContent);
      break;

    default:
      // Wrap it in a dummy selector as this is what Styled Components would do
      wrappedContent = wrapSelector(fixedContent);
  }

  const stylelintCommentsAdded =
    ignoreRuleComments.length > 0
      ? `${ignoreRuleComments.join("\n")}\n${wrappedContent}`
      : wrappedContent;

  extractedCSS.push(stylelintCommentsAdded);

  sourceMap = Object.assign(
    sourceMap,
    getSourceMap(extractedCSS.join("\n"), wrappedContent, processedNode.quasi.loc.start.line),
  );

  taggedTemplateLocs.push({
    wrappedOffset: wrappedContent.indexOf(fixedContent),
    start: node.quasi.loc.start,
  });

  // Save dummy interpolation lines
  node.quasi.expressions.forEach((expression, i) => {
    interpolationLines.push({
      start: node.quasi.quasis[i].loc.end.line,
      end: node.quasi.quasis[i + 1].loc.start.line,
    });
  });

  return {
    extractedCSS: extractedCSS.join("\n"),
    parsedCSS: parse(extractedCSS),
    taggedTemplateLocs,
    interpolationLines,
    sourceMap,
  };
};

export default parser;
