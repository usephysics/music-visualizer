import React from 'react';
import ControlPanel from './ControlPanel.js';
import Visualizer from './Visualizer.js';
import '../css/LandingPage.css';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            uploaded: false,
        }
    }

    changeBackground = bg => {
        this.setState({
            active: bg,
        });
    }

    uploadSong = () => {
        this.setState({
            uploaded: true,
        })
    }

    render() {
        return (
            <div className={"container-fluid bg" + `${this.state.active}`}>
                <div className="text-center py-4 mb-3">
                    <p className="display-3 text-dark title">Music Visualizer</p>
                </div> 
                <div className="row justify-content-center">
                    <div className="col-6 mt-2">
                        <ControlPanel changeBackground={this.changeBackground} active={this.state.active}
                        uploadSong={this.uploadSong}/>
                    </div>
                </div>
                <div className="row">
                    {this.state.uploaded ? <Visualizer></Visualizer> : ""}
                </div>
            </div>
        );
    }
}