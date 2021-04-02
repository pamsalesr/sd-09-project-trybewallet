import React from 'react';
import { connect } from 'react-redux';
import getCurrencyApi from '../service/currenciApi';
import { sendFormDataToState, setExpenseValue, setTotalValue } from '../actions';

class FormSendBtn extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      total: 0,
    };

    this.setTotalValue = this.setTotalValue.bind(this);
    this.sandFormDataToGlobalState = this.sandFormDataToGlobalState.bind(this);
  }

  setTotalValue(convertedValue) {
    const { total } = this.state;
    const { sendTotalToState } = this.props;
    const newTotal = Number(total) + Number(convertedValue);
    this.setState({ total: newTotal });
    sendTotalToState(newTotal.toFixed(2));
  }

  convertExpense(currency, curencies, expense) {
    const currencyValue = Object.entries(curencies)
      .find((element) => currency === element[0]);
    const convertedValue = Number(expense) * Number(currencyValue[1].ask);
    this.setTotalValue(convertedValue);
    return expense;
  }

  async sandFormDataToGlobalState() {
    const curencies = await getCurrencyApi();
    const {
      expense,
      description,
      currency,
      method,
      tag,
      sendNewExpenseObj,
      setDefaultValue,
    } = this.props;
    const { id } = this.state;
    const newObj = {
      id,
      value: this.convertExpense(currency, curencies, expense),
      description,
      currency,
      method,
      tag,
      exchangeRates: curencies,
    };
    sendNewExpenseObj(newObj);
    this.setState({ id: id + 1 });
    setDefaultValue();
  }

  render() {
    return (
      <button
        type="button"
        onClick={ this.sandFormDataToGlobalState }
      >
        Adicionar despesa
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.expenseReducer.id,
  expense: state.expenseReducer.expense,
  description: state.expenseReducer.description,
  currency: state.expenseReducer.currency,
  method: state.expenseReducer.method,
  tag: state.expenseReducer.tag,
});

const mapDispatchToProps = (dispach) => ({
  sendNewExpenseObj: (expenseObj) => dispach(sendFormDataToState(expenseObj)),
  sendTotalToState: (total) => dispach(setTotalValue(total)),
  setDefaultValue: () => dispach(setExpenseValue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSendBtn);
