import React from 'react';
import PropTypes from 'prop-types';

class RenderExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.convertValue = this.convertValue.bind(this);
    this.findExchange = this.findExchange.bind(this);
  }

  convertValue(expense) {
    return (parseFloat(expense.value) * this.findExchange(expense).ask);
  }

  findExchange(expense) {
    const rates = Object.entries(expense.exchangeRates);
    const foundRate = rates.find((rate) => rate[1].code === expense.currency)[1];
    return foundRate;
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="App table">
        <thead className="App App-header-color">
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
        <tbody>
          { expenses.length === 0 ? null : expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{`${expense.value}`}</td>
              <td>{this.findExchange(expense).name}</td>
              <td>{Math.round(this.findExchange(expense).ask * 100) / 100}</td>
              <td>{Math.round(this.convertValue(expense) * 100) / 100}</td>
              <td>Real</td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

RenderExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RenderExpenses;
