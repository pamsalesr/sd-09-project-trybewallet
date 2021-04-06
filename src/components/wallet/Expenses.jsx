import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrencies, addExpense, finishEdit } from '../../actions';

const METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Expenses extends Component {
  constructor() {
    super();
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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    requestCurrencies().then((data) => this.setState({ exchangeRates: data }));
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { id } = this.state;
    const { sendInput } = this.props;
    sendInput(this.state);
    this.setState({ id: id + 1, value: '', description: '' });
  }

  labels() {
    const { value, description } = this.state;
    const { editOption } = this.props;
    return (
      <div
        className={ !editOption ? `
        d-flex
        flex-column
        bg-info
        p-5
        box-radius
        shadow
        border
        border-light` : `
        d-flex
        flex-column
        bg-warning
        p-5
        box-radius
        shadow
        border
        border-light` }
      >
        <label htmlFor="inputValue">
          <input
            placeholder="valor"
            className="form-control"
            type="number"
            data-testid="value-input"
            id="inputValue"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="inputDescrition">
          <input
            placeholder="descrição"
            className="form-control"
            type="text"
            data-testid="description-input"
            id="inputDescrition"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
      </div>
    );
  }

  button() {
    const { editOption, finishEditExpense } = this.props;
    return (
      <button
        type="button"
        className={ !editOption ? 'btn btn-info' : 'btn btn-warning' }
        onClick={ !editOption ? () => {
          this.handleClick();
          requestCurrencies();
        }
          : finishEditExpense }
      >
        { !editOption ? 'Adicionar despesa' : 'Editar despesa' }
      </button>
    );
  }

  selects() {
    const { exchangeRates } = this.state;
    const currencies = Object.keys(exchangeRates).filter((item) => item !== 'USDT');
    return (
      <div className="d-flex m-5">
        <select
          className="p-2 m-3"
          name="tag"
          id="tagsSelect"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          {
            TAGS
              .map((item) => <option key={ item }>{ item }</option>)
          }
        </select>
        <select
          className="p-2 m-3"
          name="method"
          id="methodSelect"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          {
            METHOD
              .map((item) => <option key={ item }>{ item }</option>)
          }
        </select>
        <select
          className="p-2 m-3"
          name="currency"
          id="currenciesSelect"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {
            currencies
              .map((item) => <option key={ item } data-testid={ item }>{ item }</option>)
          }
        </select>
      </div>
    );
  }

  render() {
    return (
      <form
        className="
        bg-secondary p-5  d-flex flex-column justify-content-around align-items-center"
      >
        {this.labels()}
        {this.selects()}
        {this.button()}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendInput: (value) => dispatch(addExpense(value)),
  finishEditExpense: () => dispatch(finishEdit()),
});

const mapStateToProps = (store) => ({
  fetchCurrencies: store.wallet.currencies,
  editOption: store.wallet.edit,
  editExpeses: store.wallet.expeses,
  editId: store.wallet.upDate,
});

Expenses.propTypes = {
  sendInput: PropTypes.func.isRequired,
  editOption: PropTypes.bool.isRequired,
  finishEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
