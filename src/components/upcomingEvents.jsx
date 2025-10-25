import events from "../assets/events.json"
import EventCard from "./EventCard";
import { Container, Row, Col } from "react-bootstrap";

export default function UpcomingEvents(props) {
    // get upcoming events
    const eventList = events.events.filter((e) => e.upcoming );

    return <div>
        <h1>Upcoming Events</h1>
        <br/>
        <Container>
            <Row>
                {
                    eventList.map((e) => {
                        return <Col key={e.name} xs={12} sm={12} md={6} lg={4} xl={3} style={{ marginBottom: "16px" }}>
                            <EventCard {...e}></EventCard>
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}