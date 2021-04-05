import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { delExpense, editExpense } from '../actions';
import '../CSS/wallet.css';

class Table extends Component {
  constructor() {
    super();
    this.tableHead = this.tableHead.bind(this);
    this.tableBody = this.tableBody.bind(this);
  }

  tableHead() {
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

  tableBody() {
    const { expenses, propDelExpense, propEditExpense } = this.props;
    return (
      <tbody>
        { expenses
          .map(({ id, description, method, tag, value, currency, exchangeRates }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{Number(value * exchangeRates[currency].ask).toFixed(2) }</td>
              <td>Real</td>
              <td>
                <button
                  className="YButton"
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => propEditExpense(true, id) }
                >
                  Editar
                </button>
                <button
                  className="RButton"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => propDelExpense(id) }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    );
  }

  render() {
    return (
      <table className="expenses-table">
        { this.tableHead() }
        { this.tableBody() }
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  propDelExpense: (data) => dispatch(delExpense(data)),
  propEditExpense: (status, id) => dispatch(editExpense(status, id)),
});

Table.propTypes = {
  expenses: Proptypes.arrayOf(Proptypes.object),
  propDelExpense: Proptypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Table);
