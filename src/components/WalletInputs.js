import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEconomicDataAction } from '../actions';

class WalletInputs extends Component {
  constructor() {
    super();

    this.state = {
      // value: 0,
    };

    this.valueField = this.valueField.bind(this);
    this.descriptionField = this.descriptionField.bind(this);
    // this.currencyField = this.currencyField.bind(this);
  }

  componentDidMount() {

  }

  valueField() {
    return (
      <label htmlFor="value">
        Valor:
        <input
          data-testid="value-input"
          id="value"
          type="number"
          onChange={ () => [] }
        />
      </label>
    );
  }

  descriptionField() {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          data-testid="description-input"
          id="description"
          type="tetxt"
          onChange={ () => {} }
        />
      </label>
    );
  }

  render() {
    return (
      <>
        { this.valueField() }
        { this.descriptionField() }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestAPI: () => dispatch(fetchEconomicDataAction()),
});

export default connect(null, mapDispatchToProps)(WalletInputs);
