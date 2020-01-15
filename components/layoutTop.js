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
import Notification from '../components/molecules/notification'
import "./layout.css"
import "font-awesome/css/font-awesome.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import TopNav from "./organisms/topNav";

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
const ContentPage = styled(Col)`
    border-left: 1px solid #707070;
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

export default class LayoutTop extends React.Component {  

  componentDidMount(){
    if(!isLoggedIn()){
      navigate('/login', { state: { error: `You must be logged in to access this page.  Please log in and try again.` }});
    }
  } 

  render() {
    if(!isLoggedIn()){
      return null
    }
    return (
    <StaticQuery
      query={graphql`
      query SiteLinksQuery {
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
              <HamburgerContainer onClick={this.toggleMobileMenu}><FontAwesomeIcon className="fa-2x" icon={faBars}></FontAwesomeIcon></HamburgerContainer>
              <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />              
              <StyledContainer>
                <Row >
                    <TopNav links={data.site.siteMetadata.menuLinks} rightAlign={true}></TopNav>
                </Row>
                <Row>                    
                    <ContentPage>
                        <Content>
                        <Notification timeToClose={3000}></Notification>
                        {this.props.children}
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
