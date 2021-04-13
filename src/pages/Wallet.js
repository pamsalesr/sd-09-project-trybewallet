import React from 'react';
import { string } from 'prop-types';
import HeaderComponent from '../components/HeaderComponent';
import TableComponent from '../components/TableComponent';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <TableComponent />
      </div>);
  }
}

Wallet.propTypes = {
  email: string,
}.isRequired;

export default Wallet;
