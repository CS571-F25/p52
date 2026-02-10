import {useState} from "react";
import {Card, Container, Row, Col} from "react-bootstrap";
import splitEmTags from "../helper-functions/splitEmTags.jsx";
import discordQR from "../assets/QR Codes/discordQR.png";
import formQR from "../assets/QR Codes/formQR.png";
import mailingQR from "../assets/QR Codes/mailingQR.png";
import availabilityQR from "../assets/QR Codes/availabilityQR.png";
import lessons from "../assets/dailyLessons.json"
import Source from "./Source.jsx";
import QRCode from "./QRCode.jsx";
import footerImage from "../assets/KPDH-Footer.png";

const imageMap = import.meta.glob('../assets/vocab-pics/*', {eager: true, query: 'url'});

export default function Home (props) {

    // new day, new lesson
    const d = new Date();
    let day = d.getDate(); // returns 1 to 31
    let index = day % lessons.length;

    let dailyLesson = lessons[index];
    let sources = dailyLesson.sources;

    // controls whether the daily lesson sources are shown; controlled by a button
    const [showSources, setShowSources] = useState(false);

    // fetch the image from the source if it exists
    let src = "";

    if (dailyLesson.img) {
        src = imageMap[dailyLesson.img.src].default;
    }

    return <div>
        <h1 className="pageTitle">Home</h1>
        <div className="infoCard">
            <p style={{textAlign: "left"}}>Welcome to the KPop Demon Hunters club website!</p>
            <p style={{textAlign: "left"}}>The KPop Demon Hunters club is a UW-Madison club inspired by the movie <em>KPop Demon Hunters</em> that explores music, dance, art, and Korean culture.</p>
            <p style={{textAlign: "left"}}>Our goal is to focus activities around members' interests. Feel free to reach out to us to suggest activities you would like to see. If you would like to lead a meeting, let us know and we will help make it happen!</p>

            <br/>
            <h2>Ready to Seal the Honmoon?</h2>

            {/* Important Club Links */}
            <Container>
                <Row>
                    <Col sm={12} md={6}>
                        <QRCode
                            title="Club Interest form"
                            lines={["What activities are you interested in?"]}
                            Qr={formQR} QRalt="QR Code for Club Interest Form" imgWidth="20%"
                            link="https://tinyurl.com/kdhclubform"
                        />
                        <br/>
                        <QRCode
                            title="Club Discord"
                            lines={["Discuss everything KPDH with other fans!", "We share updates and events here."]}
                            Qr={discordQR} QRalt="QR Code for Discord Join Link" imgWidth="20%"
                            link="https://discord.gg/HHbv3AZNSY"
                        />
                        <br/>
                    </Col>
                    <Col sm={12} md={6}>
                        <QRCode
                            title="Availability Form"
                            lines={["What meeting times work best for you?"]}
                            Qr={availabilityQR} QRalt="QR Code for Availability Form" imgWidth="20%"
                            link="https://tinyurl.com/s26kdh"
                        />
                        <br/>
                        <QRCode
                            title="Club Mailing List"
                            lines={["An invite link to the Outlook Mailing Group.", "We share updates and events here."]}
                            Qr={mailingQR} QRalt="QR Code for Mailing List" imgWidth="20%"
                            link="https://tinyurl.com/join-kdh-club-mailing"
                        />
                        <br/>
                    </Col>
                </Row>
            </Container>

            <br/>
            {/* Daily Lesson */}
            <h2>Lesson of the Day</h2>
            <Card className="pinkBorder">

                <h3 className="no-break-cjk">{dailyLesson.title}</h3>
                {
                    dailyLesson.img == null ? <></> :<img src={src} alt={dailyLesson.img.alt} style={{ maxWidth: "100%", height: "auto" }} />
                }
                <br/>

                {/* This styling will allow \n to be recognized. Inspired by: https://stackoverflow.com/questions/42547885/how-to-recognize-new-line-character-n-in-html*/}
                {/* There may be italics within the content. We use splitEmTags() to handle <em> tags in the content */}
                <p style={{whiteSpace: "pre-wrap", textAlign: "left"}}>{splitEmTags(dailyLesson.content)}</p>

                <br/>
                <button className="purple-button" onClick={()=>{setShowSources(s=>!s)}}>{showSources ? "Hide " : "Show "}Sources</button>
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
        <img src={footerImage} alt="Footer Image with Zoey, Rumi, and Mira gazing upwards" style={{ width: "60%", height: "auto" }} />
    </div>
}