import React from 'react';
import { connect } from 'react-redux';
import './Wallet.css';
import PropTypes from 'prop-types';
import currenciesAPI from '../actions/apiRequest';
import addExpense from '../actions/addExpense';
import deleteExpense from '../actions/deleteExpense';
import editExpense from '../actions/editExpense';

class Wallet extends React.Component {
  constructor() {
    super();
    this.returnSelect = this.returnSelect.bind(this);
    this.paymentMethods = this.paymentMethods.bind(this);
    this.tags = this.tags.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleTotal = this.handleTotal.bind(this);
    this.createTable = this.createTable.bind(this);
    this.editOrAdd = this.editOrAdd.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.state = {
      id: 0,
      idToEdit: '',
      editing: false,
      currencies: ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
        'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'],
    };
  }

  componentDidMount() {
    const { dispatchCurrency } = this.props;
    dispatchCurrency();
  }

  getValueOfInputs(id) {
    let expense = { id };
    const inputs = ['value', 'currency', 'method', 'tag', 'description'];
    inputs.forEach((input) => {
      let { value } = document.getElementById(input);
      if (value === '' && input === 'value') {
        value = 0;
      }
      expense = { ...expense, [input]: value };
      if (input === 'value' || input === 'description') {
        document.getElementById(input).value = '';
      }
    });
    return expense;
  }

  handleTotal() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      const { currency } = expense;
      const value = parseFloat(expense.value);
      const { ask } = expense.exchangeRates[currency];
      total += (ask * value);
    });
    return total.toFixed(2);
  }

  handleButton() {
    const { submitExpense } = this.props;
    const { id } = this.state;
    submitExpense(this.getValueOfInputs(id));
    this.setState({
      id: id + 1,
    });
  }

  editOrAdd() {
    const { editing } = this.state;
    if (editing === true) {
      return (
        <button type="button" onClick={ this.editExpense }>Editar despesa</button>
      );
    }
    return <button type="button" onClick={ this.handleButton }>Adicionar despesa</button>;
  }

  editExpense() {
    const { idToEdit } = this.state;
    const { editingExpense } = this.props;
    editingExpense(this.getValueOfInputs(idToEdit));
    this.setState({ editing: false });
  }

  returnSelect() {
    const { currencies } = this.state;
    return (currencies.map((currency) => (
      <option
        value={ currency }
        data-testid={ currency }
        key={ currency }
      >
        { currency }
      </option>))
    );
  }

  paymentMethods() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return methods.map((method) => (
      <option
        value={ method }
        key={ method }
      >
        { method }
      </option>));
  }

  tags() {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return tags.map((tag) => <option value={ tag } key={ tag }>{ tag }</option>);
  }

  createBody() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return (expenses.map((expense) => {
        const { description, tag, method, value, currency, id } = expense;
        const { ask, name } = expense.exchangeRates[currency];
        const { removeExpense } = this.props;
        return (
          <tr key={ description }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ parseFloat(value) }</td>
            <td>{ name }</td>
            <td>{ parseFloat(ask).toFixed(2) }</td>
            <td>{ (ask * parseFloat(value)).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.setState({ editing: true, idToEdit: id }) }
              >
                Editar
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => removeExpense(id) }
              >
                Apagar
              </button>
            </td>
          </tr>
        );
      }));
    }
    return null;
  }

  createTable() {
    const titles = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table className="table">
        <thead>
          <tr>
            {titles.map((title) => <th key={ title }>{ title }</th>)}
          </tr>
        </thead>
        <tbody>
          { this.createBody() }
        </tbody>
      </table>
    );
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <div>TRYBE WALLET</div>
          <div>
            Email:
            <span className="span-header" data-testid="email-field">{ email }</span>
            <span className="span-header">Despesa total:</span>
            <span data-testid="total-field">{ this.handleTotal() }</span>
            <span className="span-header" data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <div className="form">
          <form className="form">
            <label htmlFor="value">
              Valor:
              <input id="value" type="number" data-testid="value-input" />
            </label>
            <label htmlFor="currency">
              Moeda:
              <select id="currency" data-testid="currency-input">
                { this.returnSelect() }
              </select>
            </label>
            <label htmlFor="method">
              Método de pagamento:
              <select id="method" data-testid="method-input">
                { this.paymentMethods() }
              </select>
            </label>
            <label htmlFor="tag">
              Tag:
              <select id="tag" data-testid="tag-input">
                { this.tags() }
              </select>
            </label>
            <label htmlFor="description">
              Descrição:
              <input id="description" type="text" data-testid="description-input" />
            </label>
            { this.editOrAdd() }
          </form>
        </div>
        <div className="table">{ this.createTable() }</div>
      </div>
    );
  }
}

Wallet.propTypes = { email: PropTypes.string.isRequired,
  dispatchCurrency: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  editingExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: () => dispatch(currenciesAPI()),
  submitExpense: (expense) => dispatch(addExpense(expense)),
  removeExpense: (id) => dispatch(deleteExpense(id)),
  editingExpense: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
