import React from 'react'
import styled from 'styled-components'
import { Row } from 'reactstrap'
import { palette } from 'styled-theme'

const HeaderRow = styled(Row)`
    background-color: ${palette('primary', 0)}; 
    padding: 10px 5px;
    font-size: 13px;
    color: white;
`

const TableHeaderRow = ({ ...props }) => {
    return <HeaderRow { ...props }>{props.children}</HeaderRow>
}

export default TableHeaderRow
