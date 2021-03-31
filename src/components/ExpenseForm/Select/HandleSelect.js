import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { saveUserExpenses } from '../../../actions';

class HandleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const { getSelected } = this.props;
    this.setState({
      [name]: value,
    });
    getSelected(name, value);
  }

  render() {
    const { title, dataTestid, name, array } = this.props;
    const { value } = this.state;
    return (
      <label htmlFor={ name }>
        {title}
        <select
          data-testid={ dataTestid }
          name={ name }
          value={ value }
          onChange={ this.handleChange }
        >
          {array.map((element, i) => (
            <option key={ i }>{ element }</option>
          ))}
        </select>
      </label>
    );
  }
}

HandleSelect.propTypes = {
  title: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  array: PropTypes.arrayOf(PropTypes.array).isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   getSelected: () => dispatch(saveUserExpenses()),
// });

export default connect(null, null)(HandleSelect);
