import axios from 'axios';
import React, { Component, useEffect, useState, useCallback } from 'react';
import '../css/member.css';
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Error from "../Components/ErrorMessage";



function FindIdPage() {

    const [userName, setUserName] = useState();
    const [userBirth, setUserBirth] = useState();
    const [userEmail, setUserEmail] = useState();
    const [isValidName, setIsValidName] = useState(false);
    const [isValidBirth, setIsValidBirth] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onNameHandler = (event) => {
        setUserName(event.currentTarget.value);
    }

    const onBirthHandler = (event) => {
        setUserBirth(event.currentTarget.value);
    }

    const onEmailHandler = (event) => {
        setUserEmail(event.currentTarget.value);
    }

    const onNameValidCheck = (event) => {
        const checkName = event.currentTarget.value;
        if (checkName === "") {
            setIsValidName(true);
        } else {
            setIsValidName(false);
        }
    };
    
    const onBirthValidCheck = (event) => {
        const checkBirth = event.currentTarget.value;
        if (checkBirth === "") {
            setIsValidBirth(true);
        } else {
            setIsValidBirth(false);
        }
    };
    
    const onEmailValidCheck = (event) => {
        const checkEmail = event.currentTarget.value;
        if (checkEmail === "") {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };
    

    const requestFindid = (event) => {
        axios({
            method: "POST",
            url: "/auth/findId",
            data: {
                "userName": userName,
                "dateOfBirth": userBirth,
                "email": userEmail
            }
        })
            .then((res) => {
                console.log(res.data.responseData);
                return res.data.responseData.redirect;
            })
            .then((res) => {
                window.location = `${res}`;
            })
            .catch((err) => {
                if (err) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.header);
                    const notification = new Notification("????????? ??????", {
                        icon: 'http://localhost:3500/semobanlogo_3.png',
                        body: `${err.response.data.message}`
                    })
                    setTimeout(notification.close.bind(notification), 3000);
                    // console.log(err);
                }
            });
    }

    return (
        <div className='input_page'>
            <h2>????????? ??????</h2>
            <div className='input'>
                <div className='input_content mb-3'>
                    <div className='input_what'>
                        <label for="name" className='form-label'>??????</label>
                        </div>
                    <span className='input_area'>
                        <input type="text" id="name" className='write form-control' onChange={onNameHandler} onBlur={onNameValidCheck}></input>
                    </span>
                    <Error className="error_text" visibility={isValidName}>
                        <span>????????? ??????????????????.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="birth" className='form-label'>????????????</label>
                    </div>
                    <span className='input_area'>
                        <input id="birth" type="date" className='write form-control' onChange={onBirthHandler} onBlur={onBirthValidCheck}></input>
                    </span>
                    <Error className="error_text" visibility={isValidBirth}>
                        <span>??????????????? ??????????????????.</span>
                    </Error>
                </div>
                <div className='input_content'>
                    <div className='input_what'>
                        <label for="email" className='form-label'>?????????</label>
                    </div>
                    <span className='input_area'>
                        <input type="email" id="email" className='write form-control' onChange={onEmailHandler} onBlur={onEmailValidCheck}></input>
                    </span>
                    <Error className="error_text" visibility={isValidEmail}>
                        <span>???????????? ??????????????????.</span>
                    </Error>
                </div>

                <input type='button' id="button" value="????????? ??????" class="btn btn-success" onClick={requestFindid}></input>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>????????? ??????</Modal.Title>
                </Modal.Header>
                <Modal.Body>???????????? ???????????? ???????????? ?????????????????????.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    ??????
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default FindIdPage;