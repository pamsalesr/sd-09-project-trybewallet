import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userEmail, totalExpenseProp } = this.props;
    return (
      <header className="header">
        <p data-testid="header-currency-field">
          BRL
        </p>
        <p data-testid="total-field">
          {`Total: R$ ${totalExpenseProp || 0}`}
        </p>
        <p data-testid="email-field">
          {userEmail}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalExpenseProp: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalExpenseProp: state.wallet.totalExpense,
});

export default connect(mapStateToProps)(Header);
