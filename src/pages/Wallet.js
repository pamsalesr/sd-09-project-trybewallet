import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalField: 0,
      currencyField: 'BRL',
    };
  }

  render() {
    const { emailState } = this.props;
    const { totalField, currencyField } = this.state;

    return (
      <header>
        <ul>
          <li data-testid="email-field">{`Email: ${emailState}`}</li>
          <li>
            Despesa Total: R$
            <span data-testid="total-field">{totalField.toPrecision(2)}</span>
            <span data-testid="header-currency-field">{currencyField}</span>
          </li>
        </ul>
      </header>
    );
  }
}

Wallet.propTypes = {
  emailState: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailState: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
