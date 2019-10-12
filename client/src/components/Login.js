import React, {Component} from 'react';
import { axiosWithAuth } from './axiosWithAuth';




class Login extends Component {
   state ={
       credentials: {
           username: '',
           password: '',

       }
   }

   handleChange = e => {

    this.setState({
        credentials: {
          ...this.state.credentials,
          [e.target.name]: e.target.value
        }
      });
    } 
      login = e => {
        
        e.preventDefault();
       
        axiosWithAuth()
          .post('/login', this.state.credentials)
          .then(res => {
            localStorage.setItem('token', res.data.payload);
         
            this.props.history.push('/protected');
          })
          .catch(err => console.log(err));
      };

    

   render() {
    return (
      <div className="form">
        
        <form onSubmit={this.login}>
        
        <label htmlFor="loginEmail" id="loginEmailLabel">User:</label>
          <input
            
            type="text"
            
            name="username"
            
            value={this.state.credentials.username}
            
            onChange={this.handleChange}
          />
         <label htmlFor="loginPassword" id="loginPasswordLabel">Password:</label>
          <input
            
            type="password"
            
            name="password"
            
            value={this.state.credentials.password}
            
            onChange={this.handleChange}
          />
          <button id="loginButton">Sign in</button>
        
        </form>
      </div>
    );
  }
    
}

export default Login;