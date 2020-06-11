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
                    <div className="panel-text mb-2">
                        Upload a song
                    </div>
                    <input type="file" name="file" id="file" accept="audio/*" onChange={this.upload}/>
                    <label for="file">Upload</label>
                    <p id="file-name"></p>
                    <div className="panel-text mt-2 mb-5">
                        Background and effects
                    </div>
                    {/* CAROUSEL */}
                    <button className="btn btn-primary btn-lg" onClick={() => 
                    this.props.changeBackground(this.props.num + 1)}>Click Me</button>
                </div>
            </div>
        );
    }
}