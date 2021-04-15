import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addSpending, editSpending, saveCurrencies } from '../actions';

const thisInitialState = {
  currency: 'USD',
  method: 'Dinheiro',
  description: '',
  tag: 'Alimentação',
  value: '0',
};

class Spending extends React.Component {
  constructor(props) {
    super(props);
    const { initialState } = this.props;
    this.state = {
      input: {
        ...initialState,
      },
    };
  }

  componentDidMount() {
    const { saveCurrenciesDispatch, currenciesFetched } = this.props;
    if (!currenciesFetched) {
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
        .then((data) => {
          saveCurrenciesDispatch(Object.keys(data));
        });
    }
  }

  onSelect(event) {
    const { target } = event;
    const { input } = this.state;
    this.setState({
      input: {
        ...input,
        [target.name]: target.options[target.selectedIndex].value,
      },
    });
  }

  onChange(event) {
    const { target } = event;
    const { input } = this.state;
    this.setState({
      input: {
        ...input,
        [target.name]: target.value,
      },
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { dispatchSpending, dispatchEditing, editing } = this.props;
    const { input } = this.state;
    if (editing < 0) dispatchSpending(input);
    if (editing >= 0) dispatchEditing(input, editing);
    this.setState({
      input: {
        currency: 'USD',
        method: 'Dinheiro',
        description: '',
        tag: '',
        value: '0',
      },
    });
  }

  arrayToOpts(arr) {
    return (arr.map((opt, index) => (
      <option key={ index } value={ opt } name={ opt } data-testid={ opt }>
        { opt }
      </option>
    )));
  }

  currencyOptions() {
    const { input: { currency } } = this.state;
    const { currencies } = this.props;
    return (
      <select
        name="currency"
        id="currency"
        data-testid="currency-input"
        onChange={ this.onSelect.bind(this) }
        value={ currency }
      >
        {
          this.arrayToOpts(currencies.filter((key) => (key !== 'USDT')))
        }
      </select>
    );
  }

  paymentOptions() {
    const { input: { method } } = this.state;
    return (
      <select
        name="method"
        id="method"
        data-testid="method-input"
        onChange={ this.onSelect.bind(this) }
        value={ method }
      >
        {
          this.arrayToOpts(['Dinheiro', 'Cartão de crédito', 'Cartão de débito'])
        }
      </select>
    );
  }

  tagOptions() {
    const { input: { tag } } = this.state;
    return (
      <select
        name="tag"
        id="tag"
        data-testid="tag-input"
        onChange={ this.onSelect.bind(this) }
        value={ tag }
      >
        {
          this.arrayToOpts(['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'])
        }
      </select>
    );
  }

  renderSelf() {
    const { input: { value, description } } = this.state;
    const { fetching, editing } = this.props;
    const backgroundColor = (editing >= 0) ? 'lime' : 'cyan';
    return (
      <div style={ { backgroundColor } }>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <label htmlFor="value">
            Valor gasto
            <input
              name="value"
              data-testid="value-input"
              type="number"
              id="value"
              step="0.01"
              min="0"
              required
              onChange={ this.onChange.bind(this) }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descr ição
            <input
              name="description"
              data-testid="description-input"
              type="text"
              id="description"
              onChange={ this.onChange.bind(this) }
              value={ description }
            />
          </label>
          { this.currencyOptions.bind(this).call() }
          <label htmlFor="method">
            Méto do de pagamento
            { this.paymentOptions.bind(this).call() }
          </label>
          <label htmlFor="tag">
            Categoria
            { this.tagOptions.bind(this).call() }
          </label>
          <button type="submit" disabled={ fetching }>
            { (editing >= 0) ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (loading) ? <p>Api is loading</p>
      : this.renderSelf.bind(this).call();
  }
}

Spending.defaultProps = {

};

const mapDispatchToProps = (dispatch) => ({
  dispatchSpending: (input) => {
    dispatch(addSpending(dispatch, input));
  },
  dispatchEditing: (input, editing) => {
    console.log('Editing', input);
    dispatch(editSpending(input, editing));
  },
  saveCurrenciesDispatch: (currencies) => dispatch(saveCurrencies(currencies)),
});

const mapStateToProps = (state) => ({
  fetching: state.wallet.fetching,
  currenciesFetched: state.wallet.currenciesFetched,
  editing: state.wallet.editing,
  key: state.wallet.editing,
  currencies: state.wallet.currencies,
  initialState: (state.wallet.editing >= 0)
    ? state.wallet.expenses.find((expense) => expense.id === state.wallet.editing)
    : thisInitialState,
});

Spending.propTypes = {
  dispatchSpending: PropTypes.func.isRequired,
  dispatchEditing: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  currenciesFetched: PropTypes.bool.isRequired,
  editing: PropTypes.number.isRequired,
  initialState: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveCurrenciesDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Spending);
