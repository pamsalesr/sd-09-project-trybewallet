import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserExpense } from '../../../actions';
import '../ExpenseForm.css';

class selectOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { propSaveUserExpense } = this.props;
    this.setState({
      [name]: value,
    });
    propSaveUserExpense({ [name]: value });
  }

  render() {
    const { coins } = this.props;
    const coinsArray = Array.isArray(coins) ? coins : Object.keys(coins);
    if (coins) {
      return (
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          {coinsArray.map((coin, i) => {
            return (
              <option
                data-testid={ coin }
                key={ i }
              >
                {coin}
              </option>
            );
          })}
        </select>
      );
    }
    return (<p>Loading...</p>);
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  coins: currencies,
});

const mapDispatchToProps = (dispatch) => ({
  propSaveUserExpense: (obj) => dispatch(saveUserExpense(obj)),
});

selectOptions.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.object),
  propSaveUserExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(selectOptions);
