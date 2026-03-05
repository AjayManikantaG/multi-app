/**
 * styled.d.ts
 *
 * Module augmentation for styled-components v5.
 * Extends DefaultTheme with our custom theme shape.
 * 
 * Also patches styled-components v5 types so that styled HTML elements
 * accept `children`, `onClick`, `onDrop`, etc. — React 19 removes the
 * automatic `children` from `FC`, and SC v5 types don't model HTML
 * intrinsic attributes, leaving a gap.
 */
import 'styled-components';
import type { CSSProp } from 'styled-components';
import { theme } from './styles/theme';

type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

// Inject css prop support for JSX
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}
