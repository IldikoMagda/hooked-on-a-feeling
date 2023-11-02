import React from 'react';
import { screen,render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import TaskCard from '.';

describe('Task Card Component', () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <TaskCard task={mockTask} completeTask={mockTask}/>
        </BrowserRouter>
      );
    });
  
    afterEach(() => {
      fetchSpy.mockRestore();
      cleanup();
      
    });

    const fetchSpy = vi.spyOn(global, 'fetch');

    const mockTask = {
        title: 'Sample Task',
        content: 'Sample Content',
        subject: 'Sample Subject',
        duedate: '2023-11-02T10:30:00.000Z',
        generalxp: 50,
        item_id: 1,
    };

    test('renders task card with correct content', () => {
        const titleElement = screen.getByText('Sample Task');
        const contentElement = screen.getByText('Sample Content');
        const subjectElement = screen.getByText('Sample Subject');
        const xpElement = screen.getByText('XP Worth: 50');
        expect(titleElement).toBeInTheDocument();
        expect(contentElement).toBeInTheDocument();
        expect(subjectElement).toBeInTheDocument();
        expect(xpElement).toBeInTheDocument();
    });
  

});