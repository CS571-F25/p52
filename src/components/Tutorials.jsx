import { useState } from "react";
import {Card, Button, Container, Row, Col} from "react-bootstrap";

export default function Tutorials () {

  const [dances, setDances] = useState(false);
  const [diy, setDiy] = useState(false);

  return <div>
    <h1 className="pageTitle">Tutorials</h1>
    <div style={{backgroundColor: "white", padding: "1.5rem", borderRadius: "1rem"}}>
    <Container>
      <h3>Dances</h3>
      <p>Learn the choreography of your favorite songs!</p>
      <button className="quiz-button" onClick={()=>{setDances(s=>!s)}} style={{backgroundColor:"#ff0080ff"}}>{dances ? "Hide Dances" : "Show Dances"}</button>
        <br/>
        {
          dances ?
            <Card style={{border: "3px solid #ff1493", alignItems: "center"}}>
              <h4>Golden</h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/qgojgsKgxO4?si=GsdQTaLL5xOCmsEp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <br/><br/>
              <h4>Soda Pop</h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/adeRPcoYJRI?si=o-gBhwv2dypBw8WI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <br/><br/>
              <h4>Your Idol</h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/PipEqZguT7I?si=JPD_QBinyR23IKct" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <br/><br/>
              <h4>Takedown</h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/dqLuEgLeBPw?si=OpzUJHlyMGNong6u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </Card>
          : <></>
        }
      <br/><hr style={{border: "1px solid #7800b0ff"}}/><br/>
      <h3>DIY</h3>
      <p>Learn how to make various crafts from the movie!</p>
      <button className="quiz-button" onClick={()=>{setDiy(s=>!s)}} style={{backgroundColor:"#ff0080ff"}}>{diy ? "Hide DIY" : "Show DIY"}</button>
        <br/>
        {
          diy ?
            <Card style={{border: "3px solid #ff1493", alignItems: "center"}}>
              <h4>Norigae 노리개</h4>
              <div>Rumi</div>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/cIIprgB2uP4?si=FVHlqyeh9bfD6tUH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <br/>
              <div>Mira</div>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/EkdG48W5RsA?si=Wmz1Jh5xJks8Fsws" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <br/>
              <div>Zoey</div>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/7QTVLYQKyIY?si=eNvrEZTgNkKGvYYF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              <br/><br/>
              <h4>Maedeup 매듭 Bracelet (Jinu's Bracelet)</h4>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/YPtUIqpQ9ew?si=oLedYw-gMYdGEvbl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </Card>
          : <></>
        }
      <br/>
    </Container>
  </div>
  </div>
}