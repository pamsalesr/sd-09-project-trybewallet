import React from 'react';
import { Link } from 'react-router-dom';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Link to="/carteira">Carteira</Link>
      </div>
    );
  }
}

export default Wallet;
