import React from "react"
import Button from '../../components/atoms/button'
import { Col } from 'reactstrap'
import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyledButton = styled(Button)`
    width: 100%;
    font-size: 15px;
    margin-bottom: 25px;
    white-space: normal;
    background-color: #FFF;
    text-align: left;
    color: #444;
    text-align: left;
    border: 1px solid #8F8F8F;
    justify-content: start;
    padding-left: 15px;
    &:hover{
      background-color:  ${palette('primaryHover', 1)};
    }
`


const FormButton = ({ ...props }) => {
  return <Col sm="6" md="4" lg="3">
    <StyledButton {...props}>{props.children}</StyledButton>
  </Col>
}

export default FormButton

