import React, {useState, useEffect} from 'react';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import { Button } from 'reactstrap';
import { Redirect } from "react-router-dom";
import moment from "moment-timezone";
import axios from "axios";
import './Appointments.css';

const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:6163';

const NewApptTime = (props) => {
    const [selectedDate, setSelectedDate] = useState(moment('12:00 pm', "HH:mm a"));
    const [newRedirect, setNewRedirect] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = () => {
        axios
        .post(API_BASE + "/api/appointmentTime/" + props.match.params.confirmId, {date: selectedDate})
        .then(response =>{
          if(response.data === "OK")
          {
              setNewRedirect('/success/appt-time')
          }else if(response.data === "CONFIRMED ALREADY")
          {
              setNewRedirect('/confirmedalready')
          }else{
              setNewRedirect('/actionfailed')
          }
        });
    };

    if(newRedirect)
    {
        return <Redirect to={newRedirect} />
    }
    return (
        <div class="container124">
            <div class='new-time'>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div class='new-time-header'>New Appointment Time</div>
                    <div class='new-time'>
                        <TimePicker
                        inputProps={{
                            style: {fontSize: '1.2rem', width: '5.8rem'} 
                          }}
                        margin="normal"
                        minutesStep={5}
                        label={null}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        />
                    </div>
                </MuiPickersUtilsProvider>
                <div class='new-time' style={{width: 'auto'}}><Button onClick={() => handleSubmit()} style={{backgroundColor: '#808080', width: '100%'}}>Submit New Appointment Time</Button></div>
            </div>
        </div>
    );
}

export default NewApptTime;
