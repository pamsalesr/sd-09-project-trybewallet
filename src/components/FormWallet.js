import '../pages/Wallet.css';
import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { fetchCurrency } from '../actions';

class FormWallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: 0,
    };

    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inCurrency = this.inCurrency.bind(this);
    this.inMethod = this.inMethod.bind(this);
    this.inTag = this.inTag.bind(this);
    this.newInput = this.newInput.bind(this);
    this.newSelect = this.newSelect.bind(this);
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  async fetchCurrency() {
    const { fetchDispatchCurrency } = this.props;
    fetchDispatchCurrency();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  newInput(name, value, data, ...params) {
    const [label, type] = params;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          className={ name }
          data-testid={ data }
          id={ name }
          name={ name }
          onChange={ this.handleChange }
          type={ type }
          value={ value }
        />
      </label>
    );
  }

  inCurrency() {
    const currency = [
      'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP',
    ];
    return currency.map((element, index) => (
      <option
        data-testid={ element }
        value={ element }
        key={ index }
      >
        { element }
      </option>
    ));
  }

  inMethod() {
    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return method.map((element, index) => (
      <option value={ element } key={ index }>{ element }</option>
    ));
  }

  inTag() {
    const method = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return method.map((element, index) => (
      <option value={ element } key={ index }>{ element }</option>
    ));
  }

  newSelect(id, label, name, ...params) {
    const [state, options] = params;
    return (
      <label htmlFor={ id }>
        { `${label} ` }
        <select
          className={ id }
          data-testid={ id }
          name={ name }
          id={ id }
          value={ state }
          onChange={ this.handleChange }
        >
          { options }
        </select>
      </label>
    );
  }

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { newInput, newSelect, inCurrency, inMethod, inTag } = this;
    return (
      <div className="body">
        <form className="form">
          { newInput('value', value, 'value-input', 'Valor: ', 'number') }
          { newSelect('currency-input', 'Moeda: ', 'currency', currency, inCurrency()) }
          { newSelect('method-input', 'Método de pagamento: ',
            'method', method, inMethod())}
          { newSelect('tag-input', 'Tag: ', 'tag', tag, inTag())}
          { newInput('description', description,
            'description-input', 'Descrição: ', 'text') }
          <button
            className="btn"
            type="button"
            onClick={ fetchCurrency }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDispatchCurrency: () => dispatch(fetchCurrency()),
});

FormWallet.propTypes = {
  fetchDispatchCurrency: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
