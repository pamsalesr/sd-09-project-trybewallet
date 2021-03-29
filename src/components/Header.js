import React from 'react';
import { string, shape } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userData: { email } } = this.props;
    const value = 0.00;
    return (
      <header>
        <div>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            {`Dispesa Total R$ ${value}`}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
});

Header.propTypes = {
  userData: shape({
    email: string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
