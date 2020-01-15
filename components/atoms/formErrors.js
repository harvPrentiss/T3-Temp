import React from 'react';
import styled from 'styled-components'

const StyledP = styled.p`
  color: #c10000;
  margin-top: 5px;
  font-size: 12px;
`

export const FormErrors = ({formErrors}) =>
  <div className='formErrors' style={{marginTop:"10px"}}>
      {Object.keys(formErrors).map((fieldName, i) => {
        if(formErrors[fieldName].length > 0){
          return (
            <StyledP key={i}><b>Error: </b>{formErrors[fieldName]}</StyledP>
          )        
        } else {
          return '';
        }
      })}
  </div>
  export default FormErrors