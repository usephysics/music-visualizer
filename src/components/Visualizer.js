import React from 'react';
import Bar from './Bars/Bar.js';
import AudioPlayer from './AudioPlayer.js';
import '../css/Visualizer.css';

var songInterval;

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        const file = document.getElementById("file").files[0];
        const song = new Audio(URL.createObjectURL(file));
        const audioCtx = new AudioContext();
        const analyserNode = audioCtx.createAnalyser();
        const audioSourceNode = audioCtx.createMediaElementSource(song);
        song.play();
        audioSourceNode.connect(analyserNode);
        analyserNode.fftSize = 2048;
        analyserNode.connect(audioCtx.destination);
        const dataArr = new Uint8Array(analyserNode.frequencyBinCount);
        this.state = {
            analyser: analyserNode,
            dataArray: dataArr,
            shake: false,
            song: song,
            songfile: file,
            volume: 0,
        }
    }

    updateDA = () => {
        if (this.state.song.ended) {
            this.props.songEnded();
            window.clearInterval(songInterval);
        }
        if (this.props.stop) this.endSong();
        let sumOfFreqs = 0;
        let analyser = this.state.analyser;
        let dataArr = this.state.dataArray;
        analyser.getByteFrequencyData(dataArr);
        for (let i = 1; i <= 32; i++) {
            sumOfFreqs += dataArr[i * 12];
        }
        this.props.setShaking(dataArr.subarray(4, 8).reduce((total, next) => total += next) / 4 > 240);
        this.setState({
            analyser: analyser,
            dataArray: dataArr,
            volume: sumOfFreqs / 3840,
        });
    }

    componentDidMount() {
        if (!this.state.song.ended) {
            songInterval = setInterval(this.updateDA, 50);
        }
    }

    endSong() {
        let song = this.state.song;
        song.currentTime = song.duration;
    }

    render() {
        return (
            <>
                <div className="visualizer">
                    <div className={!this.props.controlPanelVisible ? "d-none" : ""}> <AudioPlayer audio={this.state.song} /></div>
                    <div className="bars">
                        <div className="hidden-bar"></div>
                        {[...Array(33)].map((e, i) => {
                            let originalIndex = i;
                            i = i > 16 ? i - 2 * (i % 16) + 1 : i + 1;
                            return <Bar height={
                                this.state.dataArray.subarray(Math.floor(i * i / 2), Math.floor(i * i / 2) + 4).reduce((total, next) => 
                                total += next) * Math.pow(this.state.volume, 2.5) / 19.2} colorsEnabled={this.props.colorsEnabled}
                                totalVolume={this.state.volume} index={originalIndex} removeCenter={this.props.removeCenter}
                                gradientEnabled={this.props.gradientEnabled} lowerBars={this.props.lowerBars} i={i}/>
                        })}
                    </div>
                </div>
            </>
        );
    }
}