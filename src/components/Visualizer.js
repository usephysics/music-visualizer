import React from 'react';
import Bar from './Bars/Bar.js';
import '../css/Visualizer.css';
import AudioPlayer from './AudioPlayer.js';

var songInterval;

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        const file = document.getElementById("file").files[0];
        const song = new Audio(URL.createObjectURL(file));
        song.play();
        const audioCtx = new AudioContext();
        const analyserNode = audioCtx.createAnalyser();
        const audioSourceNode = audioCtx.createMediaElementSource(song);
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
            //shakeTimer: 0
        }
    }

    updateDA = () => {
        if (this.state.song.ended) {
            this.props.songEnded();
            window.clearInterval(songInterval);
        }
        let sumOfFreqs = 0;
        let analyser = this.state.analyser;
        let dataArr = this.state.dataArray;
        analyser.getByteFrequencyData(dataArr);
        for (let i = 1; i <= 32; i++) {
            sumOfFreqs += dataArr[i * 12];
        }
        this.props.setShaking(dataArr.subarray(4, 8).reduce((total, next) => total += next) / 4 > 235);

        /*
        if (this.state.shakeTimer === 0 && dataArr.subarray(4,8).reduce((total, next) => total += next) / 4 > 210) {
            this.props.setShaking(true); //enable/disable shaking animation
            this.setState({
                shakeTimer: 10
            })
        } else if(this.state.shakeTimer === 9) {
            this.props.setShaking(false);
        } */
        this.setState({
            analyser: analyser,
            dataArray: dataArr,
            volume: sumOfFreqs / 3840,
            // shakeTimer: this.state.shakeTimer === 0 ? 0 : (this.state.shakeTimer) - 1,
        });
    }

    componentDidMount() {
        if (!this.state.song.ended) {
            songInterval = setInterval(this.updateDA, 50);
        }
    }

    render() {
        return (
            <>
                <div className="visualizer">
                    <div className={!this.props.controlPanelVisible ? "d-none" : ""}> <AudioPlayer audio={this.state.song} /></div>
                    <div className="bars">
                        <div className="hidden-bar"></div>
                        {[...Array(33)].map((e, i) => {
                            // let factorArr = [6,3,4.5,3,2,3,3.5,3]
                            // let factor = factorArr[i % 8] * 1.2;
                            i = i > 16 ? i - 2 * (i % 16) + 1 : i + 1;
                            i = i === 33 ? 1 : i;
                            return <Bar height={this.state.dataArray.subarray(Math.floor(i * i / 2), Math.floor(i * i / 2) + Math.ceil(i / 4 + 0.01)).reduce((total, next) =>
                                total += next) / (Math.ceil(i / 4 + 0.01) * 3) * (Math.pow(this.state.volume, 2.5) / 1.6)} />
                        })}
                    </div>
                </div>
            </>
        );
    }
}