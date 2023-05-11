import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './home';

describe('<Home />', () => {
  it('render', () => {
    render(<Home />, { wrapper: BrowserRouter });
    const homeElement = screen.getByTestId("home");
    expect(homeElement).toBeInTheDocument();
    expect(homeElement).toHaveTextContent('Home')
  })
});
