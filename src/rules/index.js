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

import { unnecessaryText } from './unnecessary-text'

export const rules = {
  'unnecessary-text': unnecessaryText
}
