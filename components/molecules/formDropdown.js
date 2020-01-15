import React from "react"
import Label from '../atoms/label'
import styled from 'styled-components'
import Select from '../atoms/select'
import {Col, Row} from 'reactstrap'

const StyledContainer = styled.div`
    margin-bottom: 5px;
`
const StyledLabel = styled(Label)`
    @media screen and (max-width: 993px) {
        float: left;
    } 
`

export default class FormDropdown extends React.Component {

    state = {
        selectedOption: null
    }    

    render() {   
        return (
            <StyledContainer>
                <Row>
                    <Col xs="12" sm="12" md={this.props.stackLabel ? "12" :"4"} style={{textAlign: this.props.align ? this.props.align : "left"}}>
                        <StyledLabel>{this.props.title}{this.props.required ? "*": ""}</StyledLabel>
                    </Col>
                    <Col xs="12" sm="12" md={this.props.stackLabel ? "12" :"8"} >
                        <Select name={this.props.dropDownName} onChange={this.props.onChange} value={this.props.value} invalid={this.props.invalid}>  
                            <option key="0" value="0" disabled>Choose a {this.props.dropdownContentType}</option>                          
                            {                                                                
                                this.props.options.length > 0 ? this.props.options.map(option => {
                                    return <option key={option.key} value={option.value}>{option.label}</option>
                                }) : <option key="-1" value="100" disabled>Waiting on other data to load</option>
                            }
                        </Select>
                    </Col>
                </Row>
            </StyledContainer>
        );
  }
}
