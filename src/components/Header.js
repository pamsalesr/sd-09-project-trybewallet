import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { MdMonetizationOn } from 'react-icons/md';

import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <MdMonetizationOn size={ 50 } />
        <div className="user">
          <div>
            Email:
            <span data-testid="email-field">yoda@starwars.com</span>
          </div>
          <div>
            Dispesa Total:
            <span data-testid="total-field">R$ 50,00 </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

/* const mapDispatchToProps = (state) => {

}; */

/* Header.propTypes = {
  wallet:
}; */

export default Header;
// export default connect(mapStateToProps)(Header);
