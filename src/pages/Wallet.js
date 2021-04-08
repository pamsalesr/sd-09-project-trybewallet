import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, getCurrenciesValues } from '../actions';
import FormWallet from '../component/formWallet';
import ExpenseAddForm from '../component/ExpenseAddForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currency: '',
    };
  }

  componentDidMount() {
    const { currencyDispatcher, valoresDispatched } = this.props;
    currencyDispatcher();
    valoresDispatched();
  }

  render() {
    const { emailStore } = this.props;
    return (
      <main>
        <header>
          <h1>Wallet</h1>
          <ul>
            <li data-testid="email-field">{ emailStore }</li>
            <li data-testid="total-field">0</li>
            <li data-testid="header-currency-field">BRL</li>
          </ul>
        </header>
        <FormWallet />
        <ExpenseAddForm />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencyDispatcher: () => dispatch(getCurrencies()),
  valoresDispatched: () => dispatch(getCurrenciesValues()),
});

const mapStateToProps = (state) => ({
  emailStore: state.user.email,
  // expensesState: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currencyDispatcher: PropTypes.func.isRequired,
  valoresDispatched: PropTypes.func.isRequired,
  emailStore: PropTypes.objectOf.isRequired,
};
