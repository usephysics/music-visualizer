import React from 'react';
import ControlPanel from './ControlPanel.js';
import Visualizer from './Visualizer.js';
import '../css/LandingPage.css';
// import AudioPlayer from './AudioPlayer.js';

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

    render() {
        return (
            <div className={`container-fluid bg${this.state.active}` + (this.state.isShaking && this.state.shakeEnabled ? " shake" : "")}>
                <div className="row justify-content-center">
                    <div className="col-6 mt-2">
                        <ControlPanel
                            visible={this.state.controlPanelVisible}
                            toggleVisible={() => this.setState({ controlPanelVisible: !this.state.controlPanelVisible })}
                            changeBackground={this.changeBackground} active={this.state.active}
                            uploadSong={this.uploadSong} enableShaking={this.enableShaking} enableColors={this.enableColors}
                            enableLowerBars={this.enableLowerBars} enableRemoveBars={this.enableRemoveBars} enableGradient={this.enableGradient}
                        />
                    </div>
                </div>
                <div className="row">
                    {this.state.uploaded ? <Visualizer controlPanelVisible={this.state.controlPanelVisible} setShaking={(isShaking) => this.setState({ isShaking })}
                        songEnded={this.songEnded} colorsEnabled={this.state.colors} lowerBars={this.state.lowerBars} removeCenter={this.state.removeBars}
                        gradientEnabled={this.state.gradient}/> : ""}
                </div>
                <div
                    className="show-control-panel-button" style={{ display: (!this.state.controlPanelVisible ? "block" : "none") }}
                    onClick={() => this.setState({ controlPanelVisible: !this.state.controlPanelVisible })}
                />
            </div>
        );
    }
}