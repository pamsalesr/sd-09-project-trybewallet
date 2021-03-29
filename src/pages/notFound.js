import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class notFound extends Component {
  render() {
    return (
      <div>
        <h1>Página não encontrada!</h1>
        <Link exact to="/">
          ir para página inicial
        </Link>
      </div>
    );
  }
}

export default notFound;
