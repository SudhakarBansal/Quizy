import React, { useState, useEffect, useContext } from 'react';
import CategoryContext from './Context/CategoryContext';
import { decode } from "html-entities";
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [timer, setTimer] = useState(15);
    const [timerExpired, setTimerExpired] = useState(true);
    const [quizData, setQuizData] = useState(null);
    const [questionCounter, setQuestionCounter] = useState(0);
    const { category, setCorrectAns, setGivenAns, setQuestionsArray } = useContext(CategoryContext);
    const navigate = useNavigate();
    const [countdownInterval, setCountdownInterval] = useState(null);

    const fetchCorrectAnswers = (data) => {
        const correctAnswers = data.map((question) => decode(question.correct_answer));
        setCorrectAns(correctAnswers);
        setQuestionsArray(data.map((question) => decode(question.question)));
    };


    useEffect(() => {
        const fetchQuizData = async () => {
            const api_url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=easy&type=multiple`;
            try {
                const response = await fetch(api_url);
                const data = await response.json();
                setQuizData(shuffleQuizData(data.results));
                startTimer();
                fetchCorrectAnswers(data.results); // Pass data.results to fetchCorrectAnswers
                setGivenAns([]);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        document.title = 'Quiz Started...';
        (category != null) ? fetchQuizData() : navigate('/');

        // Cleanup function to clear interval on component unmount
        return () => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    }, [category]);

    const shuffleQuizData = (quizData) => {
        // Shuffle options for each question
        return quizData.map(question => {
            return {
                ...question,
                incorrect_answers: shuffle([...question.incorrect_answers, question.correct_answer]),
            };
        });
    };

    const startTimer = () => {
        setTimer(15);
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(countdown);
                    handleTimeout();
                }
                return prevTimer - 1;
            });
        }, 1000);

        // Save the interval reference to state
        setCountdownInterval(countdown);
    };

    const handleTimeout = () => {
        setTimerExpired(false);
        nextQuestion();
    };
    const nextQuestion = () => {
        storeAnswer();
        setQuestionCounter((prevQuestionCounter) => prevQuestionCounter + 1);
        document.querySelector('.selected')?.classList.remove('selected');
        clearInterval(countdownInterval); // Clear the interval
        startTimer();
        setTimerExpired(true);
    };

    useEffect(() => {
        if (questionCounter === 5) {
            navigate("/score");
        }
    }, [questionCounter]);

    const storeAnswer = () => {
        const selectedOption = document.querySelector('.selected');
        if (selectedOption == null) {
            setGivenAns((prevGivenAns) => [...prevGivenAns, 'Time limit Exceeded']);
        } else {
            const selectedValue = selectedOption.innerHTML.toString();
            setGivenAns((prevGivenAns) => [...prevGivenAns, selectedValue]);
        }
    }

    const selectOption = (button) => {
        let stopExecution = false;
        setTimerExpired(false);

        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            setTimerExpired(true);
            stopExecution = true;
        }

        document.querySelectorAll('.option button').forEach((btn) => {
            btn.classList.remove('selected')
        });

        if (stopExecution) {
            return;
        }

        button.classList.add('selected');
    };

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    return (
        <div className="container d-flex justify-content-center">
            {quizData && (questionCounter <= 4) ? (
                <div className="my-3 d-flex align-items-center flex-column" style={{ width: "800px" }}>
                    <div id="clock">{timer}</div>
                    <div className='card container p-3'>
                        <h2 className="questionIndex">Questions {questionCounter + 1} of 5</h2>
                        <div className="question m-3">Q : {decode(quizData[questionCounter].question)}</div>
                        <div className="option d-flex flex-column justify-content-center align-items-center">
                            {quizData[questionCounter].incorrect_answers.map(
                                (option, index) => (
                                    <button key={index} onClick={(e) => { selectOption(e.target) }}>
                                        {decode(option)}
                                    </button>
                                )
                            )}
                        </div>
                        <div style={{ width: "100%" }} className='d-flex justify-content-center align-items-center'>
                            <button type='button' className="btn-outline-light next-button p-1 mt-3" disabled={timerExpired} onClick={nextQuestion}>
                                Submit answer
                            </button>
                        </div>
                    </div>
                </div>) : (<h2 id='loading'>Loading...</h2>)}
        </div>
    )
}

export default Quiz;
