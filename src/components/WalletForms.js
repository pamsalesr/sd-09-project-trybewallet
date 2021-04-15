import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { actionExpense } from '../actions';

class WalletForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currency: 'ILS',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencies: [],
      paymentMethod: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      expenses: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };

    this.optionsCreator = this.optionsCreator.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.currenciesDataToInitials(await this.fetchCurrencyQuotes());
  }

  async fetchCurrencyQuotes() {
    const fetchCurrency = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await fetchCurrency.json();
    console.log(response);
    return response;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  currenciesDataToInitials(currenciesData) {
    delete currenciesData.USDT;
    const initials = Object.keys(currenciesData);
    this.setState({ currencies: initials });
  }

  optionsCreator(item) {
    return (
      <option data-testid={ item } key={ item }>{item}</option>
    );
  }

  inputTextCreator(name, text, stateKey) {
    return (
      <label htmlFor={ name }>
        {text}
        <input
          type="text"
          data-testid={ `${name}-input` }
          name={ name }
          id={ name }
          value={ stateKey }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  dropDownCreator(name, keyToIterate, keyValue) {
    return (
      <label htmlFor={ name }>
        <select
          data-testid={ `${name}-input` }
          id={ name }
          name={ name }
          onChange={ this.handleChange }
          value={ keyValue }
        >
          {keyToIterate.map((element) => this.optionsCreator(element))}
        </select>
      </label>
    );
  }

  expenseCreator() {
    const { expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    console.log(expenses);
    const { length } = expenses;
    return {
      id: (length > 0) ? (expenses[length - 1].id + 1) : 0,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: this.fetchCurrencyQuotes(),
    };
  }

  render() {
    const {
      currencies,
      paymentMethod,
      expenses,
      value,
      description,
      currency } = this.state;
    const { addExpense } = this.props;
    return (
      <forms>
        {this.inputTextCreator('value', 'Valor da despesa', value)}
        {this.inputTextCreator('description', 'Descrição da despesa', description)}
        {this.dropDownCreator('currency', currencies, currency)}
        {this.dropDownCreator('method', paymentMethod)}
        {this.dropDownCreator('tag', expenses)}
        <button type="button" onClick={ () => addExpense(this.expenseCreator()) }>
          Adicionar despesa
        </button>
      </forms>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(actionExpense(expense)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletForms.propTypes = {
  addExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForms);
