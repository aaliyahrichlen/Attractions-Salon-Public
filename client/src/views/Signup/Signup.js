import './Signup.css';
import React , { Component } from "react";
import fire from "../Login/config/Fire";
import Button from '@material-ui/core/Button';
import LoginHome from "../Login/App";
import Footer from "../../components/Footer/Footer";
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
        password : "",
        validPhone : false
    }
}

signup(e){
    if(!this.state.validPhone)
    {
        return alert("Please make sure your phone number is only numbers and between 10 and 13 digits");
    }
    if(!this.state.firstName)
    {
        return alert("Please fill out your First Name");
    }
    if(!this.state.lastName)
    {
        return alert("Please fill out your Last Name");
    }
    if(!this.state.email)
    {
        return alert("Please fill out your Email");
    }
    if(!this.state.password)
    {
        return alert("Please fill out your Password");
    }
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        // var db = fire.database();
        // var ref = db.ref();
        //     ref.on("value", function(userSnapshot) {
        //     userSnapshot.forEach(function(snapshot) {
        //         if(user.email.toLowerCase()  === snapshot.child("email").val().toLowerCase()){
        //             setUserName(snapshot.child("firstName").val() + " " + snapshot.child("lastName").val());
        //         }
        //     });
        // });
        var fireRef = fire.database().ref();
        fireRef.push().set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNum: this.state.phoneNum,
            email: this.state.email.toLowerCase(),
            password: this.state.password
        }).then((u)=>{
            window.location.href='/Login';
        });
        console.log(u);
    }).catch((err)=>{
        if(err.message === "The email address is badly formatted."){
            alert("Please fill in a valid email");
        }else {
            alert(err.message);
        }
        console.log(err);
    })
}
handleChange(e){
    console.log(this)
    this.setState({
        [e.target.name] : e.target.value
    })
}

validatePhone(phoneNumber) {
    const regex = /^\d{10,13}$/;
    console.log(phoneNumber.target.value)
    console.log(typeof phoneNumber.target.value)
    this.setState({ phoneNum: phoneNumber.target.value })
    return regex.test(phoneNumber.target.value)
      ? this.setState({ validPhone: true })
      : this.setState({ validPhone: false });
  }

render()
{

    return(     
        <div>
            <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js"/>
            <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-analytics.js"/>
        <div class = "container2">
            <div className="script" align = "center">Sign Up</div>
            <div className="formFont">
            <div class="names">
                <input name="firstName" onChange={this.handleChange} value={this.state.firstName} id="firstName" type="text" placeholder="First Name" class="input"/>
                <input name="lastName" onChange={this.handleChange} value={this.state.lastName} id="lastName" type="text" placeholder="Last Name" class="input"/>
            </div>
            <div>
               
            </div>
            <div class="phone">
                <input name="phoneNum" onChange={(e) => this.validatePhone(e)} value={this.state.phoneNum} id="phoneNum" type="text" placeholder="Phone Number" class="input"/>
            </div>
            <div class="Email">
                <input name="email" id="email" type="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" class="input" />
            </div>
            <div class="password">
                <input name="password" id="password" type="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" class="input"/>
            </div>
             <div className="button">
                <button class="medium ui pink button" onClick={this.signup} variant="contained" color="primary" name="submit">Sign Up</button>
                <button class="medium ui pink button" onClick={event =>  window.location.href='/Login'} variant="contained" color="primary" name="submit">Login</button>
            </div>
            </div>
            </div>
            <Footer/>
            </div>
    );
}
}
export default Signup;