import React from 'react';
import Slider from 'react-slick';
import BgChoice from './BgChoice.js';
import '../css/ControlPanel.css';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controlPanelVisible: false
        }
    }

    upload = () => {
        document.getElementById("file-name").innerHTML = document.getElementById("file").files[0].name;
    }

    confirm = () => {
        if(document.getElementById("file").files.length == 1){
            this.props.uploadSong();
            this.props.toggleVisible();
        }else{
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
        return (
            <div className={"control-panel " + (!this.props.visible ? "control-panel-hidden" : "") } id="panel">
                <div className="control-panel-content">
                    <input type="file" name="file" id="file" accept="audio/*" onChange={this.upload}/>
                    <label className="upload-button" for="file">Upload song</label><div id="file-name" className="file-name-text">No file chosen</div>
                    <div className="choose-background-text mt-3 mb-3 text-uppercase text-secondary">
                        choose a background
                    </div>
                    <div className="carousel mx-auto">
                        <Slider {...settings}>
                            {Array(6).fill(0).map((e,i)=>i+1).map(num =>
                                <BgChoice num={num} active={this.props.active} 
                                changeBackground={this.props.changeBackground}/>
                            )}
                        </Slider>
                    </div>
                </div>
                <div className="control-panel-confirm">
                    <div className="confirm-button mt-4" onClick={this.confirm}>Confirm</div>
                </div>
            </div>
        );
    }
}