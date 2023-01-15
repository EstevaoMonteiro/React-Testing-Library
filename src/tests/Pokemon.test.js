import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se a página contém as informações corretas de Pokemon', () => {
  test('Testa se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const averageWeight = screen.getByText('Average weight: 6.0 kg');
    const img = screen.getByRole('img', { name: /Pikachu Sprite/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/Electric/i);
    expect(averageWeight).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir os detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
    expect(details).toBeInTheDocument();
  });

  test('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const checkboxFavorite = screen.getByRole('checkbox', { name: /Pokémon Favoritado\?/i });
    userEvent.click(checkboxFavorite);
    const markedFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(details).toBeInTheDocument();
    expect(checkboxFavorite).toBeChecked();
    expect(markedFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(markedFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
