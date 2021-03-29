import React from 'react';
import { connect } from 'react-redux';

class expenseForm extends React.Component {
  render() {
    return (
      <div>formulário de despesa</div>
    );
  }
}

export default connect()(expenseForm);
