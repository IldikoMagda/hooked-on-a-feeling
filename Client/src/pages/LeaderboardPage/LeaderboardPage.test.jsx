import React from 'react';
import { screen,render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LeaderboardPage from '.';

describe("LeaderBoard component", () => {

    beforeEach(() => {
        render(<BrowserRouter><LeaderboardPage /></BrowserRouter>);
    });

    afterEach(() => {
        cleanup();
    });

    it('Renders Leaderboard component', () => {
        const createAccountComponent = screen.getByText('LeaderboardPage');
        expect(createAccountComponent).toBeInTheDocument();
    });

});