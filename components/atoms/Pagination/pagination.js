import React from 'react'
import Pagination from 'react-js-pagination'
import '../Pagination/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import { faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 25px !important;
`;

const PaginationReact = ({ ...props }) => {
    return <Pagination 
        linkClassFirst="arrows" 
        linkClassPrev="arrows" 
        linkClassNext="arrows"
        linkClassLast="arrows"
        nextPageText={<StyledFontAwesomeIcon icon={faAngleRight}/>}
        lastPageText={<StyledFontAwesomeIcon icon={faAngleDoubleRight}/>}
        firstPageText={<StyledFontAwesomeIcon icon={faAngleDoubleLeft}/>}
        prevPageText={<StyledFontAwesomeIcon icon={faAngleLeft}/>}
        itemClassLast="last"
        itemClassNext= "next"
        itemClass="item" { ...props }/>
}
export default PaginationReact