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
    const { coins } = this.props;
    return (
      <div>
        <Header />
        {coins && <ExpenseForm />}
      </div>
    );
  }
}

Wallet.propTypes = {
  propGetCurrentFetch: PropTypes.func.isRequired,
  coins: PropTypes.string.isRequired,
};

const mapStateToProps = ({ currentPriceReducer: { data } }) => ({
  coins: data,
});

// Implementar fetch e chamar a action em dispatch
const mapDispatchToProps = (dispatch) => ({
  propGetCurrentFetch: () => dispatch(currentPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
