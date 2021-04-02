import React from 'react';
import { Link, Field } from 'react-router-dom';

class Wallet extends React.Component {
  render() {
    return (
      <header>
        <Link to="/carteira">Carteira</Link>
        <Field data-testid="total-field" />
      </header>
    );
  }
}

export default Wallet;
