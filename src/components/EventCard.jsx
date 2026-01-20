import { Card } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";
import splitEmTags from "../helper-functions/splitEmTags.jsx";

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
        {props.isUpcoming && (
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
                props.isUpcoming && <br />
            }
            <p><strong>Date: </strong>{props.date}</p>
            <p><strong>Time: </strong>
                {
                    props.startTime === "TBD" || props.endTime === "TBD"  ? "TBD"
                    : `${props.startTime} - ${props.endTime}`
                }
            </p>
            <p><strong>Location: </strong>{props.location}</p>
        </div>
        {!props.isUpcoming && props.slideshow && (
            <>
                <button onClick={() => setShowIframe(!showIframe)} className="pink-button">
                    {showIframe ? "Hide Slideshow" : "Show Slideshow"}
                </button>
                {showIframe && (
                    <div style={{ marginTop: 10, width: "100%", height: `${iframeHeight}px` /* Dynamically set height*/ }}>
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
        {!props.isUpcoming && !props.slideshow &&
            <p style={{marginBottom:0}}><em>No slideshow attached.</em></p>
        }
    </Card>;
}