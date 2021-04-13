import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Spending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedCurrency: null,
    };
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => this.setState({
        currencyAPI: data,
        loading: false,
      }));
  }

  currencySelector() {
    const { currencyAPI } = this.state;
    return (
      <>
        { Object.entries(currencyAPI).map(
          ([key], index) => (
            (key === 'USDT') ? null
              : (
                <option
                  key={ index }
                  value={ key }
                >
                  { key }
                </option>
              )
          ),
        ) }
      </>);
  }

  selectCurrency(event) {
    const { target } = event;
    this.setState({
      selectedCurrency: target.options[target.selectedIndex].value,
    });
  }

  paymentMethod() {
    return (
      ['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
        .map((opt, index) => (
          <option key={ index }>
            { opt }
          </option>
        ))
    );
  }

  render() {
    // const {} = this.props;
    const { loading, selectedCurrency } = this.state;
    console.log(selectedCurrency);
    return ((loading) ? <p>Api is loading</p>
      : (
        <form>
          <label htmlFor="value">
            Valor gasto
            <input
              name="value"
              data-testid="value-input"
              type="number"
            />
          </label>
          <label htmlFor="desc">
            Descrição
            <input
              name="desc"
              data-testid="description-input"
              type="text"
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              data-testid="currency-input"
              onChange={ this.selectCurrency.bind(this) }
            >
              { this.currencySelector.bind(this).call() }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select name="method" data-testid="method-input">
              { this.paymentMethod.bind(this).call() }
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <input
              name="tag"
              data-testid="tag-input"
            />
          </label>
        </form>
      )
    );
  }
}

Spending.propTypes = {

};

Spending.defaultProps = {

};

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(Spending);
