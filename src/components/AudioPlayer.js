import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import '../css/AudioPlayer.css';

export default class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { playing: true };
        this.audio = this.props.audio;
    };

    componentDidMount() {
        this.audio.addEventListener("timeupdate", () => {
            if (this.timeline == null) return;
            let ratio = this.audio.currentTime / this.audio.duration;
            let position = (this.timeline.offsetWidth * ratio) + this.timeline.offsetLeft;
            this.positionHandle(position);
        });
    };

    positionHandle = (position) => {
        if (this.timeline == null || this.handle == null) return;
        let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
        let handleLeft = position - this.timeline.offsetLeft;
        if (handleLeft >= 0 && handleLeft <= timelineWidth) {
            this.handle.style.marginLeft = handleLeft + "px";
        }
        if (handleLeft < 0) {
            this.handle.style.marginLeft = "0px";
        }
        if (handleLeft > timelineWidth) {
            this.handle.style.marginLeft = timelineWidth + "px";
        }
    };

    mouseMove = (e) => {
        if (this.timeline == null || this.handle == null) return;
        this.positionHandle(e.pageX);
        this.audio.currentTime = ((e.pageX - this.timeline.offsetLeft) / this.timeline.offsetWidth) * this.audio.duration;
        this.audio.play();
        this.setState({ playing: true });
    };

    mouseUp = (e) => {
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('mouseup', this.mouseUp);
    };

    mouseDown = (e) => {
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('mouseup', this.mouseUp);
    };

    play = () => {
        if (this.state.playing) {
            this.setState({ playing: false });
            this.audio.pause();
        } else {
            this.setState({ playing: true });
            this.audio.play();
        }
    };

    render() {
        return <div className="audio-player">
            <div className="play-pause-btn" onClick={this.play}>{this.state.playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</div>
            <div className="timeline" onClick={this.mouseMove} ref={(timeline) => { this.timeline = timeline }}>
                <div className="line"></div>
                <div className="handle" onMouseDown={this.mouseDown} ref={(handle) => { this.handle = handle }} />
            </div>
        </div>
    }
}