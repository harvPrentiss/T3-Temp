import React from "react"
import Label from '../atoms/label'
import styled from 'styled-components'
import MaskedInput from '../atoms/maskedInput'
import {Col, Row} from 'reactstrap'

const StyledContainer = styled.div`
    margin-bottom: 5px;
`
const StyledLabel = styled(Label)`
    @media screen and (max-width: 993px) {
        float: left;
    } 
    margin-top: 10px;
`

export default class FormField extends React.Component {
  render() {   
    return (
        <StyledContainer>
            <Row>
                { !this.props.noLabel &&
              
                <Col xs="12" sm="12" md={this.props.noLabel ? "12" :"3"} style={{textAlign: this.props.noLabel ? "left" : "right"}}>
                    <StyledLabel>{this.props.title}{this.props.required ? "*": ""} &nbsp;</StyledLabel>
                </Col>
                  }
                <Col xs="12" sm="12" md={this.props.noLabel ? "12" :"8"} >
                    <MaskedInput {...this.props} mask={this.props.mask} maskInput={this.props.maskInput}></MaskedInput>
                </Col>
            </Row>
        </StyledContainer>
    );
  }
}
