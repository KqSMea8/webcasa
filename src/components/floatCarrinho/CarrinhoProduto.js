import React, { Component } from 'react';
import PropTypes from "prop-types";

import Thumb from '../Thumb';

import util from '../../util';


class CarrinhoProduto extends Component {

  state = {
    isMouseOver: false,
  }

  handleMouseOver = () => {
    this.setState({isMouseOver: true});
  }

  handleMouseOut = () => {
    this.setState({isMouseOver: false});
  }


  render(){
    const { produto, removeProduto } = this.props;

    const classes = ['prateleira-item'];

    if(!!this.state.isMouseOver){
      classes.push('prateleira-item--mouseover');
    }

    return (
      <div className={classes.join(' ')}>
        <div
          className="prateleira-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeProduto(produto)}
        />
        <Thumb
          classes="prateleira-item__thumb"
          src={require(`../../static/produtos/${produto.sku}_2.jpg`)}
          alt={produto.title}
        />
        <div className="prateleira-item__details">
          <p className="title">{produto.title}</p>
          <p className="desc">
            {`${produto.tiposDisponiveis[0]} | ${produto.style}`} <br />
            Quantidade: {`${produto.quantidade} ${produto.medida.toLowerCase()}`}
          </p>
        </div>
        <div className="prateleira-item__preco">
          <p>{`${produto.currencyFormat}  ${util.formatPreco(produto.preco)}/${produto.medida.toLowerCase()}`}</p>
        </div>

        <div className="clearfix" />
      </div>
    );
  }
}


CarrinhoProduto.propTypes = {
  produto: PropTypes.object.isRequired,
  removeProduto: PropTypes.func.isRequired,
};

export default CarrinhoProduto;
