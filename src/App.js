import React from "react";
import Home from './views/Home'
import Guess from "./views/Guess";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  
  return (
		<Switch>
			<Route path="/Home" component={Home} />
			<Route path="/Guess" component={Guess} />
			<Route exact path="/">
				<Redirect to="/Home" />
			</Route>
		</Switch>
  );
};
export default App;