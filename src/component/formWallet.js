import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { wallet } from '../actions';

class FormWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };

    this.createOptions = this.createOptions.bind(this);
  }

  createOptions() {
    const { listCurrenciesState } = this.props;
    return listCurrenciesState.map((element) => (
      <option
        key={ element }
        value={ element }
        data-testid={ element }
      >
        { element }
      </option>
    ));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    console.log(this.props.currencyValuesState.usd);
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input name="value" id="value" type="text" data-testid="value-input" onChange={ this.handleChange.bind(this) } />
          </label>
          <label htmlFor="currency">
            Moeda
            <select name="currency" id="currency" data-testid=" currency-input" onChange={ this.handleChange.bind(this) }>
              { this.createOptions() }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select name="method" id="method" data-testid="method-input" onChange={ this.handleChange.bind(this) }>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select name="tag" id="tag" data-testid="tag-input" onChange={ this.handleChange.bind(this) }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição
            <input
              name="description"
              id="description"
              type="text"
              data-testid="description-input"
            />
          </label>
          <button type="button" onClick={ this.handleClick.bind(this) }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listCurrenciesState: state.wallet.currencies,
  currencyValuesState: state.wallet.data,
});

const mapDispatchToProps = (dispatch) => ({
  expensesDispatched: () => dispatch(wallet),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);

FormWallet.propTypes = {
  listCurrenciesState: PropTypes.func.isRequired,
  expensesDispatched: PropTypes.objectOf.isRequired,
};
