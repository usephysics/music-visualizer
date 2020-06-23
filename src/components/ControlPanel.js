import React from 'react';
import Slider from 'react-slick';
import BgChoice from './BgChoice.js';
/*import axios from 'axios';*/
import '../css/ControlPanel.css';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    upload = () => {
        /*
        let payload = {headers: {'Content-Type': 'multipart/form-data'}, 
                         data: {'file' : document.getElementById("file").files[0]}};
        console.log(payload);
        axios.post("http://localhost:3000/upload", payload, {}).then(res => console.log(res)).catch(rej => console.log(rej));
        */
        document.getElementById("file-name").innerHTML = document.getElementById("file").files[0].name;
    }

    confirm = () => {
        this.props.uploadSong();
    }

    render() {
        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3,
        };
        return (
            <div className="card control-panel" id="panel">
                <div className="card-body text-center">
                    <div className="panel-text mb-2">
                        Upload a song
                    </div>
                    <input type="file" name="file" id="file" accept="audio/*" onChange={this.upload}/>
                    <label for="file">Upload</label>
                    <p id="file-name"></p>
                    <div className="panel-text mt-2 mb-3">
                        Background and effects
                    </div>
                    <div className="carousel mx-auto">
                        <Slider {...settings}>
                            {Array(6).fill(0).map((e,i)=>i+1).map(num =>
                                <BgChoice num={num} active={this.props.active} 
                                changeBackground={this.props.changeBackground}/>
                            )}
                        </Slider>
                    </div>
                    <btn type="button" className="btn btn-success confirm" onClick={this.confirm}>Confirm</btn>
                </div>
            </div>
        );
    }
}