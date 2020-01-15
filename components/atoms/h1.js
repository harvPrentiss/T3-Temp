import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyledH1 = styled.h1`
    font-family: "Open Sans",Arial,Helvetica,sans-serif;
    font-size: 25px;
    line-height: 30px;
    color: ${palette('primary', 0)}; 
    margin-bottom: 8px;
    font-weight: normal;
`
const H1 = ({ ...props }) => {
    return <StyledH1 { ...props }>{props.children}</StyledH1>
}

export default H1
