import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Wallet.css';

class ExpenseList extends React.Component {
  render() {
    const { expenses, money } = this.props;
    const map = expenses.map((item) => {
      const moneyInfo = money.find((each) => item.currency === each.code);
      const moneyName = moneyInfo.name.split('/');
      return (
        <tr key={ item.id }>
          <td>
            {item.description}
          </td>
          <td>
            {item.tag}
          </td>
          <td>
            {item.method}
          </td>
          <td>
            {`${item.currency} ${item.value}`}
          </td>
          <td>
            {moneyName[0]}
          </td>
          <td>
            R$
            {(Math.floor(moneyInfo.ask * 100) / 100)}
          </td>
          <td>
            R$
            {(Math.floor(moneyInfo.ask * item.value * 100) / 100)}
          </td>
          <td>
            Real Brasileiro
          </td>
          <td>
            <button type="button">
              Editar
            </button>
            <button type="button">
              Excluir
            </button>
          </td>
        </tr>
      );
    });
    return map;
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  money: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpenseList);
