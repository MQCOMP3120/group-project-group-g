import React from 'react'
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import { BiSearch } from 'react-icons/bi'
import { GrClose } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { closeSearch } from '../features/navbar/searchSlice'

export default function SearchModal() {
    const dispatch = useDispatch();
    return (
        <Wrapper className='center-items'>
            <GrClose size={60} className="close-icon" onClick={() => dispatch(closeSearch())} />
            <Form className='d-flex w-50 h20'>
                <Form.Control type="search" size='lg' placeholder="Search" />
                <Button className="ms-4"> <BiSearch size={35} /> </Button>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.section`
position: relative;
z-index: 10000;
width: 100vw;
height: 100vh;
position: absolute;
background-color: rgba(168, 155, 162, 0.64);

.close-icon {
 position: absolute;
 top: 10vh;
 right: 15vw;
}

.close-icon:hover{
    cursor: pointer;
}

`
