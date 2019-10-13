# eslint-plugin-orbit-components

Collection of ESLint rules to enforce the best usage practices of [`@kiwicom/orbit-components`](https://github.com/kiwicom/orbit-components/).

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install eslint-plugin-orbit-components --save-dev

# yarn
yarn add eslint-plugin-orbit-components --dev
```

Then add it to your ESLint configuration:

```
{
  "plugins": [
    // ...
    "orbit-components"
  ],
  "rules": {
    // ...
    "orbit-components/unnecessary-text": "error",
  }
}
```

## Supported Rules

- [unnecessary-text](docs/rules/unnecessary-text.md): Enforces that children of `Button` or `Heading` are not wrapped in `Text` component.

## License

MIT
