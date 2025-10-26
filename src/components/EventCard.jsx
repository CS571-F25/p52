import { Card } from "react-bootstrap";

export default function EventCard(props) {
    const renderName = splitEmTags(props.name);
    const renderDescription = splitEmTags(props.description);

    return <Card style={{width: "100%", height: "100%", borderRadius: "1rem", marginBottom: "16px"}}>
        { props.upcoming &&
            <>
                {
                    props.categories.map((c) => <p key={c}>{c}</p>)
                }
            </>
        }
        <h2>{renderName}</h2>
        <p>{renderDescription}</p>
        <br/>
        <p><strong>Date: </strong>{props.date}</p>
        <p><strong>Time: </strong>{props.time}</p>
        <p><strong>Location: </strong>{props.location}</p>
        { !props.upcoming &&
            <div style={{ width: "100%", height: "100%" }}>
                <iframe src={props.slideshow}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                ></iframe>
            </div>
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