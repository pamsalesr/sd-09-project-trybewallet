import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Expenses extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Value</th>
            <th>Description</th>
            <th>Currency</th>
            <th>Method</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.id}</td>
              <td>{expense.value}</td>
              <td>{expense.description}</td>
              <td>{expense.currency}</td>
              <td>{expense.method}</td>
              <td>{expense.tag}</td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

Expenses.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps)(Expenses);
