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
  height: 44px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 0 1.0em;
  color: ${palette('grayscale', 2)};
  background-color: ${palette('grayscale', 0, true)};
  border: 1px solid ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
  border-radius: 2px;
  margin-bottom: 10px;
  &[type=textarea] {
    min-height: 150px;
  }
  &[type=checkbox], &[type=radio] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 0.2rem 0 0;
  }
`

const StyledInput = styled.input`${styles}`


const MaskedInput = ({ ...props }) => {
    return <StyledInput {...props} placeholder={props.mask} onKeyUp={props.maskFunction}/>
}

MaskedInput.propTypes = {
  type: PropTypes.string,
  mask: PropTypes.string,
  reverse: PropTypes.bool,
  height: PropTypes.number,
  invalid: PropTypes.bool,
  maskFunction: PropTypes.func
}

export default MaskedInput
