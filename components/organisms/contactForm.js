import React from "react"
import {SendContactUs} from '../../services/user'
import Button from '../atoms/button'
import FormField from '../molecules/formField'
import FormFieldTextArea from '../molecules/formFieldTextArea'
import styled from 'styled-components'
import { toast } from "react-toastify"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const FormContainer = styled.div`
    max-width: 50%;    
    @media screen and (max-width: 767px) {
        max-width: 100%;
        margin-bottom: 100px;
    }
`

export default class ContactForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            submitting: false,
            emailError: false,
            messageError: false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    handleUserInput = (event) => {
        if(event.target.name === "email"){
            this.setState({email: event.target.value});
        }
        else{
            this.setState({message: event.target.value});
        }
    }

    validateEmail = () => {
        var  emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);        
        if(emailValid)
        {
            this.setState({emailError: false}, () =>{
                return true;
            });
        }
        else{
            this.setState({emailError: true}, () =>{
                return false;
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({messageError: false, emailError: false});   
        this.validateEmail();     
        var emailVal = !this.state.emailError;
        var messVal = this.state.message.length > 3;
        if(emailVal && messVal){
            this.setState({submitting: true}, () => {
                SendContactUs({email: this.state.email, message: this.state.message})
                .then(res => {
                    if(res === "Message Sent"){
                        toast.success("Message Sent Successfully")
                    }
                    else{
                        toast.error("Error Sending Message");
                    }
                    this.setState({message: "", email:"", submitting: false});
                });
            });   
        }   
        else{
            if(!emailVal){
                toast.error("That is not a valid email address")
            }
            if(!messVal){
                this.setState({messageError: true})
                toast.error("The message must be more than 3 characters.")
            }
            
        }     
    }

    render(){
        return (
            <FormContainer>
                <form id="form" onSubmit={this.handleSubmit}>
                        <FormField title="Email" value={this.state.email} onChange={this.handleUserInput} name="email" required={true} invalid={this.state.emailError}></FormField>
                        <FormFieldTextArea  title="Message" value={this.state.message} onChange={this.handleUserInput} name="message" maxLength="350" required={true} invalid={this.state.messageError}></FormFieldTextArea>
                        <span style={{ float:"left", color:this.state.resultColor }}>{this.state.result}</span>
                        <Button onClick={this.handleSubmit} style={{ minWidth: "250px", float:"right" }} alt="Submit" disabled={this.state.submitting}>
                            {!this.state.submitting && "Submit"}
                            {this.state.submitting && <FontAwesomeIcon className="fa-spin fa-pulse fa-2x" icon={faSpinner}></FontAwesomeIcon>}
                        </Button>
                </form>    
            </FormContainer>
        );
    }
}