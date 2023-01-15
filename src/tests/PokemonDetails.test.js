import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  const pokedex = '/pokemon/25';

  test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = 'Pikachu';
    act(() => history.push(pokedex));

    const details = screen.getByRole('heading', { name: `${pokemon} Details`, level: 2 });
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const text = screen.getByText(/This intelligent Pokémon roasts hard berries/i);

    expect(details).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test('Existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const pokemon = 'Pikachu';

    act(() => history.push(pokedex));

    const locations = screen.getByRole('heading', { name: `Game Locations of ${pokemon}`, level: 2 });
    const img = screen.getAllByRole('img', { name: `${pokemon} location` });

    expect(locations).toBeInTheDocument();

    expect(img[0]).toHaveAttribute('alt', `${pokemon} location`);
    expect(img).toHaveLength(2);
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('O usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const pokemon = 'Pikachu';

    act(() => history.push(pokedex));

    const checkboxFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    const text = screen.getByText(/Pokémon favoritado?/i);
    expect(checkboxFavorite).toBeInTheDocument();
    expect(text).toBeInTheDocument();

    userEvent.click(checkboxFavorite);

    const img = screen.getByRole('img', { name: `${pokemon} is marked as favorite` });
    expect(img).toBeInTheDocument();

    userEvent.click(checkboxFavorite);

    expect(img).not.toBeInTheDocument();
  });
});
