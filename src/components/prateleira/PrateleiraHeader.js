import React from 'react';
import PropTypes from 'prop-types';

import Sort from './Sort';
import Clearfix from '../Clearfix';


const PrateleiraHeader = (props) => {

  return (
    <div className="prateleira-container-header">
      <small className="produtos-found">
        <span>{props.produtosLength} Produto(s) encontrado(s).</span>
      </small>
      <Sort />
      <Clearfix />
    </div>
  );
}

PrateleiraHeader.propTypes = {
  produtosLength: PropTypes.number.isRequired,
}

export default PrateleiraHeader;