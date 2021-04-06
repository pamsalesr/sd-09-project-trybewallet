import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitExpense } from '../actions';
import * as Api from '../services/Api';
import '../styles/components/ExpenseForm.css';

const INITIAL_STATE_INPUTS = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: INITIAL_STATE_INPUTS,
      currencies: [],
      paymentMethods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      expenseType: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  async componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    this.setState({
      currencies: await Api.getCurrencies(),
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      inputs: { ...prevState.inputs, [name]: value },
    }));
  }

  async handleClick(event) {
    event.preventDefault();
    const { inputs } = this.state;
    const { dispatchExpense, expenses } = this.props;
    const exchangeRates = await Api.getExchangeRates();
    dispatchExpense({ id: expenses.length, ...inputs, exchangeRates });
    this.setState({
      inputs: INITIAL_STATE_INPUTS,
    });
  }

  renderInput(type, name, value, label) {
    return (
      <div>
        <label htmlFor={ `expense-${name}` }>
          { `${label}:` }
          <input
            type={ type }
            id={ `expense-${name}` }
            name={ name }
            value={ value }
            data-testid={ `${name}-input` }
            onChange={ this.handleChange }
            min={ (type === 'number') ? 0 : undefined }
          />
        </label>
      </div>
    );
  }

  renderSelect(name, label, options, value) {
    return (
      <div>
        <label htmlFor={ `expense-${name}` }>
          { `${label}:` }
        </label>
        <select
          name={ name }
          data-testid={ `${name}-input` }
          value={ value }
          onChange={ this.handleChange }
        >
          { options.map((option) => (
            <option
              value={ option }
              key={ option }
              data-testid={ option }
            >
              { option }
            </option>)) }
        </select>
      </div>
    );
  }

  render() {
    const {
      inputs: { value, description, currency, method, tag },
      currencies,
      paymentMethods,
      expenseType,
    } = this.state;
    return (
      <div className="expense-form-container">
        <form className="expense-form">
          { this.renderInput('number', 'value', value, 'Valor') }
          { this.renderSelect('currency', 'Moeda', currencies, currency) }
          { this.renderSelect('method', 'Método de Pagamento', paymentMethods, method) }
          { this.renderSelect('tag', 'Tag', expenseType, tag) }
          { this.renderInput('text', 'description', description, 'Descrição') }
          <div>
            <button type="submit" onClick={ this.handleClick }>
              Adicionar despesa
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expense) => dispatch(submitExpense(expense)),
});

ExpenseForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
