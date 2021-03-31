import React, { Component } from 'react';
import { arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
              const { id, description, tag, method,
                value, currency, exchangeRates } = expense;
              const { ask, name } = exchangeRates[currency];
              // const formatedValue = (Math.round(value * 100) / 100).toFixed(2);
              const formatedAsk = (Math.round(ask * 100) / 100).toFixed(2);
              const convertedValue = (Math.round(value * ask * 100) / 100).toFixed(2);
              return (
                <tr key={ `${id}${value}${currency}` }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ name }</td>
                  <td>{ formatedAsk }</td>
                  <td>{ convertedValue }</td>
                  <td>Real</td>
                  {/* <th>Editar/Excluir</th> */}
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

Table.propTypes = {
  expenses: arrayOf(shape()).isRequired,
};

export default connect(mapStateToProps)(Table);
