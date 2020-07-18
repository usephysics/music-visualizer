import React from 'react';
import '../../css/Bars.css';

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 100
        }
    }

    render() {
        return(
            <div className="bar" style={{
                height: this.props.height+"%", 
                transition: "all " + this.state.transition + "ms ease",
            }}></div>
        )
    }

}