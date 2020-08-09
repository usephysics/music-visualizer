import React from 'react';
import '../../css/Bars.css';

export default class Bar extends React.Component {
    getColors = () => {
        if (!this.props.colorsEnabled) return "rgba(255, 255, 255, 0.3)";
        let volume = this.props.totalVolume;
        let factor = (volume ** 5 * 40);
        let offset = 125;
        return `rgba(${factor * 0.3 + offset}, ${factor * 1.5 + offset}, ${factor + offset}, 0.8)`;
    }

    getHeight = () => {
        if (this.props.index >= 12 && this.props.index <= 19 && this.props.removeCenter) return "0%"
        return this.props.height + "%"
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