import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'
class NavLink extends React.Component {
    render() {
        var isActive = window.location.pathname.startsWith(this.props.to) && window.location.pathname.length === this.props.to.length;

        if(this.props.isBase){
            if(isActive){
                return(
                <StyledActiveLinkDiv  {...this.props}>
                    {this.props.children}
                </StyledActiveLinkDiv>)
            }
            else{
                return(
                <StyledNavLinkDiv {...this.props}>
                    {this.props.children}
                </StyledNavLinkDiv>
                )
            }
        }
        if(isActive){
            return(                
            <StyledActiveLink  {...this.props}>
                {this.props.children}
            </StyledActiveLink>)
        }
        else{
            return(
            <StyledNavLink {...this.props}>
                {this.props.children}
            </StyledNavLink>
            )
        }
    }
}

NavLink.contextTypes = {
    router: PropTypes.object
};

export default NavLink;
const StyledActiveLink = styled(Link)`
    background-color: ${palette('primary', 0)}  !important;
    color: white !important;
    &:hover, &:focus, &:active {
        background-color: ${palette('primary', 0)}  !important;
        color: white !important;
      }
    `
const StyledNavLink = styled(Link)`
    &:hover, &:focus, &:active {
        background-color: ${palette('primary', 0)} !important;
        color: white;
      }
    `

const StyledActiveLinkDiv = styled.div`
    background-color: ${palette('primary', 0)}  !important;
    color: white !important;
    &:hover, &:focus, &:active {
        background-color: ${palette('primary', 0)}  !important;
        color: white;
      }
    `
const StyledNavLinkDiv = styled.div`
    &:hover, &:focus, &:active {
        background-color: ${palette('menuColors', 1)} !important;
        color: white;
      }
    `