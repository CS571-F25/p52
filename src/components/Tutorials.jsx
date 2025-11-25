import { useState, useRef, useEffect } from "react";
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import TutorialCategory from "./TutorialCategory.jsx";
import tutorials from "../assets/tutorials.json";

export default function Tutorials () {
  
  return <div>
    <h1 className="pageTitle">Tutorials</h1>
    <div style={{backgroundColor: "white", padding: "1.5rem", borderRadius: "1rem"}}>
    <Container>
      <br/><hr style={{border: "1px solid #7800b0ff"}}/><br/>
      {
        tutorials.map(t => {
          return <div>
            <TutorialCategory key={t.title} {...t}/>
            <br/><hr style={{border: "1px solid #7800b0ff"}}/><br/>
          </div>
        })
      }
    </Container>
  </div>
  </div>
}