import React from 'react';
import { screen,render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import EditForm from '.';

describe('Edit Form component', () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <EditForm />
        </BrowserRouter>
      );
    });

    afterEach(() =>{
        cleanup();
    })
});