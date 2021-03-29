import React from 'react';
import Form from '../components/formDespesa';
import Table from '../components/tabelaGatos';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <section>
            <div data-testid="email-field">Email: </div>
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

export default Wallet;
