import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentPrice, addSaveUserExpense } from '../../../actions';
import '../ExpenseForm.css';

class buttonAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const { propaddSaveUserExpense,
      coins,
      expenseDetails,
      propCurrentPrice,
      idEdit,
      editing,
    } = this.props;
    await propCurrentPrice(); // Chama a api e atualiza valores na store.
    if (coins) {
      const chooseCoinAndCoins = [idEdit, editing];
      chooseCoinAndCoins.push(Object.entries(coins)
        .find((coin) => expenseDetails.currency === coin[0])[1].ask);
      chooseCoinAndCoins.push(coins);
      propaddSaveUserExpense(chooseCoinAndCoins);
    }
  }

  render() {
    const { name, title, dataTestid } = this.props;
    return (
      <div>
        <button
          name={ name }
          type="button"
          onClick={ this.handleClick }
          data-testid={ dataTestid }
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

const mapStateToProps = ({ wallet:
  { data, expenseDetails, idEdit, editing } }) => ({
  coins: data,
  expenseDetails,
  idEdit,
  editing,
});

const mapDispatchToProps = (dispatch) => ({
  propaddSaveUserExpense:
    (chooseCoinAndCoins) => dispatch(addSaveUserExpense(chooseCoinAndCoins)),
  propCurrentPrice: () => dispatch(currentPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(buttonAdd);
