import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import NewCostForm from '../components/newCostForm';
import { currenciesFetch } from '../actions/index';

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
            <NewCostForm />
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
  fetchToApi: () => dispatch(currenciesFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
