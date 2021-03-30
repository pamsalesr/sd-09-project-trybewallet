import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <div className="header-email">
            <p data-testid="email-field">
              Email:
              { email }
            </p>
          </div>
          <div className="header-total">
            <p data-testid="total-field">
              0
              <span data-testid="header-currency-field">BRL</span>
            </p>
          </div>
        </header>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input type="text" data-testid="value-input" />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <input type="text" data-testid="currency-input" />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input type="text" data-testid="description-input" />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
