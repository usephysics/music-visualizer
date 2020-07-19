import React from 'react';
import Slider from 'react-slick';
import BgChoice from './BgChoice.js';
import '../css/ControlPanel.css';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controlPanelVisible: false,
            playing: false,
        }
    }

    upload = () => {
        if (document.getElementById("file").files[0]) document.getElementById("file-name").innerHTML = document.getElementById("file").files[0].name;
    }

    confirm = () => {
        if(document.getElementById("file").files.length >= 1){
            this.props.uploadSong();
            this.props.toggleVisible();
            this.setState({
                playing: true
            })
        } else {
            alert("No file uploaded");
        }
        this.props.enableShaking(document.getElementById("customSwitch1").checked);
    }

    render() {
        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3,
        };
        return (
            <div className={"control-panel " + (!this.props.visible ? "control-panel-hidden" : "") } id="panel">
                <div className="control-panel-content">
                    <input type="file" name="file" id="file" accept="audio/*" onChange={this.upload}/>
                    <label className="upload-button" for="file">Upload song</label><div id="file-name" className="file-name-text">No file chosen</div>
                    <div className="choose-background-text mt-3 mb-3 text-uppercase text-secondary">
                        choose a background
                    </div>
                    <div className="carousel mx-auto mb-4">
                        <Slider {...settings}>
                            {Array(9).fill(0).map((e,i)=>i+1).map(num =>
                                <BgChoice num={num} active={this.props.active} 
                                changeBackground={this.props.changeBackground}/>
                            )}
                        </Slider>
                    </div>
                    <div className="settings-text my-3 text-uppercase text-secondary">
                        settings
                    </div>
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitch1"/>
                        <label class="custom-control-label" for="customSwitch1">Enable shake</label>
                    </div>
                </div>
                <div className="control-panel-confirm">
                    <div className="confirm-button mt-4" onClick={this.confirm}>{this.state.playing ? "Confirm" : "Play"}</div>
                </div>
            </div>
        );
    }
}