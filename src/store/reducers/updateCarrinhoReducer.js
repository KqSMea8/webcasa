import { UPDATE_CART } from '../actions/types';


const initialState = {
  item: {
    produtoQuantidade: 0,
    installments: 0,
    totalPreco: 0,
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
