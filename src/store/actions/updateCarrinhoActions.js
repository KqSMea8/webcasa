import { UPDATE_CART} from './types';

import persistentCarrinho from '../../persistentCarrinho';


export const updateCarrinho = (carrinhoProdutos) => dispatch => {
  let produtoQuantidade = carrinhoProdutos.reduce( (sum, p) => {
    sum += parseFloat(p.quantidade);
    return sum;
  }, 0);

  let totalPreco = carrinhoProdutos.reduce((sum, p) => {
    sum += p.preco * p.quantidade;
    return sum;
  }, 0);

  let installments = carrinhoProdutos.reduce((greater, p) => {
    greater = p.installments > greater ? p.installments : greater;
    return greater;
  }, 0);
  

  let carrinhoTotals = {
    produtoQuantidade,
    installments,
    totalPreco,
    currencyId: 'BRL',
    currencyFormat: 'R$',
  }

  persistentCarrinho().persist(JSON.stringify(carrinhoProdutos));

  dispatch({
    type: UPDATE_CART,
    payload: carrinhoTotals,
  });

}
