import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesUpdate } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.dropExpense = this.dropExpense.bind(this);
  }

  // teste so gosta da verção com .map
  // calcConvertion(value, ask){
  //   // const { consultExpenses } = this.props;
  //   // consultExpenses.forEach((element) => {
  //   const convertValue = value;
  //   const convertAsk = ask;
  //   const calc = convertValue * convertAsk;
  //   // });
  //   return calc.toFixed(2);
  // }

  dropExpense(item) {
    const { expenses, dispatchExpensesUpdate } = this.props;
    const reNew = expenses.filter((expense) => (item !== expense.id));
    dispatchExpensesUpdate(reNew);
    // console.log( expenses )
    // transforma a possição em null
    // if(item >= 3){
    // delete expenses[item]
    // }
    // let testes = expenses
    // }
    // console.log( testes )
  }

  // updateExpense(id){
  // }

  renderHeader() {
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

  renderLine() {
    const { expenses } = this.props;
    return expenses.map((element) => (
      <tr key={ element.id }>
        <td>{ element.description }</td>
        <td>{ element.tag }</td>
        <td>{ element.method }</td>
        <td>{ element.value }</td>
        <td>{ element.exchangeRates[element.currency].name }</td>
        <td>{ parseFloat(element.exchangeRates[element.currency].ask).toFixed(2) }</td>
        <td>
          {(element.value * element.exchangeRates[element.currency].ask).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
          <button
            type="button"
            data-testid="delete-btn"
            id={ `drop-button-${element.id}` }
            onClick={ () => this.dropExpense(element.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        { this.renderHeader() }
        <tbody>
          { this.renderLine() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpensesUpdate: (expenses) => dispatch(expensesUpdate(expenses)),
});

Table.propTypes = {
  // expenses: PropTypes.func.isRequired,
  expenses: PropTypes.func,
  // expenses: PropTypes.func.isRequired,
  dispatchExpensesUpdate: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
