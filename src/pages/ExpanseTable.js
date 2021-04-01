import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { deleteExpense, editExpense } from '../actions/index';

class ExpanseTable extends Component {
  renderButton(i, totalExpense) {
    const { deliteItem, editItem } = this.props;
    return (
      <td>
        <button
          type="button"
          data-testid="edit-btn"
          className="btn-edit"
          onClick={ () => editItem(i) }
        >
          <RiDeleteBin2Fill />
        </button>
        <button
          type="button"
          data-testid="delete-btn"
          className="btn-delete"
          onClick={ () => deliteItem(i, totalExpense) }
        >
          <RiDeleteBin2Fill />
        </button>
      </td>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-container">
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
        { (expenses.length > 0)
          ? (
            expenses.map((expense, i) => {
              const exchangeArray = Object.values(expense.exchangeRates);
              const coin = exchangeArray.find((obj) => obj.code === expense.currency);
              const totalExpense = parseFloat(expense.value * coin.ask);
              return (
                <tr key={ i }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{expense.value}</td>
                  <td>{coin.name}</td>
                  <td>{parseFloat(coin.ask).toFixed(2)}</td>
                  <td>{parseFloat(expense.value * coin.ask).toFixed(2)}</td>
                  <td>Real</td>
                  { this.renderButton(i, totalExpense) }
                </tr>
              );
            })
          )
          : null }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deliteItem: (index, expense) => dispatch(deleteExpense(index, expense)),
  editItem: (index) => dispatch(editExpense(index)),
});

ExpanseTable.propTypes = {
  deliteItem: func.isRequired,
  editItem: func.isRequired,
  expenses: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpanseTable);
