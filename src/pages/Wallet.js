import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import RegistrationForm from '../components/registrationForm';
import { fetchApi } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchToApi } = this.props;
    fetchToApi();
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
  fetchToApi: PropTypes.func.isRequired,
  isFethingStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  coins: state.coinBase,
  isFethingStatus: state.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToApi: () => dispatch(fetchApi()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
