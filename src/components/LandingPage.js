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
            isShaking: false,
            controlPanelVisible: true,
            shakeEnabled: false,
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
        });
    }

    enableShaking = toggle => {
        if (toggle) {
            this.setState({
                shakeEnabled: true,
            })
        } else {
            this.setState({
                shakeEnabled: false,
            })
        }
    }

    songEnded = () => {
        this.setState({
            controlPanelVisible: true,
        })
    }

    render() {
        return (
            <div className={`container-fluid bg${this.state.active}` + (this.state.isShaking && this.state.shakeEnabled ? " shake" : "")}>
                    <div className="row justify-content-center">
                        <div className="col-6 mt-2">
                            <ControlPanel 
                                visible={this.state.controlPanelVisible}
                                toggleVisible={() => this.setState({controlPanelVisible: !this.state.controlPanelVisible})} 
                                changeBackground={this.changeBackground} active={this.state.active}
                                uploadSong={this.uploadSong} enableShaking={this.enableShaking}
                            />
                        </div>
                    </div>
                    <div className="row">
                        {this.state.uploaded ? <Visualizer setShaking={(isShaking) => this.setState({isShaking})}
                        songEnded={this.songEnded}/> : ""}
                    </div>
                <div 
                    className="show-control-panel-button" style={{display: (!this.state.controlPanelVisible ? "block" : "none")}}
                    onClick={() => this.setState({controlPanelVisible: !this.state.controlPanelVisible})}
                 />       
            </div>
        );
    }
}