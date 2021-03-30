import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import { connect } from 'react-redux';

class TableDispense extends React.Component {
  constructor(props) {
    super(props);

    this.rowExpense = this.rowExpense.bind(this);
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

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

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
};

TableDispense.defaultProps = {
  wallet: {},
};

export default connect(mapStateToProps)(TableDispense);
