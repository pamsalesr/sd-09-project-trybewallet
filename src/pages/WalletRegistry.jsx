import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editingExpense } from '../actions/index';
import './Wallet.css';

class ExpenseList extends React.Component {
  constructor() {
    super();
    this.assignEdit = this.assignEdit.bind(this);
  }

  assignEdit(item) {
    const { edit, editForm } = this.props;
    editForm(item);
    edit(item);
  }

  render() {
    const { expenses, money, deleteLine } = this.props;
    const map = expenses.map((item) => {
      const moneyInfo = money.find((each) => item.currency === each.code);
      const moneyName = moneyInfo.name.split('/');
      return (
        <tr key={ item.id }>
          <td>
            {item.description}
          </td>
          <td>
            {item.tag}
          </td>
          <td>
            {item.method}
          </td>
          <td>
            {`${item.currency} ${item.value}`}
          </td>
          <td>
            {moneyName[0]}
          </td>
          <td>
            R$
            {(Math.floor(moneyInfo.ask * 100) / 100)}
          </td>
          <td>
            R$
            {(Math.floor(moneyInfo.ask * item.value * 100) / 100)}
          </td>
          <td>
            Real Brasileiro
          </td>
          <td>
            <button onClick={ () => this.assignEdit(item) } type="button">
              Editar
            </button>
            <button
              onClick={ () => deleteLine(item) }
              type="button"
              data-testid="delete-btn"
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
    return map;
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  money: PropTypes.arrayOf(PropTypes.object),
  deleteLine: PropTypes.func,
  editForm: PropTypes.func,
  edit: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editForm: (item) => dispatch(editingExpense(item)),
  deleteLine: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
