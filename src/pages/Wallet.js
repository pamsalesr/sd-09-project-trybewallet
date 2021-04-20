import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMoneyInfo, walletUpdate } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.reset = { ...this.state };
    this.expenseForm = this.expenseForm.bind(this);
    this.handleExpense = this.handleExpense.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  componentDidMount() {
    const { moneyInfo } = this.props;
    moneyInfo();
  }

  handleDropdown({ target }) {
    const { value, id } = target;
    this.setState({
      [id]: value,
    });
  }

  handleExpense() {
    const { moneyInfo } = this.props;
    moneyInfo();
    const { id, value, description, currency, method, tag } = this.state;
    const { money, saveExpense } = this.props;
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: { ...money },
    };
    console.log(newExpense);
    saveExpense(newExpense);
    this.setState((state) => ({
      ...this.reset,
      id: state.id + 1,
    }));
  }

  input(id, type, testid, maxLength) {
    return (<input
      id={ id }
      type={ type }
      data-testid={ testid }
      maxLength={ maxLength }
      onChange={ this.handleDropdown }
    />);
  }

  expenseForm(money) {
    return (
      <form>
        Valor:
        { this.input('value', 'number', 'value-input', '999999999999') }
        Moeda:
        <select
          id="currency"
          onChange={ this.handleDropdown }
          data-testid="currency-input"
        >
          {money.map((each) => (
            <option key={ each.code } data-testid={ each.code }>
              { each.code }
            </option>))}
        </select>
        Método de pagamento:
        <select
          id="method"
          onChange={ this.handleDropdown }
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        Tag:
        <select
          id="tag"
          onChange={ this.handleDropdown }
          data-testid="tag-input"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        Descrição:
        { this.input('description', 'text', 'description-input', '50') }
        <button onClick={ this.handleExpense } type="reset">Adicionar Despesa</button>
      </form>);
  }

  render() {
    const { money } = this.props;
    const keys = Object.keys(money);
    const allKeys = keys.filter((coin) => coin !== 'USDT');
    const allMoney = allKeys.map((key) => money[key]);
    const { email, totalExpenses, totalCurrency, isFetching } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            Email:
            {' '}
            { email }
          </p>
          <p data-testid="total-field">
            Despesas totais:
            {' '}
            R$
            {' '}
            { totalExpenses }
          </p>
          <p data-testid="header-currency-field">
            {' '}
            { totalCurrency }
          </p>
        </header>
        { isFetching ? <strong>Loading...</strong> : this.expenseForm(allMoney) }
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tbody />
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  moneyInfo: PropTypes.func.isRequired,
  money: PropTypes.objectOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  totalCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  money: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  email: state.user.email,
  totalExpenses: 0,
  totalCurrency: 'BRL',
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(walletUpdate(expense)),
  moneyInfo: () => dispatch(getMoneyInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
