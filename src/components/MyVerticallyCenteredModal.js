import React, {useState,useRef,useEffect} from 'react';
import { Button, Row, Modal, Form,Col, FormControl } from 'react-bootstrap';
import axios from 'axios';
// import {useNavigate} from "react-router-dom";

const RegForName = RegExp('^[a-zA-Z]+\\s[a-zA-Z]+$');
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[A-zA-Z0-9.-]+.com$');
const RegForMobile = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)
const RegForQues = RegExp('^[a-zA-z0-9 ]{10,100}$')

const url = 'http://localhost:3003/enquir';

function MyVerticallyCenteredModal(props) {

    //const [eUData,setEData] = useState([])

    const [course_Name,setCName] = useState()

    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [mobile,setMobile] = useState()
    const [ques,setQuestion] = useState()

    const course_NameRef = useRef(null)
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const mobileRef = useRef(null)
    const quesRef = useRef(null)

    const [err_course_Name,setErrCName] = useState('')
    const [err_name,setErrName] = useState('')
    const [err_email,setErrEmail] = useState('')
    const [err_mobile,setErrMobile] = useState('')
    const [err_ques,setErrQues] = useState('')

    //const navigate = useNavigate();
    /* const getData = () =>{
        axios.get(url)
        .then((res)=>{
            const myRepo = res.data;
            setEData(myRepo);
            //console.log(myRepo)
        }
        );
    }; */

    const handler = event =>{
        let fieldname = event.target.name
        switch(fieldname){
            case 'coursename':
                setErrCName(RegForName.test(course_NameRef.current.value)?'':'* Please enter valid Course Name')
                setCName(course_NameRef.current.value)
                break

            case 'name':
                setErrName(RegForName.test(nameRef.current.value)?'':'* Please enter Name - at least 6 characters')
                setName(nameRef.current.value)
                break

            case 'email':
                setErrEmail(RegForEmail.test(emailRef.current.value)?'':'* Please enter Valid Email')
                setEmail(emailRef.current.value)
                break

            case 'mobile':
                setErrMobile(RegForMobile.test(mobileRef.current.value)?'':"* Please enter 10 digit Mobile Number")
                setMobile(mobileRef.current.value)
                break

            case 'ques':
                setErrQues(RegForQues.test(quesRef.current.value)?'':"* At least ask 1 question")
                setQuestion(quesRef.current.value)
                break
            default:
            break;
        }
    }
    useEffect(()=>{
        setCName('')
        setName('')
        setEmail('')
        setMobile('')
        setQuestion('')
        setErrCName('')
        setErrName('')
        setErrEmail('')
        setErrMobile('')
        setErrQues('')
    },[props.show] )

    const formSubmit= () =>
    {
        if(err_course_Name==='' && err_name==='' && err_email==='' && err_mobile==='' && err_ques==='')
        {
            if(name !== '' && email !== '' && mobile !== '' && ques !== '')
            {
                const formData = {"cCode":props.code,"eCourse":props.course, "name":nameRef.current.value, "email":emailRef.current.value, "mobile":mobileRef.current.value, "questions":quesRef.current.value}
                console.log(formData)
                axios.post(url,formData)
                alert("Thank You for showing your Interest our team shortly connect to you.")
                props.onHide()
            }
            else
            {
                alert('Please Fill the form to continue !');
            }
        }
        else
        {
            alert("Please Enter Valid data to continue...")
        }
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            User Enquiry Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCode">
                <Form.Label column sm={2}>
                Course Code
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="code" value={props.code} disabled />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                <Form.Label column sm={2}>
                Course Name
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="coursename" value={props.course} disabled />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                <Form.Label column sm={2}>
                Name
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="name" ref={nameRef}
                onChange={event=>handler(event)} isInvalid={err_name!==''?true:false} isValid={name!==''?true:false}/>
                <FormControl.Feedback type="invalid">{err_name}</FormControl.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Email
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="email" name="email" ref={emailRef}
                onChange={event=>handler(event)} isInvalid={err_email!==''?true:false} isValid={email!==''?true:false}/>
                <FormControl.Feedback type="invalid">{err_email}</FormControl.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalMobile">
                <Form.Label column sm={2}>
                Mobile
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="phone" name="mobile" ref={mobileRef}
                onChange={event=>handler(event)} isInvalid={err_mobile!==''?true:false} isValid={mobile!==''?true:false}/>
                <FormControl.Feedback type="invalid">{err_mobile}</FormControl.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalQuestions">
                <Form.Label column sm={2}>
                Any Questions?
                </Form.Label>
                <Col sm={10}>
                <Form.Control as="textarea" style={{ height: '100px' }} name="ques" ref={quesRef}
                onChange={event=>handler(event)} isInvalid={err_ques!==''?true:false} isValid={ques!==''?true:false}/>
                <FormControl.Feedback type="invalid">{err_ques}</FormControl.Feedback>
                </Col>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={formSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
}
export default MyVerticallyCenteredModal