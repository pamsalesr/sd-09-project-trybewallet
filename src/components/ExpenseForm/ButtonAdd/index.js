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
    const { propaddSaveUserExpense,
      coins,
      expenseDetails,
      propCurrentPrice,
    } = this.props;
    console.log(coins);
    propCurrentPrice(); // Chama a api e atualiza valores na store.
    if (expenseDetails) {
      propaddSaveUserExpense(Object.entries(coins)
        .find((coin) => expenseDetails.currency === coin[0]));
    }
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
  name: PropTypes.string,
  title: PropTypes.string,
  currency: PropTypes.string,
  coins: PropTypes.arrayOf(PropTypes.object),
  propaddSaveUserExpense: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies, expenseDetails } }) => {
  return ({
    coins: currencies,
    expenseDetails,
  });
};

const mapDispatchToProps = (dispatch) => ({
  propaddSaveUserExpense: (coin) => dispatch(addSaveUserExpense(coin)),
  propCurrentPrice: () => dispatch(currentPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(buttonAdd);
