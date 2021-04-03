import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCurrencies } from '../actions';
import fetchApi from '../services/fetchAPI';

class FormWallet extends React.Component {
  constructor() {
    super();
    this.handleFetchApi = this.handleFetchApi.bind(this);
  }

  componentDidMount() {
    this.handleFetchApi();
  }

  async handleFetchApi() {
    const { setCurrencies } = this.props;
    const object = await fetchApi();
    setCurrencies(object);
  }

  render() {
    const { currencies } = this.props;
    const currenciesArray = Object.keys(currencies);
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input id="value" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input id="description" data-testid="description-input" />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency" data-testid="currency-input">
            {currenciesArray.map((currency) => (
              <option key={ currency } data-testid={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select id="method" data-testid="method-input">
            {methods.map((method) => (
              <option key={ method }>{method}</option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select id="tag" data-testid="tag-input">
            {tags.map((tag) => (
              <option key={ tag }>{tag}</option>
            ))}
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: (currencies) => dispatch(saveCurrencies(currencies)),
});

FormWallet.propTypes = {
  setCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
