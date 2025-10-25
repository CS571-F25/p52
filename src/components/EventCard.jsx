import {Card} from "react-bootstrap"

// events have a name, description, date, time, location, and category
export default function EventCard(props) {
    return <Card>
        {
            props.categories.map((c) => <p key={c}>{c}</p>)
        }
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <br/>
        <p><strong>Date: </strong>{props.date}</p>
        <p><strong>Time: </strong>{props.time}</p>
        <p><strong>Location: </strong>{props.location}</p>
    </Card>
}