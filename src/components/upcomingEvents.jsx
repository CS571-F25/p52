import events from "../assets/events.json"
import EventCard from "./EventCard";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState } from "react";

export default function UpcomingEvents(props) {
    // get upcoming events
    const eventList = events.events.filter((e) => e.upcoming );
    const [type, setType] = useState("All");

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

    // get all possible event categories
    const uniqueCategories = new Set(); // set means no duplicate categories

    uniqueCategories.add("All");

    // Iterate through each event and add categories to the Set
    eventList.forEach(event => {
        event.categories.forEach(category => {
            uniqueCategories.add(category);
        });
    });

    // Convert the Set to an array so can use map
    const categoryList = Array.from(uniqueCategories);

    // Update events based on category
    let keptEvents;

    if (type === "All") {
        keptEvents = sortedEvents;
    }
    else {
        keptEvents = sortedEvents.filter((e) => {
            return e.categories.some(category => category === type);
        })
    }

    return <div>
        <h1>Upcoming Events</h1>
        <br/>
        <div className="d-flex justify-content-center"> {/* Center pagination */}
            <Pagination style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}> {/* Make pagination responsive to smaller screens */}
                {
                    categoryList.map((c) =>{
                        return <Pagination.Item
                            key = {c}
                            active = {type === c}
                            onClick = {() => setType(c)}
                        >{c}
                        </Pagination.Item>
                    })
                }
            </Pagination>
        </div>
        <br/>
        <Container style={{width: "100vw", height: "100vh"}}> {/* Keep content positions consistent */}
            <Row>
                {
                    keptEvents.map((e) => {
                        console.log(Container.width);
                        return <Col key={e.name} xs={12} sm={12} md={6} lg={4} xl={3} style={{ marginBottom: "16px" }}>
                            <EventCard {...e}></EventCard>
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}