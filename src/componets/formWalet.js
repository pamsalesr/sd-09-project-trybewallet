import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagamento, categorias } from './arrays';
import { addExpense, addDespesa, addExchangeRates, addFalse,
  addState, addId, addStateForms, addNewExpenses } from '../actions';

class forms extends React.Component {
  constructor() {
    super();
    this.getApi = this.getApi.bind(this);
    this.filterAks = this.filterAks.bind(this);
    this.addValueForms = this.addValueForms.bind(this);
    this.selectCurrecy = this.selectCurrecy.bind(this);
    this.stateForms = this.stateForms.bind(this);
    this.changeButton = this.changeButton.bind(this);
  }

  componentDidMount() {
    const { keyAddState } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((obj) => {
        keyAddState(obj);
      });
  }

  getApi() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((obj) => {
        const { keyAddExpense, keyAddDespesa, Rates, idAdd, keyStateForms } = this.props;
        keyAddExpense({ ...Rates, id: Rates.id + 1 });
        idAdd();
        keyAddDespesa(this.filterAks(obj));
        const clearState = {
          value: '',
          description: '',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Alimentação',
        };
        keyStateForms(clearState);
      });
  }

  filterAks(obj) {
    const { Rates } = this.props;
    return obj[Rates.currency].ask * Rates.value;
  }

  addValueForms() {
    const {
      keyStateForms,
      valueFalse,
      despesa,
      Rates,
      newExpense,
      keyAddDespesa,
    } = this.props;
    const beforeIndex = despesa.filter((obj) => obj.id < Rates.id);
    const afterIndex = despesa.filter((obj) => obj.id > Rates.id);
    const newExtends = [...beforeIndex, Rates, ...afterIndex];
    newExpense(newExtends);
    keyAddDespesa(this.filterAks(Rates.exchangeRates));
    const obj = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    keyStateForms(obj);
    valueFalse();
  }

  stateForms({ target }) {
    const { onChagle } = this.props;
    onChagle(target.value, target.name);
  }

  selectCurrecy() {
    const { Rates } = this.props;
    return (
      <label htmlFor="MD">
        Moeda:
        <select
          data-testid="currency-input"
          id="MD"
          name="currency"
          value={ Rates.currency }
          onChange={ this.stateForms }
        >
          {Object.keys(Rates.exchangeRates).filter((key) => key !== 'USDT')
            .map((moeda) => (
              <option
                data-testid={ moeda }
                key={ moeda }
              >
                { moeda }
              </option>
            ))}
        </select>
      </label>
    );
  }

  changeButton() {
    const { buttonChange } = this.props;
    if (buttonChange === 'false') {
      return <button type="button" onClick={ this.getApi }>Adicionar Despesa</button>;
    }
    return (
      <div>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ this.addValueForms }
        >
          Editar Despesa
        </button>
      </div>
    );
  }

  render() {
    const { Rates } = this.props;
    return (
      <form onChange={ this.stateForms }>
        <label htmlFor="despesa">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="despesa"
            name="value"
            value={ Rates.value }
          />
        </label>
        <label htmlFor="descrition">
          Descrição:
          <input
            type="text"
            id="descrition"
            data-testid="description-input"
            name="description"
            value={ Rates.description }
          />
        </label>
        {this.selectCurrecy()}
        <label htmlFor="pag">
          Método de Pagamento:
          <select
            data-testid="method-input"
            id="pag"
            name="method"
            value={ Rates.method }
          >
            {Pagamento.map((metodo) => (
              <option key={ metodo } value={ metodo }>{ metodo }</option>
            ))}
          </select>
        </label>
        <label htmlFor="cat">
          Categoria:
          <select data-testid="tag-input" id="cat" name="tag" value={ Rates.tag }>
            {categorias.map((categoria) => (
              <option key={ categoria }>{ categoria }</option>
            ))}
          </select>
        </label>
        {this.changeButton()}
      </form>
    );
  }
}

forms.propTypes = {
  keyAddDespesa: PropsTypes.func.isRequired,
  keyAddExpense: PropsTypes.func.isRequired,
  keyAddState: PropsTypes.func.isRequired,
  valueFalse: PropsTypes.func.isRequired,
  idAdd: PropsTypes.func.isRequired,
  keyStateForms: PropsTypes.func.isRequired,
  onChagle: PropsTypes.func.isRequired,
  newExpense: PropsTypes.func.isRequired,
  buttonChange: PropsTypes.string.isRequired,
  Rates: PropsTypes.objectOf(PropsTypes.objectOf(PropsTypes.string)).isRequired,
  despesa: PropsTypes.objectOf(PropsTypes.string).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  keyAddExpense: (expense) => dispatch(addExpense(expense)),
  keyAddDespesa: (despesa) => dispatch(addDespesa(despesa)),
  keyAddState: (state) => dispatch(addExchangeRates(state)),
  valueFalse: () => dispatch(addFalse()),
  idAdd: () => dispatch(addId()),
  keyStateForms: (obj) => dispatch(addStateForms(obj)),
  onChagle: (name, value) => dispatch(addState(name, value)),
  newExpense: (newExpense) => dispatch(addNewExpenses(newExpense)),
});

const mapStateToProps = (state) => ({
  buttonChange: state.stateForms.edit,
  Rates: state.stateForms.forms,
  despesa: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(forms);
