import React from 'react';
import Bar from './Bars/Bar.js';
import '../css/Visualizer.css';

var songInterval;

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        let file = document.getElementById("file").files[0];
        // const freqRange = [20, 60, 250, 500, 2000, 4000, 6000, 20000];
        const audioCtx = new AudioContext();
        const song = new Audio(URL.createObjectURL(file));
        song.play();
        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 2048;
        const dataArr = new Uint8Array(analyserNode.frequencyBinCount);
        const audioSourceNode = audioCtx.createMediaElementSource(song);
        audioSourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
        this.state = {
            analyser: analyserNode, 
            dataArray: dataArr,
            shake: false, 
            song: song, 
            songfile: file,
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
        console.log(dataArr);
        analyser.getByteFrequencyData(dataArr);
        for (let i = 1; i <= 32; i++) {
            sumOfFreqs += dataArr[i * 12];
        }
        this.props.setShaking(dataArr.subarray(4,8).reduce((total, next) => total += next) / 4 > 210); //enable/disable shaking animation
        this.setState({
            analyser: analyser, 
            dataArray: dataArr,
            volume: sumOfFreqs / 3840,
        });
    }

    componentDidMount() {
        if (!this.state.song.ended){
            songInterval = setInterval(this.updateDA, 50);
        }
    }

    render() {
        return(
            <div className="visualizer">
                <div className="bars">
                    <div className="hidden-bar"></div>
                    {[...Array(32)].map((e, i) => {
                        var factor;
                        switch(i % 8) {
                            case 0:
                                factor = 6;
                                break;
                            case 2:
                                factor = 4.5;
                                break;
                            case 4:
                                factor = 2;
                                break;
                            case 6:
                                factor = 3.5;
                                break;
                            default:
                                factor = 3;
                        }
                        factor *= 1.2;
                        return <Bar height={this.state.dataArray[Math.floor((i * i) / 1.7)] * this.state.volume / factor}/>
                    })}
                </div>
            </div>
        );
    }
}