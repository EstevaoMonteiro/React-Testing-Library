import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste o componente About.js', () => {
  test('Se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Se a página contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
    renderWithRouter(<About />);

    const tagImg = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(tagImg).toHaveAttribute('src', url);
    expect(tagImg).toBeInTheDocument();
  });
});
