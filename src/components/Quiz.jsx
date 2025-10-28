import {Card, Carousel} from "react-bootstrap"
import { useRef, useState } from "react";

// gets a quiz with a title and a list of questions
// each question gets its own carousel
// each question has some number of answers and its own title
export default function Quiz(props) {
    // list of questions
    const questions = props.questions;
    // so can scroll to next question after submit
    const carouselRef = useRef(null);

    // State to track the selected answer for each question
    const [selectedAnswers, setSelectedAnswers] = useState({});

    // determines whether scrolling to the next question is valid
    const handleNext = (qIndex) => {
        // Check if an answer is selected for the current question
        if (selectedAnswers[qIndex] !== undefined) {
            carouselRef.current.next(); // Scroll to the next item
            return true;
        } else {
            alert("Please select an answer before proceeding.");
            return false;
        }
    };

    // stores answers chosen
    const handleAnswerChange = (qIndex, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [qIndex]: answer,
        }));
    };

    return <Card>
        <h2>{props.title}</h2>
        <br/>
        <Carousel
            ref={carouselRef}
            style={{backgroundColor: "#ffc8e6ff", height: "auto"}}
            controls={false}
            interval={null}
        >
            {
                questions.map((q, qIndex) => {
                    // list of answers
                    const answers = q.answers;

                    return <Carousel.Item key={qIndex}>
                        <h3>{q.question}</h3>
                        <br/>
                        {
                            answers.map((a, index) => (
                                <div key={index} style={{ marginBottom: "8px", textAlign: "left" }}>
                                    <input
                                        type="radio"
                                        id={`answer-${qIndex}-${index}`}
                                        name={`quiz-answer-${qIndex}`}
                                        value={a.answer}
                                        onChange={() => handleAnswerChange(qIndex, a.answer)}
                                    />
                                    <label htmlFor={`answer-${qIndex}-${index}`} style={{ marginLeft: "4px" }}>
                                        {a.answer}
                                    </label>
                                </div>
                            ))
                        }
                        <br/>
                        <button
                            type="submit"
                            onClick={() => {
                                // Check before scrolling
                                if (handleNext(qIndex)) {
                                    // Reset radio buttons for the current question so it is not selected when the quiz is reset
                                    setTimeout( () => {
                                        const radios = document.querySelectorAll(`input[name="quiz-answer-${qIndex}"]`);
                                        radios.forEach((radio) => {
                                            radio.checked = false;
                                        });
                                    }, 1000); // delay (in milliseconds) so the user does not see the reset
                                }
                            }} 
                        >Submit</button>
                        <br/><br/><br/>
                    </Carousel.Item>
                })
                
            }
            <Carousel.Item>
                <h3>Results</h3>
                <br/>
                <button
                    type="submit"
                    onClick={() => {
                        // Scroll to first item
                        carouselRef.current.next()

                        // reset answers
                        setSelectedAnswers({});
                    }} 
                >Restart</button>
                <br/><br/><br/>
            </Carousel.Item>
        </Carousel>
    </Card>
}