import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const StyledLi = styled.li`
  list-style-type: none;
  
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  padding-bottom: 2px;
  color: ${palette('blueScale', 1, true)};
`

const Li = ({ ...props }) => {
    return <StyledLi><StyledFontAwesomeIcon icon={faChevronRight}/> {props.children}</StyledLi>
}

export default Li


