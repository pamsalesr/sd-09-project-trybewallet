import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendObj, sendExpenses } from '../actions';
import { methodsPayment, tagsData, getAPI } from '../services/data';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      coins: '',
      description: '',
      tags: '',
      methods: '',
      expenseId: 0,
    };
    this.saveValues = this.saveValues.bind(this);
    this.expenses = this.expenses.bind(this);
    this.renderInputValue = this.renderInputValue.bind(this);
    this.renderInputDescription = this.renderInputDescription.bind(this);
    this.renderSelectCoins = this.renderSelectCoins.bind(this);
    this.renderSelectMethods = this.renderSelectMethods.bind(this);
    this.renderSelectTags = this.renderSelectTags.bind(this);
  }

  componentDidMount() {
    this.dispatchCoins();
  }

  async dispatchCoins() {
    const coins = await getAPI();
    const { sendCoins } = this.props;
    sendCoins(coins);
  }

  async expenses() {
    const api = await getAPI();
    const { expenses, globalExpenses } = this.props;
    const { expenseId, value, coins, description, tags, methods } = this.state;
    const obj = [
      ...globalExpenses,
      {
        currency: coins,
        description,
        exchangeRates: api,
        id: expenseId,
        method: methods,
        tag: tags,
        value,
      },
    ];
    expenses(obj);
    this.setState({
      expenseId: expenseId + 1,
    });
    this.clearInputs();
  }

  clearInputs() {
    Object.keys(this.state).forEach((key) => {
      if (key !== 'expenseId') {
        this.setState({
          [key]: '',
        });
      }
    });
  }

  saveValues(event) {
    const { id, value } = event.target;
    Object.keys(this.state).forEach((key) => {
      if (key === id) {
        this.setState({
          [key]: value,
        });
      }
    });
  }

  renderInputValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Insira o valor da despesa:
        <input
          type="text"
          id="value"
          data-testid="value-input"
          onChange={ this.saveValues }
          value={ value }
        />
      </label>
    );
  }

  renderInputDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Insira a descrição da despesa:
        <input
          type="text"
          id="description"
          data-testid="description-input"
          onChange={ this.saveValues }
          value={ description }
        />
      </label>
    );
  }

  renderSelectCoins() {
    const { coins } = this.state;
    const { coinsApi } = this.props;
    return (
      <label htmlFor="coins">
        Moeda:
        <select
          id="coins"
          data-testid="currency-input"
          onChange={ this.saveValues }
          value={ coins }
        >
          <option value={ null }>Selecione</option>
          { Object.keys(coinsApi).map((name) => {
            if (name === 'USDT') {
              return null;
            }
            return (
              <option
                data-testid={ name }
                value={ name }
                key={ name }
              >
                { name }
              </option>);
          }) }
        </select>
      </label>
    );
  }

  renderSelectMethods() {
    const { methods } = this.state;
    return (
      <label htmlFor="methods">
        Método de Pagamento:
        <select
          id="methods"
          data-testid="method-input"
          onChange={ this.saveValues }
          value={ methods }
        >
          <option value={ null }>Selecione</option>
          { methodsPayment.map((pay) => (
            <option value={ pay } key={ pay }>{ pay }</option>))}
        </select>
      </label>
    );
  }

  renderSelectTags() {
    const { tags } = this.state;
    return (
      <label htmlFor="tags">
        Tipo da Despesa:
        <select
          id="tags"
          data-testid="tag-input"
          onChange={ this.saveValues }
          value={ tags }
        >
          <option value={ null }>Selecione</option>
          { tagsData.map((tag) => (
            <option value={ tag } key={ tag }>{ tag }</option>))}
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        { this.renderInputValue() }
        { this.renderInputDescription() }
        { this.renderSelectCoins() }
        { this.renderSelectMethods() }
        { this.renderSelectTags() }
        <button type="button" onClick={ this.expenses }>Adicionar despesa</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCoins: (coins) => dispatch(sendObj(coins)),
  expenses: (expense) => dispatch(sendExpenses(expense)),
});

const mapStateToProps = (state) => ({
  coinsApi: state.wallet.currencies,
  globalExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
