import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  renderButton(name, expense, callback) {
    return (
      <button
        type="button"
        data-testid={ `${name}-btn` }
        onClick={ () => callback(expense) }
      >
        {name === 'edit' ? <RiEditLine /> : <RiDeleteBinLine />}
      </button>
    );
  }

  render() {
    const { expenses, deleteExp } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Moeda</th>
            <th>Valor</th>
            <th>Câmbio utilizado</th>
            <th>Moeda de conversão</th>
            <th>Valor convertido</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            const { description, tag, method, value, currency, exchangeRates } = expense;
            const { name, ask } = exchangeRates[currency];
            return (
              <tr key={ index }>
                <td>{ name }</td>
                <td>{ value }</td>
                <td>{parseFloat(ask).toFixed(2)}</td>
                <td>Real</td>
                <td>{ (ask * parseInt(value, 10)).toFixed(2) }</td>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>
                  { this.renderButton('delete', expense, deleteExp) }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExp: PropTypes.func.isRequired,
};

Table.defaultProps = {
  expenses: [],
};
