import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/index';

class ExpensesTable extends React.Component {
  renderChangeTax(exchangeRates, currency) {
    return (
      <td>
        {(Math.round(exchangeRates[currency].ask * 100) / 100).toFixed(2)}
      </td>
    );
  }

  renderCurrencyConverted(exchangeRates, currency, value) {
    return (
      <td>
        {(Math.round(value * exchangeRates[currency].ask * 100) / 100).toFixed(
          2,
        )}
      </td>
    );
  }

  renderCalculatedFields({
    id,
    description,
    tag,
    method,
    value,
    currency,
    exchangeRates,
  }) {
    const { deleteExpense: deleteThisExpense, startEditExpense } = this.props;

    return (
      <>
        <td>{exchangeRates[currency].name}</td>
        {this.renderChangeTax(exchangeRates, currency)}
        {this.renderCurrencyConverted(exchangeRates, currency, value)}
        <td>Real</td>
        <td>
          <button
            onClick={ (e) => startEditExpense({
              e,
              thisExpense: {
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              },
            }) }
            type="button"
            data-testid="edit-btn"
          >
            Alterar
          </button>
          <button
            onClick={ (e) => deleteThisExpense({ e, id }) }
            type="button"
            data-testid="delete-btn"
          >
            Excluir
          </button>
        </td>
      </>
    );
  }

  renderExpensesInfo(expenses) {
    const renderedExpenses = expenses.map(
      (
        { id, description, tag, method, value, currency, exchangeRates },
        index,
      ) => (
        <tr key={ index }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          {this.renderCalculatedFields({
            id,
            description,
            tag,
            method,
            value,
            currency,
            exchangeRates,
          })}
        </tr>
      ),
    );
    return renderedExpenses;
  }

  render() {
    const { expenses } = this.props;
    return (
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
        <tbody>{this.renderExpensesInfo(expenses)}</tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  startEditExpense: state.wallet.editMethod,
});

const mapDispatchToProps = {
  deleteExpense,
};

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExpense: PropTypes.func.isRequired,
  startEditExpense: PropTypes.func,
};

ExpensesTable.defaultProps = {
  expenses: [],
  startEditExpense: () => console.log('default'),
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
