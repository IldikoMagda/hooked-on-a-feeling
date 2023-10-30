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

    it('renders Login Page component', () => {
        const createAccountComponent = screen.getByText('LoginPage');
        expect(createAccountComponent).toBeInTheDocument();
    });

});