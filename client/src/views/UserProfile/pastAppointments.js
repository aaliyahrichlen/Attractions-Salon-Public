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

    useEffect(() => {
        if (props.email !== '') {
            const lookup = {
                email: props.email
            };

            axios.post(API_BASE + "/api/pastAppointments", lookup).then(response => setStrData(JSON.stringify(response.data))).catch(err => {
                console.log(err);
            });
        }
    }, [props.email]);
    const createData = (name, service, price, stylist, paid, time, confirmed) => {
        return {name, service, price, stylist, paid, time, confirmed};
    }
    var appointments = [];
    var rows = [];

    const processData = () => {
        var length = strData.length;
        if (strData.replace(/\s/g, '').length) {
            var obj = JSON.parse(strData);
            for (let i = obj.length - 1; i >= 0; i--) {

                let temp = JSON.stringify(obj[i].slot_date);
                let date = moment(temp, 'YYYY-MM-DDTHH:mm:ssZ').format("MMMM D, YYYY  hh:mm:ss a");
                let stylist = "";
                let service ="";
                let price ="";
                let paid ="";
                let style = JSON.stringify(obj[i].stylist);
                if (! style.match(/[a-z]/i)) {
                    appointments.push("No preference");
                    stylist = "No preference"
                } else {
                    appointments.push(JSON.stringify(obj[i].stylist)); // stylist name
                    stylist = JSON.stringify(obj[i].stylist);
                    stylist.replace(/\"/g, "")

                } appointments.push(date); // date of appointment
                if(obj[i].hasOwnProperty('serviceName'))
                {

                  service = JSON.stringify(obj[i].serviceName);
                  service.replace(/\"/g, "");

                }
                else
                {
                  service = "No service chosen";
                }
                if(obj[i].hasOwnProperty('servicePrice'))
                {
                  price= parseInt(JSON.stringify(obj[i].servicePrice));
                  price = price /100;
                  price = '$' + price;
                }
                else{
                  price = "No price available";

                }
                if(obj[i].hasOwnProperty('paid'))
                {
                  if(obj[i].paid === true)
                    paid = "Yes";
                  else
                    paid = "No";
                }
                else{
                  paid = "No payment information available";

                }
                let status = "";
                if (obj[i].confirmed) {
                    appointments.push("Appointment confirmed"); // appointment confirmation
                    status = "Appointment confirmed"
                } else {
                    appointments.push("Appointment not confirmed");
                    status = "Appointment not confirmed"
                } rows.push(createData("Appointment " + i, service, price, stylist, paid, date, status));
            }
        }
    }
    return (
        <div> {
            processData()
        }
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Appointments</TableCell>
                            <TableCell align="right">Service</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Stylist</TableCell>
                            <TableCell align="right">Paid</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Confirmed</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody> {
                        rows.map((row) => (
                            <TableRow key={
                                row.name
                            }>
                                <TableCell component="th" scope="row">
                                    {
                                    row.name
                                } </TableCell>
                                
                                <TableCell align="right">
                                    {
                                    row.service
                                }</TableCell>
                                <TableCell align="right">
                                    {
                                    row.price
                                }</TableCell>
                                <TableCell align="right">
                                    {
                                    row.stylist
                                }</TableCell>
                                <TableCell align="right">
                                    {
                                    row.paid
                                }</TableCell>
                                <TableCell align="right">
                                    {
                                    row.time
                                }</TableCell>
                                <TableCell align="right">
                                    {
                                    row.confirmed
                                }</TableCell>
                            </TableRow>
                        ))
                    } </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PastAppointments;
