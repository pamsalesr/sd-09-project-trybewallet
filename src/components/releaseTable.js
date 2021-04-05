import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editCost, deletCost } from '../actions';

class ReleaseTable extends React.Component {
  constructor(props) {
    super(props);

    this.editButton = this.editButton.bind(this);
    this.deletButton = this.deletButton.bind(this);
  }

  editButton(expense) {
    const { editExpense } = this.props;
    return (
      <button
        type="button"
        data-testid="edit-btn"
        onClick={ () => editExpense(expense) }
      >
        Edit
      </button>
    );
  }

  deletButton(expense) {
    const { removeExpense } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => removeExpense(expense) }
      >
        Remover
      </button>
    );
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
        <tbody>
          {
            expenses.map((expense) => {
              const {
                id, value, description, currency,
                method,
                tag,
                exchangeRates,
              } = expense;
              const { name, ask } = exchangeRates[currency];
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ name }</td>
                  <td>{ parseFloat(ask).toFixed(2) }</td>
                  <td>{ (ask * parseInt(value, 10)).toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    { this.editButton(expense) }
                    { this.deletButton(expense) }
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (expense) => dispatch(editCost(expense)),
  removeExpense: (expense) => dispatch(deletCost(expense)),
});

ReleaseTable.propTypes = {
  editExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

ReleaseTable.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseTable);
