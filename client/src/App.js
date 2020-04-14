import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Services from "./views/Services/Services";
import Appointments from "./views/Appointments/Appointments";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import Review from './components/ReviewSection/Review';
import LoginHome from "./views/Login/App";
import Payments from "./views/Payments/PaymentPage";
import Confirmation from "./views/Confirmation/Confirmation"
import ActionFailed from "./views/Confirmation/ActionFailed"
import ConfirmedAlready from "./views/Confirmation/ConfirmedAlready"
import ApptRangeApp from "./views/Appointments/AppointmentRange"
import ApptRangeSuccess from "./views/Confirmation/AppointmentRangeSuccess"
import ApptTimeSuccess from './views/Confirmation/AppointmentTimeSuccess'
import NewApptTime from "./views/Appointments/NewAppointmentTime"


import DeleteImage from "./views/DeleteImage/DeleteImage";
{/* remove this above line */}
const App = () => {
  return (
    <div>
    <head>
    <link href="https://fonts.googleapis.com/css2?family=Sofia&family=Spartan:wght@400;700&display=swap" rel="stylesheet"></link>
    </head>
    <div class="app">
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Services" component={Services} />
        <Route exact path="/Appointments" component={Appointments} />
        <Route exact path="/Login" component={LoginHome} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/delete" component={DeleteImage}/>
        <Route exact path="/Payments" component={Payments} />
        <Route exact path="/confirm" component={Confirmation}/>
        <Route exact path="/actionfailed" component={ActionFailed}/>
        <Route exact path="/confirmedalready" component={ConfirmedAlready}/>
        <Route exact path="/success/appt-range" component={ApptRangeSuccess}/>
        <Route exact path="/success/appt-time" component={ApptTimeSuccess}/>
        <Route exact path="/appt-range/:confirmId" component={ApptRangeApp}/>
        <Route exact path="/new-appt-time/:confirmId" component={NewApptTime}/>
         {/* remove this above line */}
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Footer/>
    </div>
    </div>
  );
}

export default App;
