import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagamento, categorias } from './arrays';
import { addExpense, addDespesa } from '../actions';

class forms extends React.Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: '',
    };
    this.getApi = this.getApi.bind(this);
    this.filterAks = this.filterAks.bind(this);
    this.addValueForms = this.addValueForms.bind(this);
    this.addId = this.addId.bind(this);
    this.selectCurrecy = this.selectCurrecy.bind(this);
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((obj) => this.setState({ exchangeRates: obj }));
  }

  getApi() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((obj) => {
        const { keyAddExpense, keyAddDespesa } = this.props;
        this.setState((value1) => ({ id: value1.id + 1, exchangeRates: obj }));
        keyAddExpense(this.state);
        keyAddDespesa(this.filterAks(obj));
        this.setState({
          value: 0,
          description: '',
          currency: 'USD',
          method: '',
          tag: '',
        });
      });
  }

  filterAks(obj) {
    const { currency, value } = this.state;
    return obj[currency].ask * value;
  }

  addValueForms({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  addId() {
    const { keyAddExpense } = this.props;
    this.setState((value1) => ({ id: value1.id + 1 }));
    keyAddExpense(this.state);
  }

  selectCurrecy() {
    const { currency, exchangeRates } = this.state;
    return (
      <label htmlFor="MD">
        Moeda:
        <select data-testid="currency-input" id="MD" name="currency" value={ currency }>
          {Object.keys(exchangeRates).filter((key) => key !== 'USDT')
            .map((moeda) => (
              <option
                data-testid={ moeda }
                key={ moeda }
                value={ moeda }
              >
                { moeda }
              </option>
            ))}
        </select>
      </label>
    );
  }

  render() {
    const {
      value,
      description,
      method,
      tag,
    } = this.state;
    return (
      <form onChange={ this.addValueForms }>
        <label htmlFor="despesa">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="despesa"
            name="value"
            value={ value }
          />
        </label>
        <label htmlFor="descrition">
          Descrição:
          <input
            type="text"
            id="descrition"
            data-testid="description-input"
            name="description"
            value={ description }
          />
        </label>
        {this.selectCurrecy()}
        <label htmlFor="pag">
          Método de Pagamento:
          <select data-testid="method-input" id="pag" name="method" value={ method }>
            {Pagamento.map((metodo) => (
              <option key={ metodo } value={ metodo }>{ metodo }</option>
            ))}
          </select>
        </label>
        <label htmlFor="cat">
          Método de Pagamento:
          <select data-testid="tag-input" id="cat" name="tag" value={ tag }>
            {categorias.map((categoria) => (
              <option key={ categoria }>{ categoria }</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={ this.getApi }>Adicionar despesa</button>
      </form>
    );
  }
}

forms.propTypes = {
  keyAddDespesa: PropsTypes.func.isRequired,
  keyAddExpense: PropsTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  keyAddExpense: (expense) => dispatch(addExpense(expense)),
  keyAddDespesa: (despesa) => dispatch(addDespesa(despesa)),
});

export default connect(null, mapDispatchToProps)(forms);
