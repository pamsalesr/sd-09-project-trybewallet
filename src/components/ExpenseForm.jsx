import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, editExpense, saveExpenses } from '../actions';
import apiCurrencies from '../services/APIcurrencies';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      currency: 'USD',
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.creatorCurrencySelect = this.creatorCurrencySelect.bind(this);
    this.creatorPaymentSelect = this.creatorPaymentSelect.bind(this);
    this.creatorTagSelect = this.creatorTagSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
    this.creatorButtons = this.creatorButtons.bind(this);
    this.saveEditExpense = this.saveEditExpense.bind(this);
  }

  componentDidMount() {
    const { dispatchfetch } = this.props;
    dispatchfetch();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  creatorCurrencySelect() {
    const { currency } = this.props;
    return (
      <div>
        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            id="currency-input"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currency.map((cur) => (
              <option
                value={ cur }
                key={ cur }
                data-testid={ cur }
              >
                {cur}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  creatorPaymentSelect() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Metodo de Pagamento:
        <select
          value={ method }
          name="method"
          id="method-input"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  creatorTagSelect() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          value={ tag }
          name="tag"
          id="tag-input"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  async addExpenses() {
    const { id, currency, value, description, method, tag } = this.state;
    const { dispatchExpenses } = this.props;
    const exchangeRates = await apiCurrencies();
    this.setState({ id: id + 1 });
    const expense = {
      id,
      currency,
      value,
      description,
      method,
      tag,
      exchangeRates,
    };
    dispatchExpenses(expense);
    this.setState({
      currency: 'USD',
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  saveEditExpense() {
    const { dispatchEditExpense } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const newObjExpense = {
      id, value, description, currency, method, tag,
    };
    dispatchEditExpense(newObjExpense);
  }

  creatorButtons() {
    const { editExpense } = this.props;
    if (!editExpense) {
      return (
        <button
          type="button"
          onClick={ () => this.addExpenses() }
        >
          Adicionar despesas:
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={ () => this.addExpenses() }
      >
        Editar Gasto:
      </button>
    );
  }

  // async saveNewExpense() {
  //   const { dispatchEditExpense } = this.props;
  //   const { id, value,description, currency, method, tag } = this.estate;
  //   const exchangeRates = await apiCurrencies();
  // }

  render() {
    const { value, description } = this.state;
    return (
      <div>
        <label
          htmlFor="value-input"
        >
          Valor:
          <input
            id="value-input"
            value={ value }
            name="value"
            type="number"
            data-testid="value-input"
            onChange={ this.handleChange }
            placeholder="0,00"
          />
        </label>
        <label
          htmlFor="description-input"
        >
          Descrição de despesas:
          <input
            id="description-input"
            value={ description }
            name="description"
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
            placeholder="Despesas"
          />
        </label>
        { this.creatorCurrencySelect() }
        { this.creatorPaymentSelect() }
        { this.creatorTagSelect() }
        { this.creatorButtons() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editExpense: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpenses: (expenses) => dispatch(saveExpenses(expenses)),
  dispatchfetch: (value) => dispatch(fetchCurrencies(value)),
  dispatchEditExpense: (newExpense) => dispatch(editExpense(newExpense)),
});

ExpenseForm.propTypes = {
  dispatchfetch: PropTypes.func.isRequired,
  currency: PropTypes.arrayOf(PropTypes.string),
  dispatchExpenses: PropTypes.func.isRequired,
  editExpense: PropTypes.objectOf(PropTypes.string),
};
ExpenseForm.defaultProps = {
  currency: [],
  editExpense: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
