import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendExpenses } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.deleteObject = this.deleteObject.bind(this);
  }

  deleteObject(event) {
    const array = [];
    const { obj, expenses } = this.props;
    obj.forEach((key) => {
      if (key.id !== (+event.target.id)) {
        array.push(key);
      }
    });
    expenses(array);
  }

  renderTables() {
    const { obj } = this.props;
    return (
      <tbody>
        {
          obj.map((expense) => {
            const {
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
              id } = expense;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ (+(exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>{ (+(exchangeRates[currency].ask) * +(value)).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ this.deleteObject }
                    data-testid="delete-btn"
                    id={ id }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    );
  }

  render() {
    return (
      <table>
        <tr>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
        </tr>
        <tbody>
          { this.renderTables() }
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenses: (expense) => dispatch(sendExpenses(expense)),
});

const mapStateToProps = (state) => ({
  obj: state.wallet.expenses,
});

Table.propTypes = {
  obj: PropTypes.arrayOf({}),
  expenses: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
