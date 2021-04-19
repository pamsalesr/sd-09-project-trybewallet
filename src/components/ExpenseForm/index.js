import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpense, fetchCurrencies, editExpense, getHelper } from '../../actions';
import InputExpense from './InputExpense';

const INITIAL_STATE = {
  value: 0,
  currency: 'CAD',
  description: '',
  method: 'money',
  tag: 'food',
};
const METHOD_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAG_OPTIONS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
      editMode: false,
      editMethod: this.editExpense,
    };
    this.handleInput = this.handleInput.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.setEditedExpense = this.setEditedExpense.bind(this);
    this.handleHelper = this.handleHelper.bind(this);
  }

  componentDidMount() {
    this.handleHelper();
  }

  setEditedExpense() {
    const { editExpense: editExpenseAction } = this.props;
    editExpenseAction(this.state);
    this.setState({
      editMode: false,
      ...INITIAL_STATE,
    });
  }

  handleHelper() {
    const { sendHelper } = this.props;
    sendHelper(this.editExpense);
    this.setState({
      editMethod: this.editExpense,
    });
  }

  editExpense({ thisExpense }) {
    const { id, value, currency, description, method, tag } = thisExpense;
    this.setState({
      id,
      editMode: true,
      value,
      currency,
      description,
      method,
      tag,
    });
  }

  addThisExpense() {
    const { fetchExpense: dispatchExpense } = this.props;
    const { value, currency, description, method, tag } = this.state;
    dispatchExpense({
      expense: { value, currency, description, method, tag },
    });
    this.setState(INITIAL_STATE);
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  renderOptions(name, options) {
    const { [name]: nameState } = this.state;
    return (
      <select
        onChange={ (e) => this.handleInput(e) }
        name={ name }
        value={ nameState }
        data-testid={ `${name}-input` }
        id={ name }
      >
        {options.map((option, index) => (
          <option key={ index } value={ option }>
            {option}
          </option>
        ))}
      </select>
    );
  }

  renderCurrencyOptions() {
    const { currencies } = this.props;
    const options = currencies.map(({ codein, code: currency }, index) => {
      if (currency !== 'USDT' && codein !== 'BRLT') {
        return (
          <option data-testid={ currency } key={ index } value={ currency }>
            {currency}
          </option>
        );
      }
      return null;
    });
    return options;
  }

  renderSelectCurrencies() {
    const { currency } = this.state;
    return (
      <select
        onChange={ (e) => this.handleInput(e) }
        data-testid="currency-input"
        value={ currency }
        name="currency"
        id="currency"
      >
        {this.renderCurrencyOptions()}
      </select>
    );
  }

  renderInput(name) {
    const { [name]: nameState } = this.state;
    return (
      <InputExpense name={ name } value={ nameState } onChange={ this.handleInput } />
    );
  }

  renderButtonAddExpense() {
    return (
      <button onClick={ () => this.addThisExpense() } type="button">
        Adicionar despesa
      </button>
    );
  }

  renderEditExpenseButton() {
    return (
      <button onClick={ () => this.setEditedExpense() } type="button">
        Editar despesa
      </button>
    );
  }

  render() {
    const { editMode } = this.state;
    const { isFetching } = this.props;
    return (
      <div>
        {this.renderInput('value')}
        {this.renderInput('description')}
        {!isFetching && this.renderSelectCurrencies()}
        {this.renderOptions('method', METHOD_OPTIONS)}
        {this.renderOptions('tag', TAG_OPTIONS)}
        {editMode
          ? this.renderEditExpenseButton()
          : this.renderButtonAddExpense()}
        <span>
          <br />
          Despesas:&nbsp;
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = {
  fetchExpense,
  fetchCurrencies,
  editExpense,
  sendHelper: getHelper,
};

ExpenseForm.propTypes = {
  isFetching: PropTypes.bool,
  currencies: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
  fetchExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  sendHelper: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  isFetching: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
