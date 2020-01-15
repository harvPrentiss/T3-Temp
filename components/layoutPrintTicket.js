import React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import "./layout.css"


const Content = styled.div`
    max-width: 1200px;
    width: 100%;
    padding: 1.45rem 1.0875rem;
`

const LayoutPrintTicket = ({ children }) => (
    <Content>{children}</Content>
)

LayoutPrintTicket.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutPrintTicket
