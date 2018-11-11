import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
    ChatRoom,
    NoMatch
} from '../pages';

const AppNavigator = () => (
    <Router>
      <Switch>
        <Route exact path='/' component={ChatRoom} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
);

export { AppNavigator };