import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendCurrencies } from '../actions';
import DynamicSelect from './DynamicSelect';
import fetchCurrenciesApi from '../services/fetchCurrenciesApi';

const paymentMethods = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
const expenseCategories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { sendCurrenciesToRedux } = this.props;
    const currencies = await fetchCurrenciesApi();
    sendCurrenciesToRedux(currencies);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(){
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              name="value"
              type="number"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              name="description"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <DynamicSelect
            textLabel="Moedas:"
            name="currency"
            options={ Object.keys(currencies) }
            handleChange={ this.handleChange }
          />
          <DynamicSelect
            textLabel="Método de Pagamento:"
            name="method"
            options={ paymentMethods }
            handleChange={ this.handleChange }
          />
          <DynamicSelect
            textLabel="Categoria da Despesa:"
            name="tag"
            options={ expenseCategories }
            handleChange={ this.handleChange }
          />
          <button
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  sendCurrenciesToRedux: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  sendCurrenciesToRedux: (currencies) => dispatch(sendCurrencies(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
