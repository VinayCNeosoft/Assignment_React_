import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Products from './components/Products';
import './App.css'
import Course from './components/Course';
import Enquiry from './components/Enquiry';
function App() {
  return (
    <>
    <Router>
      <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Assignment</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Product</Nav.Link>
            <Nav.Link href="/course">Courses</Nav.Link>
            <Nav.Link href="/enq">Enquires</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" exact element={<Products/>}/>
        <Route path="/course" exact element={<Course/>}/>
        <Route path="/enq" exact element={<Enquiry/>}/>
      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;