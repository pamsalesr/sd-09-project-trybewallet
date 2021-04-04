import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import listCurrencies from '../services/serviceAPI';
import { mapStateToProps, mapDispatchToProps } from '../services/propsReduxForm';

class FormAddWallet extends React.Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.updateCurrencies = this.updateCurrencies.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.updateEdit = this.updateEdit.bind(this);

    this.IN_STATE = { value: '', description: '', currency: '', method: '', tag: '' };

    this.state = {
      editingState: false,
      expenses: { value: '', description: '', currency: '', method: '', tag: '' },
    };
  }

  componentDidMount() {
    this.updateCurrencies();
  }

  async updateCurrencies() {
    const { setCurrencies } = this.props;
    const request = await listCurrencies();
    delete request.USDT;
    setCurrencies(Object.keys(request).reduce((finalArray, currentValue) => {
      finalArray.push(currentValue);
      return finalArray;
    }, []));
  }

  updateState(event) {
    const { name, value } = event.target;
    this.setState(
      (state) => ({ ...state, expenses: { ...state.expenses, [name]: value } }),
    );
  }

  updateEdit() {
    const { listExpenses, idEdition } = this.props;
    const expenseEdit = { ...listExpenses.find((expense) => expense.id === idEdition) };
    this.setState(
      (state) => ({ ...state, editingState: true, expenses: expenseEdit }),
    );
  }

  handleButton() {
    const { expenses } = this.state;
    const { value, currency } = expenses;
    if (value === '' || currency === '') {
      alert('VALOR ou MOEDA não inseridos. Verifique!!!');
    } else {
      const { saveData, nextId } = this.props;
      saveData({ id: nextId, ...expenses });
      this.setState((state) => ({ ...state, expenses: this.IN_STATE }));
    }
  }

  handleButtonEdit() {
    const { expenses } = this.state;
    const { value, currency } = expenses;
    const { saveDataEdited, edition, idEdition } = this.props;
    if (value === '' || currency === '') {
      alert('VALOR ou MOEDA não inseridos. Verifique!!!');
    } else {
      saveDataEdited(idEdition, expenses);
      edition(false);
      this.setState(
        (state) => ({ ...state, editingState: false, expenses: this.IN_STATE }),
      );
    }
  }

  renderValueInput() {
    const { expenses } = this.state;
    const { value } = expenses;
    return (
      <label htmlFor="valueInput">
        Valor:
        <input
          value={ value }
          id="valueInput"
          type="number"
          data-testid="value-input"
          name="value"
          onChange={ this.updateState }
        />
      </label>
    );
  }

  renderCurrencyInput() {
    const { expenses } = this.state;
    const { currency } = expenses;
    const { currencies } = this.props;
    return (
      <label htmlFor="currencyInput">
        Moeda:
        <select
          value={ currency }
          id="currencyInput"
          data-testid="currency-input"
          name="currency"
          onChange={ this.updateState }
        >
          <option> </option>
          { currencies.map((item) => (
            <option data-testid={ item } key={ item } value={ item }>{item}</option>)) }
        </select>
      </label>
    );
  }

  renderMethodInput() {
    const { expenses } = this.state;
    const { method } = expenses;
    return (
      <label htmlFor="methodInput">
        Método de pagamento:
        <select
          value={ method }
          id="methodInput"
          data-testid="method-input"
          name="method"
          onChange={ this.updateState }
        >
          <option> </option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagInput() {
    const { expenses } = this.state;
    const { tag } = expenses;
    return (
      <label htmlFor="tagInput">
        Tag:
        <select
          value={ tag }
          id="tagInput"
          data-testid="tag-input"
          name="tag"
          onChange={ this.updateState }
        >
          <option> </option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  renderDescriptionInput() {
    const { expenses } = this.state;
    const { description } = expenses;
    return (
      <label htmlFor="descriptionInput">
        Descrição:
        <input
          value={ description }
          id="descriptionInput"
          type="text"
          data-testid="description-input"
          name="description"
          onChange={ this.updateState }
        />
      </label>
    );
  }

  renderForm() {
    return (
      <div>
        <form className="form-wallet">
          { this.renderValueInput() }
          { this.renderCurrencyInput() }
          { this.renderMethodInput() }
          { this.renderTagInput() }
          { this.renderDescriptionInput() }
          <button
            onClick={ this.handleButton }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }

  renderEdit() {
    const { statusEdition } = this.props;
    const { editingState } = this.state;
    if (statusEdition && !editingState) this.updateEdit();
    return (
      <div>
        <form className="form-edit">
          { this.renderValueInput() }
          { this.renderCurrencyInput() }
          { this.renderMethodInput() }
          { this.renderTagInput() }
          { this.renderDescriptionInput() }
          <button
            type="button"
            onClick={ () => this.handleButtonEdit() }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { statusEdition } = this.props;
    return (statusEdition) ? this.renderEdit() : this.renderForm();
  }
}

FormAddWallet.propTypes = {
  nextId: PropTypes.number.isRequired,
  statusEdition: PropTypes.bool.isRequired,
  idEdition: PropTypes.string.isRequired,
  saveData: PropTypes.func.isRequired,
  listExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  saveDataEdited: PropTypes.func.isRequired,
  edition: PropTypes.func.isRequired,
  setCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddWallet);
