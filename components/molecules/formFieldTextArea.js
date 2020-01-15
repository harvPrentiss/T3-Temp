import React from "react"
import Label from '../atoms/label'
import styled from 'styled-components'
import Input from '../atoms/input'
import {Col, Row} from 'reactstrap'

const StyledContainer = styled.div`
    margin-bottom: 5px;
`
const StyledLabel = styled(Label)`
    @media screen and (max-width: 993px) {
        float: left;
    } 
`

const CounterLabel = styled(Label)`
    position: relative;
    right: 5px;
    top: -15px;
    font-size: 10px;
    color: #7D7D7D;
    float: right;
    height: 15px;
`
const StyledTextArea = styled(Input)`
    padding-top: 10px;
`

export default class FormFieldTextArea extends React.Component {
  render() {   
    return (
        <StyledContainer>
            <Row>
                { !this.props.noLabel &&
              
                <Col xs="12" sm="12" md={this.props.noLabel ? "12" :"4"} style={{textAlign: this.props.align ? this.props.align : "left"}}>
                    <StyledLabel>{this.props.title}{this.props.required ? "*": ""} &nbsp;</StyledLabel>
                </Col>
                  }
                <Col xs="12" sm="12" md={this.props.noLabel ? "12" :"8"} >
                    <StyledTextArea type="textarea" {...this.props} placeholder={"Enter " + this.props.title} className={this.props.invalid ? "invalidField": ""}></StyledTextArea>
                    <CounterLabel>{this.props.value.length === 350 ? "0" : (this.props.maxLength - this.props.value.length)}</CounterLabel>
                </Col>                
            </Row>
        </StyledContainer>
    );
  }
}
