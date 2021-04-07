import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './listWallet.css';

class WalletItem extends Component {
  render() {
    const { description, tag, method, value, currencyName, exchange,
      convertValue } = this.props;

    return (
      <div>
        <span className="description">{ description }</span>
        <span className="tag">{ tag }</span>
        <span className="method">{ method }</span>
        <span className="value">{ value }</span>
        <span className="currency">{ currencyName }</span>
        <span className="exchange">{ exchange }</span>
        <span className="convert-value">{ convertValue }</span>
        <span className="convert-currency">Real</span>
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
