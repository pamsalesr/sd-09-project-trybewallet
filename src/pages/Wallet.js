import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import FormsWalet from '../componets/formWalet';
import Table from '../componets/table';

class Wallet extends React.Component {
  render() {
    const { email, despesa } = this.props;
    let num = '';
    if (despesa > 0) num = parseFloat(despesa).toFixed(2);
    else num = 0;
    return (
      <div>
        <header>
          <h6 data-testid="email-field">{email}</h6>
          <p>Dispesa total: R$ </p>
          <p data-testid="total-field">{num}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <FormsWalet />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropsTypes.string.isRequired,
  despesa: PropsTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesa: state.user.despesa,
});

export default connect(mapStateToProps)(Wallet);
