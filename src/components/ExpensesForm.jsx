import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addExpensesState, addTotalPriceState } from '../actions';
import actualCurrencies from '../services/currenciesData';

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.insertExpenses = this.insertExpenses.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesDispatcher } = this.props;

    fetchCurrenciesDispatcher();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateForm());
  }

  validateForm() {
    const { value, description, currency, method, tag } = this.state;

    if (value && description && currency && method && tag) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  async insertExpenses() {
    const { size, value, description, currency, method, tag } = this.state;
    const { addExpensesDispatcher, addTotalPriceDispatcher } = this.props;
    const currenciesData = await actualCurrencies();

    const total = value * currenciesData[currency].ask;
    const totalPrice = Math.round((total) * 100) / 100;

    const obj = {
      id: size,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currenciesData,
    };

    this.setState((previousValue) => ({
      size: previousValue.size + 1,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      disabled: true,
    }));

    addExpensesDispatcher(obj);
    addTotalPriceDispatcher(totalPrice);
  }

  renderInput(name, text, value) {
    return (
      <label htmlFor={ `${name}-form` }>
        <span>{`${text}:`}</span>
        <input
          type="text"
          name={ name }
          id={ `${name}-form` }
          data-testid={ `${name}-input` }
          required
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderSelect(name, text, value, array) {
    return (
      <label htmlFor={ `${name}-form` }>
        <span>{`${text}:`}</span>
        <select
          data-testid={ `${name}-input` }
          id={ `${name}-form` }
          name={ name }
          value={ value }
          onChange={ this.handleChange }
        >
          <option>Escolha uma opção</option>
          {array && (array.map((element) => (
            <option value={ element } key={ element } data-testid={ element }>
              {element}
            </option>
          )))}
        </select>
      </label>
    );
  }

  render() {
    const { currenciesState } = this.props;
    const { value, description, currency, method, tag, disabled } = this.state;
    const arrayMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const arrayTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        {this.renderInput('value', 'Valor', value)}
        {this.renderSelect('currency', 'Moeda', currency, currenciesState)}
        {this.renderSelect('method', 'Método de Pagamento', method, arrayMethod)}
        {this.renderSelect('tag', 'Categoria', tag, arrayTag)}
        {this.renderInput('description', 'Descrição', description)}
        <button type="button" onClick={ this.insertExpenses } disabled={ disabled }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currenciesState: PropTypes.arrayOf(PropTypes.any),
  expensesState: PropTypes.arrayOf(PropTypes.any),
  fetchCurrenciesDispatcher: PropTypes.func,
  addExpensesDispatcher: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  expensesState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesDispatcher: () => dispatch(fetchCurrencies()),
  addExpensesDispatcher: (expenses) => dispatch(addExpensesState(expenses)),
  addTotalPriceDispatcher: (totalPrice) => dispatch(addTotalPriceState(totalPrice)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
