import { render, screen, fireEvent } from '@testing-library/react';
import BasicButton from './BasicButton';

describe('BasicButton', () => {
 
  it('aplica la clase "btn-small" cuando el tamaño es "small"', () => {
    render(<BasicButton size="small">Small Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-small');
  });

  it('aplica la clase "btn-large" cuando el tamaño es "large"', () => {
    render(<BasicButton size="large">Large Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-large');
  });

  it('llama onClick cuando es clicado', () => {
    const handleClick = vi.fn();
    render(<BasicButton onClick={handleClick}>Click</BasicButton>);
    const button = screen.getByRole('button', { name: 'Click' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renderiza un elemento <button> si no hay href', () => {
  render(<BasicButton>Link</BasicButton>);
  const button = screen.getByRole('button');
  expect(button.tagName).toBe('BUTTON');
});

  it('respeta la prop "active"', () => {
    render(<BasicButton active>Active Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('active');
  });
});