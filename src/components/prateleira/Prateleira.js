import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchProdutos } from '../../store/actions/produtoActions';
import { addProduto } from '../../store/actions/floatCarrinhoActions';

import Produto from './Produto';
import Filter from './Filter';
import PrateleiraHeader from './PrateleiraHeader';
import Clearfix from '../Clearfix';
import Spinner from '../Spinner';


class Prateleira extends Component {
  state  = {
    loading: false,
  }

  componentWillMount() {
    const { filters, sort } = this.props;

    this.handleFetchProdutos(filters, sort);
  }

  componentWillReceiveProps(nextProps) {
    const { filters: nextFilters, sort: nextSort } = nextProps;

    if (nextFilters !== this.props.filters) {
      this.handleFetchProdutos(nextFilters, undefined);
    }

    if (nextSort !== this.props.sort) {
      this.handleFetchProdutos( undefined, nextSort);
    }
  }

  handleFetchProdutos = (filters = this.props.filters, sort = this.props.sort) => {
    this.setState({ loading: true });
    this.props.fetchProdutos(filters, sort, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { produtos } = this.props;

    const p = produtos.map(p => {
      return (
        <Produto
          produto={p}
          addProduto={this.props.addProduto}
          key={p.id}
        />
      );
    });

    return (
      <React.Fragment>
        {this.state.loading &&
          <Spinner />
        }
        <Filter />  
        <div className="prateleira-container">
          <PrateleiraHeader produtosLength={produtos.length}/>
          {p}
          <Clearfix />
        </div>
        <Clearfix />
      </React.Fragment>
    )

  }
}

Prateleira.propTypes = {
  fetchProdutos: PropTypes.func.isRequired,
  produtos: PropTypes.array.isRequired,
  addProduto: PropTypes.func.isRequired,
  filters: PropTypes.array,
  sort: PropTypes.string,
}

const mapStateToProps = state => ({
  produtos: state.produtos.items,
  filters: state.filters.items,
  sort: state.sort.item,
})

export default connect(mapStateToProps, { fetchProdutos, addProduto })(Prateleira);
