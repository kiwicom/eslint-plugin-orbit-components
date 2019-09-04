/**
 * @fileoverview eslint rules for @kiwicom/orbit-components
 * @author TOMAS HAPL
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

import { noCustomColor } from './no-custom-color'
import { unnecessaryText } from './unnecessary-text'

export const rules = {
  // 'no-custom-color': noCustomColor
  'unnecessary-text': unnecessaryText
}
