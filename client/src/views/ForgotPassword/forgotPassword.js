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
        <Paper  elevation={10}>
        <form onSubmit={this.handleSubmit}>

        <FormControl >

            <InputLabel           placeholder="Placeholder"
 htmlFor="component-simple"> Email Address </InputLabel>
            <Input  id="component-simple"  onBlur={this.handleChange} label="Email" />
        </FormControl>
        <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  style={{ margin: '16px' }}
                  
                >
                  {'Reset Password'}
                </Button>
        </form>
        {'If the email address is a valid address, you should receive an email to reset the password'}

        </Paper>
        
    )
}
}
export default forgotPassword;