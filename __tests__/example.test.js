import { render, screen } from '@testing-library/react';
import MyComponent from '../path/to/MyComponent'; // Ensure this path is correct

test('renders learn react link', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

