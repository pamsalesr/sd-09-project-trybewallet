import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpenses } from '../actions';

class TableExpends extends React.Component {
  deleteItemOfList(event) {
    const { expensesList, deleteItemListExpenses } = this.props;
    const itemToBeErased = event.target.parentNode.parentNode.children[0].innerText;
    const newList = expensesList.filter((item) => item.description !== itemToBeErased);
    deleteItemListExpenses(newList);
  }

  editItemOfList() {
    console.log('EDITA');
  }

  createAllTableRow() {
    const { expensesList } = this.props;
    if (expensesList === 0) {
      return (<tr><td>NENHUM DADO NA TABELA</td></tr>);
    }

    return (
      expensesList.map((expense) => {
        const { id, description, tag, method, value, currency, exchangeRates } = expense;
        return (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{exchangeRates[currency].name}</td>
            <td>{Math.round(exchangeRates[currency].ask * 100) / 100}</td>
            <td>{Math.round(value * exchangeRates[currency].ask * 100) / 100}</td>
            <td>Real</td>
            <td>
              <button
                data-testid="delete-btn"
                type="button"
                onClick={ (event) => this.editItemOfList(event) }
              >
                EDIT
              </button>
              <button
                data-testid="edit-btn"
                type="button"
                onClick={ (event) => this.deleteItemOfList(event) }
              >
                DELETE
              </button>
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <tbody>
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
          {this.createAllTableRow()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => (
  { expensesList: state.wallet.expenses,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    deleteItemListExpenses: (updatedList) => dispatch(updateExpenses(updatedList)),
    updateItemListExpenses: (updatedList) => dispatch(updateExpenses(updatedList)),
  }
);

TableExpends.propTypes = {
  expensesList: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableExpends);
