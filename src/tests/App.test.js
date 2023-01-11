import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste App.js', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(linkFavoritePokemon).toBeInTheDocument();

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/page');
    });

    const notFound = screen.getByRole(
      'heading',
      { name: 'Page requested not found', level: 2 },
    );
    expect(notFound).toBeInTheDocument();
  });
});
