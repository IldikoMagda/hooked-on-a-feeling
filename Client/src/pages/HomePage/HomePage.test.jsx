import React from 'react';
import { screen,render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Homepage from '.';

describe("Homepage component", () => {

    beforeEach(() => {
        render(<BrowserRouter><Homepage /></BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });

    it('renders homepage component', () => {
        const homeComponent = screen.getByTestId('home-component');
        expect(homeComponent).toBeInTheDocument();
    });

});