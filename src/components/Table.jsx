import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead className="table-header">
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
                const { id, value, description } = expense;
                const { currency, method, tag, exchangeRates } = expense;
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
                    <td>...</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(Table);
