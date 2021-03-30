import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';
import cotationsApi from '../services/fetchCotation';

const initialState = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderValue = this.renderValue.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderCurrency = this.renderCurrency.bind(this);
    this.renderMethod = this.renderMethod.bind(this);
    this.renderTag = this.renderTag.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const exchangeRates = await cotationsApi();
    const { value, description, currency, method, tag } = this.state;
    const { addExpenses, expenses } = this.props;
    const expense = {
      id: (expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1),
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    addExpenses(expense);
    this.setState({
      ...initialState,
    });
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
          value={ value }
          id="value-input"
        />
      </label>
    );
  }

  renderDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
          value={ description }
          id="description-input"
        />
      </label>
    );
  }

  renderCurrency() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
          id="currency-input"
        >
          {
            currencies.map((option) => ((option !== 'USDT') ? (
              <option key={ option } data-testid={ option }>
                {option}
              </option>
            ) : ''))
          }
        </select>
      </label>
    );
  }

  renderMethod() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
          id="method-input"
        >
          {
            methods.map((option) => (
              <option key={ option }>{option}</option>
            ))
          }
        </select>
      </label>
    );
  }

  renderTag() {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
          id="tag-input"
        >
          {
            tags.map((option) => (
              <option key={ option }>{option}</option>
            ))
          }
        </select>
      </label>
    );
  }

  render() {
    return (
      <div className="form-container">
        <form>
          { this.renderValue() }
          { this.renderDescription() }
          { this.renderCurrency() }
          { this.renderMethod() }
          { this.renderTag() }
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

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (expense) => dispatch(addExpense(expense)),
});

NewExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  addExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

NewExpense.defaultProps = {
  currencies: [],
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
