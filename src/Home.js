import React, {Component} from 'react';
import './home.css';
import {inv, multiply} from 'mathjs';
import Letter from './Letter';
//import all the images
import greenplanent from './images/green_planet.png';
import marsplanet from './images/mars_planet.png';
import blueorangeplanet from './images/blue-orange_planet.png';
import asteroid from './images/asteroid.png';
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownclick: false,
            coords: [],
            cx: window.innerWidth/2 - 100,
            cy: window.innerHeight/2,
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
            lcy: 100,
            otickinterval: 7,
            timeout: null,
            tickinterval: 7,
            wordarray: ['Welcome'],
            letterArray: [],
            planet1w: 230,
            planet2w: 200,
            planet3w: 200, 
            planet4w: 230,
        }
        this.routeAboutMe.bind(this);
    }

    componentDidMount = () =>{
        //this is controlling the auto rotate
        setInterval(this.updaterotationcoords, this.state.tickinterval);
        this.createLetterArray();
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
    routeSocialMedia = () => {

    }
    updateDropDown = () => {
        this.setState({dropdownclick: true});
    }
    updateLetterState = () => {
        //update the state of the current letter i.e. wheter its time to move to the next or not
        this.setState({nextletter: true})
    }

    createLetterArray = () => {
        //need to give the letters coordinates such that they can form the equally spaced word
        var startx = window.innerWidth - 100; 
        var space = 15;
        for(var i = 0; i < this.state.wordarray[0].length; i = i + 1){
            var letter = <Letter letter = {this.state.wordarray[0][i]} gx = {startx} gy = {window.innerHeight/2} updateLetterState = {this.updateLetterState}/>
            this.state.letterArray.push(letter);
            startx = startx + space;
        }
        console.log(this.state.letterArray)
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
                        <ul onClick = {this.routeSocialMedia}> Contact</ul>
                    </div>
            
            );
        }
        //construct the letter array with Letter components
        // this.createLetterArray();
        // var letter = <Letter letter = "L" gx = {800} gy = {600} updateLetterState = {this.updateLetterState}/>
        var letterArray = [];
        var startx = 200; 
        var space = 25  ;
        for(var i = 0; i < this.state.wordarray[0].length; i = i + 1){
            var letter = <Letter letter = {this.state.wordarray[0][i]} gx = {startx} gy = {600} updateLetterState = {this.updateLetterState}/>
            letterArray.push(letter);
            startx = startx + space;
        }
        return(
            <div className = 'background'>
                <div className = 'Home'>
                        <div className = "dropdown">
                            <p onClick = {this.updateDropDown}> {dropdown}</p>
                        </div>
                        {/* im really just going to hard code in the word placement on top of the planets */}
                        <div className = 'circleText'>
                            <img src = {greenplanent} style = {{top: this.state.wordcy, left: this.state.wordcx, width: this.state.planet1w, position: "absolute"}} onClick = {this.routeExperience} />
                            <h2 style = {{top: this.state.wordcy + 70, left: this.state.wordcx + this.state.planet1w/4.2, width: 15, height: 10, position: "absolute"}} onClick = {this.routeExperience}> Experience</h2>

                            <img src = {marsplanet} style = {{top: this.state.word2cy, left: this.state.word2cx, width: this.state.planet2w, position: "absolute"}} onClick = {this.routeExperience} />
                            <h2 style = {{top: this.state.word2cy + 60, left: this.state.word2cx + this.state.planet2w/4.2 , width: 20, height: 10, position: "absolute"}} onClick = {this.routeProjects}> Projects</h2>

                            <img src = {blueorangeplanet} style = {{top: this.state.word3cy, left: this.state.word3cx, width: this.state.planet3w, position: "absolute"}} onClick = {this.routeExperience} />
                            <h2 style = {{top: this.state.word3cy + 60, left: this.state.word3cx + this.state.planet3w/4.2, width: 20, height: 10, position: "absolute"}} onClick = {this.routeAboutMe}> About Me</h2>

                            <img src = {asteroid} style = {{top: this.state.word4cy, left: this.state.word4cx, width: this.state.planet4w, position: "absolute"}} onClick = {this.routeExperience} />
                            <h2 style = {{top: this.state.word4cy + 70, left: this.state.word4cx + this.state.planet4w/4, width: 20, height: 10, position: "absolute"}} onClick = {console.log("hello")}> Contact</h2>
                        </div>
                        <div className = 'floatingLetters'>
                            {letterArray}
                        </div>
                        {/* <img src ={require('https://www.google.com/url?sa=i&url=https%3A%2F%2Fya-webdesign.com%2Fexplore%2Fcool-planet-png%2F&psig=AOvVaw1EKJdy9LwpWfaAo0WLwnEf&ust=1592789279812000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjS3c_gkeoCFQAAAAAdAAAAABAc')} ></img> */}

                        
                </div>
            </div>
        );
    }
}
export default Home