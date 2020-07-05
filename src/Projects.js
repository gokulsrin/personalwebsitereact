import React, { Component } from "react";
import ProjectTile from "./ProjectTile";
import dartpollimg from "./images/img-dartpoll.png";
import './home.css';

class Projects extends Component{
    constructor(props){
        super(props);
        this.state = {
            projectinfoarray: [],
            projectTileArray: [],
        }
    }
    componentDidMount = () => {
        //more clever solution
        var projectinfoarray = [];
        //simply add all of the information for each project (img src, width, height) to an array, 
        //calculate the positioning later 
        projectinfoarray.push([dartpollimg, 200, 200]);
        projectinfoarray.push([dartpollimg, 200, 200]);
        projectinfoarray.push([dartpollimg, 200, 200]);
        projectinfoarray.push([dartpollimg, 200, 200]);
        this.setState({projectinfoarray: projectinfoarray})

        //calculate the position for each title here
        //say each tile is 200 x 200, and we want them to fit with a larger centered 800 x 800 square with top and left at (400, 400)
        //fit 4 tiles to each row 
        var projectTileArray = [];
        var x = 400;
        var y = 400;
        var tilecount = 0;
        for(var i = 0; i < projectinfoarray.length; i = i + 1){
            var tile = <ProjectTile arrayidx = {null} reverseslidefunction = {this.reverseSlideState} reverseslide = {false} slidefunction = {this.updateSlideState} id = {i} slide = {false} top = {y} left = {x} imageID = {projectinfoarray[i][0]} width = {projectinfoarray[i][1]} height = {projectinfoarray[i][2]} />
            x = x + projectinfoarray[i][1];
            tilecount = tilecount + 1;
            if(tilecount%4 == 0 && tilecount != 0){
                y = y + projectinfoarray[i][2] + 15;
                x = 400;
            }
            projectTileArray.push(tile)
        }
        this.setState({projectTileArray: projectTileArray});
    }
    reverseSlideState = (id, arrayidx) => {

    }
    updateSlideState = (id, arrayidx) => {
        //recreate all of the projectTile objects with their slide set to true except the one with id
        console.log("updateSlide");
        var projectTileArray = [];
        var x = 400;
        var y = 400;
        var tilecount = 0;
        for(var i = 0; i < this.state.projectinfoarray.length; i = i + 1){
            var tile = null;
            if(i == id){
                tile = <ProjectTile arrayidx = {arrayidx} reverseslidefunction = {this.reverseSlideState} reverseslide = {false} slidefunction = {this.updateSlideState} id = {i} slide = {false} top = {y} left = {x} imageID = {this.state.projectinfoarray[i][0]} width = {this.state.projectinfoarray[i][1]} height = {this.state.projectinfoarray[i][2]} />
                console.log("inside if");
            }
            else{
                tile = <ProjectTile arrayidx = {arrayidx} reverseslidefunction = {this.reverseSlideState} reverseslide = {false} slidefunction = {this.updateSlideState} id = {i} slide = {true} top = {y} left = {x} imageID = {this.state.projectinfoarray[i][0]} width = {this.state.projectinfoarray[i][1]} height = {this.state.projectinfoarray[i][2]} />
                console.log("inside else");
            }
            // var tile = <ProjectTile slidefunction = {this.updateSlideState} id = {i} slide = {slidestate} top = {y} left = {x} imageID = {this.state.projectinfoarray[i][0]} width = {this.state.projectinfoarray[i][1]} height = {this.state.projectinfoarray[i][2]} />
            x = x + this.state.projectinfoarray[i][1];
            tilecount = tilecount + 1;
            if(tilecount%4 == 0 && tilecount != 0){
                y = y + this.state.projectinfoarray[i][2] + 15;
                x = 400;
            }
            projectTileArray.push(tile)
        }
        this.setState({projectTileArray: projectTileArray});
    }
    render(){
        console.log(this.state.projectTileArray);

        //animation makes all other boxes float off screen and cetners the hovered image and displays text
        return(
            <div>
                <div className = 'App'>
                    <p>Hi, I'm Gokul Srinivasan</p>
                </div>
                {/* inner box */}
                <div className = 'innerbox'>
                        {this.state.projectTileArray}
                </div>
                
            </div>
        );
    }
}
export default Projects;