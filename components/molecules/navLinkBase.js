import React from "react";
import styled from 'styled-components';
import NavLink from '../atoms/navLink'
import { palette } from 'styled-theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


const StyledNavLink = styled(NavLink)`
  color: ${palette('menuColors', 3)};
  font-size: 15px;
  text-decoration: none !important;
  display: block;
  padding: 10px 14px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
    line-height: 45px;
  }
`

const StyledNavLinkBase = styled(StyledNavLink)`
  background-color: ${palette('menuColors', 0)};
`

export default class NavLinkBase extends React.Component {

    render() {   
        return ( 
            <StyledNavLinkBase isBase="true" to="">
                {this.props.label}
                {<FontAwesomeIcon 
                  icon={faCaretDown} 
                  style={{marginLeft:"5px"}}>
                </FontAwesomeIcon>}
            </StyledNavLinkBase>
        );
    }
}