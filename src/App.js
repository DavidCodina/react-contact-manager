import React, { Component } from 'react';
import { Provider }         from './providers/Context';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header      from './components/layout/Header';
import About       from './components/pages/About';
import NotFound    from './components/pages/NotFound';
import Contacts    from './components/contacts/Contacts';
import AddContact  from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render(){
    return (
      <Provider>
        <Router>
          <div>
            <Header branding="Contact Manager" />

            <div className="container">
              <Switch>
                <Route exact path="/"                 component={Contacts}/>
                <Route exact path="/contact/add"      component={AddContact}/>
                <Route exact path="/contact/edit/:id" component={EditContact}/>
                <Route exact path="/about"            component={About}/>
                <Route exact component={NotFound}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
