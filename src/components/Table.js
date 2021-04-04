import React from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { deleteItem, fetchCurrencyThunk } from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderTableRow = this.renderTableRow.bind(this);
  }

  componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const { fetchCurrency } = this.props;
    await fetchCurrency();
  }

  handleClickDel(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  renderTableRow() {
    const { expenses } = this.props;
    return expenses.length > 0 && expenses
      .map((expense) => (
        <tr key={ expense.id }>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{expense.value}</td>
          <td>{expense.exchangeRates[expense.currency].name}</td>
          <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
          <td>
            {(expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)}
          </td>
          <td>Real</td>
          <MdDelete
            data-testid="delete-btn"
            onClick={ () => this.handleClickDel(expense.id) }
          />
        </tr>
      ));
  }

  render() {
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
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        {this.renderTableRow()}
      </table>
    );
  }
}

Table.propTypes = {
  fetchCurrency: PropTypes.func,
  deleteExpense: PropTypes.func,
  currencies: PropTypes.objectOf(object),
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencyThunk()),
  deleteExpense: (expense) => dispatch(deleteItem(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
