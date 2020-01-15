import React from "react"
import Label from '../../components/atoms/label'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'
import {DateFormat} from '../../data/dateHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const TicketContainer = styled.div`
    border: 1px solid;
    max-width: 740px;
    padding: 7px;
    padding-top: 5px;
    background-color: white;
    @media print{
        max-width: 315px;
        padding: 2px;
        margin-top: 10px;
        border: none;
    }
`
const LabelHeader = styled(Label)`
    font-weight: bold;
    text-decoration:underline;
    margin-left: 10px;
    margin-right: 5px;
    font-size: 16px;
    height: 25px;
    @media print{
        font-size: 6px;
        height: 12px;
        line-height: 6px;
    }
`

const LabelImportant = styled(Label)`
font-weight: bold;
margin-left: 10px;
margin-right: 5px;
font-size: 16px;
height: 25px;
@media print{
    font-size: 6px;
    height: 12px;
    line-height: 6px;
}
`

const LongLabelHeader = styled(Label)`
    font-weight: bold;
    text-decoration:underline;
    margin-left: 0;
    margin-right: 5px;
    font-size: 16px;
    height: 25px;
    @media print{
        font-size: 6px;
        height: auto;
        line-height: 6px;
    }
`

const TicketLabel = styled(Label)`
    font-size: 16px;
    @media print{
        font-size: 6px;
        line-height: 6px;
        height: 12px;
    }
`
const StyledCol = styled(Col)`
    font-size: 16px;
    @media print{
        font-size: 6px;
    }
`

const StyledColSig = styled(Col)`
    font-size: 16px;
    @media print{
        font-size: 6px;
        height: 18px;
    }
`

const StyledRow = styled(Row)`
    height: 25px;
    @media print{
        height: 12px;
    }
`

const Box = styled.div`
    width: 18px;
    height: 18px;
    display: inline-block;
    border: 2px solid;
    margin-right: 5px;
    @media print{
        height: 6px;
        width: 6px;
        border: 1px solid;
        display: none;
    }
`

const BoxLabel = styled(Label)`
    vertical-align: middle;
    margin: 0px;
    margin-left: 10px;
    margin-right: 5px;
    font-size: 16px;
    @media print{
        height: 10px;
        width: 10px;
        font-size: 6px;
        border: 1px solid;
    }
`
const StyledSpan = styled.span`
    margin-bottom: 5px;
    @media print{
        margin-bottom: 0;
    }
