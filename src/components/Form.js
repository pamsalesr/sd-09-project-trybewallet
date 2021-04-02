import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import fetchAPI from '../services/api';
import { setCurrencies, addExpense } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() { this.fetchCurrencies(); }

  async fetchCurrencies() {
    const { updateCurrencies } = this.props;
    const result = await fetchAPI();
    updateCurrencies(result);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  async handleSubmit() {
    this.fetchCurrencies();
    const { submit, currencies, expenses } = this.props;
    const expense = { id: expenses.length, ...this.state, exchangeRates: currencies };
    submit(expense);
    this.setState({ value: 0, description: '' });
  }

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const stateFn = this.handleChange;
    return (
      <form>
        <label htmlFor="value">
          <input
            data-testid="value-input"
            id="value"
            type="number"
            value={ value }
            onChange={ stateFn }
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            id="description"
            type="text"
            value={ description }
            onChange={ stateFn }
          />
        </label>
        <label htmlFor="currency">
          <select data-testid="currency-input" id="currency" onChange={ stateFn }>
            {Object.keys(currencies).map((curr) => (
              <option data-testid={ curr } value={ curr } key={ curr }>{ curr }</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select data-testid="method-input" id="method" onChange={ stateFn }>
            {methods.map((met) => (<option value={ met } key={ met }>{ met }</option>))}
          </select>
        </label>
        <label htmlFor="tag">
          <select data-testid="tag-input" id="tag" onChange={ stateFn }>
            {tags.map((tag) => (<option value={ tag } key={ tag }>{ tag }</option>))}
          </select>
        </label>
        <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
        <button type="button">Editar despesa</button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: arrayOf().isRequired,
  expenses: arrayOf().isRequired,
  updateCurrencies: func.isRequired,
  submit: func.isRequired,
};

const mapStateToProps = ({ wallet }) => (
  { currencies: wallet.currencies, expenses: wallet.expenses }
);

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
  submit: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
