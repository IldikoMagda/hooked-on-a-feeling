import React from 'react';
import { screen,render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LeaderboardPage from '.';

describe('Leader Board Page', () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <LeaderboardPage />
        </BrowserRouter>
      );
    });
  
    afterEach(() => {
      cleanup();
      
    });
  
    it('renders leaderboard page', () => {
      expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    });
  
    it('displays leaderboard cards with user data', () => {
      // You can add mock data here to simulate the response from the API
      const mockUsers = [
        { user_id: 1, username: 'Ollie', generalxp: 10, subjectxpmaths: 20, subjectxpenglish: 0, subjectxpscience: 0 },
        { user_id: 2, username: 'Abdul', generalxp: 20, subjectxpmaths: 10, subjectxpenglish: 0, subjectxpscience: 0 },
        // Add more mock data as needed
      ];
  
      
  
      // You can add expectations to check if the leaderboard cards are displayed correctly
      // For example, you can check if the usernames and XP values are present on the cards.
  
      // expect(screen.getByText('user1')).toBeInTheDocument();
      // expect(screen.getByText('100')).toBeInTheDocument();
      // expect(screen.getByText('user2')).toBeInTheDocument();
      // expect(screen.getByText('90')).toBeInTheDocument();
    });
  });