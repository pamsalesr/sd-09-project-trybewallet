import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderCurrencySelect = this.renderCurrencySelect.bind(this);
    this.renderTagSelect = this.renderTagSelect.bind(this);
    this.renderPayMethodSelect = this.renderPayMethodSelect.bind(this);
  }

  renderInputs() {
    const { onClick, onChange } = this.props;
    return (
      <div>
        <form id="add-expense">
          <input
            type="text"
            id="value"
            name="value"
            placeholder="$0.00"
            data-testid="value-input"
            onChange={ onChange }
          />
          <input
            type="text"
            id="description"
            name="description"
            placeholder="New Headphone"
            data-testid="description-input"
            size="50"
            onChange={ onChange }
          />
          { this.renderCurrencySelect() }
          { this.renderPayMethodSelect() }
          { this.renderTagSelect() }
          <button type="button" onClick={ onClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }

  renderPayMethodSelect() {
    const { onChange } = this.props;
    return (
      <select
        id="method"
        name="method"
        data-testid="method-input"
        onChange={ onChange }
      >
        <option>Dinheiro</option>
        <option>Cartão de débito</option>
        <option>Cartão de crédito</option>
      </select>
    );
  }

  renderTagSelect() {
    const { onChange } = this.props;
    return (
      <select name="tag" data-testid="tag-input" onChange={ onChange }>
        <option>Alimentação</option>
        <option>Lazer</option>
        <option>Trabalho</option>
        <option>Transporte</option>
        <option>Saúde</option>
      </select>
    );
  }

  renderCurrencySelect() {
    const { stateWallet, onChange } = this.props;
    let { currencies } = stateWallet;
    currencies = Object
      .keys(currencies[0])
      .filter((currency) => (currency !== 'USDT'));
    return (
      <select name="currency" data-testid="currency-input" onChange={ onChange }>
        {currencies.map((currency) => (
          <option
            name="currency"
            key={ Math.sqrt(Math.random() * 100) }
            data-testid={ currency }
          >
            { currency }
          </option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <section id="new-expense">
        <h2 className="secondary-heading">Insira os dados da despesa: </h2>
        { this.renderInputs() }
      </section>
    );
  }
}
AddExpense.propTypes = {
  onClick: PropTypes.func.isRequired,
  stateWallet: PropTypes.shape({ currencies: PropTypes.shape() }).isRequired,
  onChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  stateWallet: state.wallet,
});
export default connect(mapStateToProps, null)(AddExpense);
