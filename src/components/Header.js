import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import img from '../logoTrybe.png';
import { Header, EmailContainer, TotalContainer } from './WalletStyled';

class WalletHeader extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <Header>
        <Link to="/">
          <img src={ img } alt="Logo da Trybe" />
        </Link>

        <EmailContainer>
          <span>Email:</span>
          <span data-testid="email-field">{ userEmail }</span>
        </EmailContainer>

        <TotalContainer>
          <span>Despesa Total:</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </TotalContainer>
      </Header>
    );
  }
}

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

// const mapStateToProps = (state) => ({
//   userEmail: state.user.email,
// });

const mapStateToProps = ({ user: { email } }) => ({
  userEmail: email,
});

export default connect(mapStateToProps)(WalletHeader);
