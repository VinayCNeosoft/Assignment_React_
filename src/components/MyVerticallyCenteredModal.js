import React, {useState,useRef} from 'react';
import { Button, Row, Modal, Form,Col, FormControl } from 'react-bootstrap';
import axios from 'axios';
// import {useNavigate} from "react-router-dom";

const RegForName = RegExp('[a-zA-Z ]{2,100}');
const RegForEmail = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.com$');
const RegForMobile = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)

const url = 'http://localhost:3003/enquir';

function MyVerticallyCenteredModal(props) {

    // const [eUData,setEData] = useState([])

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

    // const navigate = useNavigate();

    const handler = e =>{
        let fieldname = e.target.name
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
                setErrQues(RegForName.test(quesRef.current.value)?'':"* At least ask 1 question")
                setQuestion(quesRef.current.value)
                break
            default:
            break;
        }
    }

    /* const getData = () =>{
        axios.get(url)
        .then((res)=>{
            const myRepo = res.data;
            setEData(myRepo);
            //console.log(myRepo)
        }
        );
    };
    useEffect(()=>getData(),[])
    console.log(eUData) */

    const formSubmit= () =>
    {
        if(err_course_Name==='' && err_name==='' && err_email==='' && err_mobile==='' && err_ques==='')
        {
            if(course_Name !== '' && name !== '' && email !== '' && mobile !== '' && ques !== '')
            {
                let formData = {"eCourse":props.course_Name, "name":props.name, "email":props.email, "mobile":props.mobile, "questions":props.ques}
                console.log(formData)
                axios.post(url,formData)
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
                {props.onHide()}
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
        let formData = {"eCourse":props.course_Name, "name":props.name, "email":props.email, "mobile":props.mobile, "questions":props.ques}
        console.log(formData)
        axios.post(url,formData)
        {props.onHide()}
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
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                <Form.Label column sm={2}>
                Course Name
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="coursename" value={props.course_Name} disabled />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                <Form.Label column sm={2}>
                Name
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="name" ref={nameRef}
                onChange={e=>handler(e)} isInvalid={err_name===''?true:false} isValid={name!==''?true:false}/>
                <FormControl.Feedback type="invalid">{err_name}</FormControl.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Email
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="email" name="email" ref={emailRef}
                onChange={e=>handler(e)} isInvalid={err_email===''?true:false} isValid={email!==''?true:false}/>
                <FormControl.Feedback type="invalid">{err_email}</FormControl.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalMobile">
                <Form.Label column sm={2}>
                Mobile
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="phone" name="mobile" ref={mobileRef}
                onChange={e=>handler(e)} isInvalid={err_mobile===''?true:false} isValid={mobile!==''?true:false}/>
                <FormControl.Feedback type="invalid">{err_mobile}</FormControl.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalQuestions">
                <Form.Label column sm={2}>
                Any Questions?
                </Form.Label>
                <Col sm={10}>
                <Form.Control as="textarea" style={{ height: '100px' }} name="ques" ref={quesRef}
                onChange={e=>handler(e)} isInvalid={err_ques===''?true:false} isValid={ques!==''?true:false}/>
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