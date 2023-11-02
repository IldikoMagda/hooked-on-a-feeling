import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import CreateAccount from '.'; // Update the import path accordingly

describe('Create Account Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    );
  });

  afterEach(cleanup);

  test('renders input fields', () => {
    const usernameInput = screen.getByPlaceholderText('Enter username...');
    const passwordInput = screen.getByPlaceholderText('Enter password...');
    const confirmPasswordInput = screen.getByPlaceholderText('Enter password again...');
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test('renders select field with options', () => {
    const selectField = screen.getByRole('combobox');
    expect(selectField).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
  });

  test('form submission with correct data', async () => {
    const usernameInput = screen.getByPlaceholderText('Enter username...');
    const passwordInput = screen.getByPlaceholderText('Enter password...');
    const confirmPasswordInput = screen.getByPlaceholderText('Enter password again...');
    const submitButton = screen.getByDisplayValue('Create Account');

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'testpassword');
    userEvent.type(confirmPasswordInput, 'testpassword');
    userEvent.selectOptions(screen.getByRole('combobox'), 'blue');
    userEvent.click(submitButton);

    // Add assertions for success message or redirection here
  });

  test('form submission with incorrect data', async () => {
    const usernameInput = screen.getByPlaceholderText('Enter username...');
    const passwordInput = screen.getByPlaceholderText('Enter password...');
    const confirmPasswordInput = screen.getByPlaceholderText('Enter password again...');
    const submitButton = screen.getByDisplayValue('Create Account');

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'testpassword');
    userEvent.type(confirmPasswordInput, 'differentpassword');
    userEvent.selectOptions(screen.getByRole('combobox'), 'green');
    userEvent.click(submitButton);

    // Add assertions for error message here
  });

  test('redirects to login page when clicking on the login link', () => {
    const loginLink = screen.getByText('Already have an account? Login');
    userEvent.click(loginLink);
    // Add assertions for redirection here
  });
});
