import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound.js', () => {
  test('Se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<NotFound />);

    const requesteNotFound = screen.getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(requesteNotFound).toBeInTheDocument();
  });
  test('Se a página contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
    renderWithRouter(<NotFound />);

    const tagImg = screen.getByRole('img');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(tagImg).toHaveAttribute('src', url);
    expect(tagImg).toBeInTheDocument();
  });
});
