import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const tableHeaderFields = ['Descrição', 'Tag', 'Método de pagamento',
  'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
  'Moeda de conversão', 'Editar/Excluir'];

class ExpenseTable extends React.Component {
  createTableHeader() {
    return (
      <tr>
        {tableHeaderFields.map((field) => (
          <th key={ field }>{field}</th>
        ))}
      </tr>
    );
  }

  createExpenseRows() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => {
        const { exchangeRates, currency } = expense;
        //  https://www.devmedia.com.br/javascript-substring-selecionando-parte-de-uma-string/39232

        const currencySelected = exchangeRates[currency].name;
        // const conversionCurrency = currencySelected
        //   .substring(currencySelected.indexOf('/') + 1);
        // const currencyName = currencySelected.substring(0, currencySelected.indexOf('/'));
        const currencyValue = parseFloat(exchangeRates[currency].ask);

        return (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{ expense.value}</td>
            <td>{currencySelected}</td>
            <td>{currencyValue.toFixed(2)}</td>
            <td>{expense.value * exchangeRates[currency].ask}</td>
            <td>Real</td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <table>
        <thead>{this.createTableHeader()}</thead>
        <tbody>{this.createExpenseRows()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, null)(ExpenseTable);
