import React, { Component } from 'react';
import { arrayOf, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { handleExpenseDeletion, handleExpenseEdition } from '../../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(id) {
    const { expenses, sendUpdatedList } = this.props;
    sendUpdatedList(expenses.filter(({ id: expenseID }) => expenseID !== id));
  }

  renderDataFields(expense) {
    const { description, tag, method,
      value, currency, exchangeRates } = expense;
    const { ask, name } = exchangeRates[currency];
    // const formatedValue = (Math.round(value * 100) / 100).toFixed(2);
    const formatedAsk = (Math.round(ask * 100) / 100).toFixed(2);
    const convertedValue = (Math.round(value * ask * 100) / 100).toFixed(2);
    return (
      <>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ name }</td>
        <td>{ formatedAsk }</td>
        <td>{ convertedValue }</td>
        <td>Real</td>
      </>
    );
  }

  render() {
    const { expenses, sendDatatoEdition } = this.props;

    return (
      <table>
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
        <tbody>
          {
            expenses.map((expense) => {
              const { id, value, currency } = expense;
              return (
                <tr key={ `${id}${value}${currency}` }>
                  {this.renderDataFields(expense)}
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => sendDatatoEdition(expense) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteItem(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendUpdatedList: (newArrExpenses) => dispatch(
    handleExpenseDeletion(newArrExpenses),
  ),
  sendDatatoEdition: (expenseData) => dispatch(
    handleExpenseEdition(expenseData),
  ),
});

Table.propTypes = {
  expenses: arrayOf(shape()).isRequired,
  sendUpdatedList: func.isRequired,
  sendDatatoEdition: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
