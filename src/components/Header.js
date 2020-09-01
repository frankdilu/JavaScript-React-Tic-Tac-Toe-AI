import React from "react"
import "../styles/components/Header.css"

export default class Header extends React.Component{
    render(){
        return(
            <div className="headerContainer">
                <div className="headerTitleContainer">
                    <h1 className="headerTitle name">Franco </h1>
                    <h1 className="headerTitle surname">Di Luciano</h1>
                </div>
                <div className="headerNetworkContainer">
                    <a href="https://github.com/frankdilu" className="headerNetwork"> Github </a>
                    <a href="https://www.linkedin.com/in/franco-di-luciano" className="headerNetwork"> Linkedin </a>
                </div>
            </div>
        )
    }
}