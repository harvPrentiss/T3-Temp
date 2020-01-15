import React from 'react';
import styled from 'styled-components'
import { Row, Col, Container } from 'reactstrap'
import Link from '../atoms/link'
import { palette } from 'styled-theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

const UserContainer = styled(Container)`
  font-size: 12px;
  max-width: none !important;
`
const NormalRow = styled(Row)`
    border: 1px solid #707070;
    border-top: none;
    padding: 7px 5px;
`
const HeaderRow = styled(Row)`
    background-color: ${palette('primary', 0)};
    padding: 10px 5px;
    font-size: 13px;
    color: white;
`
const StyledEditButton = styled(FontAwesomeIcon)`
    color: #707070;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        color: #254f9e !important;
  }
`
const RightCol = styled(Col)`
    text-align: right;
`

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleEditUser = this.handleEditUser.bind(this);
    }    

    handleEditUser = (Id, email) => {
        this.props.updateId(Id, email);
    }

    render() {
        return (
            <UserContainer>
                {
                    <HeaderRow className="d-none d-lg-flex d-xl-flex">
                        <Col xs="12" sm="12" md="8" lg="4" onClick={() => this.props.sortFunction("UserId")} style={{cursor:"pointer"}}>
                            Email 
                            {this.props.orderByField === "UserId" && this.props.ascending && <FontAwesomeIcon icon={faSortUp} style={{marginLeft:"10px"}}></FontAwesomeIcon>}
                            {this.props.orderByField === "UserId" && !this.props.ascending && <FontAwesomeIcon icon={faSortDown} style={{marginLeft: "10px"}}></FontAwesomeIcon>}
                        </Col>
                        <Col xs="12" sm="12" md="8" lg="3" onClick={() => this.props.sortFunction("FirstName")} style={{cursor:"pointer"}}>
                            First Name 
                            {this.props.orderByField === "FirstName" && this.props.ascending && <FontAwesomeIcon icon={faSortUp} style={{marginLeft: "10px"}}></FontAwesomeIcon>}
                            {this.props.orderByField === "FirstName" && !this.props.ascending && <FontAwesomeIcon icon={faSortDown} style={{marginLeft: "10px"}}></FontAwesomeIcon>}
                        </Col>
                        <Col xs="12" sm="12" md="8" lg="4">
                        User Roles
                        </Col>
                        <RightCol xs="12" sm="12" md="8" lg="1">
                        Edit User
                        </RightCol>
                    </HeaderRow> 
                }       
                {
                    <HeaderRow className="d-lg-none d-xl-none">
                        <Col xs="12" sm="12" md="8" lg="3">Users</Col>
                    </HeaderRow>
                }        
                {this.props.users && this.props.users.length > 0 &&
                    this.props.users.map((item, key) =>
                    <NormalRow key={key} >
                        <Col xs="12" sm="12" md="8" lg="4">
                            <Link onClick={() => this.handleEditUser(item.Id, item.Email)}>{item.Email}</Link>
                        </Col>
                        <Col xs="12" sm="12" md="8" lg="3">
                            {item.FirstName ? item.FirstName : "N/A"}
                        </Col>
                        <Col xs="12" sm="12" md="8" lg="4">
                            {item.Roles && item.Roles.length === 0 &&
                                    <span>N/A</span>    
                            }
                            {item.Roles &&
                                item.Roles.map(function (a, index) {
                                    if (index === 0) {
                                        return <span key={index}>{a.RoleName}</span>
                                    } else {
                                        return <span key={index}>, {a.RoleName}</span>
                                    }
                                })
                            }
                        </Col>
                        <RightCol xs="12" sm="12" md="8" lg="1">
                            <StyledEditButton  onClick={() => this.handleEditUser(item.Id, item.Email)} icon={faEdit}></StyledEditButton>
                        </RightCol>
                    </NormalRow>
                    )                    
                }
                {this.props.users && this.props.users.length === 0 &&
                    <>
                        <NormalRow >
                            <Col xs="12" sm="12" md="8" lg="4">
                                <span>There are no users to display</span>
                            </Col>
                            <Col xs="12" sm="12" md="8" lg="3">                                
                            </Col>
                            <Col xs="12" sm="12" md="8" lg="4">
                            </Col>
                            <RightCol xs="12" sm="12" md="8" lg="1">
                            </RightCol>
                        </NormalRow>
                    </>
                }
            </UserContainer>
        )
    }
}