import React from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';

class TBody extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map((
          { value, description, currency, method, tag, exchangeRates }, index,
        ) => (
          <tr key={ index }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ exchangeRates[currency].name }</td>
            <td>{ Math.round(100 * exchangeRates[currency].ask) / 100 }</td>
            <td>{ Math.round(value * 100 * (exchangeRates[currency].ask)) / 100 }</td>
            <td>Real</td>
            <td><button type="button" data-testid="delete-btn">deletar</button></td>
          </tr>
        ))}
      </tbody>
    );
  }
}

TBody.propTypes = { expenses: arrayOf().isRequired };
const mapStateToProps = ({ wallet }) => ({ expenses: wallet.expenses });
export default connect(mapStateToProps)(TBody);
