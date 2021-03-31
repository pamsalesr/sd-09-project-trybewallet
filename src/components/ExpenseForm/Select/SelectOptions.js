import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class selectOptions extends React.Component {
  render() {
    const { coins } = this.props;
    if (coins) {
      return (
        <select data-testid="currency-input">
          {Object.keys(coins).map((coin, i) => {
            if (coin !== 'USDT') {
              return <option data-testid={ coin } key={ i }>{coin}</option>;
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

selectOptions.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(selectOptions);
