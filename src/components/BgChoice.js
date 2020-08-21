import React from 'react';
import '../css/BgChoice.css'
import '../css/LandingPage.css'

/* 
This component renders the background choices on the control panel
Originally, there was to be 9 backgrounds. However, providing GIFs of 
high quality takes up alot of space, so it had to be lowered to 3
*/


export default class BgChoice extends React.Component {
    render() {
        return (
            <div className={`choice bg${this.props.num} ${this.props.active === this.props.num ? "active" : ""}`}
            onClick={() => this.props.changeBackground(this.props.num)}> 
            </div>
        );
    }
}
