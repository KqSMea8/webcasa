const persistentCarrinho = () => {
  const key = 'carrinhoProdutos';
  
  return {
    persist: (data) => localStorage.setItem(key, data),
    get: () => localStorage.getItem(key),
  }

}

export default persistentCarrinho;
