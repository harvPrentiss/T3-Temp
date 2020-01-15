import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from '../atoms/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const WrapperFull = styled.div`
  padding-top: 10px;
  font-size: 14px;
  color: #444;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #707070;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 14px !important;
    padding: 0px 1px;
    margin: -1px 0px;
`;

const Breadcrumb = ({ links, ...props }) => {
    return (
      <>
      <WrapperFull style={ props.half ? {marginBottom: "0px", borderBottom: "none", PaddingBottom: "0px"} : {}}>
        You are here:
        {links.map((link, index) =>{            
            return index !== links.length - 1 ? 
              <span key={index}> <Link to={link.href}>{link.text} </Link> <StyledFontAwesomeIcon icon={faAngleDoubleRight}/></span>
            : 
              <span key={index}> <Link to={link.href}>{link.text} </Link> </span>
          }    
        )}
      </WrapperFull>      
      </>
    )
}

Breadcrumb.propTypes = {
  links: PropTypes.array,
}

export default Breadcrumb