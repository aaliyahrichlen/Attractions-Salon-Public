import React, { Component } from 'react';
import fire from './config/Fire';
import Home from './Home';
import Login from './Login';
import Signup from '../Signup/Signup';
import AdminDash from "../AdminDash/AdminDash";
import Profile from "../UserProfile/profile.js";
import LoginCard from '../../components/Cards/LoginCard';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
      count: 0,
    });
    this.authListener = this.authListener.bind(this);
    this.displayPage= this.displayPage.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      
      console.log(user);
      if (user) {
        this.state.count++;
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  displayPage() {
    if(this.state.user != null){
      if(this.state.user.email === "soham.kale2412@gmail.com"){ //change this to attractionSalonweb@gmail.com
        return <AdminDash/>
      }else {
        return <Profile/>
        // this.props.history.push('/home');
      }
    }else {
      return <Login/>
    }
  }

  render() {
    return (
      <div> {this.displayPage()}</div>
    // <div> {this.state.user ? ( <AdminDash/>) : (<Login/>)}</div>
    );
  }
}

 export default App;