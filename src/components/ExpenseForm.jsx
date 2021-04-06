import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class ExpenseForm extends React.Component {
  componentDidMount() {
    this.fetchCurrency();
  }

  async fetchCurrency() {
    const { getCurrency } = this.props;
    await getCurrency();
  }

  renderSelectCurrency(currencies) {
    // console.log(Object.keys(currencies))
    return (
      <select name="moeda" id="moeda" data-testid="currency-input">
        {Object.keys(currencies).map((currency) => (
          <option
            key={ currency }
            value={ currency }
            data-testid={ currency }
          >
            { currency }
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="despesa">
          Valor da despesa
          <input type="text" name="despesa" data-testid="value-input" />
        </label>
        <label htmlFor="descricao">
          descrição da despesa
          <input type="text" name="descricao" data-testid="description-input" />
        </label>
        <label htmlFor="moeda">
          Moeda
          { this.renderSelectCurrency(currencies) }
        </label>
        <label htmlFor="pagamento">
          Método de pagamento
          <select name="pagamento" id="pagamento" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartaoCredito">Cartão de crédito</option>
            <option value="cartaoDebito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tipoDespesa">
          Tipo de despesa
          <select name="tipoDespesa" id="despesa" data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
