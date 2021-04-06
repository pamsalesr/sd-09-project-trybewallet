import React from 'react';
import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';

class TableContent extends React.Component {
  render() {
    return (
      <tr>
        <td>Xablau</td>
        <td>Lazer</td>
        <td>Dinheiro</td>
        <td>5.00</td>
        <td>USD</td>
        <td>Dolar</td>
        <td>32.00</td>
        <td>Reais</td>
        <td>
          <button type="button" className="edit-btn btn" data-testid="edit-btn">
            <RiEdit2Fill color="rgb(255, 255, 255)" />
          </button>
          <button type="button" className="remove-btn btn" data-testid="delete-btn">
            <RiDeleteBin2Fill color="rgb(255, 255, 255)" />
          </button>
        </td>
      </tr>
    );
  }
}

export default TableContent;
