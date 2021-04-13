import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    const { emailState, totalPriceState } = this.props;
    const totalPrice = !totalPriceState ? 0 : totalPriceState;

    return (
      <>
        <header>
          <ul>
            <li data-testid="email-field">{`Email: ${emailState}`}</li>
            <li>
              Despesa Total: R$
              <span data-testid="total-field">{` ${totalPrice} `}</span>
              <span data-testid="header-currency-field">BRL</span>
            </li>
          </ul>
        </header>
        <main>
          <ExpensesForm />
          <ExpensesTable />
        </main>
      </>
    );
  }
}

Wallet.propTypes = {
  emailState: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  totalPriceState: state.price.totalPrice,
});

export default connect(mapStateToProps)(Wallet);
