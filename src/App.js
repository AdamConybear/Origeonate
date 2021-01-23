import React from "react";
import Home from './views/Home'
import Map from './views/Map'
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  
  return(
      <Switch>
        <Route path="/Home" component={Home} />
        <Route path="/Map" component={Map} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>  
      </Switch>

  );
};
export default App;