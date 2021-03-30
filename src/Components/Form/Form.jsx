import React, { Component } from 'react';
import { arrayOf, string, func } from 'prop-types';
import { connect } from 'react-redux';
import InputBox from '../InputBox';
import Dropdown from '../Dropdown';
import { getCurrenciesList, addExpense as addExpenseAction } from '../../actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.API_URL = 'https://economia.awesomeapi.com.br/json/all';
    this.state = {
      payMethods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      categories: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      formControl: {
        value: '',
        currency: '',
        description: '',
        method: '',
        tag: '',
      },
    };
    this.updateFormControl = this.updateFormControl.bind(this);
    this.sendExpenseForm = this.sendExpenseForm.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
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
    const { formControl } = this.state;
    const { addExpense } = this.props;
    addExpense(formControl);
    this.setState({ formControl: {
      value: '',
      currency: '',
      description: '',
      method: '',
      tag: '',
    } });
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
    return (
      <form>
        {this.renderValueinput()}
        {this.renderCurrencyInput()}
        {this.renderDescriptionInput()}
        {this.renderPayMethodInput()}
        {this.renderCategoriesInput()}
        <button type="submit" onClick={ this.sendExpenseForm }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrenciesList()),
  addExpense: (expense) => dispatch(addExpenseAction(expense)),
});

Form.propTypes = {
  currencies: arrayOf(string).isRequired,
  getCurrencies: func.isRequired,
  addExpense: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
