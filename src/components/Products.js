import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Container,Card,Button, Row } from 'react-bootstrap';
import '../App.css';

const url = 'http://localhost:3001/products';

function Products() {
    const [data,setData] = useState([])

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
        <>
        <div className="App-header">
            <Container>
            <h1 className="text-center text-info">Product List</h1>
                <hr className="hl"/>
                <Row xs={6} md={4}  className="justify-content-center">
                    {data.length>0?
                        data.map((row,i) => (
                        <Card style={{ width: '18rem',margin:'10px',border:'2px solid',borderRadius:"20px" }} key={i}>
                            <Card.Img style={{ border:'2px solid' ,height:'auto',width:'auto', marginTop:'10px'}} variant="top" src={row.images} />
                            <Card.Body>
                            <Card.Title className="text-center">Product Name : {row.pname}</Card.Title>
                            <Card.Text>
                                <strong>Price : </strong>$ {row.price}<br/>
                                <strong>Quantity : </strong>{row.quantity}
                            </Card.Text>
                            <Button style={{marginLeft:'10px'}} variant="success">Buy</Button>
                            <Button style={{marginLeft:'10px'}} variant="info">Add to Cart</Button>
                            </Card.Body>
                        </Card>
                        ))
                    :<h3 className="text-warning">Internal Server Error...</h3>
                    }
                </Row>
            </Container>
        </div>
        </>
    )
}
export default Products