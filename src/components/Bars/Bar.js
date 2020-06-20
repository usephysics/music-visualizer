import React from 'react';
import '../../css/Bars.css';

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 100
        }
    }

    componentDidMount() {
        setInterval(async () => {
            if (Math.random() > 0.5) {
                let random = Math.random()
                this.setState({
                    height: (Math.random() * this.props.varHeight) + this.props.minHeight,
                    transition: (Math.random() * this.props.speed) + this.props.speed,
                    opacity: Math.random() > 0.9 ? Math.random() * 0.20 + 0.30 : this.state.opacity
                })
            }
          }, Math.floor(this.props.speed / 2));
    }

    render() {
        return(
            <div className="bar" style={{
                height: this.state.height+"%", 
                transition: "all " + this.state.transition + "ms ease",
                background: "rgba(255,255,255," + this.state.opacity + ")"
            }}></div>
        )
    }

}