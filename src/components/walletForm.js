import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions';
import InputValue from './inputValue';
import InputDescription from './inputDescription';
import InputCurrency from './inputCurrency';
import InputMethod from './inputMethod';
import InputTag from './inputTag';
import * as Actions from '../actions';
import './walletForm.css';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonAdd = this.buttonAdd.bind(this);
    this.clearState = this.clearState.bind(this);
    this.computeValue = this.computeValue.bind(this);
    this.loadExpense = this.loadExpense.bind(this);
    this.addRegister = this.addRegister.bind(this);
    this.editRegister = this.editRegister.bind(this);
  }

  componentDidMount() {
    const { addCurrency } = this.props;
    addCurrency();
  }

  componentDidUpdate() {
    const { editExpense, wallet } = this.props;
    const { edit } = wallet;
    const noEdit = -1;
    const yesEdit = -2;

    if (edit > noEdit) {
      editExpense(yesEdit);
      this.loadExpense(edit);
    }
  }

  loadExpense(id) {
    const { wallet } = this.props;
    const { expenses } = wallet;
    const expense = expenses.find((aux) => aux.id === id);

    this.setState({
      id: expense.id,
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      exchangeRates: expense.exchangeRates,
    });
  }

  clearState() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  computeValue(total, value, currency, exchangeRates) {
    return total + parseFloat(value) * parseFloat(exchangeRates[currency].ask);
  }

  buttonAdd() {
    const { wallet } = this.props;
    const { edit } = wallet;
    const yesEdit = -2;

    if (edit !== yesEdit) {
      this.addRegister();
    } else {
      this.editRegister();
    }
  }

  addRegister() {
    const { addCurrency, addExpense, addTotals, totals } = this.props;
    addCurrency();
    const { total, currency: currencyTotal } = totals;
    const { id, value, description, currency, exchangeRates } = this.state;
    if (value !== 0 && description !== '') {
      this.setState({
        id: id + 1,
      });
      addExpense(this.state);
      addTotals(this.computeValue(total, value, currency, exchangeRates), currencyTotal);
      this.clearState();
    }
  }

  editRegister() {
    const { id, value, description } = this.state;
    const { wallet, addTotals, totals, upgradeExpenses, editExpense } = this.props;
    const { expenses } = wallet;
    const { currency: currencyTotal } = totals;

    if (value !== 0 && description !== '') {
      const newExpenses = [];
      expenses.forEach((expense) => {
        if (expense.id === id) {
          newExpenses.push(this.state);
        } else {
          newExpenses.push(expense);
        }
      });
      upgradeExpenses(newExpenses);
      const total = expenses.reduce((totalValue, expense) => {
        totalValue += expense.exchangeRates[expense.currency].ask * expense.value;
        return totalValue;
      }, 0);
      addTotals(total, currencyTotal);
      const noEdit = -1;
      editExpense(noEdit);
      this.clearState();
    }
  }

  handleChange({ target }) {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { name, value } = target;

    if (value !== 0 || value !== '') {
      this.setState({
        [name]: value,
        exchangeRates: currencies,
      });
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { wallet } = this.props;
    const { edit } = wallet;
    const yesEdit = -2;
    let buttonLabel = 'Adicionar despesa';

    if (edit === yesEdit) {
      buttonLabel = 'Editar despesa';
    }

    return (
      <div>
        <div className="wallet-form">
          <InputValue fieldValue={ value } fieldFunction={ this.handleChange } />
          <InputDescription
            fieldValue={ description }
            fieldFunction={ this.handleChange }
          />
          <InputCurrency
            fieldValue={ currency }
            fieldFunction={ this.handleChange }
            fieldDefault={ currency }
          />
          <InputMethod
            fieldValue={ method }
            fieldFunction={ this.handleChange }
            fieldDefault={ method }
          />
          <InputTag
            fieldValue={ tag }
            fieldFunction={ this.handleChange }
            fieldDefault={ tag }
          />
          <button
            type="button"
            onClick={ this.buttonAdd }
          >
            { buttonLabel }
          </button>
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  addCurrency: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  addTotals: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  upgradeExpenses: PropTypes.func.isRequired,
  totals: PropTypes.shape({
    total: PropTypes.number,
    currency: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
    expenses: PropTypes.arrayOf(PropTypes.object),
    lastId: PropTypes.number,
    edit: PropTypes.number,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addCurrency: () => dispatch(fetchCurrency()),
  addExpense: (expense) => dispatch(Actions.addExpense(expense)),
  addTotals: (total, currency) => dispatch(Actions.addTotals(total, currency)),
  editExpense: (id) => dispatch(Actions.editExpense(id)),
  upgradeExpenses: (expenses) => dispatch(Actions.upgradeExpenses(expenses)),
});

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
