import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

const initialState = {
  value: 0,
  coin: 'BRL',
  methodPayment: 'Dinheiro',
  description: '',
  costCenter: 'Alimentação',
};

class NewCostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      coins: [
        'USD',
        'CAD',
        'EUR',
        'GBP',
        'ARS',
        'BTC',
        'LTC',
        'JPY',
        'CHF',
        'AUD',
        'CNY',
        'ILS',
        'ETH',
        'XRP'],
    };

    this.valueInput = this.valueInput.bind(this);
    this.currencyInput = this.currencyInput.bind(this);
    this.methodPaymentInput = this.methodPaymentInput.bind(this);
    this.descriptionCostInput = this.descriptionCostInput.bind(this);
    this.costCenterInput = this.costCenterInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  valueInput() {
    return (
      <label htmlFor="value">
        Valor
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyInput() {
    const { coins } = this.state;
    return (
      <label htmlFor="select-currency">
        Moeda
        <select
          name="coin"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          {
            coins.map((coin) => (
              <option
                value={ coin }
                key={ coin }
                data-testid={ coin }
              >
                { coin }
              </option>
            ))
          }
          {/* <option value="BRL" data-testid="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="TEST">TEST</option> */}
        </select>
      </label>
    );
  }

  methodPaymentInput() {
    const { methodPayment } = this.state;
    return (
      <label htmlFor="methodPayment">
        Método de Pagamento
        <select
          name="methodPayment"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ methodPayment }
          id="methodPayment"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  descriptionCostInput() {
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  costCenterInput() {
    return (
      <label htmlFor="costCenter">
        Despesa
        <select
          name="costCenter"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="food">Alimentação</option>
          <option value="recreation">Lazer</option>
          <option value="health">Saúde</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <form>
        { this.valueInput() }
        { this.currencyInput() }
        { this.methodPaymentInput() }
        { this.descriptionCostInput() }
        { this.costCenterInput() }

        <button
          type="button"
          onClick=""
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

// const mapStateToProps = (state) => ({
//   coins: state.currencies,
//   isFetching: state.isFetching,
// });

// NewCostForm.propTypes = {
//   coins: PropTypes.arrayOf(PropTypes.string).isRequired,
//   isFetching: PropTypes.bool.isRequired,
// };

// export default connect(mapStateToProps)(NewCostForm);

export default NewCostForm;
