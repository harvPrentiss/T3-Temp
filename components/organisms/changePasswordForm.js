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
import { changeTempPassword } from '../../services/login'
import { navigate } from "gatsby"
import { getUser } from "../../services/auth"
import { toast } from "react-toastify"
import {ErrorMessages} from '../../data/enums'

const StyledContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
`
const LoginContainer = styled.div`
    width: 500px;
    margin: auto;
    padding: 20px;
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
export default class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirm: '',
            tempPassword: '',
            formValid: false,
            formErrors: {password: '', tempPassword: '', passwordConfirm: '' },
            hasSubmitted: false,
            isError: false,
            disableSubmitButton: false,
            passwordConfirmValid: false,
            tempPasswordValid: false,
            pageErrors: [],
            passwordValid: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm = () => {
        this.setState({
            password: '',
            passwordConfirm:'',
            tempPassword: '',
            hasSubmitted: false,
            isError: false,
            formValid: false,
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
        let passwordValid = this.state.passwordValid;
        let passwordConfirmValid = this.state.passwordConfirmValid;
        let tempPasswordValid = this.state.tempPasswordValid;
        switch (fieldName) {
            case 'password':
                passwordValid = value.length > 0;
                fieldValidationErrors.password = passwordValid ? '' : 'Password is required';
                break;
            case 'tempPassword':
                tempPasswordValid = value.length > 0;
                fieldValidationErrors.password = tempPasswordValid ? '' : 'Temp Password is required';
                break;
            case 'passwordConfirm':
                passwordConfirmValid = value.length > 0 && value === this.state.password;
                fieldValidationErrors.password = passwordConfirmValid ? '' : 'Passwords do not match';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            passwordValid: passwordValid, passwordConfirmValid: passwordConfirmValid, tempPasswordValid: tempPasswordValid, hasSubmitted: false
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: (this.state.passwordValid && this.state.tempPasswordValid && this.state.passwordConfirmValid) });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ disableSubmitButton: true });
        changeTempPassword({email: getUser().name, password: this.state.tempPassword, newPassword: this.state.password  }).then(function(response) {
            if(!response){
                toast.error(ErrorMessages.serverError)
                this.resetForm();
                return;
            }
            if(response !== true){
                this.setState({pageErrors: [response.data]});
                this.setState({disableSubmitButton: false});
                this.resetForm();
            }else{
                navigate('/');
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
                            <StyledP>You are currently using a temporary password. Please change your password.</StyledP>
                            <FormField noLabel={true} onKeyPress={this._handleKeyPress} type="password" title="Temp Password" className={this.errorClass(this.state.formErrors.tempPassword)} value={this.state.tempPassword} onChange={this.handleUserInput} name="tempPassword" required={true}></FormField>
                            <Hr></Hr>
                            <FormField noLabel={true} onKeyPress={this._handleKeyPress} type="password" title="New Password" className={this.errorClass(this.state.formErrors.password)} value={this.state.password} onChange={this.handleUserInput} name="password" required={true}></FormField>
                            <FormField noLabel={true} onKeyPress={this._handleKeyPress} type="password" title="New Password Confirm" className={this.errorClass(this.state.formErrors.passwordConfirm)} value={this.state.passwordConfirm} onChange={this.handleUserInput} name="passwordConfirm" required={true}></FormField>
                            <Row>
                                <Col xs="12" sm="12" md="3"></Col>
                                <Col xs="12" sm="12" md="12" >
                                    <br />
                                    {this.state.disableSubmitButton &&
                                        <Button disabled={true} style={{ minWidth: "250px" }} alt="true"><FontAwesomeIcon className="fa-spin fa-pulse fa-2x" icon={faSpinner}></FontAwesomeIcon></Button>
                                    }
                                    {!this.state.disableSubmitButton &&
                                        <Button type="submit" style={{ minWidth: "250px" }} disabled={!this.state.formValid} alt="true">Change Password</Button>
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
