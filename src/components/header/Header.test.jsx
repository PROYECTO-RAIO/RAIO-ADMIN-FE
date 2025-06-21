import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('Header', () => {
  it('debería renderizar el botón "volver"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('volver')).toBeInTheDocument();
  });

  it('debería navegar a /categorias al hacer clic en "volver"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/categorias" element={<div data-testid="categorias-page">Página Categorías</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('volver'));

    expect(screen.getByTestId('categorias-page')).toBeInTheDocument();
  });
});
