import React from 'react'
import styled from 'styled-components'

const StyledFormContainer = styled.div`
    width: 100%;
    margin: auto;
    background-color: #F3F3F3;
    padding: 5px 15px 20px 15px;
    border: 1px solid #B3B3B3;
`

const FormContainer = ({ ...props }) => {
    return <StyledFormContainer {...props}>
        {props.children}
        
        </StyledFormContainer>
}

export default FormContainer
