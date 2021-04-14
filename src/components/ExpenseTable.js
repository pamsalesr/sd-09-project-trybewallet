import React from 'react';
import { connect } from 'react-redux';

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderExpenses = this.renderExpenses.bind(this);
  }

  renderExpenses() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => {
        const { id, description, currency, tag,
          method, exchangeRates, value } = expense;
        return (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{exchangeRates[currency].name}</td>
            <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>{parseFloat(value * exchangeRates[currency].ask).toFixed(2)}</td>
            <td>Real</td>
          </tr>
        );
      })
    );
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
          {this.renderExpenses()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseTable);
