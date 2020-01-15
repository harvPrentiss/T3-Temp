import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from "gatsby"
import { palette } from 'styled-theme'
import { ifProp } from 'styled-tools'
  
const styles = css`
  display: inline-block;
  height: 40px;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  white-space: nowrap;
  font-size: 14px;
  padding: 7px 15px;
  color: white;
  justify-content: center;
  text-decoration: none;
  min-width: 150px;
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  box-sizing: border-box;
  transition: background-color 250ms ease-out, color 250ms ease-out, border-color 250ms ease-out;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  border: 1px solid white;
  background-color:  ${palette('primary', 0)}; 
  &:hover, &:focus, &:active {
    background-color: ${palette('primaryHover', 0)};
    color: white;
    text-decoration: none !important;
  }
  &:disabled{
    opacity: .4;
  }
  &:focus {
    outline: none
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const StyledLink = styled(({
  disabled, transparent, reverse, palette, height, theme, ...props
}) => <Link {...props} />)`${styles}`

const Anchor = styled.a`${styles}`
const StyledButton = styled.button`${styles}`

const Button = ({ type, ...props }) => {
  if (props.to) {
    return <StyledLink {...props} />
  } else if (props.href) {
    return <Anchor {...props} />
  }
  return <StyledButton {...props} type={type} />
}

Button.propTypes = {
  disabled: PropTypes.bool,
  palette: PropTypes.string,
  transparent: PropTypes.bool,
  reverse: PropTypes.bool,
  height: PropTypes.number,
  type: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
}

Button.defaultProps = {
  palette: 'primary',
  type: 'button',
  height: 40
}

export default Button
