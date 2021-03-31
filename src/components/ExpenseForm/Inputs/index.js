import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserExpense } from '../../../actions';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  // handleChange({ target: { value } }) {
  //   this.setState({
  //     value,
  //   });
  // }

  handleChange({ target: { name, value } }) {
    const { propSaveUserExpense } = this.props;
    this.setState({
      [name]: value,
    });
    propSaveUserExpense({ [name]: value });
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
  propSaveUserExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  propSaveUserExpense: (obj) => dispatch(saveUserExpense(obj)),
});

export default connect(null, mapDispatchToProps)(Inputs);
