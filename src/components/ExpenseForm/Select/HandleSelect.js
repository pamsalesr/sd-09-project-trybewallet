import React from 'react';
import PropTypes from 'prop-types';

class HandleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
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

export default HandleSelect;
