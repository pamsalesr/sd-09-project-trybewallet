import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class WalletTableOfExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.renderTableData = this.renderTableData.bind(this);
  }

  renderTableData() {
    const { expenses, sendRemovedExpense } = this.props;
    return expenses.map((expense) => {
      const { id, description, tag, method, value, currency, exchangeRates } = expense;
      const currencyObject = exchangeRates[currency];
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{currencyObject.name}</td>
          <td>{parseFloat(currencyObject.ask).toFixed(2)}</td>
          <td>{(currencyObject.ask * value).toFixed(2)}</td>
          <td>Real</td>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => sendRemovedExpense(expense) }
          >
            Excluir
          </button>
        </tr>
      );
    });
  }
  // ** Source https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg /

  render() {
    return (
      <div>
        <h1>Tabela de Gastos</h1>
        <table>
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
          <tbody>
            { this.renderTableData() }
          </tbody>
        </table>
      </div>
    );
  }
}

WalletTableOfExpenses.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  sendRemovedExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendRemovedExpense: (removedExpense) => dispatch(removeExpense(removedExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTableOfExpenses);
