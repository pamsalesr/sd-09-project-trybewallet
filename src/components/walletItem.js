import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './listWallet.css';

class WalletItem extends Component {
  render() {
    const { description, tag, method, currency, value, currencyName, exchange,
      convertValue } = this.props;

    return (
      <div>
        <td className="description">{ description }</td>
        <td className="tag">{ tag }</td>
        <td className="method">{ method }</td>
        <td className="sign">{ currency }</td>
        <td className="value">{ parseFloat(value).toFixed(2) }</td>
        <td className="currency">{ currencyName }</td>
        <td className="exchange">{ parseFloat(exchange).toFixed(2) }</td>
        <td className="convert-value">{ parseFloat(convertValue).toFixed(2) }</td>
        <td className="convert-currency">Real</td>
        <button
          type="button"
          data-testid="delete-btn"
          // onClick={ this.buttonAdd }
        >
          Excluir
        </button>
        <button
          type="button"
          data-testid="edit-btn"
          // onClick={ this.buttonAdd }
        >
          Editar
        </button>

      </div>
    );
  }
}

WalletItem.propTypes = ({
  description: PropTypes.string,
  tag: PropTypes.string,
  method: PropTypes.string,
  currency: PropTypes.number,
  value: PropTypes.number,
  currencyName: PropTypes.string,
  exchange: PropTypes.number,
  convertValue: PropTypes.number,
}).isRequired;

export default WalletItem;
