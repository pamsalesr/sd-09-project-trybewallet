import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions';
import InputValue from './inputValue';
import InputDescription from './inputDescription';
import InputCurrency from './inputCurrency';
import InputMethod from './inputMethod';
import InputTag from './inputTag';
import ListWallet from './listWallet';
import * as Actions from '../actions';
import './walletForm.css';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonAdd = this.buttonAdd.bind(this);
    this.clearState = this.clearState.bind(this);
    this.computeValue = this.computeValue.bind(this);
  }

  componentDidMount() {
    const { addCurrency } = this.props;
    addCurrency();
  }

  clearState() {
    this.setState({
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    });
  }

  computeValue(total, value) {
    const { currency, exchangeRates } = this.state;
    return total + parseFloat(value) * parseFloat(exchangeRates[currency].ask);
  }

  buttonAdd() {
    const { addCurrency, addExpense, addTotals, totals, wallet } = this.props;
    addCurrency();
    const { lastId } = wallet;
    const { total, currency } = totals;
    const { value, description } = this.state;

    if (value !== 0 && description !== '') {
      this.setState({
        id: lastId + 1,
      });
      addExpense(this.state);
      addTotals(this.computeValue(total, value), currency);
      this.clearState();
    }
  }

  handleChange({ target }) {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { name, value } = target;

    if (value !== 0 || value !== '') {
      this.setState({
        [name]: value,
        exchangeRates: currencies,
      });
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <div className="wallet-form">
          <InputValue fieldValue={ value } fieldFunction={ this.handleChange } />
          <InputDescription
            fieldValue={ description }
            fieldFunction={ this.handleChange }
          />
          <InputCurrency fieldValue={ currency } fieldFunction={ this.handleChange } />
          <InputMethod fieldValue={ method } fieldFunction={ this.handleChange } />
          <InputTag fieldValue={ tag } fieldFunction={ this.handleChange } />
          <button
            type="button"
            onClick={ this.buttonAdd }
          >
            Adicionar despesa
          </button>
        </div>
        <div>
          <ListWallet />
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  addCurrency: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  addTotals: PropTypes.func.isRequired,
  totals: PropTypes.shape({
    total: PropTypes.number,
    currency: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf),
    expenses: PropTypes.arrayOf(PropTypes.object),
    lastId: PropTypes.number,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addCurrency: () => dispatch(fetchCurrency()),
  addExpense: (expense) => dispatch(Actions.addExpense(expense)),
  addTotals: (total, currency) => dispatch(Actions.addTotals(total, currency)),
});

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
