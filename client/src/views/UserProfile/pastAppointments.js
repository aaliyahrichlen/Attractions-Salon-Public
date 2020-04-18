import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import moment from 'moment';

const PastAppointments = (props) => {
    const [strData, setStrData] = useState('');
    const [email, setEmail] = useState(props.email);

    const API_BASE = process.env.REACT_APP_PRODUCTION ? '' : 'http://localhost:6163';

     useEffect(() =>{
         if(props.email !== ''){
        const lookup = {
            email: props.email
          };

        axios.post(API_BASE + "/api/pastAppointments", lookup)
        .then(response =>
            setStrData(JSON.stringify(response.data))

        )
        .catch(err => {
          console.log(err);
        });
    }
	},[props.email]);
 
var appointments = [];

const processData = () =>{

var length = strData.length;
if(strData.replace(/\s/g, '').length){
var obj = JSON.parse(strData);
for(let i = obj.length -1; i >= 0; i--){ 
    if(appointments.length > 9)
{
    break;
}
let temp =JSON.stringify(obj[i].slot_date);
let date = moment(temp,'YYYY-MM-DDTHH:mm:ssZ').format("MMMM D, YYYY  hh:mm:ss a");

let style = JSON.stringify(obj[i].stylist);
if(!style.match(/[a-z]/i))
appointments.push("No preference");
else
{   
    appointments.push(JSON.stringify(obj[i].stylist)); //stylist name
}

appointments.push(date); //date of appointment
if(obj[i].confirmed)
    appointments.push("Appointment confirmed"); //appointment confirmation
else
appointments.push("Appointment not confirmed");
}
}

}
    return (
        <div>
            {processData()}
            {appointments}
        </div>
    );
}

export default PastAppointments;
