import { combineReducers } from 'redux';
import produtoReducer from './produtoReducer';
import floatCarrinhoReducer from './floatCarrinhoReducer';
import updateCarrinhoReducer from './updateCarrinhoReducer';
import filterReducer from './filterReducer';
import sortReducer from './sortReducer';
import loginReducer from './loginReducer';


export default combineReducers({
  produtos: produtoReducer,
  carrinhoProdutos: floatCarrinhoReducer,
  carrinhoTotals: updateCarrinhoReducer,
  filters: filterReducer,
  sort: sortReducer,
  login: loginReducer
});