import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import image from './trybeWalletImage.png';

class Header extends React.Component {
  render() {
    const { email, totalValue } = this.props;
    const headerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    };

    return (
      <header style={ headerStyle }>
        <img src={ image } alt="teste" width="150" />
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span
          data-testid="total-field"
        >
          {`Despesa total: ${!totalValue ? 0 : totalValue.toFixed(2)}`}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.totalValue,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
