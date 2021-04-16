import React from 'react';
import Header from '../component/Header';
import Form from '../component/Form';
import Table from '../component/Table';

class Wallet extends React.Component {
  render() {
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

export default Wallet;
