import React from 'react';
import { MdMonetizationOn } from 'react-icons/md';

import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <MdMonetizationOn size={ 50 } />
        <div className="user">
          <div data-testid="email-field">
            Email:
            <span>yoda@starwars.com</span>
          </div>
          <div data-testid="total-field">
            Dispesa Total:
            <span>R$ 50,00 BRL</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
