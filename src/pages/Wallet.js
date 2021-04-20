import React from 'react';
import { connect } from 'react-redux';

import { string, objectOf, arrayOf, func, object } from 'prop-types';
import { handleCurrencies, handleAddExpense, setOnEditButton,
  handleDelExpense, handleEditExpense, handleMoveToState } from '../actions';
import './Wallet.css';
import Header from './Header';
import Form from './Form';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      value: 0,
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
      id: '',
      editButton: false,
    };

    // this.submitExpense = this.submitExpense.bind(this);
    // this.editExpense = this.editExpense.bind(this);
    this.generateHeaderTable = this.generateHeaderTable.bind(this);
    this.generateExpenseResume = this.generateExpenseResume.bind(this);
    this.clearEditablelState = this.clearEditablelState.bind(this);
  }

  // shouldComponentUpdate(nextState) {
  //   const currState = this.state;
  //   const shouldUpdate = currState.description !== nextState.description;
  //   return shouldUpdate;
  // }

  // async submitExpense() {
  //   const currencies = await fetchApi();
  //   const { expenses, addExpenses, editExpenseDisp } = this.props;
  //   const { currency, value, description, method, tag, editButton } = this.state;
  //   const expense = {
  //     id: expenses.length,
  //     currency,
  //     value,
  //     description,
  //     method,
  //     tag,
  //     exchangeRates: currencies,
  //   };
  //   if (editButton) {
  //     const { id } = this.state;
  //     expense.id = id;
  //     editExpenseDisp(expense);
  //   } else {
  //     addExpenses(expense);
  //   }
  //   this.setState((state) => ({
  //     ...state,
  //     description: '',
  //     value: '',
  //     id: '',
  //     editButton: false,
  //   }));
  // }

  generateHeaderTable() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  generateExpenseResume() {
    const { expenses, delExpense } = this.props;
    return (
      expenses.map((expense, index) => (
        <tr key={ index } name={ index }>
          <td>{ expense.description }</td>
          <td>{ expense.tag }</td>
          <td>{ expense.method }</td>
          <td>{ expense.value }</td>
          <td>{ expense.exchangeRates[expense.currency].name }</td>
          <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
          <td>
            { Number(expense.value * expense
              .exchangeRates[expense.currency].ask).toFixed(2) }
          </td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              id={ index }
              onClick={ () => this.editExpense(expense) }
            >
              Editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              id={ index }
              onClick={ () => delExpense(index) }
            >
              deletar
            </button>
          </td>
        </tr>
      ))
    );
  }

  editExpense(target) {
    const { expenses, globalStateDisp, setOnEditButtonDisp } = this.props;
    globalStateDisp(target);
    setOnEditButtonDisp();
    const changeExpense = expenses
      .filter((expense) => (expense.id === parseInt(target.id, 10)));
    this.setState((state) => ({
      ...state,
      description: changeExpense[0].description,
      value: changeExpense[0].value,
      tag: changeExpense[0].tag,
      method: changeExpense[0].method,
      currency: changeExpense[0].currency,
      id: changeExpense[0].id,
      editButton: true,
    }));
  }

  clearEditablelState() {
    this.setState((state) => ({
      ...state,
      description: '',
      value: 0,
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
      id: '',
    }));
  }

  // changeButton() {
  //   const { editButton } = this.state;
  //   return !editButton
  //     ? (
  //       <button type="button" onClick={ this.submitExpense }>
  //         Adicionar despesa
  //       </button>
  //     )
  //     : (
  //       <button type="button" onClick={ this.submitExpense }>
  //         Editar despesa
  //       </button>
  //     );
  // }

  render() {
    return (
      <div>
        <Header />
        <Form />
        <table>
          { this.generateHeaderTable() }
          <tbody>
            { this.generateExpenseResume() }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProp = (dispatch) => ({
  currenciesRates: (currencies) => dispatch(handleCurrencies(currencies)),
  addExpenses: (expense) => dispatch(handleAddExpense(expense)),
  delExpense: (id) => dispatch(handleDelExpense(id)),
  editExpenseDisp: (dataState) => dispatch(handleEditExpense(dataState)),
  setOnEditButtonDisp: () => dispatch(setOnEditButton()),
  globalStateDisp: (expense) => dispatch(handleMoveToState(expense)),
});

const mapStateToProps = (state) => ({
  currRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
  email: state.user.email,
});

Wallet.propTypes = {
  currenciesRates: func,
  addExpenses: func,
  convertExp: func,
  currRates: objectOf(object),
  expenses: arrayOf(string),
  email: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProp)(Wallet);
