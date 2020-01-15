import React from 'react'
import styled from 'styled-components'

const StyledP = styled.p`
    font-size: 15px;
    line-height: 17px;
    margin-bottom: 8px;
`
const P = ({ ...props }) => {
    return <StyledP { ...props }>{props.children}</StyledP>
}

export default P
