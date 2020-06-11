import React from 'react';
import '../css/ControlPanel.css';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: '',
        }
    }

    upload = () => {
        document.getElementById("file-name").innerHTML = document.getElementById("file").files[0].name;
    }

    render() {
        return (
            <div className="card control-panel">
                <div className="card-body text-center">
                    <div className="panel-text mb-4">
                        Upload a song (mp3)
                    </div>
                    <input type="file" name="file" id="file" accept="audio/*" onChange={this.upload}/>
                    <label for="file">Upload</label>
                    <p id="file-name"></p>
                    <div className="panel-text mt-5 mb-5">
                        Background and effects
                    </div>
                    {/* CAROUSEL */}
                </div>
            </div>
        );
    }
}