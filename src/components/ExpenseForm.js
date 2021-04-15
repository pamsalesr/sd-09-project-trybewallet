import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { expenseAction, fetchCurrency } from '../actions/index';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.forms = this.forms.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.forms2 = this.forms2.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      loading: true,
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.func();
  }

  async func() {
    const { dispatchCurrencies } = this.props;
    await dispatchCurrencies();
    this.isLoadingFalse();
  }

  isLoadingFalse() {
    this.setState({
      loading: false,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { dispatchCurrencies } = this.props;
    await dispatchCurrencies();
    const { dispatchExpense } = this.props;
    const { exchangeRates } = this.props;
    const { id, value, description, currency, tag, method } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates,
    };

    dispatchExpense(expense);

    this.setState({
      id: id + 1,
      value: '',
    });
  }

  forms() {
    const { value, description, currency } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="description"
            value={ description }
            id="description-input"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            value={ currency }
            id="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((curr) => (
              <option data-testid={ curr } key={ curr }>{curr}</option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  forms2() {
    const { method, tag } = this.state;
    return (
      <div>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            value={ method }
            id="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return 'loading...';
    }
    return (
      <form>
        {this.forms()}
        {this.forms2()}
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
  dispatchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(expenseAction(expense)),
  dispatchCurrencies: () => dispatch(fetchCurrency()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.rates,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
