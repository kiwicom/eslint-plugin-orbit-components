const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2016,
  },
});

export default ruleTester;
