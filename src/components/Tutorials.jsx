import { useState } from "react";
import {Card, Button, Container, Row, Col} from "react-bootstrap";

export default function Tutorials () {

  const [dances, setDances] = useState(false);
  const [diy, setDiy] = useState(false);

  return <div style={{backgroundColor: "white", padding: "1.5rem", borderRadius: "1rem"}}>
    <Container>
      <h3>Dances</h3>
      <p>Learn the choreography of your favorite songs!</p>
      <Button onClick={()=>{setDances(s=>!s)}} style={{backgroundColor:"#ff0080ff"}}>{dances ? "Hide Dances" : "Show Dances"}</Button>
        <br/>
        {
          dances ?
            <div>
            <br/>
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
            </div>
          : <></>
        }
      <br/><br/><br/>
      <h3>DIY</h3>
      <p>Learn how to make various crafts from the movie!</p>
      <Button onClick={()=>{setDiy(s=>!s)}} style={{backgroundColor:"#ff0080ff"}}>{diy ? "Hide DIY" : "Show DIY"}</Button>
        <br/>
        {
          diy ?
            <div>
            <br/>
            <h4>Norigae 노리개</h4>
            <p>Rumi</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/cIIprgB2uP4?si=FVHlqyeh9bfD6tUH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <br/><br/>
            <p>Mira</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/EkdG48W5RsA?si=Wmz1Jh5xJks8Fsws" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <br/><br/>
            <p>Zoey</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/7QTVLYQKyIY?si=eNvrEZTgNkKGvYYF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <br/><br/>
            <br/>
            <h4>Maedeup 매듭 Bracelet (Jinu's bracelet)</h4>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/YPtUIqpQ9ew?si=oLedYw-gMYdGEvbl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          : <></>
        }
      <br/>
    </Container>
  </div>
}