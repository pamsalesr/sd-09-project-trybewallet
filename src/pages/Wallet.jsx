import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/wallet.css';
import { addExpenseThunk } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      data: [],
      dispesaAtual: {
        id: 0,
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.insertData();
  }

  async fetchMoedas() {
    const endPoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  }

  async insertData() {
    const moedas = await this.fetchMoedas();
    const moedasNome = Object.keys(moedas);
    const indexOfusdt = moedasNome.indexOf('USDT');
    this.setState({
      data: [
        ...moedasNome.slice(0, indexOfusdt),
        ...moedasNome.slice(indexOfusdt + 1, moedasNome.length),
      ],
    });
  }

  handleChange({ target: { name, value } }) {
    const { dispesaAtual } = this.state;
    this.setState({
      dispesaAtual: {
        ...dispesaAtual,
        [name]: value,
      },
    });
  }

  inputsWithLabel(dispesaAtual) {
    return (
      <>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            value={ dispesaAtual.value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Descrição:
          <input
            type="text"
            name="description"
            value={ dispesaAtual.description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  selectMoedas(data, dispesaAtual) {
    return (
      <label htmlFor="payment">
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          value={ dispesaAtual.currency }
          onChange={ this.handleChange }
        >
          {data.map((item) => (
            <option data-testid={ item } key={ item }>{ item }</option>
          ))}
        </select>
      </label>
    );
  }

  selectTag(dispesaAtual) {
    return (
      <label htmlFor="tag">
        Tag:
        <select
          name="tag"
          value={ dispesaAtual.tag }
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </label>
    );
  }

  paymenteSelect(dispesaAtual) {
    return (
      <label htmlFor="method">
        Modo de pagamento:
        <select
          name="method"
          value={ dispesaAtual.method }
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao-de-credito">Cartão de crédito</option>
          <option value="cartao-de-debito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  render() {
    const { total, data, dispesaAtual } = this.state;
    const { user, addExpense } = this.props;

    return (
      <>
        <header>
          <p data-testid="email-field">{`Usuário: ${user}`}</p>
          <p data-testid="total-field">{`Depesas Totais: R$ ${total}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form action="">
          { this.inputsWithLabel(dispesaAtual) }
          { this.selectMoedas(data, dispesaAtual) }
          { this.selectTag(dispesaAtual) }
          { this.paymenteSelect(dispesaAtual) }
          <button
            type="button"
            onClick={ () => {
              addExpense(dispesaAtual);
              this.setState((previouState) => ({
                total: dispesaAtual.value,
                dispesaAtual: {
                  id: previouState.dispesaAtual.id + 1,
                  currency: 'USD',
                  method: 'Dinheiro',
                  tag: 'Alimentação',
                  value: 0,
                  description: '',
                },
              }));
            } }
          >
            Adicionar despesa
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currency: state.reducerDispesas.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (dispesaAtual) => dispatch(addExpenseThunk(dispesaAtual)),
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
