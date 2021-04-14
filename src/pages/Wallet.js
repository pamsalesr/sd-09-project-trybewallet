import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyApi, receiveExpenses, totalExpenses } from '../actions';
import currencyApi from '../services/currencyApi';

const initialState = {
  valueExpense: '',
  descriptionExpense: '',
  selectCurrency: 'USD',
  methodPayment: 'Dinheiro',
  categoryRecreation: 'Alimentação',
};

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.renderEmailUser = this.renderEmailUser.bind(this);
    this.renderTotalExpenditure = this.renderTotalExpenditure.bind(this);
    this.renderExpenseAmount = this.renderExpenseAmount.bind(this);
    this.renderExpenseDescription = this.renderExpenseDescription.bind(this);
    this.renderSelectCurrency = this.renderSelectCurrency.bind(this);
    this.renderMethodPayment = this.renderMethodPayment.bind(this);
    this.renderRecreation = this.renderRecreation.bind(this);
    this.addExpenses = this.addExpenses.bind(this);
    this.handlerTargetChange = this.handlerTargetChange.bind(this);

    this.state = initialState;
  }

  componentDidMount() {
    // this.expensesFunction();
    const { requestCurrency } = this.props;
    requestCurrency();
  }

  // editExpenses() {

  // }

  async addExpenses() {
    const { valueExpense,
      descriptionExpense,
      selectCurrency,
      methodPayment,
      categoryRecreation } = this.state;
    const { walletCurrecy, totalExpensesState, receiveExpenses, totalExpenses } = this.props;
    const id = walletCurrecy.length;
    const currencyApis = await currencyApi();
    // o objeto abaixo está sendo atualizado de acordo com o que pede no mockData
    const newExpenses = { value: valueExpense,
      description: descriptionExpense,
      currency: selectCurrency,
      method: methodPayment,
      tag: categoryRecreation,
      id,
      exchangeRates: currencyApis,
    };
    const expenses = [...walletCurrecy, newExpenses];
    const total = ((valueExpense * currencyApis[selectCurrency]
      .ask) + totalExpensesState);
    const round = Math.round(total * 100) / 100;
    // selectCurrency está entre [] por ser dinâmico, caso não fosse, seria . + o nome da moeda
    await receiveExpenses(expenses);
    totalExpenses(round);
    // setState está limpando os campos que foram digitados após as ações feitas
    this.setState(initialState);
  }

  handlerTargetChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  renderEmailUser(value) {
    const { userLogin } = this.props;
    return (
      <div>
        <span>Email: </span>
        <p data-testid="email-field">
          { userLogin }
        </p>
        <field
          value={ value }
        />
      </div>
    );
  }

  renderTotalExpenditure() {
    const { currencyToExchange, totalExpensesState } = this.props;
    const validate = !totalExpensesState ? 0 : totalExpensesState;
    return (
      <p>
        {' '}
        Despesa Total: R$
        {}
        <span data-testid="total-field">
          { validate }
        </span>
        <span data-testid="header-currency-field">
          { currencyToExchange }
        </span>
      </p>
    );
  }

  renderExpenseAmount(valueExpense) {
    return (
      <div>
        <label htmlFor="valor-input">
          Valor das despesas:
          <input
            id="valor-input"
            type="text"
            data-testid="value-input"
            name="valueExpense"
            value={ valueExpense }
            onChange={ this.handlerTargetChange }
            placeholder="0"
          />
        </label>
      </div>
    );
  }

  renderExpenseDescription(descriptionExpense) {
    return (
      <div>
        <label htmlFor="description-input">
          Descrição das Despesas:
          <textarea
            data-testid="description-input"
            name="descriptionExpense"
            id="description-input"
            cols="30"
            rows="5"
            value={ descriptionExpense }
            onChange={ this.handlerTargetChange }
          />
        </label>
      </div>
    );
  }

  renderSelectCurrency(selectCurrency) {
    const { currencies } = this.props;
    // console.log(selectCurrency)
    return (
      <div>
        <label htmlFor="currencyInput">
          Selecionar Moeda:
          <select
            id="currencyInput"
            data-testid="currency-input"
            name="selectCurrency"
            value={ selectCurrency }
            onChange={ this.handlerTargetChange }
          >
            { currencies && currencies.map((curr) => (
              <option key={ curr } data-testid={ curr } value={ curr }>
                { curr }
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  renderMethodPayment(methodPayment) {
    return (
      <div>
        <label htmlFor="method-payment">
          Método De Pagamento:
          <select
            name="methodPayment"
            id="method-payment"
            data-testid="method-input"
            value={ methodPayment }
            onChange={ this.handlerTargetChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }

  renderRecreation(categoryRecreation) {
    return (
      <div>
        <label htmlFor="tag-input">
          Categoria:
          <select
            name="categoryRecreation"
            id="tag-input"
            data-testid="tag-input"
            value={ categoryRecreation }
            onChange={ this.handlerTargetChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { userLogin, totalExpenses } = this.props;
    const { valueExpense,
      descriptionExpense,
      selectCurrency,
      methodPayment,
      categoryRecreation } = this.state;
    // console.log(this.state)
    return (
      <div>
        <header>
          <Link to="/carteira">Carteira</Link>
          { this.renderEmailUser(userLogin) }
          { this.renderTotalExpenditure(totalExpenses) }
        </header>
        <br />
        <section>
          <form>
            { this.renderExpenseAmount(valueExpense) }
            { this.renderExpenseDescription(descriptionExpense) }
            { this.renderSelectCurrency(selectCurrency) }
            { this.renderMethodPayment(methodPayment) }
            { this.renderRecreation(categoryRecreation) }
            <button type="button" id="button-expense" onClick={ this.addExpenses }>Adicionar despesa</button>
          </form>
        </section>
        <button type="button" data-testid="delete-btn">Excluir</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userLogin: state.user.email,
  walletCurrecy: state.wallet.expenses,
  currencyToExchange: state.wallet.currencyToExchange,
  totalExpensesState: state.wallet.totalExpenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrency: () => dispatch(fetchCurrencyApi()),
  receiveExpenses: (expenses) => dispatch(receiveExpenses(expenses)),
  totalExpenses: (total) => dispatch(totalExpenses(total)),
});

Wallet.propTypes = {
  userLogin: PropTypes.func.isRequired,
};
// mapStateToProps: ela pega as informações do estado e atualiza onde está sendo solicitado
// mapdispatchtoprops: vai disparar uma ação e alterar uma informação no state
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
