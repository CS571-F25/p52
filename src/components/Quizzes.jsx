import quizSets from "../assets/quizSets.json"
import Quiz from "./Quiz"

export default function Quizzes () {
    // get each quiz
    const quizzes = quizSets.quizzes;

    return <div>
        <h1 className="pageTitle">Quizzes</h1>
        {
            quizzes.map((quiz) => {
                return <Quiz key={quiz.title} {...quiz}></Quiz>
            })
        }
    </div>
}