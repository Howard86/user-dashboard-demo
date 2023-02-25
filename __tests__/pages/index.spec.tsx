import React from 'react';
import { appRender, screen } from 'test-utils';

import Home from '../../src/pages/index';

describe('home', () => {
  it('renders a heading', () => {
    expect.hasAssertions();
    appRender(<Home />);

    const loadingText = screen.getByText('Loading...');

    expect(loadingText).toBeInTheDocument();
  });
});
