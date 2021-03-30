import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class Expenses extends React.Component {
  render() {
    const { expenses, delExpense } = this.props;
    const descriptions = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir'];
    return (
      <div>
        <table>
          <thead>
            <tr>
              { descriptions.map((value) => <th key={ value }>{ value }</th>) }
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => {
                const { description, tag, method,
                  value, currency, exchangeRates, id } = expense;
                const { name, ask } = exchangeRates[currency];
                return (
                  <tr key={ id }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ value }</td>
                    <td>{ name }</td>
                    <td>{ (+(ask)).toFixed(2) }</td>
                    <td>{ (+(ask) * +(value)).toFixed(2) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => delExpense(id) }
                      >
                        Deletar
                      </button>
                    </td>
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

const mapDispatchToProps = (dispatch) => ({
  delExpense: (id) => dispatch(deleteExpense(id)),
});

Expenses.propTypes = {
  expenses: PropTypes.arrayOf({}),
  delExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
