import React from "react"
import styled from 'styled-components'
import Button from '../atoms/button'
import Hr from '../atoms/hr'
import LogoImage from '../atoms/logoImage'
import FormField from '../molecules/formField'
import FormErrors from '../atoms/formErrors'
import { Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { forgotLogin } from '../../services/login'
import { toast } from "react-toastify";
import {ErrorMessages} from '../../data/enums'

const StyledContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
`
const LoginContainer = styled.div`
    width: 500px;
    margin: auto;
    padding: 20px;
    @media screen and (max-width: 767px) {
      width: auto;
    }
`
const ImageContainer = styled.div`
   max-width: 325px;
   margin: 20px auto 30px auto;
`

const StyledP = styled.p`
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 14px;

`

export default class ForgotLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            formValid: false,
            formErrors: { email: '', password: '' },
            hasSubmitted: false,
            isError: false,
            disableSubmitButton: false,
            emailValid: false,
            pageErrors: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm = () => {
        this.setState({
            email: '',
            hasSubmitted: false,
            isError: false,
            formValid: false,
            pageErrors: [],
            disableSubmitButton: false
        });
    }


    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Your email is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid, hasSubmitted: false
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: (this.state.emailValid) });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ disableSubmitButton: true });
        forgotLogin(this.state.email).then(function(response) {
            if(!response){
                toast.error(ErrorMessages.serverError);
                this.resetForm();
                return;
            }
            if(response !== true){
                this.setState({pageErrors: [response.data]});
                this.setState({disableSubmitButton: false});
                toast.error(response.data);
                this.resetForm();
            }else{
                //this.setState({disableSubmitButton: false, pageErrors: []});
                this.resetForm();
                toast.success("Password has been reset successfully.  Please check your email for instructions.");
            }
           
        }.bind(this));
    }
    render() {
        return (
            <>
                <Hr></Hr>
                <LoginContainer>
                    <ImageContainer>
                        <LogoImage></LogoImage>
                    </ImageContainer>
                    <form id="form" onSubmit={this.handleSubmit}>
                        <StyledContainer>
                            <StyledP>Please enter the email you wish to recover.</StyledP>
                            <FormField noLabel={true} title="Email" className={this.errorClass(this.state.formErrors.email)} value={this.state.email} onChange={this.handleUserInput} name="email" required={true}></FormField>
                            <Row>
                                <Col xs="12" sm="12" md="3"></Col>
                                <Col xs="12" sm="12" md="12" >
                                    <br />
                                    {this.state.disableSubmitButton &&
                                        <Button disabled={true} style={{ minWidth: "250px" }} alt="true"><FontAwesomeIcon className="fa-spin fa-pulse fa-2x" icon={faSpinner}></FontAwesomeIcon></Button>
                                    }
                                    {!this.state.disableSubmitButton &&
                                        <Button type="submit" style={{ minWidth: "250px" }} disabled={!this.state.formValid} alt="true">Send Temp Password</Button>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" sm="12" md="12" >
                                    <FormErrors formErrors={this.state.formErrors} />
                                    <FormErrors formErrors={this.state.pageErrors} />
                                </Col>
                            </Row>
                        </StyledContainer>
                    </form>
                </LoginContainer>
                <Hr></Hr>
             </>
        );
    }
}
