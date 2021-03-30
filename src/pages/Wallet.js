import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expenditure from '../components/Expenditure';
import Expenses from '../components/Expenses';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    const { edit } = this.props;
    return (
      <div>
        <Header />
        <Expenditure key={ edit } />
        <Expenses />
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  edit: wallet.edit,
});

Wallet.propTypes = {
  edit: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
