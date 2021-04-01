import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Currency extends React.Component {
  render() {
    const { value, onChange, currencies } = this.props;
    const data = Object.entries(currencies);
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          value={ value }
          onChange={ onChange }
        >
          { data.map((currencie) => (
            <option
              key={ currencie[1].code }
              data-testid={ currencie[0] }
            >
              {currencie[0]}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

Currency.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Currency);
