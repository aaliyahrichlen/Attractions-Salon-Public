import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment-timezone";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
  StepButton
} from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";
import './Appointments.css';
import * as firebase from 'firebase';
import { Redirect } from "react-router-dom";
import fire from "../Login/config/Fire";
import {MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:6163';

const stepMuiTheme = getMuiTheme({
  raisedButton: {
    primaryColor: '#f6a5b8',
  },
  textField: {
    disabledTextColor: 'rgba(0, 0, 0, 1)',
    focusColor: '#f6a5b8',
  },
  radioButton: {
    checkedColor: '#f6a5b8'
  },
  datePicker: {
    color: '#f6a5b8',
    textColor: '#ffffff',
    calendarTextColor: '#000000',
    selectColor: '#f6a5b8',
    selectTextColor: '#ffffff',
    calendarYearBackgroundColor: '#f6a5b8',
    headerColor: '#f6a5b8',
  },
  timePicker:{
    color: '#f6a5b8',
    textColor: '#f6a5b8',
    selectColor: '#f6a5b8',
    selectTextColor: '#f6a5b8',
  },
  stepper: {
      iconColor: '#f6a5b8'
  }
})

class AppointmentApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      stylistName: "",
      schedule: [],
      confirmationModalOpen: false,
      validEmail: true,
      validPhone: true,
      validTime: false,
      finished: false,
      appointmentTime: moment('8:00 am', "HH:mm a"),
      smallScreen: window.innerWidth < 768,
      stepIndex: 0
    };


  }

  componentWillMount() {
    if(firebase.auth().currentUser)
    {
      var fireRef = fire.database().ref();
      fireRef.orderByChild("email").equalTo(firebase.auth().currentUser.email).on("child_added", (snapshot) => {
        let userData = snapshot.val();
        this.setState({firstName: userData.firstName, lastName: userData.lastName, email: userData.email, phone: userData.phoneNum});
      });
    }
  }

  handleSetAppointmentDate(date) {
    this.setState({ appointmentDate: date, confirmationTextVisible: true });
  }
  handleSubmit() {
    this.setState({ confirmationModalOpen: false });
    let fullDate = moment(moment(this.state.appointmentDate).format("MM/DD/YYYY") + ' ' + moment(this.state.appointmentTime).format("HH:mm a"), "MM/DD/YYYY HH:mm a").tz('America/New_York');
    console.log(fullDate);
    const newAppointment = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      stylist: this.state.stylistName,
      slot_date: fullDate
      // slot_date: moment(this.state.appointmentDate).format("MM/DD/YYYY"),
      // slot_time: this.state.appointmentSlot
    };
    axios
      .post(API_BASE + "/api/appointmentCreate", newAppointment)
      .then(response =>
        this.setState({
          confirmationSnackbarMessage: "Appointment succesfully added!",
          confirmationSnackbarOpen: true,
          processed: true
        })
      )
      .catch(err => {
        console.log(err);
        console.log("api/appointmentCreate")
        return this.setState({
          confirmationSnackbarMessage: "Appointment failed to save.",
          confirmationSnackbarOpen: true
        });
      });
  }
  validateEmail(email) {
    console.log("prod" + process.env.REACT_APP_PRODUCTION)
    console.log('api_base' + API_BASE)
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.setState({email: email})
    return regex.test(email)
      ? this.setState({ validEmail: true })
      : this.setState({ validEmail: false });
  }
  validatePhone(phoneNumber) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    this.setState({phone: phoneNumber})
    return regex.test(phoneNumber)
      ? this.setState({ validPhone: true })
      : this.setState({ validPhone: false });
  }
  handleTimeChange(time){
    this.setState({appointmentTime: time})
    var startTime = moment('08:59 am', "HH:mm a");
    var endTime = moment('05:01 pm', "HH:mm a");
    if(time.isBetween(startTime , endTime))
    {
      return this.setState({ validTime: true });
    }
    return this.setState({ validTime: false });
  }
  checkDisableDate(day) {
    const dateString = moment(day).format("MM/DD/YYYY");
    return (
      this.state.schedule[dateString] === true ||
      moment(day)
        .startOf("day")
        .diff(moment().startOf("day")) < 0
    );
  }

  renderAppointmentConfirmation() {
    const spanStyle = { color: "#f6a5b8" };
    return (
      <section>
        <p>
          Name:{" "}
          <span style={spanStyle}>
            {this.state.firstName} {this.state.lastName}
          </span>
        </p>
        <p>
          Number: <span style={spanStyle}>{this.state.phone}</span>
        </p>
        <p>
          Email: <span style={spanStyle}>{this.state.email}</span>
        </p>
        <p>
          Stylist: <span style={spanStyle}>{!this.state.stylistName ? "No Preference" : this.state.stylistName}</span>
        </p>
        <p>
          Appointment:{" "}
          <span style={spanStyle}>
            {moment(this.state.appointmentDate).format(
              "dddd[,] MMMM Do[,] YYYY"
            )}
          </span>{" "}
          at{" "}
          <span style={spanStyle}>
            {moment(this.state.appointmentTime).format(
              "H:mm a"
            )}
          </span>
        </p>
      </section>
    );
  }

  render() {
    const {
      finished,
      isLoading,
      smallScreen,
      stepIndex,
      confirmationModalOpen,
      confirmationSnackbarOpen,
      ...data
    } = this.state;
    const contactFormFilled =
      data.firstName &&
      data.lastName &&
      data.phone &&
      data.email &&
      data.validPhone &&
      data.validEmail;
    const DatePickerExampleSimple = () => (
      <div>
        <DatePicker
          value={data.appointmentDate}
          hintText="Select Date"
          mode={smallScreen ? "portrait" : "landscape"}
          onChange={(n, date) => this.handleSetAppointmentDate(date)}
          shouldDisableDate={day => this.checkDisableDate(day)}
          formatDate={(date) => moment(date).format('MM/DD/YYYY')}
        />
      </div>
    );
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => this.setState({ confirmationModalOpen: false })}
      />,
      <FlatButton
        label="Confirm"
        style={{ backgroundColor: "#00C853 !important" }}
        primary={true}
        onClick={() => this.handleSubmit()}
      />
    ];
    if(!firebase.auth().currentUser)
    {
      return <Redirect to="/Login"/>
    }
    return (
      <div>
        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0
          }}
        >
          <Card
            style={{
              padding: "12px 12px 25px 12px",
              height: smallScreen ? "100vh" : null
            }}
          >
            <MuiThemeProvider muiTheme={stepMuiTheme}>
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              linear={false}
            >
              <Step>
                <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                  Choose an available day for your appointment
                </StepButton>
                <StepContent>
                  {DatePickerExampleSimple()}
                </StepContent>
              </Step>
              <Step disabled={!data.appointmentDate}>
                 <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
                  Choose an available time for your appointment
                </StepButton>
                <StepContent>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <TimePicker
                    margin="normal"
                    minutesStep={5}
                    label={!this.state.validTime ? "Must be between 9 to 5" : "Time"}
                    value={data.appointmentTime}
                    onChange={(time) => this.handleTimeChange(time)}
                    InputLabelProps={!this.state.validTime ?
                      {style: {color: "red"}
                  } : undefined}
                    />
                </MuiPickersUtilsProvider>
                </StepContent>
              </Step>
              <Step disabled={!data.appointmentDate || !this.state.validTime }>
              <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                  Share your contact information with us and we'll send you a reminder
                </StepButton>
                <StepContent>
                  <p>
                    <section>
                      <TextField
                        value={data.firstName}
                        disabled={true}
                        style={{ display: "block" }}
                        name="first_name"
                        hintText="First Name"
                        floatingLabelText="First Name"
                        onChange={(evt, newValue) =>
                          this.setState({ firstName: newValue })
                        }
                      />
                      <TextField
                        value={data.lastName}
                        disabled={true}
                        style={{ display: "block" }}
                        name="last_name"
                        hintText="Last Name"
                        floatingLabelText="Last Name"
                        onChange={(evt, newValue) =>
                          this.setState({ lastName: newValue })
                        }
                      />
                      <TextField
                        value={data.email}
                        disabled={true}
                        style={{ display: "block" }}
                        name="email"
                        hintText="youraddress@mail.com"
                        floatingLabelText="Email"
                        errorText={
                          !data.email || data.validEmail ? null : "Enter a valid email address"
                        }
                        onChange={(evt, newValue) =>
                          this.validateEmail(newValue)
                        }
                      />
                      <TextField
                        value={data.phone}
                        disabled={true}
                        style={{ display: "block"}}
                        name="phone"
                        hintText="+2348995989"
                        floatingLabelText="Phone"
                        errorText={
                          !data.phone || data.validPhone ? null : "Enter a valid phone number"
                        }
                        onChange={(evt, newValue) =>
                          this.validatePhone(newValue)
                        }
                      />
                      <TextField
                        value={data.stylistName}
                        style={{ display: "block" }}
                        name="stylist"
                        hintText="No Preference"
                        floatingLabelText="Stylist"
                        onChange={(evt, newValue) =>
                          this.setState({ stylistName: newValue })
                        }
                      />
                      <RaisedButton
                        style={{ display: "block", backgroundColor: "#f6a5b8" }}
                        label={
                          contactFormFilled
                            ? "Schedule"
                            : "Fill out your information to schedule"
                        }
                        labelPosition="before"
                        primary={true}
                        fullWidth={true}
                        onClick={() =>
                          this.setState({
                            confirmationModalOpen: !this.state
                              .confirmationModalOpen
                          })
                        }
                        disabled={!contactFormFilled || data.processed}
                        style={{ marginTop: 20, maxWidth: 100 }}
                      />
                    </section>
                  </p>
                </StepContent>
              </Step>
            </Stepper>
            </MuiThemeProvider>
          </Card>
          <Dialog
            modal={true}
            open={confirmationModalOpen}
            actions={modalActions}
            title="Confirm your appointment"
          >
            {this.renderAppointmentConfirmation()}
          </Dialog>
          <SnackBar
            open={confirmationSnackbarOpen || isLoading}
            message={
              isLoading ? "Loading... " : data.confirmationSnackbarMessage || ""
            }
            autoHideDuration={10000}
            onRequestClose={() =>
              this.setState({ confirmationSnackbarOpen: false })
            }
          />
        </section>
      </div>
    );
  }
}
export default AppointmentApp;
