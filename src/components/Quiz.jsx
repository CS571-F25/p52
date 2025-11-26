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
    const [result, setResult] = useState("Results");

    // create a base array of no accuracies for each question
    const baseAccuracies = questions.map(() => "");

    // track accuracy of each answer
    const [accuracies, setAccuracies] = useState(baseAccuracies);

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

            // calculate accuracy of question
            setAccuracies((prev) => {
                // Get the selected answer
                const selectedAnswer = selectedAnswers[qIndex];

                // Find the corresponding answer object
                const answerObj = questions[qIndex].answers.find((a) => a.answer === selectedAnswer);

                // Create a shallow copy of the previous array
                const updated = [...prev];

                // Determine accuracy based on the solution value
                if (answerObj && answerObj.solution.includes("Correct")) {
                    updated[qIndex] = true; // Correct answer
                } else {
                    updated[qIndex] = false; // Incorrect answer
                }

                return updated; 
            });

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
            [qIndex]: answer
        }));
    };

    // calculates quiz results
    const calculateResults = () => {
        // Create an object to hold the count for each possible solution type
        const solutionCounts = {};

        // Iterate through the questions
        questions.forEach((question, qIndex) => {
            // Find the selected answer for the current question
            const selectedAnswer = selectedAnswers[qIndex];

            if (selectedAnswer) {
                // Find the answer object that matches the selected answer
                const answerObj = question.answers.find((a) => a.answer === selectedAnswer);

                if (answerObj && answerObj.solution) {
                    // Increment the count for each solution type in the solution array
                    answerObj.solution.forEach((solutionType) => {
                        if (!solutionCounts[solutionType]) {
                            solutionCounts[solutionType] = 0;
                        }
                        solutionCounts[solutionType]++;
                    });
                }
            }
        });

        let allSolutionResults = "";

        // get results for each solution type
        props.solutionTypes.map((solType) => {
            allSolutionResults += `${solType}: ${solutionCounts[solType] ?? 0} / ${questions.length}\n`
        })

        if (props.type === "character") {
            // Find the character(s) with the highest count
            const maxCount = Math.max(...Object.values(solutionCounts));
            const topCharacters = Object.keys(solutionCounts).filter(
                (character) => solutionCounts[character] === maxCount
            );

            // display result
            setResult(`You are most like: ${topCharacters.join(" and ")}!\n${allSolutionResults}`);
        }
        else if (props.type === "test") {
            // display result
            setResult(allSolutionResults);
        }
    };

    return <Card className="card" >
        <h2>{props.title}</h2>
        <br/>
        <div style={{border: "3px solid #e30080"}}>
            <Carousel
                ref={carouselRef}
                style={{ height: "auto"}}
                controls={false}
                interval={null}
                id={props.title}
            >
                {
                    questions.map((q, qIndex) => {
                        // list of answers
                        const answers = q.answers;

                        return <Carousel.Item key={qIndex} style={{paddingTop:"1rem"}}>
                            <fieldset>
                                <legend>{q.question}</legend>
                                <br/>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center", // Center the entire div
                                        height: "100%", // Ensure it takes up the full height of the carousel item
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column", // Stack radio buttons vertically
                                            alignItems: "flex-start", // Align items to the left
                                            textAlign: "left", // Align text to the left
                                        }}
                                    >
                                    {
                                        answers.map((a, index) => (
                                            <div key={index}> {/* Align radio button and label */}
                                                <input
                                                    type="radio"
                                                    id={`${props.title}-answer-${qIndex}-${index}`}
                                                    name={`quiz-answer-${qIndex}`}
                                                    value={a.answer}
                                                    onChange={() => handleAnswerChange(qIndex, a.answer)}
                                                    style={{ marginRight: "8px" }} // Adds spacing between the radio button and text
                                                />
                                                <label htmlFor={`${props.title}-answer-${qIndex}-${index}`} style={{ marginLeft: "4px" }}>
                                                    {a.answer}
                                                </label>
                                            </div>
                                        ))
                                    }
                                    </div>
                                </div>
                            </fieldset>
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
                                className="pink-button"
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
                            // reset accuracies
                            setAccuracies(baseAccuracies);

                            // reset result
                            setTimeout( () => {
                                setResult("Results");
                            }, 1000); // delay (in milliseconds) so the user does not see the reset
                        }} 
                        className="pink-button"
                    >Restart</button>
                    <br/><br/><br/>
                </Carousel.Item>
            </Carousel>
            {
                props.type === "test" &&
                <div className="custom-indicators" style={{"marginTop": 0, "marginBottom": 20}}>
                    {questions.map((_, index) => {
                        const accuracy = accuracies[index];
                        let colorClass = "unanswered";
                        if (accuracy === true) colorClass = "correct";
                        else if (accuracy === false) colorClass = "incorrect";

                        return (
                        <div
                            key={index}
                            className={`indicator ${colorClass}`}
                        />
                        );
                    })}
                </div>
            }
        </div>
    </Card>
}