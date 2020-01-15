import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Label from '../atoms/label'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`


const StyledLabel = styled(Label)`
    margin-left: 5px;
    position: relative;
    margin-right: 15px;
    cursor: pointer;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  padding: 0 1px;
  background: ${props => props.checked ? '#e8e8e8' : '#fff'};
  border-radius: 3px;
  border: 1px solid #444;
  transition: all 150ms;
  ${"svg"} {
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
  }
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  cursor: pointer;
  width: 1px;
`


const Checkbox = ({ className, checked, ...props }) => (
    <label>
        <CheckboxContainer className={className}>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> 
        </StyledCheckbox>
        </CheckboxContainer>
        <StyledLabel htmlFor={props.id}>{props.title}</StyledLabel>
    </label>
  )

export default Checkbox
