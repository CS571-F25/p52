import events from "../assets/events.json"

export default function UpcomingEvents(props) {
    // get upcoming events
    const eventList = events.events.filter((e) => e.upcoming );

    return <div>
        <h1>Upcoming Events</h1>
        {
            eventList.map((e) => {
                return <Event key={e.name} {...e}></Event>
            })
        }
    </div>
}