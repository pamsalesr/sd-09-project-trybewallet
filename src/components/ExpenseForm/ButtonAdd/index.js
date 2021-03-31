import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentPrice, addSaveUserExpense } from '../../../actions';

class buttonAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { propaddSaveUserExpense, coins, currency } = this.props;
    currentPrice(); // Chama a api e atualiza valores na store.
    propaddSaveUserExpense(Object.entries(coins).find((coin) => {
      if (currency === coin[0]) {
        return (
          console.log(coin[1].ask)
        );
      }
      return '';
    }));
  }

  render() {
    const { name, title } = this.props;
    return (
      <div>
        <button
          name={ name }
          type="button"
          onClick={ this.handleClick }
        >
          {title}
        </button>
      </div>
    );
  }
}

buttonAdd.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  coins: PropTypes.arrayOf(PropTypes.object).isRequired,
  propaddSaveUserExpense: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { currencies, expenseDetails: { currency } } }) => ({
  coins: currencies,
  currency,
});

const mapDispatchToProps = (dispatch) => ({
  propaddSaveUserExpense: (obj) => dispatch(addSaveUserExpense(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(buttonAdd);
