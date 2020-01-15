import React from "react"
import { StaticQuery, graphql } from "gatsby"
import theme from '../components/themes/default'
import Notification from '../components/molecules/notification'
import { ThemeProvider } from 'styled-components'
import Header from "./molecules/header"
import Footer from "./molecules/footer"
import styled from 'styled-components'
import "./layout.css"
import 'bootstrap/dist/css/bootstrap.min.css'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
	box-sizing: border-box;
  font-family:  "Open Sans", Arial, Helvetica, sans-serif;
`;
const Content = styled.div`
    margin: 0px auto;
    width: 100%;
    padding: 1.45rem 1.0875rem;
    padding-top: 90px;
    @media screen and (max-width: 767px) {
      min-height: 0;
      padding-top: 20px;
    }
`

export default class LayoutPre extends React.Component {

  render() {
    return (
      <StaticQuery
        query={graphql`
      query SiteTitleQueryPre {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
        render={data => (
          <ThemeProvider theme={theme}>
            <Wrapper>
              <Header menuLinks={[]} siteTitle={data.site.siteMetadata.title} />
              <Content>
                <Notification timeToClose={3000}></Notification>
                {this.props.children}
              </Content>
              <Footer />
            </Wrapper>
          </ThemeProvider>
        )}
      />
    )
  }
}



