import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import { currentPrice } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { propGetCurrentFetch } = this.props;
    propGetCurrentFetch();
  }

  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
      </div>
    );
  }
}

Wallet.propTypes = {
  propGetCurrentFetch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  propGetCurrentFetch: () => dispatch(currentPrice()),
});

export default connect(null, mapDispatchToProps)(Wallet);
