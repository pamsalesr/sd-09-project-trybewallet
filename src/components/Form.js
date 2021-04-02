import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import fetchAPI from '../services/api';
import { updateCurr, updateExpenses } from '../actions';

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
    const { setCurr } = this.props;
    const result = await fetchAPI();
    setCurr(result);
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
    this.setState({ value: 0 });
  }

  render() {
    const { currencies } = this.props;
    const { value } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const stateFn = this.handleChange;
    return (
      <div>
        <label htmlFor="value">
          <input
            data-testid="value-input"
            id="value"
            type="number"
            onChange={ stateFn }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            id="description"
            type="text"
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
            {methods.map((method) => (
              <option value={ method } key={ method }>{ method }</option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          <select data-testid="tag-input" id="tag" onChange={ stateFn }>
            {tags.map((tag) => (
              <option value={ tag } key={ tag }>{ tag }</option>
            ))}
          </select>
        </label>
        <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
      </div>
    );
  }
}

Form.propTypes = {
  currencies: arrayOf().isRequired,
  expenses: arrayOf().isRequired,
  setCurr: func.isRequired,
  submit: func.isRequired,
};

const mapStateToProps = ({ wallet }) => (
  { currencies: wallet.currencies, expenses: wallet.expenses }
);

const mapDispatchToProps = (dispatch) => ({
  setCurr: (currencies) => dispatch(updateCurr(currencies)),
  submit: (expenses) => dispatch(updateExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
