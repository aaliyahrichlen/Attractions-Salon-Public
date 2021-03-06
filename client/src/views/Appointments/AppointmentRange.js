import React, {useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { Button } from '@material-ui/core';
import { Table } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import moment from "moment-timezone";
import axios from "axios";
import './Appointments.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:6163';

const ApptRangeApp = (props) => {
    const [counter, setCounter] = useState(0);
    const [timeRangeRows, setTimeRangeRows] = useState([]);
    const [newRedirect, setNewRedirect] = useState(null);

    useEffect(() => {addNewRow()}, [])

    const handleDateChange = (date, id, start_notEnd) => {
        var array = [...timeRangeRows]; // make a new copy of array instead of mutating the same array directly. 
        var index = array.findIndex(x => x.id===id); //find the index of item which matches the id passed to the function
        if(start_notEnd)
        {
            array[index].startTime = date;
        }else{
            array[index].endTime = date;
        }
        setTimeRangeRows(array);
    };

    const addNewRow = () => {
        setTimeRangeRows(timeRangeRows.concat([{id: counter, startTime: moment('9:00 am', "HH:mm a"), endTime: moment('12:00 pm', "HH:mm a")}]));
        setCounter(counter + 1);
    }

    const removeRow = (event,id) =>{  
        var array = [...timeRangeRows]; // make a new copy of array instead of mutating the same array directly. 
        var index = array.findIndex(x => x.id===id); //find the index of item which matches the id passed to the function
        array.splice(index, 1);
        setTimeRangeRows(array);
    }

    const submitRanges = () =>{
    axios
      .post(API_BASE + "/api/appointmentRange/" + props.match.params.confirmId, timeRangeRows)
      .then(response =>{
        if(response.data === "OK")
        {
            setNewRedirect('/success/appt-range')
        }else if(response.data === "CONFIRMED ALREADY")
        {
            setNewRedirect('/confirmedalready')
        }else{
            setNewRedirect('/actionfailed')
        }
      });
    }

    const rows = timeRangeRows.map((item, index) => {
        return(
            <tr class="range-row">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <td class="time-picker" className="resize">
                    <div className="formFont">Start Time</div>
                    <TimePicker
                    margin="normal"
                    minutesStep={5}
                    label={null}
                    value={item.startTime}
                    onChange={(date) => handleDateChange(date, item.id, true)}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                    </td>
                    <td class="time-picker" className="resize">
                    <div className="formFont">End Time</div>
                    <TimePicker
                    margin="normal"
                    minutesStep={5}
                    label={null}
                    value={item.endTime}
                    onChange={(date) => handleDateChange(date, item.id, false)}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                    </td>
                </MuiPickersUtilsProvider>
                <td className="resize">{item.id !== 0 ? <Button startIcon={<DeleteIcon />} variant="contained" onClick={(event) => removeRow(event, item.id)} >Remove Time Range</Button> : <div/>}</td>
            </tr>
        );
    });

    if(newRedirect)
    {
        return <Redirect to={newRedirect} />
    }
    return (
        <div className="rangeContainer">
        <div align="center" className="rangeInstructions">Please add new appointment ranges to send to the client.</div>
        <Table borderless className="buf">
            <tbody>
            {rows}
            </tbody>
        <tfoot>
            <tr>
            <td>
                
            </td>
            <td></td>
            <td><Button startIcon={<AddCircleOutlineIcon />} variant="contained" onClick={() => {addNewRow()}} className="float-left">Add Another Time Range</Button></td>
            </tr>
        </tfoot>
        </Table>
        <div className="submitBar">
        <Button startIcon={<SendIcon />} variant="contained" onClick={() => {submitRanges()}} className="float-left">Submit Time Ranges</Button>
        </div>
        </div>
    );
}

export default ApptRangeApp;
