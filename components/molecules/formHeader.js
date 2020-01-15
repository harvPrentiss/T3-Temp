import React from "react"
import Label from '../atoms/label'
import styled from 'styled-components'


const StyledLabel = styled(Label)`
    font-size: 16px;
    color: #254F9E;
    padding-left: 15px;
`

const FormHeader = ({ ...props }) => {
  return  <StyledLabel { ...props }>{props.children}</StyledLabel>
}

export default FormHeader