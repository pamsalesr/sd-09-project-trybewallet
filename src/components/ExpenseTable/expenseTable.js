import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUserExpense } from '../../actions';

const headerTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class expenseTable extends React.Component {
  createThTag(array) {
    return array.map((item, i) => (
      <th key={ i }>{item}</th>
    ));
  }

  handleClick(id) {
    const { propDeleteUserExpense } = this.props;
    propDeleteUserExpense(id);
  }

  createTBodyExpenseTatle(expenses) {
    return expenses.map((expense, index) => {
      const { description, tag, method, value, currency,
        exchangeRates, id } = expense;
      const { ask, name } = exchangeRates[currency];
      return (
        <tr key={ index }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{name}</td>
          <td>{Number(ask).toFixed(2)}</td>
          <td>{(Number(ask) * value).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              data-testid="delete-btn"
              type="button"
              id={ id }
              onClick={ () => this.handleClick(id) }
            >
              Deletar
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          {this.createThTag(headerTable)}
        </thead>
        <tbody>
          {expenses && this.createTBodyExpenseTatle(expenses)}
        </tbody>
      </table>
    );
  }
}

expenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.Object),
}.isRequired;

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  propDeleteUserExpense: (id) => dispatch(deleteUserExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(expenseTable);
