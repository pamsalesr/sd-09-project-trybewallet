import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addSpending } from '../actions';

class Spending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyAPI: null,
      loading: true,
      input: {
        currency: 'USD',
        method: 'Dinheiro',
        description: '',
        tag: '',
        value: '0',
      },
    };
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          currencyAPI: data,
          loading: false,
        });
      });
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
    const { dispatchSpending } = this.props;
    const { input } = this.state;
    dispatchSpending({
      input,
    });
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
    const { currencyAPI, input: { currency } } = this.state;
    return (
      <select
        name="currency"
        id="currency"
        data-testid="currency-input"
        onChange={ this.onSelect.bind(this) }
        value={ currency }
      >
        {
          this.arrayToOpts(Object.keys(currencyAPI).filter((key) => (key !== 'USDT')))
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
    return (
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
          Descrição
          <input
            name="description"
            data-testid="description-input"
            type="text"
            id="description"
            onChange={ this.onChange.bind(this) }
            value={ description }
          />
        </label>
        { this.currencyOptions.bind(this)() }
        <label htmlFor="method">
          Método de pagamento
          { this.paymentOptions.bind(this)() }
        </label>
        <label htmlFor="tag">
          Categoria
          { this.tagOptions.bind(this)() }
        </label>
        <button data-testid="" type="submit">Adicionar despesa</button>
      </form>
    );
  }

  render() {
    const { loading } = this.state;
    return ((loading) ? <p>Api is loading</p>
      : this.renderSelf.bind(this)());
  }
}

Spending.defaultProps = {

};

const mapDispatchToProps = (dispatch) => ({
  dispatchSpending: (input) => dispatch(addSpending(dispatch, input)),
});

Spending.propTypes = {
  dispatchSpending: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Spending);
