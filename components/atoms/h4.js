import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyledH4 = styled.h4`
    font-family: "Open Sans",Arial,Helvetica,sans-serif;
    font-size: 15px;
    line-height: 20px;
    color: ${palette('primary', 0)}; 
    margin-bottom: 8px;
    font-weight: bold;
`
const H4 = ({ ...props }) => {
    return <StyledH4 { ...props }>{props.children}</StyledH4>
}

export default H4
