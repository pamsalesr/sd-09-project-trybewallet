import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrency } from '../actions'

class Wallet extends React.Component {
  constructor() {
    super();
    this.getCurrency = this.getCurrency.bind(this);
  }

  async componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const { teste } = this.props;
    await teste();
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
            <select name="currency" data-testid="currency-input" >
              <option>Selecione</option>
              { console.log(currencyList) }
              {/* { currencies.map((coin) => (<option key={ coin } value={ coin } data-testid={ coin }>{ coin }</option>)) } */}
              { Object.keys(currencyList).filter((currency) => currency !== 'USDT').map((currency) => (<option key={ currency } value={ currency } data-testid={ currency }>{ currency }</option>)) }
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
  teste: () => dispatch(getCurrency()),
});

Wallet.defaultProps = {
  email: 'alguem@email.com',
  currencyList: { '': '' },
};

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencyList: PropTypes.objectOf(String),
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
