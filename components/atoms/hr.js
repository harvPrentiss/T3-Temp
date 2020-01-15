import React from 'react'
import styled from 'styled-components'

const StyledHR = styled.hr`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`

const Hr = ({ ...props }) => {
    return <StyledHR { ...props }/>
}

export default Hr
