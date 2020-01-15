import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Container } from 'reactstrap'
import Button from '../atoms/button';
import {withTheme} from 'styled-components'
import FormFieldDatePicker from '../molecules/formFieldDatePicker';
import FormField from '../molecules/formField';
import { palette } from 'styled-theme';
import { toast } from "react-toastify";

const AddEventContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.75);
    z-index: 99;
`

const FormContainer = styled.div`
    margin-top: 230px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 20px;
    background-color: white;
    width: 50%;
    min-height: 100px;
    @media screen and (max-width: 1600px) and (min-width: 875px) {
        width: 75%;
    }
    @media screen and (max-width: 875px) and (min-width: 767px){
        width: 85%;
    }
    @media screen and (max-width: 767px) {
        width: 90%;
        margin-top: 60px;
    }
`

const TopBar = styled.div`
    height: 25px;
    width: 100%;
    margin-bottom: 10px;
`

const CancelButton = styled(Button)`
    background-color: ${palette('cancelColor', 0)};
    float: right;
    margin-right: 10px;
    &:hover{
        background-color: ${palette('cancelColor', 1)}
    }
    @media screen and (max-width: 767px) {
        margin-right: 0;
        margin-top: 10px;
    }
`

class AddEventForm extends React.Component{  

    constructor(){
        super();
        this.state = {
            eventStart: new Date(),
            eventEnd: new Date(),
            title: "",
            description: "",
            titleError: false
        };
    }

    componentDidMount(){        
        this.setState({
            eventStart: this.props.start,
            eventEnd: this.props.end
        });
    }

    startDateChange = (newDate) => {
        this.setState({eventStart: newDate});
    }

    endDateChange = (newDate) => {
        this.setState({eventEnd: newDate});
    }

    handleUserInput = (event) => {
        if(event.target.name === "eventTitle"){
            this.setState({title: event.target.value});
        }
        else{
            this.setState({description: event.target.value});
        }
    }

    submitEvent = () =>{
        console.log(this.state);
        if(this.state.title !== "" && this.state.eventStart && this.state.eventEnd){
            this.setState({titleError: false});
            this.props.submitFunction({
                eventStart:this.state.eventStart, 
                eventEnd: this.state.eventEnd, 
                title: this.state.title, 
                description: this.state.description
            });            
        }
        else{
            if(!this.state.eventStart){
                toast.error("The event start date is invalid");
            }
            if(!this.state.eventEnd){
                toast.error("The event end date is invalid");
            }
            if(this.state.title === ""){
                toast.error("An event title is required.");
                this.setState({titleError: true});            
            }
        } 
    }
    

    render(){
        return (
            <AddEventContainer>
                <FormContainer>
                    <TopBar style={{backgroundColor:this.props.theme.palette["primary"][0]}}>
                        <Row>
                            <Col style={{paddingLeft:"30px"}}>
                                <span style={{color:"white", fontWeight:"bold", fontSize:"18px"}}>Add Event</span>
                            </Col>
                            <Col style={{paddingRight:"30px"}}>
                                <div style={{float:"right", cursor:"pointer"}} onClick={this.props.closeForm}>
                                    <FontAwesomeIcon icon={faTimes} style={{color:"#999"}}></FontAwesomeIcon>
                                </div>
                            </Col>
                        </Row>
                    </TopBar>
                    <Container>
                        
                        <Row style={{marginTop: "20px"}}>
                            <Col sm="12" md ="5" lg="5" xl="6">
                                <FormFieldDatePicker
                                    title="Start"
                                    selected={this.state.eventStart}
                                    onChange={this.startDateChange}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeIntervals={15}>
                                </FormFieldDatePicker>                       
                            </Col>
                            <Col sm="12" md ="5" lg="5" xl="6">
                                <FormFieldDatePicker
                                    title="End"
                                    selected={this.state.eventEnd}
                                    onChange={this.endDateChange}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeIntervals={15}>
                                </FormFieldDatePicker>                       
                            </Col>
                        </Row>
                        <Row >                            
                            <Col sm="12" md="6" xl="6">                            
                                <FormField title="Title" value={this.state.title} onChange={this.handleUserInput} name="eventTitle" maxLength="20" invalid={this.state.titleError}></FormField>
                            </Col>
                            <Col sm="12" md="6" xl="6">
                                <FormField title="Description" value={this.state.description} onChange={this.handleUserInput} name="eventDesc" maxLength="50"></FormField>
                            </Col>
                        </Row>
                        <Row style={{marginRight:"0", marginLeft:"0", paddingLeft:"10px"}}>
                            <Col style={{float:"right"}}>
                                <Button onClick={this.submitEvent} style={{float:"right"}}>Create</Button>
                                <CancelButton onClick={this.props.closeForm}>Cancel</CancelButton>                                
                            </Col>                                
                        </Row>
                    </Container>
                </FormContainer>
            </AddEventContainer>
        )
    }
}

export default withTheme(AddEventForm);