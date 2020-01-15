import React from 'react';

export default class ProgressBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <div style={{width: "150px", height: "11px", border:"1px solid #707070", marginRight:"15px", position:"relative"}}>
                <div style={{width: this.props.progress + "%", height: "100%", backgroundColor: this.props.barColor }}></div>
            </div>
        )
    }
}