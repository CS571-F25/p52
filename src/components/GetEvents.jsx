import events from "../assets/events.json"
import EventCard from "./EventCard";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState } from "react";

export default function GetEvents(props) {
    // get upcoming events
    const eventList = events.events.filter((e) => {
        const now = new Date();
        let eventStart = new Date(`${e.date} ${e.startTime}`);
        let eventEnd = new Date(`${e.date} ${e.endTime}`);

        if (e.date === "TBD") {
            return props.isUpcoming;
        }
        if (e.startTime === "TBD" || e.endTime === "TBD") {
            eventStart = new Date(`${e.date}`);
            eventEnd = new Date(`${e.date}`);
            // Reset time to midnight for date-only comparison
            now.setHours(0, 0, 0, 0);
        }
        
        // Event hasn't started yet (upcoming)
        if (now < eventStart) {
            return props.isUpcoming;
        }
        // Event is currently happening (ongoing)
        else if (now >= eventStart && now <= eventEnd) {
            return props.isUpcoming;
        }
        // Event has ended (past)
        else {
            return !props.isUpcoming;
        }
    });

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
        if (b.startTime === "TBD" && a.startTime === "TBD") {
            const dateA = new Date(`${a.date}`);
            const dateB = new Date(`${b.date}`);
            return swap*(dateA - dateB);  // Ascending order (if is upcoming)
        }
        else if (b.startTime === "TBD") {
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
        else if (a.startTime === "TBD") {
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
            const dateA = new Date(`${a.date} ${a.startTime}`);
            const dateB = new Date(`${b.date} ${b.startTime}`);
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

    // Create a map of colors for categories
    const categoryColors = new Map();
    categoryList.forEach((category) => {
        if (!categoryColors.has(category)) {
            categoryColors.set(category, generateColor(category));
        }
    });

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
                        displayEvents(keptEvents, props.isUpcoming, categoryColors)
                    }
                </Row>
            </Container>
        }
        {
            !props.isUpcoming &&
            <>
                <Container>
                {
                        displayEvents(keptEvents, props.isUpcoming, categoryColors)
                }
                </Container>
            </>
        }
    </div>
}

// function to display event cards
function displayEvents(keptEvents, isUpcoming, categoryColors) {
    if(isUpcoming)
    {
        return keptEvents.map((e) => {
            return <Col key={e.name} xs={12} sm={12} md={6} lg={4} xl={3} style={{ marginBottom: "16px" }}>
                <EventCard {...e} isUpcoming = {isUpcoming} categoryColors={categoryColors} ></EventCard>
            </Col>
        });
    }
    else {
        return keptEvents.map((e) => {
            return <EventCard key={e.name} isUpcoming = {isUpcoming} xs={12} sm={12} md={6} lg={4} xl={3} {...e} categoryColors={categoryColors}></EventCard>
        });
    }
}

// since "All" will be given a color, the first color is not used unless wraparound occurs
const predefinedColors = [
    "#9b0015ff", "#00ae20ff", "#006effff", "#FF33A1", "#A133FF", "#33FFF5", "#191587ff", "#ff92efff", "#59ff99ff"
];
let colorIndex = 0; // Global index to track the next color to use

// Function to generate a unique color for each category
function generateColor(category) {
    const color = predefinedColors[colorIndex % predefinedColors.length]; // Use colors in a round-robin fashion
    colorIndex++; // Increment the index for the next category
    return color;
}