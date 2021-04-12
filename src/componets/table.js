import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';

class TableExpense extends React.Component {
  render() {
    const { despesa } = this.props;
    const tagTh = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <div>
        <table>
          <tr>
            {tagTh.map((tag) => (
              <th key={ tag.id }>{tag}</th>
            ))}
          </tr>
          {despesa.map((tag) => (
            <tr key={ tag.id }>
              <td>{tag.description}</td>
              <td>{tag.tag}</td>
              <td>{tag.method}</td>
              <td>{tag.value}</td>
              <td>{tag.exchangeRates[tag.currency].name}</td>
              <td>
                {
                  parseFloat(tag.exchangeRates[tag.currency].ask)
                    .toFixed(2)
                }
              </td>
              <td>
                {
                  (parseFloat(tag.exchangeRates[tag.currency].ask) * tag.value)
                    .toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

TableExpense.propTypes = {
  despesa: PropsTypes.objectOf(PropsTypes.number).isRequired,
};

const mapStateToProps = (state) => ({
  despesa: state.wallet.expenses,
});

export default connect(mapStateToProps)(TableExpense);
