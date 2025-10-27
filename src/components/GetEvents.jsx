import events from "../assets/events.json"
import EventCard from "./EventCard";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState } from "react";

export default function GetEvents(props) {
    // get upcoming events
    const eventList = events.events.filter((e) => props.isUpcoming ? e.upcoming : !e.upcoming);

    const [type, setType] = useState("All");

    // Sort events by date and time
    const sortedEvents = eventList.sort((a, b) => {
        // swap some orderings if events are past
        let swap = 1;
        if (!props.isUpcoming) {
            swap = -1;
        }

        // Handle "TBD" dates
        if (b.date === "TBD") return -1; // Place b after a
        if (a.date === "TBD") return 1; // Place a after b
        
        // Handle "TBD" times
        if (b.time === "TBD" && a.time === "TBD") {
            const dateA = new Date(`${a.date}`);
            const dateB = new Date(`${b.date}`);
            return swap*(dateA - dateB);  // Ascending order (if is upcoming)
        }
        else if (b.time === "TBD") {
            const dateA = new Date(`${a.date}`);
            const dateB = new Date(`${b.date}`);
            
            // if they have the same date, put a first because a has a determined time
            if (dateA - dateB === 0) {
                return -1; // Place b after a
            }
            else {
                return swap*(dateA - dateB); // Ascending order (if is upcoming)
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
                return swap*(dateA - dateB); // Ascending order (if is upcoming)
            }
        }
        // have both time and date
        else {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return swap*(dateA - dateB); // Ascending order (if is upcoming)
        }
    });

    // get all possible event categories
    const uniqueCategories = new Set(); // set means no duplicate categories

    uniqueCategories.add("All");

    // iterate through each event and add categories to the Set (want categories of both past and upcoming events)
    events.events.forEach(event => {
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
        <h1 className="pageTitle">{props.isUpcoming ? "Upcoming Events" : "Past Events"}</h1>
        <br/>
        <div>
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
        {
            props.isUpcoming &&
            <Container>
                <Row style={{width: "100vw", maxWidth: "100%"}}> {/* Keep content positions consistent */}
                    {
                        displayEvents(keptEvents, props.isUpcoming)
                    }
                </Row>
            </Container>
        }
        {
            !props.isUpcoming &&
            <>
                <Container>
                {
                        displayEvents(keptEvents, props.isUpcoming)
                }
                </Container>
            </>
        }
    </div>
}

function displayEvents(keptEvents, isUpcoming) {
    if(isUpcoming)
    {
        return keptEvents.map((e) => {
            return <Col key={e.name} xs={12} sm={12} md={6} lg={4} xl={3} style={{ marginBottom: "16px" }}>
                <EventCard {...e} ></EventCard>
            </Col>
        });
    }
    else {
        return keptEvents.map((e) => {
            return <EventCard key={e.name} xs={12} sm={12} md={6} lg={4} xl={3} {...e}></EventCard>
        });
    }

}