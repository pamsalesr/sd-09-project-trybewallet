import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  render() {
    // const { userEmail } = this.props;
    const { email } = this.state;
    return (
      <header>
        <Link to="/carteira">Carteira</Link>
        <section>
          <div>
            Email:
            { () => userEmail(email) }
          </div>
        </section>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Wallet);
