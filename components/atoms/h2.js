import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyledH2 = styled.h2`
    font-family: "Open Sans",Arial,Helvetica,sans-serif;
    font-size: 20px;
    line-height: 25px;
    color: ${palette('primary', 0)}; 
    margin-bottom: 8px;
    font-weight: normal;
`
const H2 = ({ ...props }) => {
    return <StyledH2 { ...props }>{props.children}</StyledH2>
}

export default H2
