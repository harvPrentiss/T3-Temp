import React from "react"
import styled from 'styled-components'
import Button from '../atoms/button'
import FormField from '../molecules/formField'
import FormErrors from '../atoms/formErrors'
import Checkbox from '../atoms/checkbox'
import Hr from '../atoms/hr'
import { Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {GetRoles, IsEmailFree, CreateUser, GetUserById, EditUser} from "../../services/user"
import FormContainer from '../atoms/formContainer'
import FormHeader from '../molecules/formHeader'
import { toast } from "react-toastify"
import { getUser, HasRole } from "../../services/auth"

const StyledContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
`

export default class CreateUserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id:'',
            email: '',
            formValid: false,
            roles: [],
            formErrors: { email: ''},
            hasSubmitted: false,
            isError: false,
            disableSubmitButton: false,
            emailValid: false,
            pageErrors: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    resetForm = () => {
        this.setState({
            email: '',
            hasSubmitted: false,
            isError: false,
            disableSubmitButton: false
        });
    }

    componentDidMount(){
        if(this.props.Id && this.props.Id.length !== "0"){ // Edit an existing user
            GetUserById(this.props.Id).then(data => {
                if(data.err){

                }else{
                    this.getRolesAndProductLines(true, data.Roles);
                    this.setState({
                        email: data.Email,
                        Id: this.props.Id,
                        formValid: true
                    });
                }
            });
        }else{
            this.getRolesAndProductLines(false);
        }
    }

    getRolesAndProductLines(editUserMode, userRoles) {
        GetRoles({id:this.props.Id}).then(data => {
            if(data.err){return;}
            this.setState(
                {
                    roles: data.map(role => ({
                        id: role.Id, 
                        value:role.Value,
                        checked: editUserMode ? HasRole(userRoles, role.Id) : false
                }))
            })
            
        });
    }

    resetForm = () => {
        this.setState({
            email: '',
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

    handleRolesChange = (id) => {
            let roles = [...this.state.roles];
            let role = {...roles[id-1]};
            role.checked = !role.checked;
            roles[id-1] = role;
            this.setState({roles : roles});
        }
   
    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ disableSubmitButton: true });
        if(this.state.roles.filter(x=> x.checked).length === 0){
            toast.error("You must have at least one role selected.");
            this.setState({ disableSubmitButton: false });
            return;
        }

        if(this.props.Id){
            EditUser(this.state).then(function(data) {
                if(!data){
                    toast.error("An Error has occurred. Please Try again.");
                }
                else{
                    if(this.props.Id === getUser().id){
                        toast.success("User saved successfully. Please re-login to see changes on the current logged in user.");
                    }else{
                        toast.success("User saved successfully");
                    }
                    
                }
                this.setState({ disableSubmitButton: false });
            }.bind(this));
        }
        
        else{
            IsEmailFree(this.state.email).then(data => {
                if(!data){
                    toast.error("The email that you have entered is already taken.");
                    this.setState({ disableSubmitButton: false });
                }else{
                    CreateUser(this.state).then(function(data) {
                        if(data.err){
                            
                            this.resetForm();
                        }else{
                            this.state.roles.forEach(role => {
                                role.checked = false
                            });
                            toast.success("User has been created successfully.  Email instructions have been sent to "+ this.state.email)
                            this.resetForm();
                        }
                    }.bind(this));
                }
            });
        }
    }
    render() {
       const rolesItems = this.state.roles.map((item, key) =>
            <Col key={key} xs="12" sm="12" md="8" lg="4">
                <Checkbox  title={item.value} checked={item.checked} onChange={(e) => this.handleRolesChange(item.id, e)}></Checkbox>
            </Col>   
       );
    
        return (
            <FormContainer>
                <form id="form" onSubmit={this.handleSubmit}>
                    <StyledContainer>
                        <FormField disabled={this.props.Id } noLabel={true} title="Email" className={this.errorClass(this.state.formErrors.email)} value={this.state.email} onChange={this.handleUserInput} name="email" required={true}></FormField>
                        <Row>
                            <FormHeader>User Roles</FormHeader>
                        </Row>
                        <Row>
                            {rolesItems}                                
                        </Row>
                        <Hr/>
                        <Row>
                            <Col xs="12" sm="12" md="3"></Col>
                            <Col xs="12" sm="12" md="12" >
                                <br />
                                {this.state.disableSubmitButton &&
                                    <Button disabled={true} style={{ minWidth: "250px" }} alt="true"><FontAwesomeIcon className="fa-spin fa-pulse fa-2x" icon={faSpinner}></FontAwesomeIcon></Button>
                                }
                                {!this.state.disableSubmitButton && !this.props.Id &&
                                    <Button type="submit" style={{ minWidth: "250px" }} disabled={!this.state.formValid} alt="true">Create User</Button>
                                }
                                  {!this.state.disableSubmitButton && this.props.Id &&
                                    <Button type="submit" style={{ minWidth: "250px" }} disabled={!this.state.formValid} alt="true">Save User</Button>
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
             </FormContainer>
        );
    }
}
