import React from 'react';
import { Link } from 'react-router-dom';

class Wallet extends React.Component {
  render() {
    return (
      <header>
        <Link to="/carteira">Carteira</Link>
      </header>
    );
  }
}

export default Wallet;
