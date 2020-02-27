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
import Review from './components/ReviewSection/Review';

const App = () => {
  return (
    <div class="app">
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Services" component={Services} />
        <Route exact path="/Appointments" component={Appointments} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Review />>
    </div>
  );
}

export default App;
