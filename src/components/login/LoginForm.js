import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/reducers/loginReducer';
import { Link } from 'react-router-dom';
import { TextField, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Button, Row, Col, message } from 'antd';
import './LoginForm.css';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#ddb05b'},
    secondary: {main: '#ddb05b'}
  }
});

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {email:'', password:''};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let {email, password} = this.state;
    let {isLoginPending, loginError} = this.props;
    
  return (
        <div className="login-form-group-collection">
          <MuiThemeProvider theme={theme}>
            <div className="login-form-group">
              <TextField
              id="user"
              label="Email"
              value={email}
              InputLabelProps={{ shrink: true }}
              onChange={e => this.setState({email: e.target.value})}
              margin="normal"/>
            </div>
            <div className="login-form-group">
              <TextField
              id="password"
              type="password"
              label="Senha"
              value={password}
              InputLabelProps={{ shrink: true }}
              onChange={e => this.setState({password: e.target.value})}
              margin="normal"/>
            </div>
          </MuiThemeProvider>
          <Row gutter={10}>
          <Col className="gutter-row" span={6}>
            <div className="gutter-box">
              <Button type="primary" loading={isLoginPending} onClick={this.onSubmit}>
                Entrar
              </Button>
            </div>
          </Col>
          <Col className="gutter-row" span={18}>
            <div className="login-message">
            <Link to="/cadastrar">
              Ainda não é cadastrado? Registre-se!
            </Link>
            </div>
          </Col>
        </Row>

        {loginError ?  message.error(loginError.message) : ''}
      </div>
    )
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.login.isLoginPending,
    user: state.login.user,
    loginError: state.login.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);