import React from 'react';
import '../../css/Bars.css';

export default class Bar extends React.Component {
    getColors = () => {
        if (!this.props.colorsEnabled && !this.props.gradientEnabled) return "rgba(255, 255, 255, 0.3)";
        let i = this.props.i;
        if (!this.props.colorsEnabled && this.props.gradientEnabled) return `rgba(${255 * i / 17}, ${10 * (i / 7)}, ${255 * (17 - i) / 17}, 0.8)`;
        let factor = (this.props.totalVolume ** 5 * 40);
        let offset = 125;
        if (!this.props.gradientEnabled) return `rgba(${factor * 0.3 + offset}, ${factor * 1.5 + offset}, ${factor + offset}, 0.8)`;
        factor = this.props.totalVolume / 1.45;
        return `rgba(${factor * 255 * i / 17}, ${factor * 10 * (i / 7)}, ${factor * 255 * (17 - i) / 17}, ${factor})`
    }

    getHeight = () => {
        if (this.props.removeCenter && this.props.index >= 12 && this.props.index <= 19) return "0%"
        return this.props.height * (this.props.lowerBars ? 0.65 : 1) + "%";
    }

    render() {
        return(
            <div className="bar" style={{
                height: this.getHeight(), 
                transition: "all ms ease",
                backgroundColor: this.getColors(),
            }}></div>
        )
    }
}