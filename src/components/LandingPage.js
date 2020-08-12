import React from 'react';
import ControlPanel from './ControlPanel.js';
import Visualizer from './Visualizer.js';
import '../css/LandingPage.css';

/* This component renders the page and maintains most state */

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            uploaded: false,
            isShaking: false,
            controlPanelVisible: true,
            shakeEnabled: false,
            colors: false,
            lowerBars: false,
            removeBars: false,
            gradient: false,
            stop: false,
            secondary: false,
            // Initialize custom settings, the background, and the control panel
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
        this.setState({
            shakeEnabled: toggle,
        })
    }

    songEnded = () => {
        this.setState({
            controlPanelVisible: true,
            uploaded: false
        })
    }

    enableColors = toggle => {
        this.setState({
            colors: toggle,
        })
    }

    enableLowerBars = toggle => {
        this.setState({
            lowerBars: toggle,
        })
    }

    enableRemoveBars = toggle => {
        this.setState({
            removeBars: toggle,
        })
    }

    enableGradient = toggle => {
        this.setState({
            gradient: toggle,
        })
    }

    enableSecondary = toggle => {
        this.setState({
            secondary: toggle,
        })
    }

    // The below 2 functions are used to force stop a song when a new file is uploaded
    stopSong = () => {
        this.setState({
            stop: true,
        })
    }

    removeStop = () => {
        this.setState({
            stop: false,
        })
    }

    render() {
        return (
            // Entire screen shakes from the shake effect
            <div className={`container-fluid bg${this.state.active}` + (this.state.isShaking && this.state.shakeEnabled ? " shake" : "")}>
                <div className="row justify-content-center">
                    <div className="col-6 mt-2">
                        <ControlPanel
                            visible={this.state.controlPanelVisible}
                            toggleVisible={() => this.setState({ controlPanelVisible: !this.state.controlPanelVisible })}
                            changeBackground={this.changeBackground} active={this.state.active}
                            uploadSong={this.uploadSong} enableShaking={this.enableShaking} enableColors={this.enableColors}
                            enableLowerBars={this.enableLowerBars} enableRemoveBars={this.enableRemoveBars} enableGradient={this.enableGradient}
                            stopSong={this.stopSong} removeStop={this.removeStop} enableSecondary={this.enableSecondary}
                        />
                    </div>
                </div>
                <div className="row">
                    {this.state.uploaded ? <Visualizer controlPanelVisible={this.state.controlPanelVisible} setShaking={(isShaking) => this.setState({ isShaking })}
                        songEnded={this.songEnded} colorsEnabled={this.state.colors} lowerBars={this.state.lowerBars} removeCenter={this.state.removeBars}
                        gradientEnabled={this.state.gradient} stop={this.state.stop} secondary={this.state.secondary}/> : ""}
                </div>
                <div
                    className="show-control-panel-button" style={{ display: (!this.state.controlPanelVisible ? "block" : "none") }}
                    onClick={() => this.setState({ controlPanelVisible: !this.state.controlPanelVisible })}
                />
            </div>
        );
    }
}