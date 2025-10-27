import { Card } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";

export default function EventCard(props) {
    const contentRef = useRef(null);
    const [iframeHeight, setIframeHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.offsetHeight;
            setIframeHeight(2*contentHeight); // Set iframe height equal to 2*(rest of content's height)
        }
    }, []);

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
        <div ref={contentRef}>
            <h2>{renderName}</h2>
            <p>{renderDescription}</p>
            <br/>
            <p><strong>Date: </strong>{props.date}</p>
            <p><strong>Time: </strong>{props.time}</p>
            <p><strong>Location: </strong>{props.location}</p>
        </div>
        { !props.upcoming &&
            <div style={{ width: "100%", height: `${iframeHeight}px` /* Dynamically set height*/}}>
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