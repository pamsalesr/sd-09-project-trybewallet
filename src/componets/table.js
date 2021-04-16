import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewExpenses, removeDespesa, addTrue, forsmAddState } from '../actions/index';

class TableExpense extends React.Component {
  constructor() {
    super();
    this.removeExpese = this.removeExpese.bind(this);
  }

  removeExpese(index) {
    const { despesa, newExpense, keyRemoveDespesa } = this.props;
    const newDespesa = despesa.filter((_, idx) => idx !== index);
    const newTotal = newDespesa
      .reduce((total, expense) => total + (
        expense.value * parseFloat(expense.exchangeRates[expense.currency].ask)), 0);
    newExpense(newDespesa);
    keyRemoveDespesa(newTotal);
  }

  editExpense(index) {
    const { changeTrue, despesa, keyForsmAddState, keyRemoveDespesa } = this.props;
    keyForsmAddState(despesa[index]);
    const newTotal = despesa.filter((despesas) => despesas.id !== despesa[index].id)
      .reduce((total, expense) => total + (
        expense.value * parseFloat(expense.exchangeRates[expense.currency].ask)), 0);
    keyRemoveDespesa(newTotal);
    changeTrue();
  }

  mapTr(i) {
    return (
      <td>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => this.removeExpese(i) }
        >
          Excluir
        </button>
        <button
          data-testid="edit-btn"
          type="button"
          onClick={ () => this.editExpense(i) }
        >
          Editar
        </button>
      </td>
    );
  }

  render() {
    const { despesa } = this.props;
    const tagTh = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tr>
          {tagTh.map((tag, i) => (
            <th key={ i }>{tag}</th>
          ))}
        </tr>
        {despesa.map((tag, i) => (
          <tr key={ i }>
            <td>{tag.description}</td>
            <td>{tag.method}</td>
            <td>{tag.tag}</td>
            <td>{tag.value}</td>
            <td>{tag.exchangeRates[tag.currency].name}</td>
            <td>
              {
                parseFloat(tag.exchangeRates[tag.currency].ask)
                  .toFixed(2)
              }
            </td>
            <td>
              {
                (parseFloat(tag.exchangeRates[tag.currency].ask) * tag.value)
                  .toFixed(2)
              }
            </td>
            <td>Real</td>
            {this.mapTr(i)}
          </tr>
        ))}
      </table>
    );
  }
}

TableExpense.propTypes = {
  despesa: PropsTypes.objectOf(PropsTypes.number).isRequired,
  keyRemoveDespesa: PropsTypes.func.isRequired,
  newExpense: PropsTypes.func.isRequired,
  changeTrue: PropsTypes.func.isRequired,
  keyForsmAddState: PropsTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  despesa: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  newExpense: (newExpense) => dispatch(addNewExpenses(newExpense)),
  keyRemoveDespesa: (despesa) => dispatch(removeDespesa(despesa)),
  changeTrue: () => dispatch(addTrue()),
  keyForsmAddState: (obj) => dispatch(forsmAddState(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
