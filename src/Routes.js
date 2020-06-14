// this is the file for routing 

import React, { Component } from "react";
import { Router, Switch, Route, BrowserRouter } from "react-router-dom";
import history from './history';
import Home from './Home';
import Aboutme from './Aboutme';
import Experience from './Experience';
import Projects from './Projects';

class Routes extends Component{
    constructor(props){
        super(props);
        //no real need to set state 
    }
    //may need component did mount 
    render(){
        return(
            <div className = "App">
                <BrowserRouter history = {history}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/aboutme" component={Aboutme} />
                        <Route path="/experience" component={Experience} />
                        <Route path="/projects" component={Projects} />
                        {/** Potentially add one more here */}
                    </Switch>
                </BrowserRouter>
               
            </div>
        )
    }
}

export default Routes