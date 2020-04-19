import React , { Component } from "react";
import fire from "../Login/config/Fire";
import * as firebase from 'firebase';
import "./forgotPassword.css";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Paper from '@material-ui/core/Paper'
import Footer from "../../components/Footer/Footer";

//import Button from '@material-ui/core/Button';
class forgotPassword extends Component{
constructor(props)
{
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state={
        email : ""
    }
}


handleSubmit(e){
    e.preventDefault();
    console.log(this.state.email);
    var auth = firebase.auth();
    var emailAddress = this.state.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert("Success! Redirecting you back to the login page - press OK!");
        window.location.href="/Login";

    }).catch(function(error) {
     alert("Not a valid email")
    });
}
handleChange(e){
    this.setState({
        email: e.target.value
    });
}


render()
{
    return (   
        <div>
        <div className="center">
        <div className="forgotContainer" align="center">  
            <div className="script" align = "center">Forgot your password?</div>
            <div className="instructionText">Please enter your email address below. If the email address exists in our system, you should recieve an email with instruction on how to reset your password.</div>
            <form onSubmit={this.handleSubmit}>
                
                <FormControl>
                    <InputLabel placeholder="Placeholder"
                        htmlFor="component-simple"> Email Address </InputLabel>
                    <Input  id="component-simple"  onBlur={this.handleChange} label="Email" />
                </FormControl>
                
                <button type="submit" class="medium ui pink button">
                    Reset Password
                </button>

            </form>
        </div>
        </div>
        <Footer/>
        </div>
    )
}
}
export default forgotPassword;
