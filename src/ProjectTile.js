import React, { Component } from "react";

class ProjectTile extends Component{
    //each project should have a name, a hover animation, an image, and when clicked should refer to the page?
    constructor(props){
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            otop: this.props.top,
            oleft: this.props.left,
            top: this.props.top,
            left: this.props.left,
            movementarray: [],
            index: 0,
            slide: this.props.slide,
            id: this.props.id,
        }
    }
    componentDidMount = () => {
        //default just move 3000 px
        //increment of 3 px at a time 
        //each index should contain left)
        var left = this.state.oleft
        for(var i = 0; i  < 1500; i = i + 7){
            this.state.movementarray.push(left + i);
        }
    }
    traverseArray = () => {
        this.setState({index: this.state.index + 1});
        this.setState({left: this.state.movementarray[this.state.index]});
    }
    traverseReverseArray = () => {
        this.setState({index: this.state.index - 1});
        this.setState({left: this.state.movementarray[this.state.index]}); 
    }
    rightslide = () => {
        setInterval(this.traverseArray, 1);
    }
    leftslide = () => {
        setInterval(this.traverseReverseArray, 1)
    }
    hoverProcess = () => {
        //we want the current tile to zoom while the others slide
        console.log("hoverprocess");
        this.props.slidefunction(this.state.id, this.state.index);
        console.log(this.state.slide);
    }
    hoverLeave = () => {
        this.props.reverseslidefunction(this.state.id, this.state.index);
    }
    //props should contain image, name of project, name of directory to push
    render(){
        if(this.props.slide){
            this.rightslide();
        }
        return(
                <img className = 'ProjectTile' style = {{height: this.state.height, width: this.state.width, position: "absolute", top: this.state.top, left: this.state.left}}src = {this.props.imageID} onMouseOver = {this.hoverProcess} onMouseLeave = {this.hoverLeave}></img>
        );
    }
}
export default ProjectTile;