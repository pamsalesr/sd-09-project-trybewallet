import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import Form from '../component/Form';
import Table from '../component/Table';

class Wallet extends React.Component {
  render() {
    const { editButton } = this.props;
    return (
      <>
        <div>
          <Header />
        </div>
        <div>
          <form>
            <Form key={ editButton } />
          </form>
        </div>
        <div>
          <Table />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  editButton: wallet.editButton,
});

Wallet.propTypes = {
  editButton: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
