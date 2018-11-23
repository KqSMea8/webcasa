import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import persistentLogin from '../../persistentLogin';
import { pullUsuario } from '../../store/reducers/loginReducer';
import './menu.css';

class BarraMenu extends Component {
  state = {
    current: 'mail',
  }

  componentWillMount() {
    this.props.pullUsuario(JSON.parse(persistentLogin().get()) || null)
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    let { user } = this.props;

    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="usuario" style={{ float: 'right' }}>
          <Link to="/usuario">{ user && user.usuario }</Link>
        </Menu.Item>
        <Menu.Item key="encomendas" style={{ float: 'right' }}>
          <Link to="/encomendas">{ user && `Minhas Encomendas` }</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

BarraMenu.propTypes = {
  pullUsuario: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
}

export default connect(mapStateToProps, { pullUsuario })(BarraMenu);