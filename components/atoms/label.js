import React from "react"
import styled from 'styled-components'

const StyledLabel = styled.label`
  font-size: 13px;
  line-height: 40px;
  height: 40px;
  margin-top: 0;
  margin-bottom: 0;
`
const Label = ({ ...props }) => {
  if (props.children || props.dangerouslySetInnerHTML) {
      return <StyledLabel { ...props } style={{display: props.nofloat ? "block" : ""}}>{props.children}</StyledLabel>
  }else{
      return null
  }
}

export default Label
