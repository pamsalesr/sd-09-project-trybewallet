export const generateHeaderExpense = () => {
  return (
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    </thead>
  );
}

export const paymentMethod = () => {
  return (
    <label htmlFor="method">
      Método de Pagamento
      <select
        data-testid="method-input"
        id="method"
        onChange={ this.handleChange }
      >
        <option key="money" value="Dinheiro">Dinheiro</option>
        <option key="credit-card" value="Cartão de crédito">Cartão de crédito</option>
        <option key="debit-card" value="Cartão de débito">Cartão de débito</option>
      </select>
    </label>
  );
}

    // generateExpenseResume() {
    //   const { expenses } = this.props;
    //   return (
    //     expenses.map((
    //       { value, description, currency, method, tag, exchangeRates }, index,
    //     ) => (
    //       <tr key={ index } name={ index }>
    //         <td>{ description }</td>
    //         <td>{ tag }</td>
    //         <td>{ method }</td>
    //         <td>{ value }</td>
    //         <td>{ exchangeRates[currency].name }</td>
    //         <td>{ Math.round(100 * exchangeRates[currency].ask) / 100 }</td>
    //         <td>{ Math.round(value * 100 * (exchangeRates[currency].ask)) / 100 }</td>
    //         <td>Real</td>
    //         <td>
    //           <button
    //             type="button"
    //             data-testid="edit-btn"
    //             id={ index }
    //             onClick={ ({ target }) => this.editExpense(target) }
    //           >
    //             Editar despesa
    //           </button>
    //           <button
    //             type="button"
    //             data-testid="delete-btn"
    //             name={ index }
    //             onClick={ ({ target }) => this.deleteExpense(target) }
    //           >
    //             deletar
    //           </button>
    //         </td>
    //       </tr>
    //     ))
    //   );
    // }