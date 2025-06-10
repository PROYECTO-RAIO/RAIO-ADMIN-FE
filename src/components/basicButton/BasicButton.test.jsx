import { render, screen, fireEvent } from '@testing-library/react';
import BasicButton from './BasicButton';

describe('BasicButton', () => {
 
  it('applies "btn-small" class when size is "small"', () => {
    render(<BasicButton size="small">Small Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-small');
  });

  it('applies "btn-large" class when size is "large"', () => {
    render(<BasicButton size="large">Large Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-large');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<BasicButton onClick={handleClick}>Click</BasicButton>);
    const button = screen.getByRole('button', { name: 'Click' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses default href="#" if none is provided', () => {
    render(<BasicButton>Link</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('href', '#');
  });

  it('respects the "active" prop', () => {
    render(<BasicButton active>Active Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('active');
  });
});

