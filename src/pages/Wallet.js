import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import img from '../logoTrybe.png';
import { Header, EmailContainer, TotalContainer, SectionInputs,
  Button,
} from './WalletStyled';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.header = this.header.bind(this);
    this.section = this.section.bind(this);
  }

  header() {
    const { userEmail } = this.props;
    return (
      <Header>
        <img src={ img } alt="Logo da Trybe" />

        <EmailContainer>
          <span>Email:</span>
          <span data-testid="email-field">{ userEmail }</span>
        </EmailContainer>

        <TotalContainer>
          <span>Despesa Total:</span>
          <span data-testid="total-field">R$ 0,00</span>
          <span data-testid="header-currency-field">BRL</span>
        </TotalContainer>
      </Header>
    );
  }

  section() {
    const moedas = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
      'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <>
        <label htmlFor="value">
          Valor:
          <input data-testid="value-input" id="value" type="number" />
        </label>

        <label htmlFor="expense">
          Despesa:
          <input data-testid="description-input" id="expense" type="text" />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select data-testid="currency-input" id="currency">
            {moedas.map((moeda, index) => (
              <option data-testid={ moeda } key={ index }>{ moeda }</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de Pgto:
          <select data-testid="method-input" id="method">
            {methods.map((method, index) => (
              <option key={ index }>{ method }</option>
            ))}
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select data-testid="tag-input" id="tag">
            {tags.map((tag, index) => (
              <option key={ index }>{ tag }</option>
            ))}
          </select>
        </label>
      </>
    );
  }

  render() {
    return (
      <>
        { this.header() }
        <SectionInputs>
          { this.section() }
          <Button
            type="button"
            onClick={ () => {} }
          >
            Adicionar despesa
          </Button>
        </SectionInputs>
      </>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
