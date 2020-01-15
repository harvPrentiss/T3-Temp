import React from 'react';
import styled from 'styled-components';
import { Row} from 'reactstrap';

const StyledFooterLower = styled(Row)`
	font-size: 11px;
	color: #555;
    margin: 0 !important;
	@media screen and (max-width: 768px) {
		text-align: center;
	}
    position: absolute;
    bottom: 10px;
`

export default class Footer extends React.Component {
    render() {
        return (
            <StyledFooterLower>
                <span style={{ textAlign: "center", display: "block" }}>
                    © 1998 - {new Date().getFullYear()} T3 Group. All Rights Reserved
                </span>
            </StyledFooterLower>
        );
    }
}






