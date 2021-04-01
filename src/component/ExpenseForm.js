import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { exchangeRatesAction, expensesDataAction } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  initialState() {
    return {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };
  }

  handleChange({ target }) {
    const { currencyFetch } = this.props;
    const { name, value } = target;
    this.setState({
      [name]: value,
      exchangeRates: currencyFetch,
    });
  }

  inputForms() {
    const { option } = this.props;
    const { value, description } = this.state;
    return (
      <>
        <label
          htmlFor="value-input"
        >
          Valor:
          <input
            onChange={ this.handleChange }
            value={ value }
            name="value"
            id="value-input"
            data-testid="value-input"
            type="text"
          />
        </label>

        <label
          htmlFor="description-input"
        >
          Descrição:
          <input
            onChange={ this.handleChange }
            value={ description }
            name="description"
            id="description-input"
            data-testid="description-input"
            type="text"
          />
        </label>

        <label
          htmlFor="currency-input"
        >
          Moeda:
          <select
            onChange={ this.handleChange }
            name="currency"
            id="currency-input"
            data-testid="currency-input"
          >
            {option}
          </select>
        </label>
      </>
    );
  }

  selectForms() {
    return (
      <>
        <label htmlFor="method-input">
          Forma de pagamento:
          <select
            onChange={ this.handleChange }
            name="method"
            id="method-input"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Tag:
          <select
            onChange={ this.handleChange }
            name="tag"
            id="tag-input"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button onClick={ () => this.click() } type="button">Adicionar despesa</button>
      </>
    );
  }

  click() {
    const { requestApi, expensesData } = this.props;
    const { id, value, currency, method, tag, description, exchangeRates } = this.state;
    const data = { id, value, currency, method, tag, description, exchangeRates };
    expensesData(data);
    requestApi();
    this.setState({
      id: id + 1,
    });
    this.setState(this.initialState());
  }

  render() {
    return (
      <form>
        {this.inputForms()}
        {this.selectForms()}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestApi: () => dispatch(exchangeRatesAction()),
  expensesData: (data) => dispatch(expensesDataAction(data)),
});

const mapStateToProps = (state) => ({
  currencyFetch: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

const { arrayOf, shape, func } = propTypes;
ExpenseForm.propTypes = {
  option: arrayOf(shape()),
  requestApi: func,
  expensesData: func,
  currencyFetch: shape(),
};

ExpenseForm.defaultProps = {
  option: {},
  requestApi: () => {},
  expensesData: () => {},
  currencyFetch: {},
};
