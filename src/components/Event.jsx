// events have a name, description, date, time, location, and category
export default function Event(props) {
    return <Card>
        {
            props.categories.map((c) => <p>{c}</p>)
        }
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <br/>
        <p><strong>Date: </strong>{props.date}</p>
        <p><strong>Time: </strong>{props.time}</p>
        <p><strong>Location: </strong>{props.location}</p>
    </Card>
}