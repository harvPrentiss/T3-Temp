import React from 'react'
import styled from 'styled-components'

const StyledUl = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  margin-bottom: 0;
  @media screen and (max-width: 500px) {
    padding-left: 0px;
  }
`

const Ul = ({ ...props }) => {
    return <StyledUl>{props.children}</StyledUl>
}

export default Ul


