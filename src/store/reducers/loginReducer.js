import axios from 'axios';
import persistentLogin from '../../persistentLogin';

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_USER = 'SET_USER';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

const usuariosAPI = "http://localhost:8001/api/usuarios";

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(null));
    dispatch(setLoginError(null));

    callLoginApi(email, password, cb => {
      dispatch(setLoginPending(false));
      if(cb) {
        dispatch(setLoginSuccess(cb));
        persistentLogin().persist(JSON.stringify(cb));
      }
      else {
        dispatch(setLoginError(new Error('Senha ou email inválidos')));
      }
    });
  }
}

export function pullUsuario(usuario) {
  return dispatch => {
    dispatch(setLoginSuccess(usuario));
  }
}

export function logout() {
  persistentLogin().remove();
  return dispatch => {
    dispatch(setLoginSuccess(null));
  }
}

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(user) {
  return {
    type: SET_USER,
    user
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}

function callLoginApi(email, password, callback) {
  axios.get(usuariosAPI)
  .then(res => {
    let usuario = res.data;

    if(email && password) {
      usuario = usuario.usuarios.filter(user => user.email === email && user.senha === password);
      return callback(usuario[0])
    } else {
      return callback(null);
    }
  })
  .catch(err => {
    console.log(err);
    throw new Error('Não foi possível acessar a API de usuarios')
  })
}

export default function (state = {
  isLoginSuccess: false,
  user: null,
  loginError: null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_USER:
      return Object.assign({}, state, {
        user: action.user
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    default:
      return state;
  }
}