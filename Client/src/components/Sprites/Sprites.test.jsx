import React from 'react';
import { screen,render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import getSpritePath from '.';

describe('Sprites Component', () => {

    afterEach(() => {
      cleanup();
      
    });

    test('returns the correct path for orange Colour and XP less than 10', () => {
        const path = getSpritePath('orange', 5);
        expect(path).toEqual('/src/assets/Orange/BasicOrange.png');
    });

    test('returns the correct path for orange Colour and XP less than 20 and more than 10', () => {
        const path = getSpritePath('orange', 15);
        expect(path).toEqual('/src/assets/Orange/MediumOrange.png');
    });

    test('returns the correct path for orange Colour and XP more than 20', () => {
        const path = getSpritePath('orange', 25);
        expect(path).toEqual('/src/assets/Orange/LegendaryOrange.png');
    });
    
    test('returns the correct path for green Colour and XP less than 10', () => {
    const path = getSpritePath('green', 5);
    expect(path).toEqual('/src/assets/Green/BasicGreen.png');
    });

    test('returns the correct path for green Colour and XP less than 20 and more than 10', () => {
    const path = getSpritePath('green', 15);
    expect(path).toEqual('/src/assets/Green/MediumGreen.png');
    });

    test('returns the correct path for green Colour and XP more than 20', () => {
        const path = getSpritePath('green', 25);
        expect(path).toEqual('/src/assets/Green/LegendaryGreen.png');
    });

    test('returns the correct path for red Colour and XP less than 10', () => {
    const path = getSpritePath('red', 5);
    expect(path).toEqual('/src/assets/Red/BasicRed.png');
    });

    test('returns the correct path for red Colour and XP less than 20 and more than 10', () => {
    const path = getSpritePath('red', 15);
    expect(path).toEqual('/src/assets/Red/MediumRed.png');
    });

    test('returns the correct path for red Colour and XP more than 20', () => {
        const path = getSpritePath('red', 25);
        expect(path).toEqual('/src/assets/Red/LegendaryRed.png');
    });

    test('returns the correct path for blue Colour and XP less than 10', () => {
    const path = getSpritePath('blue', 5);
    expect(path).toEqual('/src/assets/Blue/BasicBlue.png');
    });

    test('returns the correct path for blue Colour and XP less than 20 and more than 10', () => {
    const path = getSpritePath('blue', 15);
    expect(path).toEqual('/src/assets/Blue/MediumBlue.png');
    });

    test('returns the correct path for blue Colour and XP more than 20', () => {
        const path = getSpritePath('blue', 25);
        expect(path).toEqual('/src/assets/Blue/LegendaryBlue.png');
    });


    test('returns the default path for an unknown Colour', () => {
    const path = getSpritePath('Unknown Colour', 15); // Assuming purple Colour is not defined
    expect(path).toEqual('/src/assets/BasicSprite.png');
    });

});