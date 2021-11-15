import React,{useState,useEffect} from 'react';
import { Container,Button, Table} from 'react-bootstrap';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import axios from 'axios';
import '../App.css';

const url = 'http://localhost:3002/courses';

function Course() {
    const [courseData,setData] = useState([])

    const [modalShow, setModalShow] = useState(false);

    const getData = () =>{
        axios.get(url)
        .then((res)=>{
            const myRepo = res.data;
            setData(myRepo);
            console.log(myRepo)
        }
        );
    };
    useEffect(()=>getData(),[])


    return (
        <div>
            <Container>
            <h1 className="text-center text-warning">Course List</h1>
                <hr className="hl"/>
                <Table responsive bordered className="text-center">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Course Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseData.map((cd,i)=>(
                        <tr key={i}>
                            <td>{cd.id}</td>
                            <td>{cd.cCode}</td>
                            <td>{cd.courseName}</td>
                            <td>{cd.courseDuration}</td>
                            {/* <td><Button variant="info">Enquiry</Button></td> */}
                           <td> <Button variant="primary" onClick={() => setModalShow(true)}>Enquiry</Button></td>
                           <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            />
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Course