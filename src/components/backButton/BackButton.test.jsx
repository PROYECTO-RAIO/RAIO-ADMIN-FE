import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from './BackButton';
import { MemoryRouter } from 'react-router-dom';

describe('BackButton', () => {

  it('should render the "volver" button', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BackButton />
      </MemoryRouter>
    );

    expect(screen.getByText('volver')).toBeInTheDocument();
  });

  it('should navigate to / when the button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <BackButton />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('volver'));

    expect(window.location.pathname).toBe('/');
  });

});
