import { Card } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";

export default function EventCard(props) {
    const contentRef = useRef(null);
    const [iframeHeight, setIframeHeight] = useState(0);
    const [showIframe, setShowIframe] = useState(false); // State to toggle iframe visibility

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.offsetHeight;
            setIframeHeight(2 * contentHeight); // Set iframe height equal to 2*(rest of content's height)
        }
    }, []);

    const renderName = splitEmTags(props.name);
    const renderDescription = splitEmTags(props.description);

    return <Card className={"card"} style={{ width: "100%", height: "100%" }}>
        {props.upcoming && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginBottom: "16px" }}>
                {props.categories.map((c) => (
                    <div key={c} style={{ padding: "4px 8px", border: `2px solid ${props.categoryColors.get(c)}`, borderRadius: "4px" }}>
                        {c}
                    </div>
                ))}
            </div>
        )}
        <div ref={contentRef}>
            <h2>{renderName}</h2>
            <p>{renderDescription}</p>
            {
                props.upcoming && <br />
            }
            <p><strong>Date: </strong>{props.date}</p>
            <p><strong>Time: </strong>{props.time}</p>
            <p><strong>Location: </strong>{props.location}</p>
            {
                !props.upcoming && <br />
            }
        </div>
        {!props.upcoming && props.slideshow && (
            <>
                <button onClick={() => setShowIframe(!showIframe)} className="pink-button" style={{ marginBottom: "10px" }}>
                    {showIframe ? "Hide Slideshow" : "Show Slideshow"}
                </button>
                {showIframe && (
                    <div style={{ width: "100%", height: `${iframeHeight}px` /* Dynamically set height*/ }}>
                        <iframe src={props.slideshow}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        ></iframe>
                    </div>
                )}
            </>
        )}
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