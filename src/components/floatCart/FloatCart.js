import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCarrinho, removeProduto } from '../../store/actions/floatCarrinhoActions';
import { updateCarrinho } from '../../store/actions/updateCarrinhoActions';

import CarrinhoProduto from './CarrinhoProduto';

import persistentCarrinho from "../../persistentCarrinho";

import util from '../../util';


class FloatCarrinho extends Component {
  
  state = {
    isOpen: false,
  };

  componentWillMount() {
    this.props.loadCarrinho( JSON.parse(persistentCarrinho().get()) || [] );
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateCarrinho(this.props.carrinhoProdutos);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduto !== this.props.newProduto) {
      this.addProduto(nextProps.newProduto);
    }

    if (nextProps.produtoToRemove !== this.props.produtoToRemove) {
      this.removeProduto(nextProps.produtoToRemove);
    }
  }

  openFloatCarrinho = () => {
    this.setState({ isOpen: true });
  }

  closeFloatCarrinho = () => {
    this.setState({ isOpen: false });
  }

  addProduto = (produto) => {
    const { carrinhoProdutos, updateCarrinho } = this.props;
    let produtoAlreadyInCarrinho = false;

    carrinhoProdutos.forEach(cp => {
      if (cp.id === produto.id) {
        cp.quantidade += produto.quantidade;
        produtoAlreadyInCarrinho = true;
      }
    });

    if (!produtoAlreadyInCarrinho) {
      carrinhoProdutos.push(produto);
    }

    updateCarrinho(carrinhoProdutos);
    this.openFloatCarrinho();
  }

  removeProduto = (produto) => {
    const { carrinhoProdutos, updateCarrinho } = this.props;

    const index = carrinhoProdutos.findIndex(p => p.id === produto.id);
    if (index >= 0) {
      carrinhoProdutos.splice(index, 1);
      updateCarrinho(carrinhoProdutos);
    }
  }

  proceedToCheckout = () => {
    const { totalPreco, produtoQuantidade, currencyFormat, currencyId } = this.props.carrinhoTotals;

    if (!produtoQuantidade) {
      alert("Adicione algum produto na sacola!");
    }else {
      alert(`Checkout - Subtotal: ${currencyFormat} ${util.formatPreco(totalPreco, currencyId)}`);
    }
  }

  render() {
    const { carrinhoTotals, carrinhoProdutos, removeProduto } = this.props;

    const produtos = carrinhoProdutos.map(p => {
      return (
        <CarrinhoProduto
          produto={p}
          removeProduto={removeProduto}
          key={p.id}
        />
      );
    });

    let classes = ['float-carrinho'];

    if (!!this.state.isOpen) {
      classes.push('float-carrinho--open');
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
          <span
            onClick={() => this.openFloatCarrinho()}
            className="sacola sacola--float-carrinho-closed"
          >
            <span className="sacola__quantidade">{carrinhoTotals.produtoQuantidade}</span>
          </span>
        )}

        <div className="float-carrinho__content">
          <div className="float-carrinho__header">
            <span className="sacola">
              <span className="sacola__quantidade">
                {carrinhoTotals.produtoQuantidade}
              </span>
            </span>
            <span className="header-title">Sacola</span>
          </div>

          <div className="float-carrinho__prateleira-container">
            {produtos}
            {!produtos.length && (
              <p className="prateleira-empty">
                Adicione algum produto na sacola <br />:)
              </p>
            )}
          </div>

          <div className="float-carrinho__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-preco">
              <p className="sub-preco__val">
                {`${carrinhoTotals.currencyFormat} ${util.formatPreco(carrinhoTotals.totalPreco, carrinhoTotals.currencyId)}`}
              </p>
              <small className="sub-preco__installment">
                {!!carrinhoTotals.installments && (
                  <span>
                    {`OR UP TO ${carrinhoTotals.installments} x ${carrinhoTotals.currencyFormat} ${util.formatPreco(carrinhoTotals.totalPreco / carrinhoTotals.installments, carrinhoTotals.currencyId)}`}
                  </span>
                )}
              </small>
            </div>
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FloatCarrinho.propTypes = {
  loadCarrinho: PropTypes.func.isRequired,
  updateCarrinho: PropTypes.func.isRequired,
  carrinhoProdutos: PropTypes.array.isRequired,
  newProduto: PropTypes.object,
  removeProduto: PropTypes.func,
  produtoToRemove: PropTypes.object,
};

const mapStateToProps = state => ({
  carrinhoProdutos: state.carrinhoProdutos.items,
  newProduto: state.carrinhoProdutos.item,
  produtoToRemove: state.carrinhoProdutos.itemToRemove,
  carrinhoTotals: state.carrinhoTotals.item,
});

export default connect(mapStateToProps, { loadCarrinho, updateCarrinho, removeProduto})(FloatCarrinho);

