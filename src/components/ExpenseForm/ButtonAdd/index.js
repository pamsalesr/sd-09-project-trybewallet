import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class buttonAdd extends React.Component {
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
