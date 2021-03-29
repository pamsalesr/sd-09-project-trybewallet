import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { total: 0 };
  }

  render() {
    const { total } = this.state;
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            { `Hello user ${email}` }
          </p>
          <p data-testid="total-field">{`You have total of ${total}`}</p>
          <p data-testid="header-currency-field">BRL in your account</p>
        </header>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStatetoProps)(Wallet);
