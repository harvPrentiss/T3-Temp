import React from 'react';


class Dropzone extends React.Component{
    constructor(props){
        super(props);
        this.state = {highlight: false};
        this.fileInput = React.createRef();
        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    openFileDialog(){
        if(this.props.disabled){return;}
        this.fileInput.click();
    }

    onFilesAdded(event){
        if(this.props.disabled) {return;}
        const files = event.target.files;
        if(this.props.onFilesAdded){
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    }

    fileListToArray(list){
        const array = [];
        for(var i = 0; i < list.length; i++){
            array.push(list.item(i));
        }
        return array;
    }

    onDragOver(event){
        event.preventDefault();
        if(this.props.disabled){return;}
        this.setState({highlight: true});
    }

    onDragLeave(event){
        this.setState({highlight: false});
    }

    onDrop(event) {
        event.preventDefault();
        if (this.props.disabled) return;
        const files = event.dataTransfer.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
        this.setState({ hightlight: false });
    }    

    render(){
        return (
            <div className={`DropZone ${this.state.highlight ? "Highlight" : ""}`} 
                onClick={this.openFileDialog} 
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                style={
                    {
                        cursor: this.props.disabled ? "default" : "pointer", 
                        backgroundColor: !this.props.disabled ? this.props.backColor : "#D4D4D4", 
                        color: !this.props.disabled ? 'white' : 'black',
                        fontSize:"14px", 
                        height:"40px",
                        textAlign: "center",
                        lineHeight: "40px",
                        border: "1px solid #707070"
                    }
                }>
                    <input type="file" 
                    multiple 
                    ref={input => this.fileInput = input} 
                    onChange={this.onFilesAdded}
                    style={{display: "none"}} />
                    <span>Choose Files for Upload</span>
                    <span style={{
                        position: 'absolute',
                        right: '20px',
                        bottom: '-2px',
                        fontSize: '10px',
                        color: '#7D7D7D',
                        float: 'right',
                        height: '15px'
                    }}>{this.props.helperText}</span>
            </div>
        );
    }
}

export default Dropzone;