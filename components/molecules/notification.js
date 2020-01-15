import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../themes/toastStyles.css';


export default class Notification extends React.Component{
    render(){
        return (
            <>
                <ToastContainer 
                    toastClassName='fitToast' 
                    position='top-center'
                    autoClose={this.props.timeToClose}
                />
            </>
        );
    }
}