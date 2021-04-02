import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendCurrencies, addNewExpense } from '../actions';
import DynamicSelect from './DynamicSelect';
import fetchCurrenciesApi from '../services/fetchCurrenciesApi';

const paymentMethods = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
const expenseCategories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.dispatchCurrencies = this.dispatchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.dispatchCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async dispatchCurrencies() {
    const { sendCurrenciesToRedux } = this.props;
    const currencies = await fetchCurrenciesApi();
    sendCurrenciesToRedux(currencies);
  }

  async handleClick() {
    this.dispatchCurrencies();
    const { value, description, currency, method, tag } = this.state;
    const { currencies, expenses, sendNewExpense } = this.props;

    const newExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    // * Source https://github.com/tryber/sd-09-project-trybewallet/pull/52/files /
    sendNewExpense(newExpense);
    this.setState(INITIAL_STATE);
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          Valor
          <input
            data-testid="value-input"
            name="value"
            type="text"
            onChange={ this.handleChange }
          />
          Descrição
          <input
            data-testid="description-input"
            name="description"
            type="text"
            onChange={ this.handleChange }
          />
          <DynamicSelect
            textLabel="Moedas:"
            name="currency"
            options={ Object.keys(currencies) }
            handleChange={ this.handleChange }
          />
          <DynamicSelect
            textLabel="Método de Pagamento:"
            name="method"
            options={ paymentMethods }
            handleChange={ this.handleChange }
          />
          <DynamicSelect
            textLabel="Categoria da Despesa:"
            name="tag"
            options={ expenseCategories }
            handleChange={ this.handleChange }
          />
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  sendCurrenciesToRedux: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  sendNewExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendCurrenciesToRedux: (currencies) => dispatch(sendCurrencies(currencies)),
  sendNewExpense: (newExpense) => dispatch(addNewExpense(newExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
