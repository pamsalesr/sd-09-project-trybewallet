import React from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import { Header, Form, TableHead, TableBody } from '../components';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    const { edit } = this.props;
    return (
      <div className="wallet">
        <Header />
        <Form key={ edit } />
        <table className="wallet-table">
          <TableHead />
          <TableBody />
        </table>
      </div>
    );
  }
}

Wallet.propTypes = { edit: bool }.isRequired;

const mapStateToProps = ({ wallet }) => ({ edit: wallet.edit });

export default connect(mapStateToProps)(Wallet);
