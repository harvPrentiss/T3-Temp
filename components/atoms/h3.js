import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyledH3 = styled.h3`
    font-family: "Open Sans",Arial,Helvetica,sans-serif;
    font-size: 18px;
    line-height: 20px;
    color: ${palette('primary', 0)}; 
    margin-bottom: 8px;
    font-weight: normal;
`
const H3 = ({ ...props }) => {
    return <StyledH3 { ...props }>{props.children}</StyledH3>
}

export default H3
