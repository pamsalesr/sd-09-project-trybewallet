import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToWallet, fetchCurrencyThunk } from '../actions';
import getCurrencyApi from '../api';

const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const initialState = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currencyList: [], ...initialState };

    // this.fetchCurencyFiltered = this.fetchCurencyFiltered.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getCurrency() {
    const { fetchCurrency } = this.props;
    await fetchCurrency();
  }

  getCurrencieslist() {
    const { currencies } = this.props;
    const currenciesKeys = Object.keys(currencies);
    this.setState({
      currencyList: currenciesKeys,
    });
  }

  /* async fetchCurencyFiltered() {
    const requstCurrency = await getCurrencyApi();
    const filteredCurrency = Object.keys(requstCurrency)
      .filter((initials) => initials !== 'USDT');
    this.setState({
      currencyList: filteredCurrency,
    });
  } */

  async handleClick() {
    await this.getCurrencyFromStore();
    const { value, description, currency, method, tag } = this.state;
    const { addExpense, expenses } = this.props;
    const exchangeRates = await getCurrencyApi();
    addExpense({
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
    /* this.setState({
      id: id + 1,
    }); */
    const form = document.querySelector('.form-despesa');
    form.reset();
  }

  render() {
    const { currencyList } = this.state;
    return (
      <form className="form-despesa">
        <input
          placeholder="Valor da despesa"
          data-testid="value-input"
          onChange={ (e) => this.setState({ value: e.target.value }) }
        />
        <input
          placeholder="Descrção da despesa"
          data-testid="description-input"
          onChange={ (e) => this.setState({ description: e.target.value }) }
        />
        <select
          data-testid="currency-input"
          onChange={ (e) => this.setState({ currency: e.target.value }) }
        >
          { currencyList.map((cur) => (
            <option key={ cur } data-testid={ cur } value={ cur }>
              { cur }
            </option>))}
        </select>
        <select
          data-testid="method-input"
          onChange={ (e) => this.setState({ method: e.target.value }) }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartão de crédito">Cartão de crédito</option>
          <option value="cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ (e) => this.setState({ tag: e.target.value }) }
        >
          {tagList.map((el) => (
            <option key={ el } value={ el }>{el}</option>))}
        </select>
        <button
          type="button"
          onClick={ async () => this.handleClick() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
  currencies: PropTypes.objectOf().isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addToWallet(expense)),
  fetchCurrency: () => dispatch(fetchCurrencyThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
