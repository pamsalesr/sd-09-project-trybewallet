import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import AddSpending from '../components/AddSpending';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <AddSpending />
      </>
    );
  }
}

const mapStateToProps = () => ({
});

Wallet.propTypes = {
};

export default connect(mapStateToProps)(Wallet);
