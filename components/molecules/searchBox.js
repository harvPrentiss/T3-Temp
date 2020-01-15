import React from 'react';
import { Row, Col} from 'reactstrap';
import Input from '../atoms/input';
import styled from 'styled-components'
import Button from '../atoms/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const IconCol = styled(Col)`
    padding: 0;
    height: 40px;
    position: relative;
`

const InputCol = styled(Col)`
    padding: 0;
    height: 40px;
    @media (max-width: 999px) {
        padding: 0 !important;
    }
`

const ButtonCol = styled(Col)`
    padding: 0 15px 0 5px;
    height: 40px;
    @media (max-width: 999px) {
        padding: 0 !important;
    }
`

const SearchButton = styled(Button)`
    @media (max-width: 999px) {
        min-width: 100px;
    }
`

export default class SearchBox extends React.Component {
    render() {
        return (
            <Row onBlur={this.props.onBlur}>
                <IconCol className="d-none d-lg-flex d-xl-flex" xs="1" sm="1" md="1" lg="1">
                    <FontAwesomeIcon icon={faSearch} style={{height: "40px"}}></FontAwesomeIcon>
                </IconCol>
                <InputCol xs="8" sm="8" md="8" lg="8">
                    <Input title="" value={this.props.searchTerm} onChange={this.props.onChange}
                        name={this.props.name} placeholder={this.props.placeholder} onKeyPress={this.props.onKeyPress}>
                    </Input>                               
                </InputCol>
                <ButtonCol xs="4" sm="4" md="4" lg="3">
                    <SearchButton className="d-none d-lg-flex d-xl-flex" target="_blank" onClick={this.props.searchFunction}  alt="Search">Search</SearchButton>
                    <SearchButton className="d-lg-none d-xl-none" target="_blank" onClick={this.props.searchFunction} alt="Search" style={{ padding:"0px", fontSize:"18px", width:"100%"}}>
                        <FontAwesomeIcon icon={faSearch} style={{height: "40px"}}></FontAwesomeIcon>    
                    </SearchButton> 
                </ButtonCol>
            </Row>
        );
    }
}
