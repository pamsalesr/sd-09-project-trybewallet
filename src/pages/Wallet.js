import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions/index';
import Header from '../components/header';
import RegistrationForm from '../components/registrationForm';

class Wallet extends React.Component {
  componentDidMount() {
    fetchApi();
  }

  render() {
    const { isFethingStatus } = this.props;
    return (
      isFethingStatus ? <p>Loading</p>
        : (
          <div>
            <Header />
            <RegistrationForm />
          </div>
        )
    );
  }
}

Wallet.propTypes = {
  // fetchCoinBase: PropTypes.func.isRequired,
  isFethingStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  coins: state.coinBase,
  isFethingStatus: state.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
