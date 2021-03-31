import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class buttonAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  handleClick() {

  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <button
          name={ name }
          type="button"
          // onClick={ handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

buttonAdd.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect()(buttonAdd);
