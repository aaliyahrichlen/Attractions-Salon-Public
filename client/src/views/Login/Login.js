import React , { Component } from "react";
import fire from "./config/Fire";
import "./Login.css";
import Button from '@material-ui/core/Button';
class Login extends Component{
constructor(props)
{
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : ""
    }
}
login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}
signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
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
      <form action="Contactform.php" method="post"> 
        <div class = "container">
            <h2 align = "center">Sign In</h2>
            <div class="Email">
                <input name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" class="input" />
            </div>
            <div class="password">
                <input name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" class="input"/>
            </div>
            <div>
                <Button onClick={this.login} variant="contained" color="primary" name="submit">Submit</Button>
                <Button onClick={this.signup} variant="contained" color="primary" name="submit">Sign Up</Button>
            </div>
          </div>
        </form>
  </div>
    )
}
}
export default Login;
