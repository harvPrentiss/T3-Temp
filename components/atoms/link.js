import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import GatsbyLink from "gatsby-link"
import { palette } from 'styled-theme'

const styles = css`
  font-family:  "Open Sans", Arial, Helvetica, sans-serif;
  text-decoration: none;
  font-weight: 500;
  color: #444;

  &:hover {
    color: ${palette('primary', 0)}  !important;
    text-decoration: none;
    cursor: pointer;
  }
`

const StyledNavLink = styled(({
  theme, reverse, palette, ...props
}) => <GatsbyLink {...props} />)`${styles}`

const Anchor = styled.a`${styles}`

const Link = ({ ...props }) => {
  if (props.to) {
    return <StyledNavLink {...props} />
  }
  return <Anchor {...props} />
}

Link.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
  to: PropTypes.string,
}

Link.defaultProps = {
  palette: 'primary',
}

export default Link