import ruleTester from "./ruleTester";
import screenReadersButtons from "../src/rules/screenReadersButtons";

describe("screenReadersButtons", function() {
  ruleTester.run("screen-readers-buttons", screenReadersButtons, {
    valid: [
      {
        code: `import Button from "@kiwicom/orbit-components/lib/Button";
               const App = () => <Button>Test</Button>`,
      },
      {
        code: `import { Button as OrbitButton } from "@kiwicom/orbit-components/";
               const App = () => <OrbitButton title="Something" />`,
      },
      {
        code: `import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
               const App = () => <ButtonLink>Test</ButtonLink>`,
      },
      {
        code: `import { ButtonLink as OrbitButtonLink } from "@kiwicom/orbit-components/";
               const App = () => <OrbitButtonLink title="Something" />`,
      },
      {
        code: `import { ButtonLink as OrbitButtonLink } from "@kiwicom/orbit-components/";
               const App = (props) => <OrbitButtonLink {...props} />`,
      },
      {
        code: `import Button from "@kiwicom/orbit-components/lib/Button";
               const rest = {
                  title: "Something",
               }
               const App = () => {\
                  return <Button {...rest} />
               }`,
      },
      {
        code: `import Button from "@kiwicom/orbit-components/lib/Button";
               const App = () => {
                  const rest = {
                    title: "Something",
                  }
                  return <Button {...rest} />
               }`,
      },
    ],
    invalid: [
      {
        code: `import Button from "@kiwicom/orbit-components/lib/Button";\
               const App = () => <Button iconLeft="something" />`,
        errors: [
          "Property children or title property is missing on Button. Use title property to add aria-label to be accessible for screen readers.",
        ],
      },
      {
        code: `import { Button as OrbitButton } from "@kiwicom/orbit-components/";\
               const App = () => <OrbitButton fullWidth />`,
        errors: [
          "Property children or title property is missing on OrbitButton. Use title property to add aria-label to be accessible for screen readers.",
        ],
      },
      {
        code: `import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";\
               const App = () => <ButtonLink iconLeft="something" />`,
        errors: [
          "Property children or title property is missing on ButtonLink. Use title property to add aria-label to be accessible for screen readers.",
        ],
      },
      {
        code: `import { ButtonLink as OrbitButtonLink } from "@kiwicom/orbit-components/";\
               const App = () => <OrbitButtonLink fullWidth />`,
        errors: [
          "Property children or title property is missing on OrbitButtonLink. Use title property to add aria-label to be accessible for screen readers.",
        ],
      },
      {
        code: `import Button from "@kiwicom/orbit-components/lib/Button";
               const rest = {
                  property: "Something",
               }
               const App = () => {\
                  return <Button {...rest} />
               }`,
        errors: [
          "Property children or title property is missing on Button. Use title property to add aria-label to be accessible for screen readers.",
        ],
      },
      {
        code: `import Button from "@kiwicom/orbit-components/lib/Button";
               const App = () => {
                  const rest = {
                    property: "Nested",
                  }
                  return <Button {...rest} />
               }`,
        errors: [
          "Property children or title property is missing on Button. Use title property to add aria-label to be accessible for screen readers.",
        ],
      },
    ],
  });
});
