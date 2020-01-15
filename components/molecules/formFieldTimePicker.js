import React from "react"
import Label from '../atoms/label'
import styled from 'styled-components'
import {Col, Row} from 'reactstrap'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css';

const StyledContainer = styled.div`
    margin-bottom: 5px;
`
const StyledLabel = styled(Label)`
    @media screen and (max-width: 993px) {
        float: left;
    } 
`

export default class FormFieldTimePicker extends React.Component {
  render() {   
    return (
        <StyledContainer>
            <Row>
                { !this.props.noLabel &&
              
                <Col xs="12" sm="12" md={this.props.noLabel ? "12" :"4"} style={{textAlign: this.props.align ? this.props.align : "left"}}>
                    <StyledLabel>{this.props.title}{this.props.required ? "*": ""} </StyledLabel>
                </Col>
                  }
                <Col xs="12" sm="12" md={this.props.noLabel ? "12" :"8"} >
                    <TimePicker {...this.props} use12Hours={true} showSecond={false}></TimePicker>
                </Col>
            </Row>
        </StyledContainer>
    );
  }
}
