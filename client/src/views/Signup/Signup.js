
import './Signup.css';
import React , { Component } from "react";
import fire from "../Login/config/Fire";
import Button from '@material-ui/core/Button';
import LoginHome from "../Login/App";
class Signup extends Component{
constructor(props)
{
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        firstName: "",
        lastName: "",
        phoneNum: "",
        email : "",
        password : ""
    }
}
signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        var fireRef = fire.database().ref();
        fireRef.push().set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNum: this.state.phoneNum,
            email: this.state.email,
            password: this.state.password
        }).then((u)=>{
            window.location.href='/Login';
        });
        console.log(u);
    }).catch((err)=>{
        alert("A user with same credentials already exits. Please Sign In!!!");
        console.log(err);
    })
}
handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}

render()
{

    return(     
        <div>
            <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js"/>
            <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-analytics.js"/>
      <form> 
        <div class = "container2">
            <h2 align = "center">Sign Up</h2>
            <div class="name">
                <input name="firstName" onChange={this.handleChange} value={this.state.firstName} id="firstName" type="text" placeholder="First Name" class="input"/>
                <input name="lastName" onChange={this.handleChange} value={this.state.lastName} id="lastName" type="text" placeholder="Last Name" class="input"/>
            </div>
            <div>
               
            </div>
            <div class="phone">
                <input name="phoneNum" onChange={this.handleChange} value={this.state.phoneNum} id="phoneNum" type="text" placeholder="Phone Number" class="input"/>
            </div>
            <div class="Email">
                <input name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" class="input" />
            </div>
            <div class="password">
                <input name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" class="input"/>
            </div>
            <div>
                
                <Button onClick={this.signup} variant="contained" color="primary" name="submit">Sign Up</Button>
                <Button onClick={event =>  window.location.href='/Login'} variant="contained" color="primary" name="submit">Login</Button>
            </div>
          </div>
        </form>
  </div>
    )
}


}
export default Signup;