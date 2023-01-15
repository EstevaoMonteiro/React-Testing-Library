import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  test('A página contém um h2 com o texto \'Encountered Pokémon\'', () => {
    renderWithRouter(<App />);

    const encounteredPokemon = screen.getByRole('heading', { name: /Encountered Pokémon/i, level: 2 });
    expect(encounteredPokemon).toBeInTheDocument();
  });

  test('É exibido o próximo Pokémon da lista quando o botão \'Próximo Pokémon\' é clicado', () => {
    renderWithRouter(<App />);

    const proximoPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(proximoPokemon).toBeInTheDocument();

    userEvent.click(proximoPokemon);
  });

  test('É mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const img = screen.getAllByRole('img');
    expect(img).toHaveLength(1);
  });

  test('A Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /All/i });
    expect(all).toBeInTheDocument();

    const electric = screen.getByRole('button', { name: /Electric/i });
    expect(electric).toBeInTheDocument();

    const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonTypeButton).toHaveLength(7);
  });

  test('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /All/i });
    expect(all).toBeInTheDocument();

    userEvent.click(all);
    expect(all.innerHTML).toContain('All');
  });

  test('Os botões de filtragem por tipo possuem o data-testid \'pokemon-type-button\' exceto o botão \'All\'', () => {
    renderWithRouter(<App />);

    const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonTypeButton).toHaveLength(7);
  });

  test('É possível clicar no botão de filtragem \'All\'', () => {
    renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /All/i });
    expect(all).toBeInTheDocument();

    userEvent.click(all);

    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
