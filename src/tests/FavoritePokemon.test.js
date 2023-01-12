import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Teste o componente FavoritePokemons.js', () => {
  test('É exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemon />);

    const pokemonFound = screen.getByText(/No favorite pokémon found/i);
    expect(pokemonFound).toBeInTheDocument();
  });
});
