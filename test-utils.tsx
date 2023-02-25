import { ChildrenProps } from 'react';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { render, type RenderOptions } from '@testing-library/react';

import { baseApi } from '@/services/base-api';

export * from '@testing-library/react';

export default function Wrapper({ children }: ChildrenProps) {
  return <ApiProvider api={baseApi}>{children}</ApiProvider>;
}

export const appRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Wrapper, ...options });
