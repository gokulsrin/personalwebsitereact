//this will contain the react component that dictates the floating letter feature of my program 
import React, {Component} from 'react';
import {inv, multiply} from 'mathjs';

class Letter extends Component {

    constructor(props){
        super(props);
        //define state var 
        this.state = {
            sx: null,
            sy: null,
            cx: null, 
            cy: null, 
            gx: null, 
            gy: null,
            letter: this.props.letter,
            letterindex: null,
            a: 0,
            c:0,
            increment: 0,
            reached: false,
        }
    }
    componentDidMount = () => {
        //compute path 
        this.pathCalculation(this.props.gx, this.props.gy);
        //update letter coordinate every 5 ms to give illusion of movement
        setInterval(this.updateLetterCoordinates, 5);
    }

    //method to calculate parabolic path (a & b) given starting and ending pts 
    pathCalculation = (gx, gy) => {
        //in essence I'm first trying to create a parabolic path ( y = ax^2 + c)between two arbitrary points
        //then im trying to use points along that path to create the illusion of movement 
        //generate random point coords
        //also we only generate these coords if there are more letters left
        var point1 = [gx, gy];
        var point2 = [1880* Math.random(), 900 * Math.random()];
        //initialize the start, current, and end pts
        this.setState({sx:point2[0]});
        this.setState({sy: point2[1]});
        this.setState({cx: point2[0]});
        this.setState({cy: point2[1]});
        this.setState({gx: gx});
        this.setState({gy: gy});
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
        var increment = Math.abs(point1[0] - point2[0])/500;
        var sign = 1;
        if(point1[0] < point2[0]){
            sign = -1;
        }
        this.setState({increment: sign*increment});
    }
    updateLetterCoordinates = () => {
        //at this point we have some parabola that models the path between the two points given by: y = ax^2 + c
        //we want to continually update the position of the current letter everytime this function is called
        //essentially the if statement ensures the current letter is between the starting and ending x-vals
        if(((this.state.sx <= this.state.cx) && (this.state.cx <= this.state.gx)) || ((this.state.sx >= this.state.cx) && (this.state.cx >= this.state.gx))){
            var cx = this.state.cx + this.state.increment;
            var cy = this.state.a * cx**2   + this.state.c;
            this.setState({cx: cx});
            this.setState({cy: cy})
            console.log("hello")
        }
        else{
            //if it is outside of these contraints, we can assume the letter has "reached", and we need to go to a new letter
            this.setState({reached: true})
            //need to call  callback that updates the letters reached state in the home component
            this.props.updateLetterState();
        }
        console.log(this.state.cx);
        console.log(this.state.cy);
    }
    render(){
        return(
            <div>
                <h2 style = {{top: this.state.cy, left: this.state.cx, width:10, height: 10, position: "absolute"}}> {this.state.letter} </h2>
            </div>
        );
    }
}

export default Letter;