import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, getUser } from "../../services/auth"
import styled from 'styled-components'
import { logout } from "../../services/auth"
import LogoImage from '../atoms/logoImage'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { palette } from 'styled-theme'

const HeaderContainer = styled.header`
  background: #FFF; 
  border-bottom: 1px solid #858585;
  min-height: 30px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
`
const HeaderContents = styled.div`
 margin: 0 auto;
 height: 78px;
 @media screen and (max-width: 767px) {
    height: 50px;
  }
`
const SiteTitle = styled.h1`
    margin-top: 14px;
    margin-left: 20px;
    font-size: 35px;
    font-weight: bold;
    @media screen and (max-width: 767px) {
      margin-top: 10px;
      font-size: 25px;
      margin-bottom: 0;
    }
    @media screen and (max-width: 450px) {
      margin-top: 16px;
      font-size: 16px;
      margin-bottom: 0;
    }
    float: left;
`
const StyledLink = styled(Link)`
  color: #414141;
  &:hover{
    color: #414141;
    text-decoration: none;
  }
`
const ToolBar = styled.div`
    position: absolute;
    right: 10px;
    font-size: 14px;
    top: 0px;
    color: #707070;
    @media screen and (max-width: 767px) {
      display: none;
    }
`
const ImageContainer = styled.span`
   width: 313px;
   padding: 8px 45px 8px 15px;
   margin: 5px;
   border-right: 1px solid #858585;
   float: left;
   @media screen and (max-width: 767px) {
      width: 200px;
    }
    @media screen and (max-width: 450px) {
      width: 150px;
      padding: 8px 10px 8px 10px;
    }
`

const ColoredSpan = styled.span`
  color: #707070;
`

const Clear = styled.div`
    clear: both;
`
const UserText = styled.div`
  padding: 10px 20px;
  margin: 20px;
  color: #707070;
  border-right: 1px solid #858585;
  font-size: 14px;
  float: right;
  @media screen and (max-width: 1000px) {
      display: none;
    }
`
const LogoutText = styled.div`
  padding: 10px 20px;
  font-size: 14px;
  float: right;
 
  text-align: center;
  margin-top: 10px;
`
const LogoutLink = styled(Link)`
  color: #707070;
  text-decoration: none;
  &:hover{
    text-decoration: none;
    color: ${palette('primary', 0)};
  }
`
const FontAwesomeIconSignOut = styled(FontAwesomeIcon)`
    font-size: 25px;
`

const Header = ({ siteTitle, menuLinks }) => (
  <HeaderContainer>
      <HeaderContents>
        {isLoggedIn() &&
          <ToolBar>
            <LogoutText>
              <LogoutLink to="/login" onClick={() => { logout(() => navigate(`/login`)); }}><FontAwesomeIconSignOut icon={faSignOutAlt}></FontAwesomeIconSignOut><br />Log Out</LogoutLink>
            </LogoutText>
            <UserText>
              <span><FontAwesomeIcon icon={faUser}></FontAwesomeIcon>&nbsp;&nbsp;Welcome,&nbsp;{getUser().name}</span>
            </UserText>
          </ToolBar>
        }
        <ImageContainer>
          <Link to="/"><LogoImage></LogoImage></Link>
        </ImageContainer>
        <SiteTitle><StyledLink to="/">{siteTitle}
        <ColoredSpan>{(`${process.env.GATSBY_ENV}` === "DEV") ? "-Dev" : ""}
        </ColoredSpan></StyledLink></SiteTitle>
        <Clear></Clear>
      </HeaderContents>

  </HeaderContainer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}


export default Header
