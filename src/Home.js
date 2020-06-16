import React, {Component} from 'react';
import './home.css'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownclick: false,
            coords: [],
            cx: 600,
            cy: 400,
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
            onumticks: 6000,
            timeout: null,
            tickinterval: 5,
        }
        this.routeAboutMe.bind(this);
    }

    componentDidMount = () =>{
        //this is controlling the auto rotate
        setInterval(this.updaterotationcoords, this.state.tickinterval);
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

        //now the first intermideate -- this will be pi/2 away
        var temptheta = (newtheta + Math.PI/2)%(2*Math.PI);
        var word3cx = this.state.cx + (xsign * this.state.r * Math.cos(temptheta));
        var word3cy = this.state.cy + (ysign * this.state.r * Math.sin(temptheta));
        this.setState({word3cx: word3cx});
        this.setState({word3cy: word3cy});

         //now the second intermideate -- this will be 3pi/2 away
         var temptheta = (newtheta + 3*Math.PI/2)%(2*Math.PI);
         var word4cx = this.state.cx + (xsign * this.state.r * Math.cos(temptheta));
         var word4cy = this.state.cy + (ysign * this.state.r * Math.sin(temptheta));
         this.setState({word4cx: word4cx});
         this.setState({word4cy: word4cy});

    }

    //if there has been movement, slow down the rotation speed by 10x
    onMouseMove = () => {
      
    }

    //if there hasn't been mouse movement for some time 
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
            <div className = 'App' onMouseMove = {this.onMouseMove}>
                <p onClick = {this.updaterotationcoords}>Hello</p>
                <div className = "dropdown">
                    <p onClick = {this.updateDropDown}> {dropdown}</p>
                </div>
                <h1 style = {{top: this.state.wordcy, left: this.state.wordcx, width: 20, height: 10, position: "absolute"}}> Rotating</h1>
                <h1 style = {{top: this.state.word2cy, left: this.state.word2cx, width: 20, height: 10, position: "absolute"}}> Rotating2</h1>
                <h1 style = {{top: this.state.word3cy, left: this.state.word3cx, width: 20, height: 10, position: "absolute"}}> Rotating3</h1>
                <h1 style = {{top: this.state.word4cy, left: this.state.word4cx, width: 20, height: 10, position: "absolute"}}> Rotating3</h1>

            </div>
        );
    }
}
export default Home