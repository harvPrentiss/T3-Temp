import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 45px !important;
  color: ${palette('grayscale', 7, true)};
  margin-bottom: 50px;
  margin-top: 50px;
`
const StyledFontAwesomeIconLarge = styled(FontAwesomeIcon)`
  font-size: 80px !important;
  color: ${palette('grayscale', 7, true)};
  margin-bottom: 50px;
  margin-top: 50px;
`
const StyledContainer = styled.div`
    width: 100%;
    text-align: center;
`
const LoadingIcon = ({ ...props }) => {
return (
    <StyledContainer>
        { props.size === "lg" &&
            <StyledFontAwesomeIconLarge className="fa-spin fa-pulse" icon={faSpinner}></StyledFontAwesomeIconLarge> 
        }{  props.size !== "lg" &&
            <StyledFontAwesomeIcon className="fa-spin fa-pulse" icon={faSpinner}></StyledFontAwesomeIcon> 
        }
    </StyledContainer> 
    )
}

export default LoadingIcon


 