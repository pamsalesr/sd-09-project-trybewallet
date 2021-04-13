import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <>
        <section
          name="userData"
        >
          <h3 data-testid="email-field">
            Bem vindo,
            { userEmail }
          </h3>
        </section>
        <section
          name="walletData"
        >
          <p data-testid="total-field">Gastos totais: 0</p>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </section>
      </>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);
