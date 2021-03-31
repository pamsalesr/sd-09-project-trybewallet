import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserExpense } from '../../../actions';

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
    if (coins) {
      return (
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          {Object.keys(coins).map((coin, i) => {
            if (coin !== 'USDT') {
              return (
                <option
                  data-testid={ coin }
                  key={ i }
                >
                  {coin}
                </option>
              );
            }
            return '';
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
  coins: PropTypes.arrayOf(PropTypes.object).isRequired,
  propSaveUserExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(selectOptions);
