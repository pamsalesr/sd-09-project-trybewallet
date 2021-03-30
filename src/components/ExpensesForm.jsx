import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, expenses } from '../actions';
import currenciesFetch from '../services/api';

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);
    this.dropDownCreator = this.dropDownCreator.bind(this);
    this.paymentTypeCreator = this.paymentTypeCreator.bind(this);
    this.expensesTypeCreator = this.expensesTypeCreator.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { currenciesUpdate } = this.props;
    currenciesUpdate();
  }

  dropDownCreator() {
    const { updatedCurrencies } = this.props;
    return (
      <select data-testid="currency-input" name="currency" onChange={ this.handleChange }>
        {updatedCurrencies.map((element) => (
          <option
            value={ element }
            key={ element }
            data-testid={ element }
          >
            {element}
          </option>
        ))}
      </select>
    );
  }

  paymentTypeCreator() {
    return (
      <select data-testid="method-input" name="method" onChange={ this.handleChange }>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  expensesTypeCreator() {
    return (
      <select data-testid="tag-input" name="tag" onChange={ this.handleChange }>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    // lógica feita em conjunto com meus queridos amigos da turma 9
    const { value, description, currency, method, tag } = this.state;
    const { expenseDispatch, expensesState } = this.props;
    const rates = await currenciesFetch();
    const expense = {
      id: expensesState.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: rates,
    };
    expenseDispatch(expense);
    this.setState({
      value: '',
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Valor"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          placeholder="Descrição"
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
        {this.dropDownCreator()}
        {this.paymentTypeCreator()}
        {this.expensesTypeCreator()}
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesUpdate: () => dispatch(getCurrencies()),
  expenseDispatch: (expense) => dispatch(expenses(expense)),
});

const mapStateToProps = (state) => ({
  updatedCurrencies: state.wallet.currencies,
  expensesState: state.wallet.expenses,
});

ExpensesForm.propTypes = {
  currenciesUpdate: PropTypes.func.isRequired,
  updatedCurrencies: PropTypes.arrayOf('').isRequired,
  expenseDispatch: PropTypes.func.isRequired,
  expensesState: PropTypes.arrayOf('number').isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
