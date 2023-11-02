import React from 'react';
import { screen,render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from '.';

describe('Header component', () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
    });

    afterEach(() =>{
        cleanup();
    })
});