import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableHeader = this.tableHeader.bind(this);
    this.tableRows = this.tableRows.bind(this);
  }

  tableHeader() {
    return (
      <thead>
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
      </thead>
    );
  }

  tableRows() {
    const { expenses } = this.props;
    return (
      <tbody>
        { expenses.map((expense) => {
          const {
            value,
            currency,
            method,
            tag,
            description,
            id,
            exchangeRates,
          } = expense;
          const currencyName = exchangeRates[currency].name;
          const rate = parseFloat(exchangeRates[currency].ask);
          const convertedValue = (parseFloat(value) * rate);
          const conversionCurrency = 'Real';
          const rateString = rate.toFixed(2);
          const convertedValueString = convertedValue.toFixed(2);
          return (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ currencyName }</td>
              <td>{ rateString }</td>
              <td>{ convertedValueString }</td>
              <td>{ conversionCurrency }</td>
              <td name="edit-delete">
                <button type="button">EDIT</button>
                <button type="button">DELETE</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    return (
      <table>
        { this.tableHeader() }
        { this.tableRows() }
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
