import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, totalPrice } = this.props;
    return (
      <header>
        <div className="header-email">
          <p data-testid="email-field">
            Email:
            { email }
          </p>
        </div>
        <div className="header-total">
          <span data-testid="total-field">
            {!totalPrice ? 0 : totalPrice}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

// Header.defaultProps = {
//   email: 'alguem@email.com',
//   totalPrice: 0,
// };

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalPrice: state.wallet.totalPrice,
});

export default connect(mapStateToProps)(Header);
