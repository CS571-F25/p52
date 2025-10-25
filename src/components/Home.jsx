import {useState} from "react";
import {Card, Button} from "react-bootstrap";
import lessons from "./dailyLessons.json"
import Source from "./Source.jsx";

export default function Home (props) {

    let dailyLesson = lessons.lessons[0]; // indexing should be controlled by the day!
    let sources = dailyLesson.sources;

    // controls whether the daily lesson sources are shown; controlled by a button
    const [showSources, setShowSources] = useState(false);


    return <div>
        <h1>Home!</h1>

        {/* Daily Lesson */}
        <h2>Lesson of the Day</h2>
        <Card>

            <h3>{dailyLesson.title}</h3>

            <br/>

            {/* This styling will allow \n to be recognized. Inspired by: https://stackoverflow.com/questions/42547885/how-to-recognize-new-line-character-n-in-html*/}
            <p style={{whiteSpace: "pre-wrap"}}>{dailyLesson.content}</p>

            <br/>
            <Button onClick={()=>{setShowSources(s=>!s)}}>Sources</Button>
            <br/>
            {
                showSources ?
                    sources.map(source => {
                        return <Source key={source.link} {...source}/>
                    })
                : <></>
            }

        </Card>
    </div>
}