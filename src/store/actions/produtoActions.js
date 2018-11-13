import { FETCH_PRODUCTS } from './types';
import axios from 'axios';


const produtosAPI = "http://localhost:8001/api/produtos";


const compare = {
  'lowestpreco': (a, b) => {
    if (a.preco < b.preco)
      return -1;
    if (a.preco > b.preco)
      return 1;
    return 0;
  },
  'highestpreco': (a, b) => {
    if (a.preco > b.preco)
      return -1;
    if (a.preco < b.preco)
      return 1;
    return 0;
  }
}

export const fetchProdutos = (filters, sortBy, callback) => dispatch => {

  axios.get(produtosAPI)
    .then(res => {
      let { produtos } = res.data;

      if(!!filters && filters.length > 0){
        produtos = produtos.filter( p => filters.find( f => p.tiposDisponiveis.find( tipo => tipo === f ) ) )
      }

      if(!!sortBy){
        produtos = produtos.sort(compare[sortBy]);
      }

      if(!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_PRODUCTS,
        payload: produtos
      });

    })
    .catch(err => {
      console.log(err);
      throw new Error('Could not fetch produtos. Try again later.');
    });
}