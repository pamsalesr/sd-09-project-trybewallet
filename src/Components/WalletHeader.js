import React from 'react';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  render() {
    const initialValue = 0;
    const { userData } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          {`Email: ${userData}`}
        </span>
        <p>
          <span data-testid="total-field">
            {`R$${initialValue}`}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  userData: PropTypes.string,
};
WalletHeader.defaultProps = {
  userData: '',
};

export default WalletHeader;
