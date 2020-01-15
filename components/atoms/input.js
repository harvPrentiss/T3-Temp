import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const styles = css`
  font-family:  "Open Sans", Arial, Helvetica, sans-serif;
  display: block;
  width: 100%;
  margin: 0;
  height: 40px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 0 1.0em;
  color: ${palette('grayscale', 2)};
  background-color: ${palette('grayscale', 0, true)};
  border: ${ifProp('invalid', "3px", "1px")} solid ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
  border-radius: 2px;
  margin-bottom: 5px;
  &[type=textarea] {
    min-height: 85px;
    resize: none;
  }
  &[type=checkbox], &[type=radio] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: 40px;
    margin: 0 0.2rem 0 0;
  }
`

const StyledTextarea = styled.textarea`${styles}`
const StyledSelect = styled.select`${styles}`
const StyledInput = styled.input`${styles}`

const Input = ({ ...props }) => {
  if (props.type === 'textarea') {
    return <StyledTextarea {...props} />
  } else if (props.type === 'select') {
    return <StyledSelect {...props} />
  }
  return <StyledInput {...props} />
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  reverse: PropTypes.bool,
  height: PropTypes.number,
  invalid: PropTypes.bool,
}

export default Input
