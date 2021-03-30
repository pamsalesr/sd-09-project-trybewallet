import React, { Component } from 'react';

class Header extends Component {
  // state = {  }
  render() {
    return (
      <div>
        <h4 data-testid="email-field">Email do usuario aqui</h4>
        <h5 data-testid="total-field">0</h5>
        <h6 data-testid="header-currency-field">BRL</h6>
      </div>
    );
  }
}

export default Header;
