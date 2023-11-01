import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from '.';

describe('HomePage component', () => {
  afterEach(cleanup);

  it('renders user sprite image', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const userSpriteImage = screen.getByAltText('User Sprite');
    expect(userSpriteImage).toBeInTheDocument();
  });

  it('renders the correct XP values', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Generic XP: 500/)).toBeInTheDocument();
    expect(screen.getByText(/Maths XP: 249/)).toBeInTheDocument();
    expect(screen.getByText(/Science XP: 141/)).toBeInTheDocument();
    expect(screen.getByText(/English XP: 335/)).toBeInTheDocument();
  });

  it('renders the task list', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('Task Title')).toBeInTheDocument();
    expect(screen.getByText(/Due Date:/)).toBeInTheDocument();
    expect(screen.getByText(/XP Worth:/)).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
