import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletItem from './walletItem';
import './listWallet.css';

class ListWallet extends Component {
  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    // Object.values(currencies).map((teste) => console.log(teste.name));
    // console.log(Object.keys(currencies));
    return (
      <div>
        <span className="description">Descrição</span>
        <span className="tag">Tag</span>
        <span className="method">Método de pagamento</span>
        <span className="value">Valor</span>
        <span className="currency">Moeda</span>
        <span className="exchange">Câmbio utilizado</span>
        <span className="convert-value">Valor convertido</span>
        <span className="convert-currency">Moeda de conversão</span>
        <span className="edit-exclude">Editar/Excluir</span>
        {
          expenses.map((expense) => (
            <WalletItem
              description={ expense.description }
              tag={ expense.tag }
              method={ expense.method }
              currency={ expense.currency }
              value={ parseFloat(expense.value).toFixed(2) }
              currencyName="nome da moeda"
              exchange={parseFloat('0.00').toFixed(2) }
              convertValue={ parseFloat(expense.value).toFixed(2) }
              key={ expense.id }
            />
          ))
        }
      </div>
    );
  }
}

ListWallet.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
    expenses: PropTypes.arrayOf(PropTypes.object),
    lastId: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(ListWallet);
