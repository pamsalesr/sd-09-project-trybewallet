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
      statusEdition: false,
      currencies: {},
      expenses: { value: '', description: '', currency: '', method: '', tag: '' },
    };
  }

  componentDidMount() {
    this.updateCurrencies();
  }

  async updateCurrencies() {
    const request = await listCurrencies();
    delete request.USDT;
    this.setState((state) => ({ ...state, currencies: request }));
  }

  updateState(event) {
    const { name, value } = event.target;
    this.setState(
      (state) => ({ ...state, expenses: { ...state.expenses, [name]: value } }),
    );
  }

  updateEdit(id) {
    const { listExpenses } = this.props;
    const expenseEdit = listExpenses.find((expense) => expense.id === id);
    this.setState(
      (state) => ({ ...state, statusEdition: true, expenses: { ...expenseEdit } }),
    );
  }

  handleButton() {
    const { expenses } = this.state;
    const { saveData, nextId } = this.props;
    saveData({ id: nextId, ...expenses });
    this.setState((state) => ({ ...state, expenses: this.IN_STATE }));
  }

  handleButtonEdit(id) {
    const { saveDataEdited, handleEdit } = this.props;
    const { expenses } = this.state;
    saveDataEdited(id, expenses);
    handleEdit(false);
    this.setState(
      (state) => ({ ...state, statusEdition: false, expenses: this.IN_STATE }),
    );
  }

  createOption(key) {
    const { currencies } = this.state;
    return (
      <option
        key={ currencies[key].name }
        data-testid={ currencies[key].code }
        value={ currencies[key].code }
      >
        {currencies[key].code}
      </option>
    );
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
    const { currencies, expenses } = this.state;
    const { currency } = expenses;
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
          { Object.keys(currencies).map((key) => this.createOption(key)) }
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

  renderEdit(id) {
    const { statusEdition } = this.state;
    if (!statusEdition) this.updateEdit(id);
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
            onClick={ () => this.handleButtonEdit(id) }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { statusEdit, idEdit } = this.props;
    return (statusEdit) ? this.renderEdit(idEdit) : this.renderForm();
  }
}

FormAddWallet.propTypes = {
  nextId: PropTypes.string.isRequired,
  saveData: PropTypes.func.isRequired,
  statusEdit: PropTypes.bool.isRequired,
  listExpenses: PropTypes.func.isRequired,
  idEdit: PropTypes.string.isRequired,
  saveDataEdited: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAddWallet);
