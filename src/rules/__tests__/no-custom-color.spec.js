import { ruleTester } from '../../common/ruleTester'
import { noCustomColor } from '../no-custom-color'

describe('No custom color', function() {
  ruleTester.run('no-custom-color', noCustomColor, {
    valid: [
      {
        code:
          'const test = styled.div`color: ${({ theme }) => theme.orbit.colorTextPrimary`;'
      },
      {
        code: `const test = styled.button\`
        color: \${({ theme }) => theme.orbit.colorTextPrimary}};\``
      },
      {
        code: `const test = styled.div\`
        color: \${({ theme, primary }) => (primary ? theme.orbit.colorTextPrimary : theme.orbit.colorTextSecondary)};
        \``
      }
    ],
    invalid: [
      {
        code: 'styled.div`color: #fff`',
        errors: [
          {
            messageId: 'useToken'
          }
        ]
      }
    ],
    output: `please use token instead of hex`
  })
})
