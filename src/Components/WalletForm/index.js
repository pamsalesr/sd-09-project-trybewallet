import React, { Component } from 'react';
import { func, PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addCurrencys, expenseThunk } from '../../actions';
import './walletForm.css';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    // this.fetchCurrency = this.fetchCurrency.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.handleyForm = this.handleyForm.bind(this);

    this.state = {
      value: '0',
      currency: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { initialCurrancys } = this.props;
    initialCurrancys();
  }

  handleyForm({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async addExpense() {
    const { value, currency, payment, tag, description } = this.state;
    const expanses = {
      value,
      currency,
      payment,
      tag,
      description,
    };
    this.setState({ value: '0' });
    const { thunk } = this.props;
    thunk(expanses);
  }

  renderSelectCurrency() {
    const { stateCurrency } = this.props;
    // const { currencys } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:&nbsp;
        <select
          name="currency"
          data-testid="currency-input"
          id="currency-input"
          onChange={ this.handleyForm }
        >
          { (stateCurrency) && stateCurrency.map((code) => (
            <option value={ code } key={ code } data-testid={ code }>
              { code }
            </option>
          )) }
        </select>
      </label>
    );
  }

  renderSelectPayment() {
    return (
      <label htmlFor="method-input">
        Método de pagamento:&nbsp;
        <select
          name="payment"
          data-testid="method-input"
          id="method-input"
          onChange={ this.handleyForm }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  render() {
    const { value } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className="form-container">
        <label htmlFor="value-input">
          Valor:&nbsp;
          <input
            name="value"
            type="number"
            value={ value }
            data-testid="value-input"
            id="value-input"
            onChange={ this.handleyForm }
          />
        </label>
        { this.renderSelectCurrency() }
        { this.renderSelectPayment() }
        <label htmlFor="tag-input">
          Categoria:&nbsp;
          <select
            name="tag"
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleyForm }
          >
            { tags.map((tag, i) => <option value={ tag } key={ i }>{ tag }</option>) }
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição da despesa:&nbsp;
          <input
            name="description"
            type="text"
            data-testid="description-input"
            id="description-input"
            onChange={ this.handleyForm }
          />
        </label>
        <button className="btn btn-dark" type="reset" onClick={ this.addExpense }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  stateCurrency: state.wallet.currencys,
});

const mapDispatchToProps = (dispatch) => ({
  thunk: (expanse) => dispatch(expenseThunk(expanse)),
  initialCurrancys: () => dispatch(addCurrencys()),
});

WalletForm.propTypes = {
  thunk: func.isRequired,
  initialCurrancys: func.isRequired,
  stateCurrency: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
