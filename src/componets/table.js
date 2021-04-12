import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewExpenses, removeDespesa } from '../actions/index';

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

  render() {
    const { despesa } = this.props;
    const tagTh = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <div>
        <table>
          <tr>
            {tagTh.map((tag, i) => (
              <th key={ i }>{tag}</th>
            ))}
          </tr>
          {despesa.map((tag, i) => (
            <tr key={ i }>
              <td>{tag.description}</td>
              <td>{tag.tag}</td>
              <td>{tag.method}</td>
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
              <td>
                <button type="button">Editar</button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.removeExpese(i) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

TableExpense.propTypes = {
  despesa: PropsTypes.objectOf(PropsTypes.number).isRequired,
  keyRemoveDespesa: PropsTypes.func.isRequired,
  newExpense: PropsTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  despesa: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  newExpense: (newExpense) => (dispatch(addNewExpenses(newExpense))),
  keyRemoveDespesa: (despesa) => (dispatch(removeDespesa(despesa))),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
