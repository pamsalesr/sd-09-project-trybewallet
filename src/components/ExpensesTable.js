import React from 'react';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);

    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderExpenses = this.renderExpenses.bind(this);
  }

  renderExpenses() {
    const { expenses } = this.props;
    return expenses.map((expense, index) => (
      <tr key={ index }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>
          {`${parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}`}
        </td>
        <td>
          {
            `${(expense.value * expense.exchangeRates[expense.currency].ask)
              .toFixed(2)}`
          }
        </td>
        <td>Real</td>
        <td>
          <button type="button">Editar</button>
          <button type="button">Excluir</button>
        </td>
      </tr>
    ));
  }

  renderTableHeader() {
    const fields = ['Descrição',
      'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return fields.map(
      (field, index) => <th key={ index }>{field}</th>,
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <tr>{this.renderTableHeader()}</tr>
          {(expenses.length > 0) && this.renderExpenses()}
          <button type="button" onClick={ this.renderExpenses }>click</button>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
