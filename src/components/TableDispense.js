import React from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import { connect } from 'react-redux';
import deleteExpenseAction from '../actions/deleteExpenseAction';

class TableDispense extends React.Component {
  constructor(props) {
    super(props);

    this.rowExpense = this.rowExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense(id) {
    const { wallet: { expenses }, deleteExpenseAction: updateStateGlobal } = this.props;
    const withoutExpenseDelete = expenses
      .filter((expense) => expense.id !== id);
    updateStateGlobal(withoutExpenseDelete);
  }

  rowExpense() {
    const { wallet: { expenses } } = this.props;
    return expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>
          {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
        </td>
        <td>
          {Number(expense.value)
            * Number(expense.exchangeRates[expense.currency].ask)}
        </td>
        <td>Real</td>
        <td>{ expense.id }</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteExpense(expense.id) }
          >
            Deletar
          </button>
          <button type="button" data-testid="edite-btn">Editar</button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        <tbody>
          { this.rowExpense() }
        </tbody>
      </table>
    );
  }
}

// https://stackoverflow.com/questions/32325912/react-proptype-array-with-shape
TableDispense.propTypes = {
  wallet: shape({
    expenses: arrayOf(shape({
      id: string,
      description: string,
      tag: string,
      method: string,
      value: string,
      exchangeRates: shape({
        name: string,
        ask: string,
      }),
    })),
  }),
  deleteExpenseAction: func,
};

TableDispense.defaultProps = {
  wallet: {},
  deleteExpenseAction: () => {},
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = {
  deleteExpenseAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDispense);
