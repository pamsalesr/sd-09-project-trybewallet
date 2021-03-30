import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addNewExpense } from '../actions';

class AddExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.renderPaymentInput = this.renderPaymentInput.bind(this);
    this.renderTagInput = this.renderTagInput.bind(this);
  }

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState((state) => ({
      id: state.id + 1,
      value: '',
    }));
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          id="value"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          id="description"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((curr) => (
            <option
              data-testid={ curr }
              value={ curr }
              key={ Math.random() }
            >
              { curr }
            </option>))}
        </select>
      </label>
    );
  }

  renderPaymentInput() {
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;

    return (
      <label htmlFor="method">
        Pagamento:
        <select
          data-testid="method-input"
          name="method"
          id="method"
          value={ method }
          onChange={ this.handleChange }
        >
          {paymentMethods.map((payMethod) => (
            <option
              key={ Math.random() }
            >
              { payMethod }
            </option>))}
        </select>
      </label>
    );
  }

  renderTagInput() {
    const expenseTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { tag } = this.state;

    return (
      <label htmlFor="tag">
        Categoria:
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          {expenseTags.map((expenseTag) => (
            <option
              key={ Math.random() }
            >
              { expenseTag }
            </option>))}
        </select>
      </label>
    );
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) return <div>...Loading</div>;
    return (
      <form>
        { this.renderValueInput() }
        { this.renderDescriptionInput() }
        { this.renderCurrencyInput() }
        { this.renderPaymentInput() }
        { this.renderTagInput() }
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isLoading: state.wallet.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCurrencies()),
  addExpense: (expense) => dispatch(addNewExpense(expense)),
});

AddExpense.propTypes = {
  currencies: PropTypes.arrayOf(),
  isLoading: PropTypes.string,
}.isRequered;

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
