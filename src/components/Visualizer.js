import React from 'react';
import Bar from './Bars/Bar.js';
import AudioPlayer from './AudioPlayer.js';
import '../css/Visualizer.css';

/* This component handles all the logic and rendering of the bars */

// This will be used as the interval that runs every 25 milliseconds to update the bars
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
        // Initialize all audio tools and data
        this.state = {
            analyser: analyserNode,
            dataArray: dataArr,
            shake: false,
            song: song,
            songfile: file,
            volume: 0,
        }
    }

    // This function runs every 25 milliseconds. It pulls the current audio data, and stores it in state for rendering
    updateDA = () => {
        // When the song has ended, stop running this function every 25 ms
        if (this.state.song.ended) {
            this.props.songEnded();
            window.clearInterval(songInterval);
        }
        if (this.props.stop) this.endSong();
        let sumOfFreqs = 0;
        let analyser = this.state.analyser;
        let dataArr = this.state.dataArray;
        analyser.getByteFrequencyData(dataArr);
        // Used to get overall volume at a given moment
        for (let i = 1; i <= 32; i++) {
            sumOfFreqs += dataArr[i * 12];
        }
        // Logic used to shake the screen, if the setting is enabled
        this.props.setShaking(dataArr.subarray(4, 8).reduce((total, next) => total += next) / 4 > 240);
        // Update data, prepare for render
        this.setState({
            analyser: analyser,
            dataArray: dataArr,
            volume: sumOfFreqs / 3840,
            sumOfFreqs: sumOfFreqs,
        });
    }

    componentDidMount() {
        // Set the 25 ms interval
        if (!this.state.song.ended) {
            songInterval = setInterval(this.updateDA, 25);
        }
    }

    // Used to force end a song, if a new file is uploaded
    endSong() {
        let song = this.state.song;
        song.currentTime = song.duration;
    }

    render() {
        return (
            <div className="visualizer">
                {/* This is the playblack controls - active when control panel is visible */}
                <div className={!this.props.controlPanelVisible ? "d-none" : ""}> <AudioPlayer audio={this.state.song} /></div>
                <div className="bars">
                    <div className="hidden-bar"></div>
                    {[...Array(33)].map((e, i) => {
                        // Custom algorithms to render bar heights based off of extracted frequency data
                        let originalIndex = i;
                        i = i > 16 ? i - 2 * (i % 16) : i + 1; 
                        if (!this.props.secondary) {
                            return <Bar height={
                                this.state.dataArray.subarray(Math.floor(i * i / 2), Math.floor(i * i / 2) + 4).reduce((total, next) => 
                                total += next) * Math.pow(this.state.volume, 2.5) / 19.2} colorsEnabled={this.props.colorsEnabled}
                                totalVolume={this.state.volume} index={originalIndex} removeCenter={this.props.removeCenter}
                                gradientEnabled={this.props.gradientEnabled} lowerBars={this.props.lowerBars} i={i}/>
                        }
                        let freqList = [];
                        i = i === 17 ? 16 : i;
                        freqList = [1, 3, 5, 7, 10, 13, 21, 29, 46, 63, 96, 134, 212, 290, 380, 465, 576, 632, 690];
                        return <Bar height={(this.props.lowerBars ? 0.65 : 1) *
                            this.state.dataArray.subarray(freqList[i],freqList[i+1]).reduce((total, next) => 
                            total += next)/((freqList[i+1]-freqList[i])*2.75)} colorsEnabled={this.props.colorsEnabled}
                            totalVolume={this.state.volume / 2 + this.state.sumOfFreqs / 16320} i={i}
                            index={originalIndex} removeCenter={this.props.removeCenter}
                            gradientEnabled={this.props.gradientEnabled} lowerBars={this.props.lowerBars}/>
                    })}
                </div>
            </div>
        );
    }
}
