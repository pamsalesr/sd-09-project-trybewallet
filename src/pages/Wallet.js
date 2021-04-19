import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../component/Header';
import Form from '../component/Form';
import Table from '../component/Table';

class Wallet extends React.Component {
  render() {
    // const { consultEditButton } = this.props;
    return (
      <>
        <div>
          <Header />
        </div>
        <div>
          <Form />
        </div>
        <div>
          <Table />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  consultEditButton: wallet.editButton,
});

// Wallet.propsTypes = {
//   consultEditButton: PropTypes.any,
// }.isRequired;

export default connect(mapStateToProps)(Wallet);
