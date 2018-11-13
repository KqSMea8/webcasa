import React from 'react';
import PropTypes from "prop-types";
import Thumb from '../Thumb';

import util from '../../util';

import { InputNumber } from 'antd';


const Produto = (props) => {
  const produto = props.produto;

  // Um componente de input pode alterar a quantidade no futuro
  let formattedPreco = util.formatPreco(produto.preco, produto.currencyId);

  produto.quantidade = 1;

  let produtoInstallment;
  let produtoQuantidade;

  function changeQuantidade (value) {
    produto.quantidade = parseFloat(value);
  }

  if(!!produto.medida) {
    produtoQuantidade = (
        <InputNumber min={0.100} max={100} defaultValue={produto.medida === 'UN' ? 1 : 0.1}
                    step={produto.medida === 'UN' ? 1 : 0.1} onChange={changeQuantidade} />
    );
  }

  if(!!produto.installments) {
    const installmentPreco = (produto.preco / produto.installments);

    produtoInstallment = (
      <div className="installment">
        <span>or {produto.installments} x</span><b> {produto.currencyFormat} {util.formatPreco(installmentPreco, produto.currencyId)}</b>
      </div>
    );
  }

  return (
    <div className="prateleira-item" data-sku={produto.sku}>
      {produto.isNew && 
        <div className="prateleira-stopper">Novidade!</div>
      }
      <Thumb
        classes="prateleira-item__thumb"
        src={require(`../../static/produtos/${produto.sku}_1.jpg`)}
        alt={produto.title}
      />
      <p className="prateleira-item__title">{produto.title}</p>
      <div className="prateleira-item__preco">
        <div className="val"><small>{produto.currencyFormat}</small>
          <b>
            {formattedPreco.substr(0, formattedPreco.length - 3)}
          </b>
          <span>
            {`${formattedPreco.substr(formattedPreco.length - 3, 3)}/${produto.medida.toLowerCase()}`}
          </span>
        </div>
        {produtoInstallment}
        {produtoQuantidade}
      </div>
      <div onClick={() => props.addProduto(produto)} className="prateleira-item__buy-btn">Adicionar a Sacola</div>
    </div>
  );
}


Produto.propTypes = {
  produto: PropTypes.object.isRequired,
  addProduto: PropTypes.func.isRequired,
};

export default Produto;