import React from 'react';
import { connect } from 'react-redux';

class ExpenseTable extends React.Component {
  constructor() {
    super();
    this.convertCurrencyAcronym = this.convertCurrencyAcronym.bind(this);
  }

  convertCurrencyAcronym(Acronym, exchangeRates, value) {
    const currencyValue = Object.entries(exchangeRates)
      .find((element) => Acronym === element[0]);
    const convertedValue = Number(value) * Number(currencyValue[1].ask);
    return {
      name: currencyValue[1].name,
      ask: currencyValue[1].ask,
      value: convertedValue,
    };
  }

  convertCurrency() {

  }

  render() {
    const { expenses } = this.props;
    const expenseCaption = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <table>
        <tr>
          {expenseCaption.map((caption) => <th key={ caption }>{caption}</th>)}
        </tr>
        {expenses.length !== 0 && expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>
              {this.convertCurrencyAcronym(expense.currency, expense.exchangeRates).name}
            </td>
            <td>
              {(this.convertCurrencyAcronym(
                expense.currency, expense.exchangeRates,
              ).ask * 1).toFixed(2)}
            </td>
            <td>
              {(this.convertCurrencyAcronym(
                expense.currency, expense.exchangeRates, expense.value,
              ).value * 1).toFixed(2)}
            </td>
            <td>Real</td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseTable);
