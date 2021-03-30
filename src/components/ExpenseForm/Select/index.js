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

export default connect()(selectOptions);
