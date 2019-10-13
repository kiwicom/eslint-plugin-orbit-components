import ruleTester from "./ruleTester";
import noCustomColor from "../src/rules/noCustomColor";

describe("No custom color", function() {
  ruleTester.run("no-custom-color", noCustomColor, {
    valid: [
      // {
      //   code: `const button = styled.button\`
      //   color: \${({ theme, isPrimary }) => \
      //   (isPrimary ? \
      //   theme.orbit.colorTextPrimary : \
      //   theme.orbit.colorTextSecondary)};
      //   height: 200px;
      //   width: 300px;\``
      // },
      {
        code: `
          const test = styled(Button)\`
          color: \${({ theme }) => theme.orbit.colorTextPrimary};\`
        `,
      },
      // {
      //   code: `const test = styled.div\`
      //   color: \${({ theme, primary }) => (primary ? theme.orbit.colorTextPrimary : theme.orbit.colorTextSecondary)};
      //   \``
      // }
    ],
    invalid: [
      {
        code: `
        styled.div\`
          color: white;
          font-family: someFamily;
          font-size: 12px;
          line-height: \${({ theme }) => theme.orbit.someValue};
        \`;
        `,
        errors: [
          {
            messageId: "useToken",
          },
        ],
      },
      {
        code: `
        styled.div\`
          color: #000;
        \`;
        `,
        errors: [
          {
            messageId: "useToken",
          },
        ],
      },
      {
        code: `
        styled.div\`
          color: rgba(0, 0, 0, .5);
        \`;
        `,
        errors: [
          {
            messageId: "useToken",
          },
        ],
      },
    ],
    output: `please use token instead of hex`,
  });
});
