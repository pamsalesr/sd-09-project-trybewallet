import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { onSubmitForm } from '../actions';

class FormWallet extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAwesomeapi = this.fetchAwesomeapi.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      id: 0,
      exchangeRates: {},
      arrayWithTypes: [],
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
      value: 0,
      description: '',
    };
  }

  componentDidMount() {
    this.fetchAwesomeapi();
  }

  fetchAwesomeapi() {
    const endPoint = 'https://economia.awesomeapi.com.br/json/all';
    fetch(endPoint)
      .then((jsonResult) => {
        jsonResult.json()
          .then((response) => {
            this.setState({
              exchangeRates: response,
              arrayWithTypes: Object.keys(response),
            });
          });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  renderSelects() {
    const {
      method,
      tag,
      currency,
      arrayWithTypes,
    } = this.state;
    const currencyegory = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        Moeda:
        <select
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
          data-testid="currency-input"
        >
          { arrayWithTypes.filter((coin) => coin !== 'USDT')
            .map((coin, index) => (
              <option key={ index } data-testid={ coin }>{coin}</option>
            ))}
        </select>
        Método de Pagamento:
        <select
          value={ method }
          name="method"
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        (tag)
        <select
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
          data-testid="tag-input"
        >
          {currencyegory.map((category, index) => (
            <option key={ index }>{ category }</option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    const { value, description } = this.state;
    const { sendFormSubmit } = this.props;
    return (
      <form>
        Valor:
        <input
          value={ value }
          name="value"
          onChange={ this.handleChange }
          type="number"
          data-testid="value-input"
        />
        Descrição:
        <input
          value={ description }
          name="description"
          onChange={ this.handleChange }
          type="text"
          data-testid="description-input"
        />
        { this.renderSelects() }
        <button
          onClick={ () => {
            this.setState((prevState) => ({ id: prevState.id + 1, value: 0 }));
            sendFormSubmit(this.state);
          } }
          type="button"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormWallet.propTypes = {
  sendFormSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendFormSubmit: (state) => dispatch(onSubmitForm(state)),
});

export default connect(null, mapDispatchToProps)(FormWallet);
