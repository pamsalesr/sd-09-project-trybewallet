import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import ExpenseForm from '../components/expenseForm';
import { getCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const { dispatchCurrencies } = this.props;
    await dispatchCurrencies();
  }

  render() {
    // const { currencies } = this.state;
    return (
      <div>
        <Header />
        <ExpenseForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(getCurrencies()),
});

Wallet.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
