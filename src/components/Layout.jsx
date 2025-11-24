import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";

export default function Layout(props) {
  return <div>
    <Navbar expand="sm" className="mx-auto" bg="light" variant="light" style={{backgroundColor:"white", maxWidth: "fit-content", borderRadius: "1rem"}}>
      <Container>
        {/* <Navbar.Brand as={Link} to="/">
          <img/> TODO: create home image
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="main-nav" className="navbar-toggler-center" style={{color: "purple"}}/>
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/upcoming-events">Upcoming Events</Nav.Link>
            <Nav.Link as={Link} to="/past-events">Past Events</Nav.Link>
            <Nav.Link as={Link} to="/quizzes">Quizzes</Nav.Link>
            <Nav.Link as={Link} to="/tutorials">Tutorials</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div style ={{ margin: "1rem", borderRadius: "1rem" }}>
      <Outlet/>
    </div>
  </div>
}