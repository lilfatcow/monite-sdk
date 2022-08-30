declare module '@emotion/styled' {
  import type { Theme } from '@monite/ui-widgets-react';
  import { CreateStyled } from '@emotion/styled/types/index';

  export * from '@emotion/styled/types/index';
  const customStyled: CreateStyled<Theme>;
  export default customStyled;
}
