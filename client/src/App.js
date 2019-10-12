import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';
import "./styles.scss";
import Header from './components/Header'





function App() {
  
   return (
    <Router>
      
      <Header />
     
      <div className="App">
         
        <Route exact path="/" component={Login} />
     
        <PrivateRoute  exact path="/protected" component={BubblePage} />
     
      </div>
    </Router>
  );
}

export default App;
