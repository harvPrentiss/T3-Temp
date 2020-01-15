import React from "react"
import { StaticQuery, graphql, navigate } from "gatsby"
import theme from '../components/themes/default'
import { ThemeProvider } from 'styled-components'
import Header from "./molecules/header"
import Footer from "./molecules/footer"
import { isLoggedIn } from "../services/auth"
import {Row, Col, Container} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import MetisMenu from 'react-metismenu'
import Notification from '../components/molecules/notification'
import MenuLink from '../components/molecules/menuLink'
import "./layout.css"
import "font-awesome/css/font-awesome.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-metismenu/dist/react-metismenu-standart.css'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
	box-sizing: border-box;
	font-family:  "Open Sans", Arial, Helvetica, sans-serif;
`;
const Content = styled(Col)`
    margin: 0px auto;
    padding: 1.45rem 1.0875rem;
    min-height: 100vh;
    padding-top: 95px;
    @media screen and (max-width: 767px) {
      min-height: 0;
      padding-top: 20px;
    }
`
const StyledContainer = styled(Container)`
    margin: 0px;
    width: 100%;
    max-width: none !important;
    min-height: 100vh;
`
const ContentNav = styled(Col)`
  background-color: #EEE;
  padding: 79px 0 0 0 !important;
  @media screen and (max-width: 767px) {
    min-height: none;
    padding: 50px 0 0 0 !important;
    display: none;
  };
`
const MobileContentNav = styled(Col)`
  background-color: #EEE;
  padding: 50px 0 0 0 !important;
  position: absolute !important;
  transition: transform 0.3s ease-out;
  transform: scaleY(0);
  transform-origin: top;  
  z-index: 99;
  @media screen and (min-width: 767px) {
    padding: 50px 0 0 0 !important;
    display: none !important;
  };
`
const ContentPage = styled(Col)`
    border-left: 1px solid #707070;
    @media screen and (max-width: 767px) {
      padding-top: 50px;
  };
`
const HamburgerContainer = styled.div`
    z-index: 101;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    @media screen and (min-width: 767px) {
      display: none;
    }
`

export default class Layout extends React.Component {  

  componentDidMount(){
    if(!isLoggedIn()){
      navigate('/login', { state: { error: `You must be logged in to access this page.  Please log in and try again.` }});
    }
  }

  toggleMobileMenu = () => {
    var wrapper = document.getElementById("mobileMenu");
    wrapper.classList.toggle("open");
  }

  render() {
    if(!isLoggedIn()){
      return null
    }
    return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            menuLinks {
              icon,
              label,
              to,
              content {
                icon,
                label,
                to
              }
            }
          }
        }
      }
    `}
      render={data => (
        <ThemeProvider theme={theme}>
            <Wrapper>
              {window.location.pathname !== "/topNavPage" && 
                <HamburgerContainer onClick={this.toggleMobileMenu}><FontAwesomeIcon className="fa-2x" icon={faBars}></FontAwesomeIcon></HamburgerContainer>
              }
              <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />              
              <StyledContainer>
                <Row >
                  <ContentNav sm="4" md="4" lg="2">
                  { (typeof window !== 'undefined') &&
                    <MetisMenu content={data.site.siteMetadata.menuLinks} 
                    className="my-menu"
                    clasNameLink="my-menu-link"
                    activeLinkFromLocation
                    LinkComponent={MenuLink}
                    />
                  }
                  </ContentNav>
                  {(typeof window !== 'undefined') && 
                      <MobileContentNav sm="12" md="0" lg="0" id="mobileMenu">
                        <MetisMenu content={data.site.siteMetadata.menuLinks} 
                          className="my-menu"
                          clasNameLink="my-menu-link"
                          activeLinkFromLocation
                          LinkComponent={MenuLink}
                        />
                      </MobileContentNav>   
                  }
                  <ContentPage sm="12" md="8" lg="10">
                    <Content>
                      <Notification timeToClose={3000}></Notification>
                      {this.props.children}
                      <br/>
                      <Footer></Footer>
                    </Content>
                  </ContentPage>
                </Row>
              </StyledContainer>
            </Wrapper>
        </ThemeProvider>
      )}
    />
    )
  }
}
