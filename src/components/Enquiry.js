import React,{useState,useEffect} from 'react';
import { Container , Table} from 'react-bootstrap';
// import { Card, Row ,Button} from 'react-bootstrap';

import axios from 'axios';

const url = 'http://localhost:3003/enquir';

function Enquiry() {
    const [eData,setEData] = useState([])

    const getData = () =>{
        axios.get(url)
        .then((res)=>{
            const myRepo = res.data;
            setEData(myRepo);
            console.log(myRepo)
        }
        );
    };
    useEffect(()=>getData(),[])
    return (
        <>
        <div>
            <div className="App-header">
            <Container>
            <br/>
            <h1 className="text-center text-warning">All Enquires</h1>
                <hr className="hl"/>
                <Table responsive bordered className="text-center text-info">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            {/* <th>Extra</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {eData.map((cd,i)=>(
                        <tr key={i}>
                            <td>{cd.id}</td>
                            <td>{cd.cCode}</td>
                            <td>{cd.eCourse}</td>
                            <td>{cd.name}</td>
                            <td>{cd.email}</td>
                            <td>{cd.mobile}</td>
                            {/* <td>{cd.questions}</td> */}
                        </tr>
                        ))}
                    </tbody>
                </Table>

                {/* <Row xs={6} md={4}  className="justify-content-center">
                    {eData.length>0?
                        eData.map((eq,i) => (
                        <Card style={{ width: '18rem',margin:'10px',border:'2px solid',borderRadius:"20px" }} key={i}>
                            <Card.Body>
                            <Card.Title className="text-center">Course Code : {eq.cCode}</Card.Title>
                            //  <Card.Text>
                                <ul key={i}>
                                    <li><strong>Enquire ID: </strong>{eq.id}</li>
                                    <li><strong>Course Name : </strong>{eq.eCourse}</li>
                                    <li><strong>User Name : </strong>{eq.name}</li>
                                    <li><strong>Email : </strong>{eq.email}</li>
                                    <li><strong>Mobile : </strong>{eq.mobile}</li>
                                    <li><strong>Questions : </strong>{eq.questions}</li>
                                </ul>
                            // </Card.Text>
                            </Card.Body>
                        </Card>
                        ))
                    :'Data Not Fetched !'
                    }
                </Row> */}
            </Container>
        </div>
        </div>
        </>
    )
}

export default Enquiry
