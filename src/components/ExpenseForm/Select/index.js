import React from 'react';
import { connect } from 'react-redux';

class selectOptions extends React.Component {
  render() {
    return (
      <div>
        <select>Test</select>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   coins = state.currentPriceReducer
// }

// selectOptions.propTypes = {
//   coins: PropTypes.arrayOf(PropTypes.object).isRequired
// }

export default connect()(selectOptions);
