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
    const { costs } = this.props;
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
            costs.map((cost) => {
              const {
                id, value, coin, methodPayment, description,
                costCenter,
                exchange,
              } = cost;
              const { name, ask } = exchange[coin];
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ costCenter }</td>
                  <td>{ methodPayment }</td>
                  <td>{ value }</td>
                  <td>{ name }</td>
                  <td>{ parseFloat(ask).toFixed(2) }</td>
                  <td>{ (ask * parseInt(value, 10)).toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    { this.editButton(cost) }
                    { this.deletButton(cost) }
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
  costs: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (expense) => dispatch(editCost(expense)),
  removeExpense: (expense) => dispatch(deletCost(expense)),
});

ReleaseTable.propTypes = {
  editExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  costs: PropTypes.arrayOf(PropTypes.object),
};

ReleaseTable.defaultProps = {
  costs: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseTable);
