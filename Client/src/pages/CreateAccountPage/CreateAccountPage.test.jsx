import React from 'react';
import { screen,render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import CreateAccountPage from '.';

describe("Homepage component", () => {

    beforeEach(() => {
        render(<BrowserRouter><Homepage /></BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });

    it('renders create account component', () => {
        const createAccountComponent = screen.getByText('CreateAccount');
        expect(createAccountComponent).toBeInTheDocument();
    });

});