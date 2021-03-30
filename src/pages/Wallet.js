import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <main>
        <header>
          <span data-testid="email-field">
            Email:
            { email }
          </span>
          <span data-testid="total-field">
            Despesa Total:
            0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
      </main>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string,
};

Wallet.defaultProps = {
  email: '',
};

const mapStateToProps = ({ user: { email } }) => ({ email }); // O parâmetro de mapStateToProps é o reducer do usuario (user) desestruturado para pegar a chave email.

export default connect(mapStateToProps, null)(Wallet);
