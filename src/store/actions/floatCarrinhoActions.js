import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT } from './types';


export const loadCarrinho = (carrinhoProdutos) => dispatch => {
  dispatch({
    type: LOAD_CART,
    payload: carrinhoProdutos,
  });
}

export const addProduto = (produtoData) => dispatch => {
  dispatch({
    type: ADD_PRODUCT,
    payload: produtoData,
  });
}

export const removeProduto = (produtoData) => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT,
    payload: produtoData,
  });
}
