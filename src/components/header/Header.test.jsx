import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {

  it('should render all buttons in the navbar', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('editar')).toBeInTheDocument();
    expect(screen.getByText('ver')).toBeInTheDocument();
    expect(screen.getByText('volver')).toBeInTheDocument();
  });

  it('should navigate to the correct route when a button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('editar'));
    expect(window.location.pathname).toBe('/editar');

    fireEvent.click(screen.getByText('ver'));
    expect(window.location.pathname).toBe('/ver');
    
    fireEvent.click(screen.getByText('volver'));
    expect(window.location.pathname).toBe('/categorias');
  });

});

