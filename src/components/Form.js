import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToWallet, getCurrencyAction } from '../actions';
import getCurrency from '../api';

const tagList = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const initialState = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyList: [],
      ...initialState,
    };
    this.fetchCurencyApi = this.fetchCurencyApi.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurencyApi();
  }

  async fetchCurencyApi() {
    const requstCurrency = await getCurrency();
    const filteredCurrency = Object.keys(requstCurrency)
      .filter((initials) => initials !== 'USDT');
    this.setState({
      currencyList: filteredCurrency,
    });
  }

  async handleClick() {
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpense } = this.props;
    const exchangeRates = await getCurrency();
    addExpense({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
    this.setState({
      id: id + 1,
    });
    const form = document.querySelector('.form-despesa');
    form.reset();
  }

  render() {
    const { currencyList } = this.state;
    // const { expenses } = this.props;
    return (
      <form className="form-despesa">
        <input
          placeholder="Valor da despesa"
          data-testid="value-input"
          onChange={ (e) => this.setState({ value: e.target.value }) }
        />
        <input
          placeholder="Descrção da despesa"
          data-testid="description-input"
          onChange={ (e) => this.setState({ description: e.target.value }) }
        />
        <select
          data-testid="currency-input"
          onChange={ (e) => this.setState({ currency: e.target.value }) }
        >
          { currencyList.map((cur) => (
            <option key={ cur } data-testid={ cur } value={ cur }>
              { cur }
            </option>))}
        </select>
        <select
          data-testid="method-input"
          onChange={ (e) => this.setState({ method: e.target.value }) }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartão de crédito">Cartão de crédito</option>
          <option value="cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ (e) => this.setState({ tag: e.target.value }) }
        >
          {tagList.map((el) => (
            <option key={ el } value={ el }>{el}</option>))}
        </select>
        <button
          type="button"
          onClick={ async () => this.handleClick() }
        >
          Adicionar despesa
        </button>
        {/* {console.log(expenses)} */}
      </form>
    );
  }
}

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  // addCurrencies: PropTypes.func.isRequired,
  // expenses: PropTypes.arrayOf().isRequired,
  // currencies: PropTypes.objectOf().isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.data,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addToWallet(expense)),
  addCurrencies: () => dispatch(getCurrencyAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