`

export default class TicketPreview extends React.Component {
    render() {
        
        if (this.props.state === undefined) {
            return <TicketContainer>
                <span>No State</span>
            </TicketContainer>
        }
        return (
            <TicketContainer>
                <StyledRow>
                    <StyledCol>
                        <LabelHeader>NPR Log #:</LabelHeader><LabelImportant>{this.props.state.nprLogNumber !== "-1" ? this.props.state.nprLogNumber : ''}</LabelImportant>
                    </StyledCol>
                    <StyledCol>
                        <LabelHeader>Product Line:</LabelHeader><TicketLabel>{this.props.state.selectedProductLine ? this.props.state.selectedProductLine : "N/A"} - {this.props.state.selectedWorkArea ? this.props.state.selectedWorkArea : "N/A"}</TicketLabel>
                    </StyledCol>
                </StyledRow>
                <StyledRow>
                    <StyledCol>
                        <LabelHeader>Date:</LabelHeader><TicketLabel>&nbsp;{this.props.state.ticketCreatedOn ? DateFormat(this.props.state.ticketCreatedOn) : "N/A"}</TicketLabel>
                    </StyledCol>
                    <StyledCol>                        
                        <LabelHeader>Down Time:</LabelHeader><TicketLabel>{this.props.state.totalTimeDown}</TicketLabel>
                    </StyledCol>                    
                </StyledRow>
                <StyledRow>
                    <StyledCol>
                        <LabelHeader>Submitted By:</LabelHeader><TicketLabel>{this.props.state.submittedBy}</TicketLabel>
                    </StyledCol>    
                </StyledRow>
                <StyledRow>
                    <StyledCol>
                        <LabelHeader>Failure Mode:</LabelHeader><TicketLabel>{this.props.state.selectedFailureType ? this.props.state.selectedFailureType : 'N/A'}</TicketLabel>
                    </StyledCol>                    
                </StyledRow>
                <StyledRow>
                    <StyledCol>
                        <LabelHeader>Sub-Assembly Part #:</LabelHeader><LabelImportant>{this.props.state.selectedSubAssPart ? this.props.state.selectedSubAssPart : 'N/A' }</LabelImportant>
                    </StyledCol>     
                </StyledRow>
                <StyledRow>
                    <StyledCol >
                        <LabelHeader>Sub-Assembly Serial #:</LabelHeader><TicketLabel>{this.props.state.subAssSerialNum ? this.props.state.subAssSerialNum : 'N/A' }</TicketLabel>
                    </StyledCol>                    
                </StyledRow>
                <StyledRow>
                    <StyledCol>
                        <LabelHeader>Rejected Part #:</LabelHeader><LabelImportant>{this.props.state.partNumber ? this.props.state.partNumber : "N/A"}</LabelImportant>
                    </StyledCol>  
                    <StyledCol>
                        <LabelHeader>Quantity:</LabelHeader><TicketLabel>{this.props.state.quantityRejected}</TicketLabel>
                    </StyledCol>                  
                </StyledRow>                
                <StyledRow>
                    <StyledCol>
                        <LabelHeader>Rejected Part Serial #:</LabelHeader><TicketLabel>{this.props.state.partSN ? this.props.state.partSN : "N/A"}</TicketLabel>
                    </StyledCol>                    
                </StyledRow>
                <Row style={{marginBottom:"5px"}}>
                    <StyledCol style={{paddingLeft:"25px"}}>
                        <LongLabelHeader style={{marginLeft:"0"}}>Issue:</LongLabelHeader><StyledSpan>{this.props.state.issue}</StyledSpan>
                    </StyledCol>
                </Row>
                <Row>
                    <StyledCol style={{paddingLeft:"25px"}}>
                        <LongLabelHeader style={{marginLeft:"0"}}>Solution:</LongLabelHeader><StyledSpan>{this.props.state.solution}</StyledSpan>
                    </StyledCol>
                </Row>
                <StyledRow >
                    <StyledCol>
                        <LabelHeader>Transacted to MR:</LabelHeader><BoxLabel><Box></Box></BoxLabel>
                    </StyledCol>
                    <StyledCol>
                        <LabelHeader>Disposition Entered:</LabelHeader><BoxLabel><Box></Box></BoxLabel>
                    </StyledCol>
                </StyledRow>
                <StyledRow style={{marginBottom:"20px"}}>
                    <StyledCol>
                        <LabelHeader>Disposition:</LabelHeader>
                        <BoxLabel><Box>{this.props.state.useAsIs && <FontAwesomeIcon icon={faCheck} style={{position:"absolute"}}></FontAwesomeIcon> }</Box></BoxLabel><TicketLabel>Use As Is</TicketLabel>                                                
                        <BoxLabel><Box>{this.props.state.rework && <FontAwesomeIcon icon={faCheck} style={{position:"absolute"}}></FontAwesomeIcon> }</Box></BoxLabel><TicketLabel>Rework</TicketLabel>
                        <BoxLabel><Box>{this.props.state.returnToVendor && <FontAwesomeIcon icon={faCheck} style={{position:"absolute"}}></FontAwesomeIcon> }</Box></BoxLabel><TicketLabel>Return to Vendor</TicketLabel>
                        <BoxLabel><Box >{this.props.state.scrap && <FontAwesomeIcon icon={faCheck} style={{position:"absolute"}}></FontAwesomeIcon> }</Box></BoxLabel><TicketLabel>Scrap</TicketLabel>
                    </StyledCol>
                </StyledRow>                
                <StyledRow>
                    <StyledColSig>
                        <LabelHeader>Quality:</LabelHeader><TicketLabel>____________________________</TicketLabel>
                    </StyledColSig>
                    <StyledColSig>
                        <LabelHeader>Engineering:</LabelHeader><TicketLabel>__________________________</TicketLabel>
                    </StyledColSig>
                </StyledRow>
            </TicketContainer>    
        );
    }
}


