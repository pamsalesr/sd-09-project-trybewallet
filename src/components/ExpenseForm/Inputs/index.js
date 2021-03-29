import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    console.log(value);
    this.setState({
      value,
    });
  }

  render() {
    const { name, dataTestid } = this.props;
    const { value } = this.state;
    return (
      <div>
        <label htmlFor={ name }>
          {name}
          <input
            type="text"
            name={ name }
            data-testid={ dataTestid }
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

Inputs.propTypes = {
  name: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};

export default connect()(Inputs);
