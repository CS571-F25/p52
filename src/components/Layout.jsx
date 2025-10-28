import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";

export default function Layout(props) {
  return <div>
    <Navbar className="mx-auto" bg="light" variant="light" style={{backgroundColor:"white", maxWidth: "50%", borderRadius: "1rem"}}>
      <Container>
        {/* <Navbar.Brand as={Link} to="/">
          <img/> TODO: create home image
        </Navbar.Brand> */}
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          <Nav.Link as={Link} to="/upcoming-events">Upcoming Events</Nav.Link>
          <Nav.Link as={Link} to="/past-events">Past Events</Nav.Link>
          <Nav.Link as={Link} to="/quizzes">Quizzes</Nav.Link>
          <Nav.Link as={Link} to="/tutorials">Tutorials</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <div style ={{ margin: "1rem", borderRadius: "1rem" }}>
      <Outlet/>
    </div>
  </div>
}