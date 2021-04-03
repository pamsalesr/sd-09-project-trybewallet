import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.getCurrency = this.getCurrency.bind(this);
  }

  async componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const { dispatchCurrencyToProps } = this.props;
    await dispatchCurrencyToProps();
  }

  render() {
    const { email, currencyList } = this.props;
    return (
      <div>
        <header>
          <div className="header-email">
            <p data-testid="email-field">
              Email:
              { email }
            </p>
          </div>
          <div className="header-total">
            <p data-testid="total-field">
              0
              <span data-testid="header-currency-field">BRL</span>
            </p>
          </div>
        </header>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input type="text" data-testid="value-input" />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select name="currency" data-testid="currency-input">
              <option>Selecione</option>
              { Object.keys(currencyList)
                .filter((currency) => currency !== 'USDT')
                .map((currency) => (
                  <option key={ currency } value={ currency } data-testid={ currency }>
                    { currency }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input type="text" data-testid="description-input" />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencyList: state.wallet.currencyList,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencyToProps: () => dispatch(getCurrency()),
});

Wallet.defaultProps = {
  email: 'alguem@email.com',
  currencyList: { '': '' },
};

Wallet.propTypes = {
  email: PropTypes.string,
  currencyList: PropTypes.objectOf(String),
  dispatchCurrencyToProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
