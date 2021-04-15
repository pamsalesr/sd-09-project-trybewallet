import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { endEdit } from '../actions';

class FormEditExpense extends React.Component {
  constructor(props) {
    super(props);

    const { expenseToEdit } = this.props;
    this.state = {
      ...expenseToEdit,
    };

    this.creatorCurrencySelect = this.creatorCurrencySelect.bind(this);
    this.creatorPaymentSelect = this.creatorPaymentSelect.bind(this);
    this.creatorTagSelect = this.creatorTagSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { id, value, description, currency, method, tag } = this.state;
    const { sendEditExpense } = this.props;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    sendEditExpense(expense);
  }

  creatorCurrencySelect() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            value={ currency }
            id="currency-input"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((cur) => (
              <option
                value={ cur }
                key={ cur }
                data-testid={ cur }
              >
                {cur}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  creatorPaymentSelect() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Metodo de Pagamento:
        <select
          value={ method }
          name="method"
          id="method-input"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  creatorTagSelect() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          value={ tag }
          name="tag"
          id="tag-input"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <div>
        <label
          htmlFor="value-input"
        >
          Valor:
          <input
            id="value-input"
            value={ value }
            name="value"
            type="number"
            data-testid="value-input"
            onChange={ this.handleChange }
            placeholder="0,00"
          />
        </label>
        <label
          htmlFor="description-input"
        >
          Descrição de despesas:
          <input
            id="description-input"
            value={ description }
            name="description"
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
            placeholder="Despesas"
          />
        </label>
        { this.creatorCurrencySelect() }
        { this.creatorPaymentSelect() }
        { this.creatorTagSelect() }
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Editar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  sendEditExpense: (expense) => dispatch(endEdit(expense)),
});

FormEditExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  sendEditExpense: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
};

FormEditExpense.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(FormEditExpense);
