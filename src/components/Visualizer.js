import React from 'react';
import Bar from './Bars/Bar.js';

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        const freqRange = [20, 60, 250, 500, 2000, 4000, 6000, 20000];
        const audioCtx = new AudioContext();
        const song = new Audio();
        song.src = '../files/T2.mp3';
        song.play();
        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 2048;
        const dataArr = new Uint8Array(analyserNode.frequencyBinCount);
        //call bars with this
        const audioSourceNode = audioCtx.createMediaElementSource(song);
        audioSourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
        this.state = {analyser: analyserNode, dataArray: dataArr, color: "255,255,255"}
    }

    updateDA = () => {
        let analyser = this.state.analyser;
        let dataArr = this.state.dataArray;
        analyser.getByteFrequencyData(dataArr);
        console.log(dataArr);
        this.setState({analyser: analyser, dataArray: dataArr, color: 
            dataArr.subarray(4,8).reduce((total, next) => total += next)/4 > 210 ? "150,255,255" : "255,255,255"});
    }

    componentDidMount(){
        setInterval(this.updateDA, 25);
    }

    render() {
        return(
            <div className="bars">
                <div className="hidden-bar"></div>
                {[...Array(32)].map((e, i) => {
                    return <Bar minHeight={this.state.dataArray[i*i]/2.56} varHeight={0} speed={200} rgb={this.state.color}/>
                })}
            </div>
        );
    }
}