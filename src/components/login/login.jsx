import React, { Component } from 'react';
import { login } from '../../services/authService';
import { Globals } from '../../global';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: { username: '', password: '' },
      generic: [],
      error: ''
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }


  dismissError() {
    this.setState({ error: '' });
  }

  GetUser = async () => {
    const { data } = await login(this.state.user.username);
    await this.setState(() => {
      return {
        generic: data.generic_response
      }
    })

    console.log(this.state.generic);
    localStorage.setItem('user', JSON.stringify(this.state.user));
    localStorage.setItem('generic', JSON.stringify(this.state.generic));

    // const gen  = localStorage.getItem('generic');
    //  console.log("Generic Response : ", Globals.selectedTelco);

  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.user.username) {
      return this.setState({ error: 'Username is required' });
    }

    // if (!this.state.user.password) {
    //   return this.setState({ error: 'Password is required' });
    // }
    console.log("Form Submitted...");
    this.GetUser(this.state.user.username);



    // localStorage.setItem('user', JSON.stringify(this.state.user));
    // localStorage.setItem('generic', JSON.stringify(this.state.generic));

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    const user = { ...this.state.user };
    user.username = evt.target.value;
    this.setState({
      user: user
    });
  };

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <div className='form-group'>
            <label htmlFor="username">{Globals.login.enterNumber}</label>
            <input type="text" className='form-control'
              id="username"
              data-test="username"
              placeholder={Globals.login.phonePlaceholder}
              value={this.state.user.username}
              onChange={this.handleUserChange} />
          </div>
          <button type="submit" className='btn btn-primary' value='submit' data-test="submit"> Continue.. </button>
        </form>
      </div>
    );
  }
}

export default Login;