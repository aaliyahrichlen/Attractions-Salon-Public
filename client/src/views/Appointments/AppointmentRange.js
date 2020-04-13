import React, {useState, useEffect} from 'react';
import { Button } from 'reactstrap';
import { Table } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker, KeyboardTimePicker} from '@material-ui/pickers';

function TimeRange(startTime, endTime)
{
    this.startTime = startTime;
    this.endTime = endTime;
}

const ApptRangeApp = (props) => {
    const [counter, setCounter] = useState(0);
    const [timeRangeRows, setTimeRangeRows] = useState([]);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const addNewRow = () => {
        setTimeRangeRows(timeRangeRows.concat([{id: counter}]));
        setCounter(counter + 1);
    }

    const removeRow= (event,id) =>{  
        var array = [...timeRangeRows]; // make a new copy of array instead of mutating the same array directly. 
        var index = array.findIndex(x => x.id===id); //find the index of item which matches the id passed to the function
        array.splice(index, 1);
        setTimeRangeRows(array);
    }
    
    console.log(props.match.params.confirmId)

    const rows = timeRangeRows.map((item, index) => {
        return(
            <tr>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                    margin="normal"
                    id="time-picker"
                    label="Start Time"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                    <TimePicker
                    margin="normal"
                    id="time-picker"
                    label="End Time"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                </MuiPickersUtilsProvider>
                <td><Button onClick={(event) => removeRow(event, item.id)}>Delete</Button></td>
            </tr>
        );
    });

    return (
        <Table borderless>
            <tbody>
            {rows}
            </tbody>
        <tfoot>
            <tr>
            <td>
                <Button onClick={() => {addNewRow()}} size="med" className="float-left">Insert</Button>
            </td>
            </tr>
        </tfoot>
        </Table>
    );
}

export default ApptRangeApp;

// import 'date-fns';
// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// export default function ApptRangeApp() {
//   // The first commit of Material-UI
//   const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//     <Grid container justify="space-around">
//         <KeyboardDatePicker
//         disableToolbar
//         variant="inline"
//         format="MM/dd/yyyy"
//         margin="normal"
//         id="date-picker-inline"
//         label="Date picker inline"
//         value={selectedDate}
//         onChange={handleDateChange}
//         KeyboardButtonProps={{
//             'aria-label': 'change date',
//         }}
//         />
//         <KeyboardDatePicker
//         margin="normal"
//         id="date-picker-dialog"
//         label="Date picker dialog"
//         format="MM/dd/yyyy"
//         value={selectedDate}
//         onChange={handleDateChange}
//         KeyboardButtonProps={{
//             'aria-label': 'change date',
//         }}
//         />
//         <KeyboardTimePicker
//         margin="normal"
//         id="time-picker"
//         label="Time picker"
//         value={selectedDate}
//         onChange={handleDateChange}
//         KeyboardButtonProps={{
//             'aria-label': 'change time',
//         }}
//         />
//     </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }