# button-has-title

To make `Button` or `ButtonLink` accessible for screen readers, it's necessary to either pass `children` or `title` property to it.

## Rule details

The following patterns are considered errors:

```jsx
import Button from "@kiwicom/orbit-components/lib/Button"
import Airplane from "@kiwicom/orbit-components/lib/icon/Airplane"

const App = () => <Button iconLeft={<Airplane />} />
```

```jsx
import Button from "@kiwicom/orbit-components/lib/Button"
import Airplane from "@kiwicom/orbit-components/lib/icon/Airplane"

const buttonProps = {
  iconLeft: <Airplane />,
  fullWidth: true
}
const App = () => <Button {...buttonProps} />
```

The following patterns are **not** considered errors:

```jsx
import Button from "@kiwicom/orbit-components/lib/Button"
import Airplane from "@kiwicom/orbit-components/lib/icon/Airplane"

const App = () => <Button title="Continue" iconLeft={<Airplane />} />
```

```jsx
import Button from "@kiwicom/orbit-components/lib/Button"

const App = () => <Button>Continue</Button>
```

```jsx
import Button from "@kiwicom/orbit-components/lib/Button"

const ButtonWrapper = (props) => <Button {...props} />
```

## Rule options

```
"orbit-components/button-has-title": <enabled>
```
