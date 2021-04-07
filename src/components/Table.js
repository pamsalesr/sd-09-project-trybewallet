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
    const head = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <thead>
        <tr>
          { head.map((item, i) => <th key={ i }>{item}</th>)}
        </tr>
      </thead>
    );
  }

  tableBody() {
    const { expenses, propDelExpense, propEditExpense, status } = this.props;
    return (
      <tbody>
        { expenses
          .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{Number(value * exchangeRates[currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <div className="button-box">
                  <button
                    className="YButton"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => !status && propEditExpense(true, id) }
                  >
                    Editar
                  </button>
                  <button
                    className="RButton"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => !status && propDelExpense(id) }
                  >
                    Deletar
                  </button>
                </div>
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

const mapStateToProps = ({ wallet: { edit: { status } = {} } }) => ({ status });

const mapDispatchToProps = (dispatch) => ({
  propDelExpense: (data) => dispatch(delExpense(data)),
  propEditExpense: (status, id) => dispatch(editExpense(status, id)),
});

Table.propTypes = {
  expenses: Proptypes.arrayOf(Proptypes.object),
  propDelExpense: Proptypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
