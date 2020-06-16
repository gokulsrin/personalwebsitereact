import React, {Component} from 'react';
import './home.css';
import {inv, multiply} from 'mathjs';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownclick: false,
            coords: [],
            cx: 650,
            cy: 500,
            r: 200,
            numticks: 6000,
            currenttheta: Math.PI,
            wordcx: 0,
            wordcy: 0,
            word2cx:0,
            word2cy:0,
            word3cx:0,
            word3cy:0,
            word4cx:0,
            word4cy:0,
            lcx: 300,
            lcy: 700,
            otickinterval: 5,
            timeout: null,
            tickinterval: 5,
            wordarray: ['person'],
            currentletterx: null,
            currentlettery: null,
            a: 0,
            c: 0,
            increment: 0,
            point2: [0,0],
            reached: false,
        }
        this.routeAboutMe.bind(this);
    }

    componentDidMount = () =>{
        //this is controlling the auto rotate
        setInterval(this.updaterotationcoords, this.state.tickinterval);
        this.appearingletters();
        setInterval(this.traverseletters, 5);
    }
    

    routeHome = () => {
        this.props.history.push("/"); 
    }
    routeProjects = () => {
        this.props.history.push("/projects")
    }
    routeAboutMe = () => {
        this.props.history.push("/aboutme"); 
    }
    routeExperience = () => {
        this.props.history.push("/experience"); 
    }
    updateDropDown = () => {
        this.setState({dropdownclick: true});
    }

    updaterotationcoords = () => {
        //(cos0, sin0) = (x,y)
        //check the quadrant for sign in front
        
        //this should return to us the change in angle in radians 
        var change = (360/this.state.numticks)*(Math.PI/180);

        //calc the new theta -- mod so that it stays within the bounds
        var newtheta = (this.state.currenttheta + change)%(2*Math.PI);
        //calculate the sign correctly
        var xsign = 1;
        var ysign = 1;
        if((0< newtheta < Math.PI/2)||( 3*Math.PI/2 < newtheta < 2*Math.PI)){
            xsign = 1;
            if(0< newtheta < Math.PI/2){
                ysign = 1;
            }
            else {
                ysign = -1;
            }
        }
        else if((Math.PI/2 < newtheta < Math.PI)||(Math.PI < newtheta < 3*Math.PI/2)){
            xsign = -1;
            if(Math.PI/2 < newtheta < Math.PI){
                ysign = -1;
            }
            else{
                ysign = 1;
            }
        }
        //the center of the word should be (cx +/- r*cos(theta), cy +/- r*sin(theta))
        var wordcx = this.state.cx + (xsign * this.state.r * Math.cos(newtheta));
        var wordcy = this.state.cy + (ysign * this.state.r * Math.sin(newtheta))
        //update all of the states 
        this.setState({wordcx : wordcx});
        this.setState({wordcy: wordcy});
        this.setState({currenttheta: newtheta});
        
        //the second word will be opposite or pi away from the original, and it will be the opposite quadrant
        var temptheta = (newtheta + Math.PI)%(2*Math.PI);
        var word2cx = this.state.cx + (xsign * this.state.r * Math.cos(temptheta));
        var word2cy = this.state.cy + (ysign * this.state.r * Math.sin(temptheta));
        this.setState({word2cx: word2cx});
        this.setState({word2cy: word2cy});

        //now the first intermediate -- this will be pi/2 away
        var temptheta = (newtheta + Math.PI/2)%(2*Math.PI);
        var word3cx = this.state.cx + (xsign * this.state.r * Math.cos(temptheta));
        var word3cy = this.state.cy + (ysign * this.state.r * Math.sin(temptheta));
        this.setState({word3cx: word3cx});
        this.setState({word3cy: word3cy});

         //now the second intermediate -- this will be 3pi/2 away
         var temptheta = (newtheta + 3*Math.PI/2)%(2*Math.PI);
         var word4cx = this.state.cx + (xsign * this.state.r * Math.cos(temptheta));
         var word4cy = this.state.cy + (ysign * this.state.r * Math.sin(temptheta));
         this.setState({word4cx: word4cx});
         this.setState({word4cy: word4cy});
    }

    //this function will essentially circulate through the letters at hand 
    traverseletters = () => {
        //at this point we have some parabola that models the path between the two points given by: y = ax^2 + c
        //we want to continually update the position of the current letter everytime this function is called
        //essentially the if statement ensures the current letter is between the starting and ending x-vals
        if(((this.state.point2[0]<= this.state.currentletterx) && (this.state.currentletterx <= this.state.lcx)) || ((this.state.point2[0] >= this.state.currentletterx) && (this.state.currentletterx >= this.state.lcx))){
            var cx = this.state.currentletterx + this.state.increment;
            var cy = this.state.a * cx**2   + this.state.c;
            this.setState({currentletterx: cx});
            this.setState({currentlettery: cy})
        }
    }

    //this is the method where I play around with my appearing words feature
   appearingletters = () => {
    //in essence I'm first trying to create a parabolic path ( y = ax^2 + c)between two arbitrary points
    //then im trying to use points along that path to create the illusion of movement 
    //generate random point coords
    //also we only generate these coords if there are more letters left

    var point1 = [this.state.lcx, this.state.lcy];
    var point2 = [1880* Math.random(), 900 * Math.random()];
    this.setState({currentletterx: point2[0]});
    this.setState({currentlettery: point2[1]});
    this.setState({point2: point2});
    //y column vector (y1 y2)' y pixel positions - might invert the positions
    var y = [[point1[1]],[point2[1]]];
    //matrix containing (x1^2 1; x2^2 1)
    var M = [[Math.pow(point1[0],2), 1], [Math.pow(point2[0],2), 1]];
    //u vector containing (a b)'
    var u = [];
    //calculate u = M^-1 * y
    //god bless this library 
    u = multiply(inv(M),y);
    var a = u[0][0];
    var c = u[1][0];
    //update the global states
    this.setState({a: a});
    this.setState({c: c});
    //we want to know the direction of change for the x value (i.e left or right)
    var increment = Math.abs(point1[0] - point2[0])/1000;
    var sign = 1;
    if(point1[0] < point2[0]){
        sign = -1;
    }
    this.setState({increment: sign*increment});
   }

    render(){
        var dropdown = (
            <div>
                <p>DropDownMenu</p>
            </div>
        );
        
        if(this.state.dropdownclick){
            var dropdown = (
                // this div should style the stuff horizontally
                
                    <div class = 'dropdown'>
                        <ul onClick = {this.routeHome}>Home</ul>
                        <ul onClick = {this.routeExperience}>Experience</ul>
                        <ul onClick = {this.routeAboutMe}>About Me</ul>
                        <ul onClick = {this.routeProjects}>Projects</ul>
                    </div>
            
            );
        }

        return(
            <div className = 'App'>
                <p onClick = {this.updaterotationcoords}>Hello</p>
                <div className = "dropdown">
                    <p onClick = {this.updateDropDown}> {dropdown}</p>
                </div>
                <h1 style = {{top: this.state.wordcy, left: this.state.wordcx, width: 20, height: 10, position: "absolute"}}> Rotating</h1>
                <h1 style = {{top: this.state.word2cy, left: this.state.word2cx, width: 20, height: 10, position: "absolute"}}> Rotating2</h1>
                <h1 style = {{top: this.state.word3cy, left: this.state.word3cx, width: 20, height: 10, position: "absolute"}}> Rotating3</h1>
                <h1 style = {{top: this.state.word4cy, left: this.state.word4cx, width: 20, height: 10, position: "absolute"}}> Rotating3</h1>
                
                <h2 style = {{top: this.state.currentlettery, left: this.state.currentlettery, width: 20, height: 10, position: "absolute"}}> L </h2>
                
            </div>
        );
    }
}
export default Home