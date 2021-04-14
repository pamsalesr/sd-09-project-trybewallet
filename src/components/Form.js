import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './tools/Input';
import Select from './tools/Select';
import { fetchCurrencies, addToWallet, editExpenses } from '../actions/index';

class Form extends React.Component {
  constructor(props) {
    super(props);
    const { id, value, description, currency, method, tag } = props.state;
    this.state = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resetState = this.resetState.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const { getCurrentExchangeRates } = this.props;
    const obj = await getCurrentExchangeRates();
    delete obj.currencies.USDT;
    this.setState({
      exchangeRates: obj.currencies,
    });
  }

  handleSelectChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  resetState() {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleClick() {
    const { id, currency, exchangeRates } = this.state;
    const { dispatchToReducer } = this.props;
    this.getCurrencies();
    const index = id;
    const { ask } = exchangeRates[currency];
    dispatchToReducer(this.state, ask);
    this.resetState();
    this.setState({ id: index + 1 });
  }

  handleEditClick() {
    const { expenses, dispatchEditExpenses, returnState } = this.props;
    const { id, value, description, method, tag, currency, exchangeRates } = this.state;
    let totalPrice = 0;
    expenses.forEach((expense) => {
      if (expense.id === parseInt(id, 10)) {
        expense.value = value;
        expense.description = description;
        expense.tag = tag;
        expense.method = method;
        expense.currency = currency;
      }
    });
    expenses.forEach((exp) => {
      const ask = parseFloat(exchangeRates[exp.currency].ask);
      totalPrice += (exp.value * ask);
    });

    dispatchEditExpenses(expenses, totalPrice);
    returnState();
  }

  renderForm() {
    const { currency, method, tag, value, description } = this.state;
    const { exchangeRates } = this.state;
    const currenciesNames = Object.keys(exchangeRates);
    const { type } = this.props;
    return (
      <form className="Form">
        <Input
          text="Valor do pagamento:"
          type="text"
          handleChange={ this.handleChange }
          name="value"
          value={ value }
          testId="value-input"
        />

        <Input
          text="Descreva a despesa"
          type="text"
          handleChange={ this.handleChange }
          name="description"
          value={ description }
          testId="description-input"
        />
        <Select
          handleSelectChange={ this.handleSelectChange }
          currNames={ currenciesNames }
          currency={ currency }
          method={ method }
          tag={ tag }

        />
        { type === 'initial'
        && <button type="button" onClick={ this.handleClick }>Adicionar Despesa</button>}
        { type === 'edit'
        && <button type="button" onClick={ this.handleEditClick }>Editar Despesa</button>}
      </form>
    );
  }

  render() {
    const { type } = this.props;
    return (
      <div>
        { type === 'initial' && this.renderForm() }
        { type === 'edit' && this.renderForm() }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentExchangeRates: () => dispatch(fetchCurrencies()),
  dispatchToReducer: (product, ask) => dispatch(addToWallet(product, ask)),
  dispatchEditExpenses: (array, price) => dispatch(editExpenses(array, price)),
});

Form.propTypes = {
  dispatchToReducer: PropTypes.func.isRequired,
  getCurrentExchangeRates: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
