import React from 'react';
import Header from '../component/Hader';
import Form from '../component/Form';

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
      </>
    );
  }
}

export default Wallet;
