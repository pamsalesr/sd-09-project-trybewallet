import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  render() {
    const tableHeader = [
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
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            { tableHeader.map((header) => <td key={ header }>{ header }</td>)}
          </tr>
        </thead>
        <tbody>
          { expenses.map(
            ({ id, value, description, currency, method, tag, exchangeRates }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{(parseFloat(exchangeRates[currency].ask)).toFixed(2)}</td>
                <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button type="button" data-testid="delete-btn">Delete</button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
