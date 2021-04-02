import React from 'react';
import { Header, Form, THead, TBody } from '../components';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <table>
          <THead />
          <TBody />
        </table>
      </div>
    );
  }
}

export default Wallet;
