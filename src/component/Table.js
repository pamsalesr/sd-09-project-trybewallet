import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    return (expenses.map((item) => (
      <tbody>
        <tr>
          <td>{ item.description }</td>
          <td>{ item.tag }</td>
          <td>{ item.method }</td>
          <td>{ item.value }</td>
          <td>{ item.exchangeRates[item.currency].name }</td>
          <td>{ parseFloat(item.exchangeRates[item.currency].ask).toFixed(2) }</td>
          <td>
            {(item.value * item.exchangeRates[item.currency].ask).toFixed(2) }
          </td>
          <td>Real</td>
          <td>
            <button type="button">Editar</button>
            <button
              type="button"
              data-testid="delete-btn"
              id={ `drop-button-${item.id}` }
              onClick={ () => this.dropExpense(item.id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    )));
  }

  render() {
    return (
      <table>
        { this.renderHeader() }
        { this.renderLine() }
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
  expenses: PropTypes.func.isRequired,
  // expenses: PropTypes.func.isRequired,
  dispatchExpensesUpdate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
