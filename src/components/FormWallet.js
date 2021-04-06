import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCurrencies, saveExpense } from '../actions';
import fetchApi from '../services/api';

class FormWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleFetch = this.handleFetch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createDropdown = this.createDropdown.bind(this);
    this.createInput = this.createInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  async handleFetch() {
    const { setCurrencies } = this.props;
    const object = await fetchApi();
    setCurrencies(object);
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  handleClick() {
    const { setExpense, currencies } = this.props;
    this.handleFetch();
    setExpense({ ...this.state, exchangeRates: currencies });
    this.setState((previousValue) => ({
      id: previousValue.id + 1,
      value: 0,
      description: '',
    }));
  }

  createDropdown(label, name, options) {
    return (
      <label htmlFor={ name }>
        { `${label}:` }
        <select
          id={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
        >
          {options.map((option) => (
            <option key={ option } data-testid={ option }>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  createInput(label, name, value, type) {
    return (
      <label htmlFor={ name }>
        { `${label}:` }
        <input
          type={ type }
          value={ value }
          id={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    const currenciesArray = Object.keys(currencies);
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        { this.createInput('Valor', 'value', value, 'number') }
        { this.createInput('Descrição', 'description', description, 'text') }
        { this.createDropdown('Moeda', 'currency', currenciesArray) }
        { this.createDropdown('Método de Pagamento', 'method', methods) }
        { this.createDropdown('Categoria', 'tag', tags) }
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: (currencies) => dispatch(saveCurrencies(currencies)),
  setExpense: (expense) => dispatch(saveExpense(expense)),
});

FormWallet.propTypes = {
  setCurrencies: PropTypes.func.isRequired,
  setExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
