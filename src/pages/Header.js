import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      moeda: 'BRL',
    };
  }

  render() {
    const { email, expenses } = this.props;
    const { moeda } = this.state;
    const value = expenses
      .reduce((acc, cur) => (acc + (Number(cur.value)
       * Number(cur.exchangeRates[cur.currency].ask))),
      0).toFixed(2);
    return (
      <header>
        <div data-testid="email-field">
          { email }
        </div>
        <section data-testid="total-field">
          { value }
        </section>
        <aside data-testid="header-currency-field">
          { moeda }
        </aside>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);

// cálculo das despesas baseado no código do Daniel MD, turma 8
