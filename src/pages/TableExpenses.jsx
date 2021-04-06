import React from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';

class TableExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.generateExpenseResume = this.generateExpenseResume.bind(this);
  }

  generateExpenseResume() {
    const { expenses } = this.props;
    return (
      expenses.map((
        { value, description, currency, method, tag, exchangeRates }, index,
      ) => (
        <tr key={ index }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ Math.round(100 * exchangeRates[currency].ask) / 100 }</td>
          <td>{ Math.round(value * 100 * (exchangeRates[currency].ask)) / 100 }</td>
          <td>Real</td>
          <td><button type="button" data-testid="delete-btn">deletar</button></td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <session>
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
        { this.generateExpenseResume() }
      </session>
    );
  }
}

TableExpenses.propTypes = { expenses: arrayOf().isRequired };

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses });

export default connect(mapStateToProps)(TableExpenses);
