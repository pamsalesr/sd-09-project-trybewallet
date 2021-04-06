import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends React.Component {
  static getTotalValue({ value, exchangeRates, currency }) {
    return (parseFloat(value) * parseFloat(exchangeRates[currency].ask)).toFixed(2);
  }

  static getCurrencyName({ exchangeRates, currency }) {
    return exchangeRates[currency].name;
  }

  static getCurrencyExchange({ exchangeRates, currency }) {
    return parseFloat(exchangeRates[currency].ask).toFixed(2);
  }

  getCellValue(cellPropName, expense) {
    switch (cellPropName) {
    case 'convertedValue':
      return ExpensesTable.getTotalValue(expense);
    case 'currency':
      return ExpensesTable.getCurrencyName(expense);
    case 'ask':
      return ExpensesTable.getCurrencyExchange(expense);
    case 'conversionCurrency':
      return 'Real';
    default:
      return expense[cellPropName];
    }
  }

  renderHeader() {
    const fields = [
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
      <thead>
        <tr>
          { fields.map((fieldName) => (
            <td role="cell" key={ fieldName }>{ fieldName }</td>
          ))}
        </tr>
      </thead>
    );
  }

  renderBody() {
    const { expenses } = this.props;
    const cellsPropNames = [
      'description',
      'tag',
      'method',
      'value',
      'currency',
      'ask',
      'convertedValue',
      'conversionCurrency',
    ];
    return (
      <tbody>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            { cellsPropNames.map((cellPropName) => (
              <td key={ `${expense.id}-${cellPropName}` }>
                { this.getCellValue(cellPropName, expense) }
              </td>
            )) }
          </tr>
        )) }
      </tbody>
    );
  }

  render() {
    return (
      <table>
        { this.renderHeader() }
        { this.renderBody() }
      </table>
    );
  }
}

const mapStateToProps = (
  { wallet: { expenses } },
) => ({ expenses });

export default connect(mapStateToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
};

ExpensesTable.defaultProps = {
  expenses: [],
};
