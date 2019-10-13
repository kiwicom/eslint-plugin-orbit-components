import { getTokens } from "@kiwicom/orbit-design-tokens";

const tokens = getTokens();

export const parseExpression = node => {
  if (node.type !== "ArrowFunctionExpression") return;

  if (node.body.type !== "MemberExpression" && node.body.type !== "ConditionalExpression") return;

  let possibleValues = [];

  if (node.body.type === "MemberExpression") {
    possibleValues.push(node.body.property.name);
  }

  if (node.body.type === "ConditionalExpression") {
    possibleValues.push(node.body.consequent.property.name);
    possibleValues.push(node.body.alternate.property.name);
  }

  return possibleValues;
};

export const isToken = variables => {
  const returnObj = [];
  if (Array.isArray(variables)) {
    variables.forEach(variable => {
      if (Object.keys(tokens).includes(variable)) {
        returnObj.push("$token");
      } else {
        returnObj.push("$variable");
      }
    });
  }

  if (returnObj.includes("$variable")) {
    return "$variable";
  }

  return "$token";
};
