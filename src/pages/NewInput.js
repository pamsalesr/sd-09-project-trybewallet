import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrencies from '../services';
import { currencyAction, expenseAction } from '../actions';

class NewInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newExpense: {
        description: '',
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      isFetching: true,
    };
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  clearState() {
    this.setState({
      newExpense: {
        description: '',
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      isFetching: false,
    });
  }

  async fetchCurrencies() {
    const { sendCurrencyAction } = this.props;
    const currenciesObject = await fetchCurrencies();
    const currenciesArray = Object.entries(currenciesObject);
    const useableCurrencies = currenciesArray.filter((currency, index) => index !== 1);
    this.setState((previousState) => ({
      ...previousState,
      isFetching: false,
    }));
    sendCurrencyAction(useableCurrencies);
  }

  handleChange({ target }) {
    const { expense } = this.props;
    const { name, value } = target;
    this.setState((previousState) => ({
      ...previousState,
      newExpense: {
        ...previousState.newExpense,
        id: expense.length,
        [name]: value,
      },
    }));
  }

  async handleSubmit() {
    const { saveExpenseAction } = this.props;

    const currenciesAtTheMoment = await fetchCurrencies();

    this.setState((previousState) => ({
      ...previousState,
      newExpense: {
        ...previousState.newExpense,
        exchangeRates: currenciesAtTheMoment,
      },
    }));

    const { newExpense } = this.state;
    saveExpenseAction(newExpense);

    this.clearState();
  }

  renderMethodSelect() {
    return (
      <select
        name="method"
        data-testid="method-input"
        onChange={ (e) => this.handleChange(e) }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderTagSelect() {
    const { newExpense } = this.state;
    return (
      <select
        name="tag"
        data-testid="tag-input"
        onChange={ (e) => this.handleChange(e) }
        value={ newExpense.tag }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render() {
    const { isFetching, newExpense } = this.state;
    const { currencies } = this.props;
    return (
      <section className="new-input">
        {isFetching && <h2>Carregando</h2> }
        <input
          name="value"
          type="number"
          data-testid="value-input"
          onChange={ (e) => this.handleChange(e) }
          value={ newExpense.value }
        />
        <input
          name="description"
          type="text"
          data-testid="description-input"
          onChange={ (e) => this.handleChange(e) }
          value={ newExpense.description }

        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ (e) => this.handleChange(e) }
          value={ newExpense.currency }

        >
          { currencies.map((currency, index) => (
            <option
              key={ index }
              data-testid={ currency[0] }

            >
              { currency[0] }
            </option>
          )) }
        </select>
        { this.renderMethodSelect() }
        { this.renderTagSelect() }
        <button
          type="button"
          onClick={ () => this.handleSubmit() }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCurrencyAction: ((currencies) => (
    dispatch(currencyAction(currencies))
  )),
  saveExpenseAction: ((expense) => (
    dispatch(expenseAction(expense))
  )),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expense: state.wallet.expenses,
});

NewInput.propTypes = {
  sendCurrencyAction: PropTypes.func.isRequired,
  saveExpenseAction: PropTypes.func.isRequired,
  expense: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes
    .arrayOf(PropTypes
      .oneOfType([PropTypes.string, PropTypes
        .arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string]))])).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInput);
