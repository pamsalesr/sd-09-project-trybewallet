import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/ExpenseForm';
import Table from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    const { emailDispatch } = this.props;
    return (
      <div>
        <header>
          <section>
            <div data-testid="email-field">
              Email:
              { emailDispatch }
            </div>

            <div data-testid="total-field">
              Despesa Total: 0
              <div data-testid="header-currency-field">
                BRL
              </div>
            </div>
          </section>
        </header>
        <section>
          <Form />
          <button type="button">Adicionar despesa</button>
        </section>
        <section>
          <Table />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailDispatch: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
