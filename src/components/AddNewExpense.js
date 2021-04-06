import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency, addExpenses, handleTotalPrice } from '../actions';

class AddNewExpense extends React.Component {
  constructor() {
    super();
    this.getCurrency = this.getCurrency.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  async componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const { dispatchCurrencyToProps } = this.props;
    await dispatchCurrencyToProps();
  }

  async handleClick() {
    const rates = await this.getCurrency();
    const { value, description, currency, method, tag } = this.state;
    const { expenses, dispatchExpenses } = this.props;
    const expensesObj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: rates,
    };
    dispatchExpenses(expensesObj);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleInputs({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencyList } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="number"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ ({ target }) => this.handleInputs(target) }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ ({ target }) => this.handleInputs(target) }
            >
              { Object.keys(currencyList)
                .filter((coin) => coin !== 'USDT')
                .map((coin) => (
                  <option key={ coin } value={ coin } data-testid={ coin }>
                    { coin }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ ({ target }) => this.handleInputs(target) }
            />
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ ({ target }) => this.handleInputs(target) }
            >
              <option>Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ ({ target }) => this.handleInputs(target) }
            >
              <option>Selecione</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencyList: state.wallet.currencyList,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencyToProps: () => dispatch(getCurrency()),
  dispatchExpenses: (expensesObj) => dispatch(addExpenses(expensesObj)),
  dispatchTotalPrice: () => dispatch(handleTotalPrice()),
});

AddNewExpense.defaultProps = {
  currencyList: { '': '' },
};

AddNewExpense.propTypes = {
  expenses: PropTypes.string.isRequired,
  currencyList: PropTypes.objectOf(String),
  dispatchCurrencyToProps: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewExpense);
