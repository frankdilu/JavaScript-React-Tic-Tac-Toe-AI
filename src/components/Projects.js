import React from "react"
import "../styles/components/Projects.css"
import projects from "../utils/projects"

export default class Projects extends React.Component{
    render(){
        return(
            <div className="projectsContainer">
                <h1 className="projectsTitle">Projects</h1>
                {
                    projects.map(pr=>
                        <div key={pr.title} className="project">
                            <h3 className="projectTitle">{pr.title}</h3>
                            <pr.component />
                        </div>
                    )
                }
            </div>
        )
    }
}