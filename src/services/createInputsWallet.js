import React from 'react';

export function renderEmailUser(userLogin) {
  return (
    <div>
      <span>Email: </span>
      <p data-testid="email-field">
        { userLogin }
      </p>
      <field
        value={ userLogin }
      />
    </div>
  );
}

export function renderTotalExpenditure(currencyToExchange, totalExpensesState) {
  const validate = !totalExpensesState ? 0 : totalExpensesState;
  return (
    <p>
      {' '}
      Despesa Total: R$
      {}
      <span data-testid="total-field">
        { validate }
      </span>
      <span data-testid="header-currency-field">
        { currencyToExchange }
      </span>
    </p>
  );
}

export function renderExpenseAmount(valueExpense, handlerTargetChange) {
  return (
    <div>
      <label htmlFor="valor-input">
        Valor das despesas:
        <input
          id="valor-input"
          type="text"
          data-testid="value-input"
          name="valueExpense"
          value={ valueExpense }
          onChange={ handlerTargetChange }
          placeholder="0"
        />
      </label>
    </div>
  );
}

export function renderExpenseDescription(descriptionExpense, handlerTargetChange) {
  return (
    <div>
      <label htmlFor="description-input">
        Descrição das Despesas:
        <textarea
          data-testid="description-input"
          name="descriptionExpense"
          id="description-input"
          cols="30"
          rows="5"
          value={ descriptionExpense }
          onChange={ handlerTargetChange }
        />
      </label>
    </div>
  );
}

export function renderSelectCurrency(selectCurrency, currencies, handlerTargetChange) {
  // const { currencies } = this.props;
  // console.log(selectCurrency)
  return (
    <div>
      <label htmlFor="currencyInput">
        Selecionar Moeda:
        <select
          id="currencyInput"
          data-testid="currency-input"
          name="selectCurrency"
          value={ selectCurrency }
          onChange={ handlerTargetChange }
        >
          { currencies && currencies.map((curr) => (
            <option key={ curr } data-testid={ curr } value={ curr }>
              { curr }
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function renderMethodPayment(methodPayment, handlerTargetChange) {
  return (
    <div>
      <label htmlFor="method-payment">
        Método De Pagamento:
        <select
          name="methodPayment"
          id="method-payment"
          data-testid="method-input"
          value={ methodPayment }
          onChange={ handlerTargetChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    </div>
  );
}

export function renderRecreation(categoryRecreation, handlerTargetChange) {
  return (
    <div>
      <label htmlFor="tag-input">
        Categoria:
        <select
          name="categoryRecreation"
          id="tag-input"
          data-testid="tag-input"
          value={ categoryRecreation }
          onChange={ handlerTargetChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    </div>
  );
}
