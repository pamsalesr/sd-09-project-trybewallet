import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class TableButtons extends Component {
  render() {
    const { expense, deleteExpense } = this.props;
    return (
      <>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => deleteExpense(expense) }
        >
          Del
        </button>
        <button
          type="button"
          data-testid="edit-btn"
        >
          Edit
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableButtons);

/*

Botão Del

1° Pelo id do item da tabela deletar o item do estado global;

 - Ao clicar no botão DEL acessar o Id do item;
 - Pelo Id do item deletar o item;

*/
