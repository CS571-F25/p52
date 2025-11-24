import {useState} from "react";
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import discordQR from "../assets/QR Codes/discordQR.png";
import formQR from "../assets/QR Codes/formQR.png";
import mailingQR from "../assets/QR Codes/mailingQR.png";
import availabilityQR from "../assets/QR Codes/availabilityQR.png";
import lessons from "../assets/dailyLessons.json"
import Source from "./Source.jsx";
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
                        <div>
                            <h3>Club Interest form</h3>
                            <p>What activities are you interested in?</p>
                            <img src={formQR} alt="QR Code for Club Interest Form" style={{ width: "20%", height: "auto" }}></img>
                            <br/>
                            <a href="https://tinyurl.com/kdhclubform">https://tinyurl.com/kdhclubform</a>
                        </div>
                        <br/>
                        <div>
                            <h3>Club Discord</h3>
                            <p>Discuss everything KPDH with other fans!<br/>We share updates and events here.</p>
                            <img src={discordQR} alt="QR Code for Discord Join Link" style={{ width: "22%", height: "auto" }}></img>
                            <br/>
                            <a href="https://discord.gg/HHbv3AZNSY">https://discord.gg/HHbv3AZNSY</a>
                        </div>
                        <br/>
                    </Col>
                    <Col sm={12} md={6}>
                        <div>
                            <h3>Availability Form</h3>
                            <p>What meeting times work best for you?</p>
                            <img src={availabilityQR} alt="QR Code for Availability Form" style={{ width: "22%", height: "auto" }}></img>
                            <br/>
                            <a href="https://www.when2meet.com/?32132278-2l8BM">https://www.when2meet.com/?32132278-2l8BM</a>
                        </div>
                        <br/>
                        <div>
                            <h3>Club Mailing List</h3>
                            <p>An invite link to the Outlook Mailing Group.<br/>We share updates and events here.</p>
                            <img src={mailingQR} alt="QR Code for Mailing List" style={{ width: "20%", height: "auto" }}></img>
                            <br/>
                            <a href="https://tinyurl.com/join-kdh-club-mailing">https://tinyurl.com/join-kdh-club-mailing</a>
                        </div>
                    </Col>
                </Row>
            </Container>

            <br/>
            {/* Daily Lesson */}
            <h2>Lesson of the Day</h2>
            <Card style={{border: "3px solid #e30080"}}>

                <h3>{dailyLesson.title}</h3>
                {
                    dailyLesson.img == null ? <></> :<img src={src} alt={dailyLesson.img.alt} style={{ maxWidth: "100%", height: "auto" }} />
                }
                <br/>

                {/* This styling will allow \n to be recognized. Inspired by: https://stackoverflow.com/questions/42547885/how-to-recognize-new-line-character-n-in-html*/}
                <p style={{whiteSpace: "pre-wrap", textAlign: "left"}}>{dailyLesson.content}</p>

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