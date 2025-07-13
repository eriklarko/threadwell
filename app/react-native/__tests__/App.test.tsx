/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/App';

test('renders correctly', () => {
  const { toJSON } = render(<App />);

  // Verify the component tree was created successfully
  expect(toJSON()).toBeTruthy();
});
