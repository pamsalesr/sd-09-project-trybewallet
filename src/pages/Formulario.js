import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import adicionaDespesa from '../actions/index';

const defaultState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};
class Formulario extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: 'Hot Dog',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.adicionarDespesa = this.adicionarDespesa.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json())
      .then((data) => this.setState({
        exchangeRates: data,
      }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async adicionarDespesa(e) {
    e.preventDefault();
    const { despesa, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const id = expenses.length;
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json());
    const novaDespesa = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    despesa(novaDespesa);
    this.setState(defaultState);
  }

  renderPagto() {
    const { method, tag } = this.state;
    return (
      <div>
        <label htmlFor="method-input">
          Forma de pagamento:
          <select
            name="method"
            data-testid="method-input"
            id="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tipo de despesa:
          <select
            name="tag"
            data-testid="tag-input"
            id="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option> Alimentação </option>
            <option> Lazer </option>
            <option> Trabalho </option>
            <option> Transporte </option>
            <option> Saúde </option>
          </select>
        </label>
        <button type="button" onClick={ this.adicionarDespesa }>Adicionar despesa</button>
      </div>
    );
  }

  renderTabela() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody>
          {expenses.map((despesa) => {
            const moedaDeCambio = Object.values(despesa.exchangeRates)
              .filter((el) => despesa.currency === el.code);

            return (
              <tr key={ despesa.id }>
                <td>{despesa.description}</td>
                <td>{despesa.tag}</td>
                <td>{despesa.method}</td>
                <td>{despesa.value}</td>
                <td>{moedaDeCambio[0].name}</td>
                <td>{parseFloat(moedaDeCambio[0].ask).toFixed(2)}</td>
                <td>
                  {(parseFloat(despesa.value) * parseFloat(moedaDeCambio[0].ask))
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>Editar</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { value, description, currency, exchangeRates } = this.state;
    return (
      <div>
        <label htmlFor="value-input">
          Qual o valor da sua despesa?
          <input
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            id="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descreva sua despesa
          <input
            name="description"
            value={ description }
            id="description-input"
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda da sua despesa:
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
            id="currency-input"
          >
            {Object.keys(exchangeRates).map((moeda, index) => {
              if (moeda !== 'USDT') {
                return (
                  <option key={ index } value={ moeda } data-testid={ `${moeda}` }>
                    { moeda }
                  </option>
                );
              }
              return '';
            })}
          </select>
        </label>
        {this.renderPagto()}
        {this.renderTabela()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  despesa: (e) => dispatch(adicionaDespesa(e)),
});

Formulario.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  despesa: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);

// Códigos que ajudaram em algumas funções: Rafael Moura, Lucas Duque, Daniel MD (turma 8),
// Murilo Roque e Nato (plantão e Discord)
