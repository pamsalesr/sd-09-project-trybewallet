import React from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { addToWallet, fetchCurrencyThunk } from '../actions';

const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const initialState = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currencyList: [], ...initialState };

    this.getCurrency = this.getCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderOptionsCurrencies = this.renderOptionsCurrencies.bind(this);
    this.renderOptionsMethods = this.renderOptionsMethods.bind(this);
    this.renderOptionsMethodsTags = this.renderOptionsMethodsTags.bind(this);
  }

  componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const { fetchCurrency } = this.props;
    const { currency } = await fetchCurrency();

    const filteredCurrency = Object.keys(currency)
      .filter((initials) => initials !== 'USDT');
    this.setState({
      currencyList: filteredCurrency,
    });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async handleClick() {
    await this.getCurrency();
    const { value, description, currency, method, tag } = this.state;
    const { addExpense, expenses, currencies } = this.props;
    addExpense({
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    });
    this.setState({ ...initialState });
    document.querySelector('.form-despesa').reset();
  }

  renderOptionsCurrencies() {
    // const { currencies } = this.props;
    const { currencyList } = this.state;
    return (
      <select
        data-testid="currency-input"
        id="currency-input"
        name="currency"
        onChange={ this.handleChange }
      >
        { currencyList.map((currency) => (
          <option
            value={ currency }
            key={ currency }
            data-testid={ currency }
          >
            { currency }
          </option>)) }
      </select>
    );
  }

  renderOptionsMethods() {
    return (
      <select
        data-testid="method-input"
        id="method-input"
        name="method"
        onChange={ this.handleChange }
      >
        <option value="dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderOptionsMethodsTags() {
    return (
      <select
        data-testid="tag-input"
        id="tag-input"
        name="tag"
        onChange={ this.handleChange }
      >
        {tagList.map((el) => (
          <option key={ el } value={ el }>{ el }</option>))}
      </select>
    );
  }

  render() {
    // const { expenses } = this.props;
    return (
      <form className="form-despesa">
        <input
          placeholder="Valor da despesa"
          data-testid="value-input"
          onChange={ (e) => this.setState({ value: e.target.value }) }
        />
        <input
          placeholder="Descrção da despesa"
          data-testid="description-input"
          onChange={ (e) => this.setState({ description: e.target.value }) }
        />

        {this.renderOptionsCurrencies()}
        {this.renderOptionsMethods()}
        {this.renderOptionsMethodsTags()}

        <button
          type="button"
          onClick={ async () => this.handleClick() }
        >
          Adicionar despesa
        </button>
        {/* {console.log(expenses)} */}
        {/* {console.log(Object.values(expenses).map(expense => expense.tag))} */}
        {/* {console.log(currencies)} */}
      </form>
    );
  }
}

Form.propTypes = {
  addExpense: PropTypes.func,
  fetchCurrency: PropTypes.func,
  expenses: PropTypes.arrayOf(object),
  currencies: PropTypes.objectOf(object),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencyThunk()),
  addExpense: (expense) => dispatch(addToWallet(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
