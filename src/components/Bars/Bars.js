import React from 'react';
import '../../css/Bars.css';
import Bar from './Bar'

export default class Bars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: '',
        }
    }

    render() {
        return(
            <div className="bars">
                <div className="hidden-bar"></div>
                {[...Array(40)].map((e, i) => {
                    return <Bar minHeight={30} varHeight={20} speed={200} rgb="215,255,255"/>
                })}
            </div>
        )
    }

}