import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import '../css/AudioPlayer.css';

/* This component renders the playback controls when a song is playing */

export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playing: true };
        this.lastTimeUpdate = 0;
    };

    componentDidMount() {
        this.props.audio.addEventListener("timeupdate", () => {
            if (Date.now() - this.lastTimeUpdate < 300) return;
            if (this.timeline == null) return;
            this.lasteTimeUpdate = Date.now();
            let ratio = this.props.audio.currentTime / this.props.audio.duration;
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
        this.props.audio.currentTime = ((e.pageX - this.timeline.offsetLeft) / this.timeline.offsetWidth) * this.props.audio.duration;
        this.props.audio.play();
        this.setState({ playing: true });
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('mouseup', this.mouseUp);
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
            this.props.audio.pause();
        } else {
            this.setState({ playing: true });
            this.props.audio.play();
        }
    };

    render() {
        let timeLeft = Math.round(this.props.audio.duration - this.props.audio.currentTime);
        let seconds = (timeLeft % 60);
        let minutes = (timeLeft - seconds) / 60
        return <div className="audio-player">
            <div className="play-pause-btn" onClick={this.play}>{this.state.playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}</div>
            <div className="timeline" onMouseUp={this.mouseUp} onMouseDown={this.mouseMove} ref={(timeline) => { this.timeline = timeline }}>
                <div className="line"></div>
                <div className="handle" onMouseDown={this.mouseDown} ref={(handle) => { this.handle = handle }} />
            </div>
            <div className="timeline-time">-{minutes + ":" + seconds.toString().padStart(2, 0)}</div>
        </div>
    }
}
