import React from 'react';
import PropTypes from 'prop-types';

class Inputs extends React.Component {
  valueInput(handleChange) {
    const { value } = this.props;

    return (
      <label htmlFor="value">
        Valor:
        <input
          onChange={ handleChange }
          type="number"
          min={ 0 }
          step={ 1 }
          data-testid="value-input"
          name="value"
          id="value"
          value={ value }
        />
      </label>
    );
  }

  decriptionInput(handleChange) {
    const { description } = this.props;

    return (
      <label htmlFor="description">
        Descrição:
        <input
          onChange={ handleChange }
          type="text"
          data-testid="description-input"
          name="description"
          id="description"
          placeholder="Digite aqui a decrição do gasto"
          value={ description }
        />
      </label>
    );
  }

  currencyInput(currencies, handleChange) {
    const { currency } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          onChange={ handleChange }
          value={ currency }
          data-testid="currency-input"
          name="currency"
          id="currency"
        >
          {currencies.map((curr) => (
            <option data-testid={ curr } key={ curr } value={ curr }>
              {curr}
            </option>
          ))}
        </select>
      </label>
    );
  }

  methodInput(handleChange) {
    const { method } = this.props;
    return (
      <label htmlFor="method">
        Forma de pagamento:
        <select
          onChange={ handleChange }
          value={ method }
          data-testid="method-input"
          name="method"
          id="method"
        >
          <option value="money">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput(handleChange) {
    const { tag } = this.props;
    return (
      <label htmlFor="tag">
        <select
          onChange={ handleChange }
          value={ tag }
          data-testid="tag-input"
          name="tag"
          id="tag"
        >
          <option value="food">Alimentação</option>
          <option value="recreation">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  addExpenseButton(handleClick) {
    return (
      <button type="button" onClick={ handleClick }>
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { handleClick, currencies, handleChange } = this.props;

    return (
      <form action="">
        {this.valueInput(handleChange)}
        {this.decriptionInput(handleChange)}
        {this.currencyInput(currencies, handleChange)}
        {this.methodInput(handleChange)}
        {this.tagInput(handleChange)}
        {this.addExpenseButton(handleClick)}
      </form>
    );
  }
}

Inputs.propTypes = {
  value: PropTypes.number,
  currency: PropTypes.string,
  description: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;

export default Inputs;
