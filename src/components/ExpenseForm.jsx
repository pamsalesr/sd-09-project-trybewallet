import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewExpenses, fetchCurrencies } from '../actions';

const NEW_STATE = {
  value: '0',
  description: '',
  currency: '',
  method: '',
  tag: '',
};

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.createNewExpense = this.createNewExpense.bind(this);
    this.currenciesDropdown = this.currenciesDropdown.bind(this);
    this.paymentMethodsDropdown = this.paymentMethodsDropdown.bind(this);
    this.tagsDropdown = this.tagsDropdown.bind(this);

    this.state = NEW_STATE;
  }

  async componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const { dispatchCurrencies } = this.props;
    await dispatchCurrencies();
  }

  handleInputs({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async createNewExpense() {
    await this.fetchCurrencies();
    const { value, description, currency, method, tag } = this.state;
    const {
      currenciesList,
      expenses,
      dispatchNewExpense,
    } = this.props;

    const newExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currenciesList,
    };

    dispatchNewExpense(newExpense);
    this.setState(NEW_STATE);
  }

  currenciesDropdown() {
    const { currenciesList } = this.props;

    return (
      <select
        data-testid="currency-input"
        name="currency"
        onChange={ this.handleInputs }
        required
      >
        <option style={ { display: 'none' } }> </option>
        { Object.keys(currenciesList)
          .filter((currency) => currency !== 'USDT')
          .map((currency) => (
            <option
              data-testid={ currency }
              key={ currency }
              value={ currency }
            >
              { currency}
            </option>
          ))}
      </select>
    );
  }

  paymentMethodsDropdown() {
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    return (
      <select data-testid="method-input" name="method" onChange={ this.handleInputs }>
        <option style={ { display: 'none' } }> </option>
        {paymentMethods.map((method, index) => (
          <option key={ index }>{method}</option>
        ))}
      </select>
    );
  }

  tagsDropdown() {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <select data-testid="tag-input" name="tag" onChange={ this.handleInputs }>
        <option style={ { display: 'none' } }> </option>
        {tags.map((tag, index) => (
          <option key={ index }>{tag}</option>
        ))}
      </select>
    );
  }

  render() {
    const { value } = this.state;

    return (
      <form>
        Valor:
        <input
          data-testid="value-input"
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleInputs }
        />

        Moeda:
        { this.currenciesDropdown() }

        Método de pagamento:
        { this.paymentMethodsDropdown() }

        Tag:
        { this.tagsDropdown() }

        Descrição:
        <input
          data-testid="description-input"
          type="text"
          name="description"
          onChange={ this.handleInputs }
        />

        <button
          type="button"
          onClick={ this.createNewExpense }
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currenciesList: PropTypes.objectOf(String),
  expenses: PropTypes.arrayOf(Object),
  dispatchNewExpense: PropTypes.func,
  dispatchCurrencies: PropTypes.func,
};

ExpenseForm.defaultProps = {
  currenciesList: { '': '' },
  expenses: [],
  dispatchNewExpense: PropTypes.func,
  dispatchCurrencies: PropTypes.func,
};

const mapStateToProps = ({ wallet }) => ({
  currenciesList: wallet.currenciesList,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchNewExpense: (newExpense) => dispatch(addNewExpenses(newExpense)),
  dispatchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
