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
              const { ask, nome } = exchangeRates[currency];
              // const intValue = value;
              const convertedValue = Math.round(value * ask * 100) / 100;
              return (
                <tr key={ `${id}${value}${currency}` }>
                  <th>{ description }</th>
                  <th>{ tag }</th>
                  <th>{ method }</th>
                  <th>{ value }</th>
                  <th>{ nome }</th>
                  <th>{ ask }</th>
                  <th>{ convertedValue }</th>
                  <th>Real</th>
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
