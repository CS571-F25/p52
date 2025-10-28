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
    // track result
    const [result, setResult] = useState("");

    // determines whether scrolling to the next question is valid
    const handleNext = (qIndex) => {
        // Check if an answer is selected for the current question
        if (selectedAnswers[qIndex] !== undefined) {
            // Scroll to the next item
            carouselRef.current.next();

            // calculate results
            if (qIndex === questions.length - 1) {
                calculateResults();
            }

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

    // calculates quiz results
    const calculateResults = () => {
        if (props.type === "character") {
            // Create an object to hold the count for each character
            const characterCounts = {};

            // Iterate through the questions
            questions.forEach((question, qIndex) => {
                // Find the selected answer for the current question
                const selectedAnswer = selectedAnswers[qIndex];

                if (selectedAnswer) {
                    // Find the answer object that matches the selected answer
                    const answerObj = question.answers.find((a) => a.answer === selectedAnswer);

                    if (answerObj && answerObj.solution) {
                        // Increment the count for each character in the solution array
                        answerObj.solution.forEach((character) => {
                            if (!characterCounts[character]) {
                                characterCounts[character] = 0;
                            }
                            characterCounts[character]++;
                        });
                    }
                }
            });

            // Find the character(s) with the highest count
            const maxCount = Math.max(...Object.values(characterCounts));
            const topCharacters = Object.keys(characterCounts).filter(
                (character) => characterCounts[character] === maxCount
            );

            let allChrResults = "";

            // get results for each character
            props.characters.map((chr) => {
                allChrResults += `${chr}: ${characterCounts[chr] ?? 0} / ${questions.length}\n`
            })

            // display result
            setResult(`You are most like: ${topCharacters.join(" and ")}!\n${allChrResults}`);

        } else if (props.type === "test") {
            // Handle other quiz types if needed
        }
    };

    return <Card>
        <h2>{props.title}</h2>
        <br/>
        <Carousel
            ref={carouselRef}
            style={{border: "3px solid #ff1493", height: "auto"}}
            controls={false}
            interval={null}
        >
            {
                questions.map((q, qIndex) => {
                    // list of answers
                    const answers = q.answers;

                    return <Carousel.Item key={qIndex} style={{paddingTop:"1rem"}}>
                        <h3>{q.question}</h3>
                        <br/>
                        {
                            answers.map((a, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center", // Aligns the radio button and text vertically
                                        marginBottom: "1rem",
                                        paddingLeft: "5rem"
                                    }}
                                >
                                    <input
                                        type="radio"
                                        id={`answer-${qIndex}-${index}`}
                                        name={`quiz-answer-${qIndex}`}
                                        value={a.answer}
                                        onChange={() => handleAnswerChange(qIndex, a.answer)}
                                        style={{ marginRight: "8px" }} // Adds spacing between the radio button and text
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
            <Carousel.Item style={{paddingTop:"1rem"}}>
                <h3>Results</h3>
                <h4 style={{whiteSpace: "pre-wrap"}}>{result}</h4>
                <br/>
                <button
                    type="submit"
                    onClick={() => {
                        // Scroll to first item
                        carouselRef.current.next()

                        // reset answers
                        setSelectedAnswers({});

                        // reset result
                        setTimeout( () => {
                            setResult("");
                        }, 1000); // delay (in milliseconds) so the user does not see the reset
                    }} 
                >Restart</button>
                <br/><br/><br/>
            </Carousel.Item>
        </Carousel>
    </Card>
}