import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const headerTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class expenseTable extends React.Component {
  createThTag(array) {
    return array.map((item, i) => (
      <th key={ i }>{item}</th>
    ));
  }

  handleButtons() {

  }

  createTBodyExpenseTatle(expenses) {
    // console.log(expenses);
    return expenses.map((expense, index) => {
      const { description, tag, method, value, currency,
        exchangeRates, id } = expense;
      const { ask, name } = exchangeRates[currency];
      return (
        <tr key={ index } role="row">
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{value}</td>
          <td>{name}</td>
          <td>{Number(ask).toFixed(2)}</td>
          <td>{(Number(ask) * value).toFixed(2)}</td>
          <td>Real</td>
          <td>
            {this.handleButtons('delete', id)}
            {this.handleButtons('edit', id)}
          </td>
        </tr>
      );
    });
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            {this.createThTag(headerTable)}
          </tr>
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

export default connect(mapStateToProps)(expenseTable);
