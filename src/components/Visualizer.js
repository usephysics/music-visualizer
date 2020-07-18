import React from 'react';
import Bar from './Bars/Bar.js';
import '../css/Visualizer.css';

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
            songfile: file
        }
    }

    updateDA = () => {
        let analyser = this.state.analyser;
        let dataArr = this.state.dataArray;
        analyser.getByteFrequencyData(dataArr);
        this.props.setShaking(dataArr.subarray(4,8).reduce((total, next) => total += next) / 4 > 210); //enable/disable shaking animation
        this.setState({
            analyser: analyser, 
            dataArray: dataArr
        });
    }

    componentDidMount() {
        if (!this.state.song.ended){
            setInterval(this.updateDA, 50);
        } else {
            //bring back control panel
        }
    }

    render() {
        return(
            <div className="visualizer">
                <div className="bars">
                    <div className="hidden-bar"></div>
                    {[...Array(32)].map((e, i) => {
                        return <Bar height={this.state.dataArray[i * 12] / 3} rgb={this.state.color}/>
                    })}
                </div>
            </div>
        );
    }
}