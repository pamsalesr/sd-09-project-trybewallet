import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeId } from '../actions';

class TableWallet extends React.Component {
  constructor(props) {
    super(props);
    this.renderTable = this.renderTable.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset(e) {
    const { expenses, deleteId } = this.props;
    const newArray = expenses.filter((expense) => {
      const idBtn = parseInt(e.target.id)
      return idBtn !== expense.id;
    });
    deleteId(newArray);
  }

  renderTable(arrayExpenses) {
    return arrayExpenses.map((element) => (
      <tr key={ element.id }>
        <td>
          {element.description}
        </td>
        <td>
          {element.tag}
        </td>
        <td>
          {element.method}
        </td>
        <td>
          {element.value}
        </td>
        <td>
          {element.exchangeRates[element.currency].name}
        </td>
        <td>
          {parseFloat(element.exchangeRates[element.currency].ask).toFixed(2)}
        </td>
        <td>
          {parseFloat(
            element.exchangeRates[element.currency].ask * element.value,
          ).toFixed(2)}
        </td>
        <td>
          Real
        </td>
        <td>
          <button
            id={ element.id }
            data-testid="delete-btn"
            type="button"
            onClick={ this.reset }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    const { expenses } = this.props;
    const headerTable = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <table>
        <tr>
          {headerTable.map((element, index) => (
            <th key={ index }>{element}</th>
          )) }
        </tr>
        {expenses.length > 0 ? this.renderTable(expenses) : console.log('vazio')}
      </table>
    );
  }
}

TableWallet.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteId: (state) => dispatch(removeId(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
