import React , { Component } from "react";
import fire from "./config/Fire";
import * as firebase from 'firebase';
import "./Login.css";
import Button from '@material-ui/core/Button';
import Footer from "../../components/Footer/Footer";

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
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
    }).catch(function(error){
        console.log(error);
    })

    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
    }).catch((err)=>{
        if(err.message === "The email address is badly formatted."){
            alert("Please Enter Your E-mail and Password to Sign In");
        }else {
            alert(err.message);
        }
    })
    
}
signup(e){
    e.preventDefault();
    
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u);
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
        <div id="logb">
            <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js"/>
            <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-analytics.js"/>
       
        <div class = "container1">
            <div className="script" align = "center">Sign In</div>
            <div className="formFont">
            <div class="Email">
                <input name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" class="input" />
            </div>
            <div class="password">
                <input name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" class="input"/>
            </div>
            </div>
            <div className="button">
                <form onClick={this.login} className="buf">
                    <button  class="medium ui pink button" >
                        Login
                    </button>
                </form>
                <form action='Signup' className="buf">
                    <button  class="medium ui pink button" >
                        Sign Up
                    </button>
                </form>
                <form action='forgotPassword' className="buf">
                    <button  class="medium ui pink button" >
                        Forgot Password?
                    </button>
                </form>
            </div>
        </div>
  </div>
  <Footer/>
  </div>
    )
}
}
export default Login;