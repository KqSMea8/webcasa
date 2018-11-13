const persistentLogin = () => {
  const key = 'login';

  return {
    persist: (data) => localStorage.setItem(key, data),
    get: () => localStorage.getItem(key),
    remove: () => localStorage.removeItem(key)
  }

}

export default persistentLogin;
