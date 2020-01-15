import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { palette } from 'styled-theme'
import { ifProp } from 'styled-tools'

const styles = css`
  font-family:  "Open Sans", Arial, Helvetica, sans-serif;
  display: block;
  width: 100%;
  height: 40px;
  margin: 0;
  box-sizing: border-box;
  font-size: 14px;
  padding: 0px 0 0px 15px;
  color: ${palette('grayscale', 2)};
  background-color: ${palette('grayscale', 0, true)};
  border: ${ifProp('invalid', "3px", "1px")} solid ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
  border-radius: 2px;
  margin-bottom: 5px;
`
const StyledSelect = styled.select`${styles}`
const Select = ({ ...props }) => {
    return <StyledSelect {...props}>
            {props.children}
    </StyledSelect>
}

Select.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  reverse: PropTypes.bool,
  height: PropTypes.number,
  invalid: PropTypes.bool,
}

Select.defaultProps = {
  type: 'text',
  height: 40,
}

export default Select
