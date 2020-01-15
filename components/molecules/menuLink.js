import React from 'react'
import { Link } from 'gatsby'
import { logout } from "../../services/auth"
import { palette } from 'styled-theme'
import styled from 'styled-components'
import { navigate } from "gatsby"

const ActiveLink = styled(Link)`
  background-color: ${palette('primary', 0)} !important;
  color: #FFF !important;
  border-bottom: "none";
  &:hover {
    background-color: ${palette('primary', 0)} !important;
  }
`

export default class MenuLink extends React.Component {
    onClick = (e) => {
        if (this.props.hasSubMenu) {
            this.props.toggleSubMenu(e);
        }
        else {
            this.props.activateMe({
                newLocation: this.props.to,
                selectedMenuLabel: this.props.label
            });
        }
    }

    render() {
        /* if (this.props.label === "Administration" && !isAdmin()) {
            return <></>;
        }*/
        var calcClassName = this.props.active ? this.props.className + " active" : this.props.className;
        calcClassName = this.props.label === "Logout" ? "d-block d-md-none " + calcClassName : calcClassName;
        if(this.props.label === "Logout"){
            return (
                <Link to="/login" className={calcClassName} onClick={() => { logout(() => navigate(`/login`)); }}>
                    {this.props.children}
                </Link>
            )
        }
        if(this.props.hasSubMenu)
        {
            if (this.props.hasActiveChild || (!this.props.hasActiveChild && this.props.active)) {
                return (
                    <ActiveLink to="/" className={calcClassName} onClick={this.onClick}>
                        {this.props.children}
                    </ActiveLink>
                )
            } else{
                return (
                    <Link to="/" className={calcClassName} onClick={this.onClick} >
                        {this.props.children}
                    </Link>
                )
            }
        }
        else{
            if (this.props.hasActiveChild || (!this.props.hasActiveChild && this.props.active)) {
                return (
                    <ActiveLink to={this.props.to} className={calcClassName} onClick={this.onClick}>
                        {this.props.children}
                    </ActiveLink>
                )
            } else{
                return (
                    <Link to={this.props.to} className={calcClassName} onClick={this.onClick} >
                        {this.props.children}
                    </Link>
                )
            }
        }
        

    }
}
