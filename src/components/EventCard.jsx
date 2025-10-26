import { Card } from "react-bootstrap";

export default function EventCard(props) {
    const renderName = splitEmTags(props.name);
    const renderDescription = splitEmTags(props.description);

    return <Card style={{width: "fit-content"}}>
        { props.upcoming &&
            <>
                {
                    props.categories.map((c) => <p key={c}>{c}</p>)
                }
                <h2>{renderName}</h2>
                <p>{renderDescription}</p>
                <br/>
                <p><strong>Date: </strong>{props.date}</p>
                <p><strong>Time: </strong>{props.time}</p>
                <p><strong>Location: </strong>{props.location}</p>
            </>
        }
        { !props.upcoming &&
            <>
                <h2>{renderName}</h2>
                <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
                    <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQuAUYLkiDJuGIZ-C-edO-zKYn2ihMlZdC97AA8pwf61QogQkGsi86ViNMrywIiFEwjfsX8FrJzzXY0/pubembed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                </div>
            </>
        }
    </Card>;
}

// converts string with <em></em> tag to string with italicized text
function splitEmTags(description) {
    const regex = /(<em>.*?<\/em>)/g; // Matches <em>...</em> tags
    const parts = description.split(regex); // Splits the string into parts

    return parts.map((part, index) => {
        if (part.startsWith("<em>") && part.endsWith("</em>")) {
            // Remove the <em> tags and wrap the content in <em>
            return <em key={index}>{part.slice(4, -5)}</em>;
        }
        return <span key={index}>{part}</span>; // Render other parts as plain text
    });
}