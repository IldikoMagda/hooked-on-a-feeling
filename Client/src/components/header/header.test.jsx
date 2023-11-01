import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Header from '.';


describe('Header component', () => {
  afterEach(cleanup);

  it('renders all the navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  
});
