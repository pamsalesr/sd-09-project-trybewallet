import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiDispatch, expensesAction } from '../actions';
import fetchApi from '../services/ApiRequest';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
      value: '',
    };

    this.createCurrencies = this.createCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createTags = this.createTags.bind(this);
    this.createMethod = this.createMethod.bind(this);
    this.createDescription = this.createDescription.bind(this);
    this.BtnAddExpenses = this.BtnAddExpenses.bind(this);
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  createCurrencies() {
    const { getCurrencies } = this.props;
    return (
      <select
        data-testid="currency-input"
        id="currency"
        onChange={ this.handleChange }
      >
        { getCurrencies.map((getCurrencie) => (
          <option
            key={ getCurrencie }
            value={ getCurrencie }
            data-testid={ getCurrencie }
          >
            {getCurrencie}
          </option>
        ))}
      </select>
    );
  }

  createTags() {
    return (
      <select
        data-testid="tag-input"
        id="tag"
        onChange={ this.handleChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  createMethod() {
    return (
      <select
        data-testid="method-input"
        id="method"
        onChange={ this.handleChange }
      >
        Método de pagamento
        <option value="Dinheiro"> Dinheiro</option>
        <option value="Cartão de débito"> Cartão de débito</option>
        <option value="Cartão de crédito"> Cartão de crédito</option>
      </select>
    );
  }

  createDescription() {
    const { description } = this.state;
    return (
      <input
        data-testid="description-input"
        id="description"
        value={ description }
        onChange={ this.handleChange }
      />
    );
  }

  async BtnAddExpenses() {
    const { dispatchExpenses, getExpenses } = this.props;
    const { description, method, currency, tag, value } = this.state;
    const exchange = await fetchApi();
    const expensesValues = {
      id: getExpenses.length,
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates: exchange,
    };
    dispatchExpenses(expensesValues);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      tag: 'Alimentação',
      method: 'Dinheiro',
    });
  }

  render() {
    const { value } = this.state;
    return (
      <form>
        <label htmlFor="valueExpenses">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          { this.createCurrencies() }
        </label>
        <label htmlFor="description">
          Descrição:
          {this.createDescription()}
        </label>
        <label htmlFor="method">
          Método de pagamento:
          {this.createMethod()}
        </label>
        <label htmlFor="tag">
          Tag:
          {this.createTags()}
        </label>
        <button
          onClick={ this.BtnAddExpenses }
          type="button"
        >
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  getCurrencies: state.wallet.currencies,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(fetchApiDispatch()),
  dispatchExpenses: (expenses) => dispatch(expensesAction(expenses)),
});

Form.propTypes = {
  getCurrencies: PropTypes.arrayOf(PropTypes.number).isRequired,
  dispatchCurrencies: PropTypes.func.isRequired,
  dispatchExpenses: PropTypes.func.isRequired,
  getExpenses: PropTypes.arrayOf('').isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
