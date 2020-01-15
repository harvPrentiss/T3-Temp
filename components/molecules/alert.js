import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Container } from 'reactstrap'
import Button from '../atoms/button';
import {AlertTypes} from '../../data/enums';

const AlertContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.75);
    z-index: 99;
`

const MessageContainer = styled.div`
    margin-top: 230px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 20px;
    background-color: white;
    width: 50%;
    min-height: 100px;
`

const TopBar = styled.div`
    height: 25px;
    width: 100%;
    margin-bottom: 10px;
`

const AlertMessage = styled.span`
    font-size: 14px;
    color: #000;
    padding-left: 65px;
    padding-top: 15px;
    padding-right: 25px;
`

export default class Alert extends React.Component{

       

    render(){
        return (
            <AlertContainer>
                <MessageContainer>
                    <TopBar style={{backgroundColor:this.props.alertType === AlertTypes.confirm ? "#3c75d8" : this.props.alertType === AlertTypes.info ? "blue" : "red"}}>
                        <Row>
                            <Col style={{paddingLeft:"30px"}}>
                                <FontAwesomeIcon icon={faExclamation} style={{color:"white", fontSize:"16px"}}></FontAwesomeIcon>&nbsp;
                                <span style={{color:"white", fontWeight:"bold", fontSize:"18px"}}>{this.props.alertType === AlertTypes.info ? "Info" : "Alert"}</span>
                            </Col>
                            <Col style={{paddingRight:"30px"}}>
                                <div style={{float:"right", cursor:"pointer"}} onClick={this.props.closeAlert}>
                                    <FontAwesomeIcon icon={faTimes} style={{color:"#999"}}></FontAwesomeIcon>
                                </div>
                            </Col>
                        </Row>
                    </TopBar>
                    <Container>
                        <Row>
                            <AlertMessage>{this.props.message}</AlertMessage>
                        </Row>
                        <Row style={{paddingLeft:"65px"}}>
                            {this.props.alertType === AlertTypes.confirm && (
                                <>
                                <Button style={{backgroundColor:"#3c75d8", minWidth:"120px", float:"left", marginRight:"20px"}} onClick={this.props.yesFunction}>Yes, proceed</Button>
                                <Button style={{backgroundColor:"#3c75d8", minWidth:"120px", float:"left"}} onClick={this.props.closeAlert}>Cancel</Button>
                                </>
                            )}
                            { (this.props.alertType === AlertTypes.error || this.props.alertType === AlertTypes.info) &&
                                <Button style={{backgroundColor:this.props.alertType === AlertTypes.info ? "blue" : "red", minWidth:"120px", margin:"0 auto"}} onClick={this.props.closeAlert}>OK</Button>
                            }
                        </Row>
                    </Container>
                </MessageContainer>
            </AlertContainer>
        )
    }
}
