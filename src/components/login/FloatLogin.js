import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import { logout } from '../../store/reducers/loginReducer';
import { message } from 'antd';

class FloatLogin extends Component {

  state = {
    isOpen: false,
  };


  openFloatCarrinho = () => {
    if(this.props.user) {
      this.props.logout();
      setTimeout(function(){ window.location = 'http://localhost:3000/'; }, 1500);
      message.warning('Você deslogou!');
    } else {
      this.setState({ isOpen: true });
    }
  }

  closeFloatCarrinho = () => {
    this.setState({ isOpen: false });
  }

  render() {
    let { user } = this.props;

    let classes = ['float-carrinho'];

    if (!!this.state.isOpen) {
      classes.push('float-carrinho--open');
    }

    if(this.state.isOpen && user) {
      this.closeFloatCarrinho();
    }

    return (
      <div className={classes.join(' ')}>
        {/* If carrinho open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCarrinho()}
            className="float-carrinho__close-btn"
          >
          X
          </div>
        )}

        {/* If carrinho is closed, show sacola with quantidade of produto and open carrinho action */}
        {!this.state.isOpen && (
          <span style={{ marginLeft: '-60px'}}
            onClick={() => this.openFloatCarrinho()}
            className={`sacola ${user ? 'sacola-logout' : 'sacola-login'} sacola--float-carrinho-closed`}
          >
          </span>
        )}

        <div className="float-carrinho__content">
          <div className="float-carrinho__header">
            <span className="sacola sacola-login">
            </span>
            <span className="header-title">{user ? user.usuario : 'LogIn'}</span>
          </div>

          <div className="float-carrinho__prateleira-container">
            <LoginForm/>
          </div>

          <div className="float-carrinho__footer">
          </div>
        </div>
      </div>
    );
  }
}

FloatLogin.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
}

export default connect(mapStateToProps, { logout })(FloatLogin);
