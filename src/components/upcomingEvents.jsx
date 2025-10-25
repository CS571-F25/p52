import events from "../assets/events.json"

export default function upcomingEvents(props) {
    // get upcoming events
    const eventList = events.events.filter((e) => e.upcoming );

    return <div>
        {
            eventList.map((e) => {
                return <Event key={e.name} {...e}></Event>
            })
        }
    </div>
}