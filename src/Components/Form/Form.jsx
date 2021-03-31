import React, { Component } from 'react';
import { arrayOf, string, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import InputBox from '../InputBox';
import Dropdown from '../Dropdown';
import {
  getCurrenciesList,
  addExpense as addExpenseAction,
  receiveExpenseEdition } from '../../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payMethods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      categories: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      method: props.method,
      formControl: { ...props.formControl },
    };
    this.updateFormControl = this.updateFormControl.bind(this);
    this.sendExpenseForm = this.sendExpenseForm.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  componentDidUpdate({ method: prevMethod }) {
    const { method: currMethod, formControl } = this.props;
    // const { formControl: currForm } = this.state;
    // console.log(Object.values(prevForm).every((field) => field === ''));
    // const formWasCleared = (
    //   Object.values(prevForm).every((field) => field === '')
    //   && Object.values(currForm).every((field) => field !== '')
    // );
    if (currMethod !== prevMethod) {
      this.updateFormMethodAndData(currMethod, formControl);
    }
  }

  updateFormMethodAndData(method, formControl) {
    this.setState({ method, formControl });
  }

  updateFormControl(field, value) {
    this.setState(({ formControl }) => (
      { formControl: {
        ...formControl,
        [field]: value,
      } }
    ));
  }

  sendExpenseForm(e) {
    e.preventDefault();
    const { method, formControl } = this.state;
    if (method === 'edition') {
      const { sendEdition } = this.props;
      sendEdition(formControl);
    } else {
      const { addExpense } = this.props;
      addExpense(formControl);
    }
  }

  renderValueinput() {
    const { formControl: { value } } = this.state;
    return (
      <InputBox
        id="value-input"
        label="Valor"
        type="text"
        onUpdateForm={ this.updateFormControl }
        value={ value }
      />

    );
  }

  renderCurrencyInput() {
    const { formControl: { currency } } = this.state;
    const { currencies } = this.props;
    return (
      <Dropdown
        id="currency-input"
        options={ currencies }
        label="Moeda"
        onUpdateForm={ this.updateFormControl }
        value={ currency }
      />
    );
  }

  renderDescriptionInput() {
    const { formControl: { description } } = this.state;
    return (
      <InputBox
        id="description-input"
        label="Descrição"
        type="text"
        onUpdateForm={ this.updateFormControl }
        value={ description }
      />
    );
  }

  renderPayMethodInput() {
    const { payMethods, formControl: { method } } = this.state;
    return (
      <Dropdown
        id="method-input"
        options={ payMethods }
        label="Método de pagamento"
        onUpdateForm={ this.updateFormControl }
        value={ method }
      />
    );
  }

  renderCategoriesInput() {
    const { categories, formControl: { tag } } = this.state;
    return (
      <Dropdown
        id="tag-input"
        options={ categories }
        label="Categoria"
        onUpdateForm={ this.updateFormControl }
        value={ tag }
      />
    );
  }

  render() {
    const { method } = this.state;

    return (
      <form>
        {this.renderValueinput()}
        {this.renderCurrencyInput()}
        {this.renderDescriptionInput()}
        {this.renderPayMethodInput()}
        {this.renderCategoriesInput()}
        <button type="submit" onClick={ this.sendExpenseForm }>
          {
            method === 'creation'
              ? 'Adicionar despesa'
              : 'Editar despesa'
          }
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  method: state.formControl.method,
  formControl: state.formControl.formData,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesList()),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
  sendEdition: (expense) => dispatch(receiveExpenseEdition(expense)),
});

Form.propTypes = {
  currencies: arrayOf(string).isRequired,
  getCurrencies: func.isRequired,
  addExpense: func.isRequired,
  method: string.isRequired,
  formControl: shape({}).isRequired,
  sendEdition: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
