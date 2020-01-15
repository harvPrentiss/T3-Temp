import React from "react";
import NavLink from '../atoms/navLink'
import NavLinkBase from '../molecules/navLinkBase';
import { logout } from "../../services/auth";
import { navigate } from "gatsby";
import {Collapse, Navbar, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import styled from 'styled-components';
import { palette } from 'styled-theme';

export default class TopNav extends React.Component {
  constructor() {
    super()
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      isOpen: false
    };

    this.parentLink = React.createRef();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  close() {
    this.setState({
      isOpen: false
    });
    this.parentLink.current.setState({isOpen: false});
    console.log(this.parentLink)
  }  

  render() {   
    return (        
      <StyledNavbar collapseonselect="true" style={{padding: "0px"}} color="dark" dark expand="md">
        <StyledNavbarToggler onClick={this.toggle} className="navbar-dark"/>
        <StyledCollapse isOpen={this.state.isOpen} navbar>
          <Nav className={this.props.rightAlign ? "ml-auto" : ""} navbar>
            {this.props.links.map((item, key) =>
                <React.Fragment key={key}>
                    { item.content.length > 0 &&
                        <UncontrolledDropdown collapseonselect="true" nav inNavbar ref={this.parentLink}>
                            <DropdownToggle style={{padding: "0"}} nav>
                                <NavLinkBase label={item.label} parentState={this.parentLink.current} ></NavLinkBase>
                            </DropdownToggle>
                            <StyledDropdownMenu right>
                                {item.content.map((subLink, key2) =>
                                    <StyledDropdownItem key={key2}>
                                        <StyledNavLinkDropDown onClick={this.close} to={subLink.to} >{subLink.label}</StyledNavLinkDropDown>
                                    </StyledDropdownItem>
                                )}                                
                            </StyledDropdownMenu>
                        </UncontrolledDropdown>
                    }
                    { item.content.length === 0 &&
                        <StyledNavItem >
                            <StyledNavLink collapseonselect="true" onClick={() => item.label === "Logout" ? logout(() => navigate(`/login`)) : this.close(key)} to={item.to} className={item.label === "Logout" ? "d-block d-md-none" : ""}>
                              {item.label}
                            </StyledNavLink>
                        </StyledNavItem>
                    }
                </React.Fragment>
            )}            
          </Nav>
        </StyledCollapse>
      </StyledNavbar>
    );
  }
}

const StyledNavbarToggler = styled(NavbarToggler)`
    position: absolute;
    top: 10px;
    right: 5px;
    padding: 0 !important;
    z-index: 105;
    opacity: 0;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(32,94,25, 0.75)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
`
const StyledDropdownMenu = styled(DropdownMenu)`
    padding: 0px !important;
    top: 100% !important;
    margin: 0 !important;
    border: none !important;
    border-radius: none;
    background-color: ${palette('menuColors', 0)} !important;
    @media screen and (max-width: 767px) {
        border-top: 1px solid black !important;
        border-bottom: 1px solid black !important;
        background-color: white !important;
    }
`

const StyledDropdownItem = styled.div`
  padding: 0!important;
`
const StyledCollapse= styled(Collapse)`
    background-color: ${palette('menuColors', 0)};
    @media screen and (max-width: 767px) {
        position: absolute !important;
        z-index: 101;
        top: 51px;
        background-color: ${palette('menuColors', 0)};
        width: 100%;
        left: 0px;
    }
`
const StyledNavItem= styled(NavItem)`
  background-color: ${palette('menuColors', 0)};
`
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
const StyledNavLinkDropDown = styled(StyledNavLink)`
    color: ${palette('menuColors', 3)};
`

const StyledNavbar = styled(Navbar)`
    bottom: 0;
    padding: 0;
    margin-top: 79px;
    width: 100%;
    @media screen and (max-width: 767px) {
      position: initial !important;
  	}
`