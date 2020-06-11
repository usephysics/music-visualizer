import React from 'react';
import ControlPanel from './ControlPanel.js';
import '../css/LandingPage.css';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            background: 1,
        }
    }

    changeBackground = bg => {
        this.setState({
            background: bg,
        });
    }

    render() {
        return (
            <div className={"container-fluid " + `bg${this.state.background}`}>
                <div className="text-center py-4 mb-3">
                    <p className="display-3 text-dark title">Music Visualizer {/* placeholder name */}</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-9 mt-2">
                        <ControlPanel changeBackground={this.changeBackground}/>
                    </div>
                </div>
            </div>
        );
    }
}