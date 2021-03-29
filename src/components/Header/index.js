import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <h2>TrybeWallet</h2>
        </div>
        <div>
          <div>
            <p data-testid="email-field">{email}</p>
          </div>
          <div>
            <p>
              Despesa total:
              R$
              <span data-testid="total-field">0</span>
            </p>
          </div>
          <div>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
