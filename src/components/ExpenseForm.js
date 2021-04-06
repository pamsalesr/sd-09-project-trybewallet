import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchCurrencies } from '../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputField = this.inputField.bind(this);
    this.currencyInput = this.currencyInput.bind(this);
    this.methodInput = this.methodInput.bind(this);
    this.tagInput = this.tagInput.bind(this);
    this.state = {
      currentExpense: {
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState((state) => ({
      ...state,
      currentExpense: {
        ...state.currentExpense,
        [name]: value,
      },
    }));
  }

  handleSubmit() {
    const { addNewExpense } = this.props;
    const { currentExpense } = this.state;
    addNewExpense(currentExpense);
    document.getElementById('expense-form').reset();
    this.setState(() => ({
      currentExpense: {
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    }));
  }

  inputField(name, type) {
    return (
      <input
        name={ name }
        type={ type }
        data-testid={ `${name}-input` }
        onChange={ (e) => this.handleChange(e) }
      />
    );
  }

  currencyInput() {
    const { currencies } = this.props;
    let currenciesCodes = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    if (currencies) { currenciesCodes = Object.keys(currencies); }
    return (
      <select
        name="currency"
        onChange={ (e) => this.handleChange(e) }
        data-testid="currency-input"
      >
        { currenciesCodes.map((currency) => (
          <option
            key={ currency }
            name={ currency }
            data-testid={ currency }
          >
            {currency}
          </option>
        ))}
      </select>
    );
  }

  methodInput() {
    return (
      <select
        name="method"
        onChange={ (e) => this.handleChange(e) }
        data-testid="method-input"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  tagInput() {
    return (
      <select
        name="tag"
        onChange={ (e) => this.handleChange(e) }
        data-testid="tag-input"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render() {
    return (
      <form id="expense-form">
        <span>Valor: </span>
        { this.inputField('value', 'number') }
        <span>Moeda: </span>
        { this.currencyInput() }
        <span>Método de Pagamento: </span>
        { this.methodInput() }
        <span>Tag: </span>
        { this.tagInput() }
        <span>Descrição: </span>
        { this.inputField('description', 'text') }
        <button
          type="button"
          onClick={ () => this.handleSubmit() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  addNewExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object),
};

ExpenseForm.defaultProps = {
  currencies: {},
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies[0],
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addNewExpense: (currentExpense) => dispatch(addExpense(currentExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
