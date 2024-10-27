// __tests__/example.test.js
import { render, screen } from '@testing-library/react';
import MyComponent from '../path/to/MyComponent'; // Update with the actual path to your component

test('renders learn react link', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

