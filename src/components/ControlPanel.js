import React from 'react';
import Slider from 'react-slick';
import BgChoice from './BgChoice.js';
import '../css/ControlPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controlPanelVisible: false,
            playing: false,
            colorToggle: false,
        }
    }

    handleChange = e => {
        this.setState({colorToggle: !this.state.colorToggle});
    }

    upload = () => {
        if (document.getElementById("file").files[0]) {
            let fileName = document.getElementById("file").files[0].name;
            document.getElementById("file-name").innerHTML = fileName.replace(/\.[^/.]+$/, "");
            if (this.state.playing) {
                this.setState({
                    playing: false,
                })
                this.props.stopSong();
                setTimeout(() => {
                    this.props.removeStop();
                }, 200);
            }
        }
    }

    confirm = () => {
        if (document.getElementById("file").files.length >= 1 || this.state.playing) {
            this.props.uploadSong();
            this.props.toggleVisible();
            this.setState({
                playing: true
            })
            this.props.enableShaking(document.getElementById("shakeSwitch").checked);
            this.props.enableColors(document.getElementById("colorSwitch").checked);
            this.props.enableLowerBars(document.getElementById("lowerBarSwitch").checked);
            this.props.enableRemoveBars(document.getElementById("removeBarsSwitch").checked);
            this.props.enableGradient(document.getElementById("gradientSwitch").checked);
            this.props.enableSecondary(document.getElementById("secondarySwitch").checked);
        } else {
            alert("No file uploaded");
        }
    }

    render() {
        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3,
        };
        let epilepsy = this.state.colorToggle ? <div class="font-weight-bold mt-4">EPILEPSY WARNING: ENABLING COLOR CHANGE MAY CREATE FLASHING LIGHTS</div> : null;
        return (
            <div className={"control-panel " + (!this.props.visible ? "control-panel-hidden" : "")} id="panel">
                <div className="control-panel-content">
                    <input type="file" name="file" id="file" accept="audio/*" onChange={this.upload} />
                    <label className="upload-button" for="file"><FontAwesomeIcon icon={faUpload} /> &nbsp;&nbsp;Upload song</label>
                    <div id="file-name" className="file-name-text">No file chosen</div>
                    <div className="choose-background-text mt-3 mb-3 text-uppercase text-secondary">
                        choose a background
                    </div>
                    <div className="carousel mx-auto mb-4">
                        <Slider {...settings}>
                            {Array(4).fill(0).map((e, i) => i + 1).map(num =>
                                <BgChoice num={num} active={this.props.active}
                                    changeBackground={this.props.changeBackground}/>
                            )}
                        </Slider>
                    </div>
                    <div className="settings-text my-3 text-uppercase text-secondary">
                        settings
                    </div>
                    <div class="row">
                        <div class="col custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="colorSwitch" onChange={(e) => this.handleChange(e)}/>
                            <label class="custom-control-label" for="colorSwitch">Enable color change</label>
                        </div>
                        <div class="col custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="shakeSwitch"/>
                            <label class="custom-control-label" for="shakeSwitch">Enable shake</label>
                        </div>
                        <div class="col custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="gradientSwitch"/>
                            <label class="custom-control-label" for="gradientSwitch">Enable color gradient</label>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="removeBarsSwitch"/>
                            <label class="custom-control-label" for="removeBarsSwitch">Remove center bars</label>
                        </div>
                        <div class="col custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="secondarySwitch"/>
                            <label class="custom-control-label" for="secondarySwitch">Different algorithm</label>
                        </div>
                        <div class="col custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="lowerBarSwitch"/>
                            <label class="custom-control-label" for="lowerBarSwitch">Lower bars</label>
                        </div>
                    </div>
                    {epilepsy}
                </div>
                <div className="control-panel-confirm">
                    <div className="confirm-button mt-2" onClick={this.confirm}>{this.state.playing ? "Confirm" : "Play"}</div>
                </div>
            </div>
        );
    }
}