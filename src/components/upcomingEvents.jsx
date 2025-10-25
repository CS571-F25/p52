import events from "../assets/events.json"
import EventCard from "./EventCard";
import { Container, Row, Col } from "react-bootstrap";

export default function UpcomingEvents(props) {
    // get upcoming events
    const eventList = events.events.filter((e) => e.upcoming );

    // Sort events by date and time
    const sortedEvents = eventList.sort((a, b) => {
        // Handle "TBD" dates
        if (b.date === "TBD") return -1; // Place b after a
        if (a.date === "TBD") return 1; // Place a after b
        
        // Handle "TBD" times
        if (b.time === "TBD" && a.time === "TBD") {
            const dateA = new Date(`${a.date}`);
            const dateB = new Date(`${b.date}`);
            return dateA - dateB; // Ascending order
        }
        else if (b.time === "TBD") {
            const dateA = new Date(`${a.date}`);
            const dateB = new Date(`${b.date}`);
            
            // if they have the same date, put a first because a has a determined time
            if (dateA - dateB === 0) {
                return -1; // Place b after a
            }
            else {
                return dateA - dateB;
            }
        }
        else if (a.time === "TBD") {
            const dateA = new Date(`${a.date}`);
            const dateB = new Date(`${b.date}`);
            
            // if they have the same date, put b first because b has a determined time
            if (dateA - dateB === 0) {
                return 1; // Place a after b
            }
            else {
                return dateA - dateB;
            }
        }
        // have both time and date
        else {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateA - dateB; // Ascending order
        }
    });


    return <div>
        <h1>Upcoming Events</h1>
        <br/>
        <Container>
            <Row>
                {
                    sortedEvents.map((e) => {
                        return <Col key={e.name} xs={12} sm={12} md={6} lg={4} xl={3} style={{ marginBottom: "16px" }}>
                            <EventCard {...e}></EventCard>
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}