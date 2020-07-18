import React from 'react';
import '../css/BgChoice.css'
import '../css/LandingPage.css'

export default class BgChoice extends React.Component {
    render() {
        return (
            <div className={`choice bg${this.props.num} ${this.props.active === this.props.num ? "active" : ""}`}
            onClick={() => this.props.changeBackground(this.props.num)}> 
            </div>
        );
    }
}