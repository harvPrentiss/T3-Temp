import React from "react"
import styled from 'styled-components'
import Button from '../atoms/button'
import Hr from '../atoms/hr'
import Link from '../atoms/link'
import LogoImage from '../atoms/logoImage'
import FormField from '../molecules/formField'
import FormErrors from '../atoms/formErrors'
import { Row, Col, Container } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { getUserInfo } from '../../services/login'
import { navigate } from "gatsby"
import { setUser } from "../../services/auth"
import { toast } from "react-toastify";
import {ErrorMessages} from '../../data/enums'

const StyledContainer = styled(Container)`
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

const StyledLink = styled(Link)`
    font-size: 12px;
    float: right;;
`

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formValid: false,
            formErrors: { email: '', password: '' },
            hasSubmitted: false,
            isError: false,
            disableSubmitButton: false,
            emailValid: false,
            pageErrors: [],
            passwordValid: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm = () => {
        this.setState({
            password: '',
            hasSubmitted: false,
            isError: false,
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
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Your email is invalid';
                break;
            case 'password':
                passwordValid = value.length > 0;
                fieldValidationErrors.password = passwordValid ? '' : 'Password is required';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid, passwordValid: passwordValid, hasSubmitted: false
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: (this.state.emailValid && this.state.passwordValid) });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ disableSubmitButton: true });
        getUserInfo({email: this.state.email, password: this.state.password}).then(function(response) {
            if(!response){
                toast.error(ErrorMessages.serverError);
                this.resetForm();
                return;
            }
            if(response.status === 403){
                this.setState({pageErrors: [response.data]});
                this.setState({disableSubmitButton: false});
                this.resetForm();
            }else{
                this.setState({disableSubmitButton: false});
                setUser({
                    id: response.data.Id,
                    name: response.data.Email,
                    userRoles: response.data.Roles,
                    productLines: response.data.ProductLines
                  });
                if(response.data.HasTempPass){
                    navigate("/user/change-password");
                }
                else{
                    navigate("/");
                }                
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
                            <FormField noLabel={true} title="Email" className={this.errorClass(this.state.formErrors.email)} value={this.state.email} onChange={this.handleUserInput} name="email" required={true}></FormField>
                            <FormField noLabel={true} onKeyPress={this._handleKeyPress} type="password" title="Password" className={this.errorClass(this.state.formErrors.password)} value={this.state.password} onChange={this.handleUserInput} name="password" required={true}></FormField>
                            <StyledLink to="/user/forgot-password">Forgot Password?</StyledLink>
                            <Row>
                                <Col xs="12" sm="12" md="3"></Col>
                                <Col xs="12" sm="12" md="12" >
                                    <br />
                                    {this.state.disableSubmitButton &&
                                        <Button disabled={true} style={{ minWidth: "250px" }} alt="true"><FontAwesomeIcon className="fa-spin fa-pulse fa-2x" icon={faSpinner}></FontAwesomeIcon></Button>
                                    }
                                    {!this.state.disableSubmitButton &&
                                        <Button type="submit" style={{ minWidth: "250px" }} disabled={!this.state.formValid} alt="true">Login</Button>
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
