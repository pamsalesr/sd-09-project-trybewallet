import React from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';

class TBody extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map(({ value, description, currency, method, tag }, index) => (
          <tr key={ index }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ value }</td>
            <td>{ currency }</td>
            <td>placeHolder</td>
            <td>placeHolder</td>
            <td>placeHolder</td>
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
