import React from "react"
import styled from 'styled-components'

const Container = styled.div`
        position: relative;
    top: -14px;
    float: right;

`
const TimeStamp = ({ ...props }) => {
    let date = new Date();
    return (
        <>
            <Container>
                {date.toDateString() + ":" + date.toLocaleTimeString()}
            </Container>
            <br />
        </>
    );
}

export default TimeStamp

