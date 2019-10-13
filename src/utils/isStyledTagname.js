const isStyledTagname = node =>
  node.tag.type === "MemberExpression" &&
  node.tag.object.name === "styled" &&
  node.tag.property.type === "Identifier";

export default isStyledTagname;
