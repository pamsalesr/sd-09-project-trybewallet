import React from 'react';
import { Header, Form, TableHead, TableBody } from '../components';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <table>
          <TableHead />
          <TableBody />
        </table>
      </div>
    );
  }
}

export default Wallet;
