import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/components/Header.css';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header className="header-container">
        <h1>Personal Wallet</h1>
        <div>
          <p data-testid="email-field">
            <span className="label">Usuário: </span>
            { email }
          </p>
          <p>
            <span className="label">Despesa Total: </span>
            R$
            <span data-testid="total-field"> 0,00 </span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
