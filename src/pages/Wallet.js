import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moneyData from '../services/api';
// import { moneyCodes } from '../services/api';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      money: moneyData(),
    };
    this.expenseForm = this.expenseForm.bind(this);
  }

  componentDidMount() {
    const { money } = this.state;
    console.log(money);
  }

  expenseForm(money) {
    return (
      <form>
        Valor:
        <input type="number" data-testid="value-input" />
        Moeda:
        <select data-testid="currency-input">
          {money.map((each) => (
            <option key={ each.code } data-testid={ each.code }>
              { each.code }
            </option>))}
        </select>
        Método de pagamento:
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de Cŕedito</option>
          <option>Cartão de Débito</option>
        </select>
        Tag:
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        Descrição:
        <input type="text" maxLength="50" data-testid="description-input" />
        <button type="button">Adicionar Despesa</button>
      </form>);
  }

  render() {
    const { email, totalExpenses, totalCurrency } = this.props;
    const { money } = this.state;
    return (
      <div>
        { money ? (
          <div>
            <header>
              <p data-testid="email-field">
                Email:
                {' '}
                { email }
              </p>
              <p data-testid="total-field">
                Despesas totais:
                {' '}
                R$
                {' '}
                { totalExpenses }
              </p>
              <p data-testid="header-currency-field">
                {' '}
                { totalCurrency }
              </p>
            </header>
            { this.expenseForm(money) }
            <table>
              <tr>
                <th>Descrição</th>
                <th>Tag</th>
                <th>Método de Pagamento</th>
                <th>Valor</th>
                <th>Moeda</th>
                <th>Câmbio Utilizado</th>
                <th>Valor Convertido</th>
                <th>Moeda de Conversão</th>
                <th>Editar/Excluir</th>
              </tr>
              <tbody />
            </table>
          </div>)
          : <h1>Loading...</h1>}
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  totalCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: 0,
  totalCurrency: 'BRL',
});

export default connect(mapStateToProps)(Wallet);
