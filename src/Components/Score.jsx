import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryContext from './Context/CategoryContext';

const Score = () => {
    const navigate = useNavigate();
    const { givenAns, correctAns, questionsArray, category, setCategory } = useContext(CategoryContext);
    const [score, setScore] = useState('');
    const [correctAnsBackground, setCorrectAnsBackground] = useState([]);
    const [speechRendered, setSpeechRendered] = useState(false);

    const calculateScore = () => {
        let score = 0;
        const background = [];
        for (let i = 0; i < 5; i++) {
            if (correctAns[i] === givenAns[i]) {
                score++;
                background.push('question-correct');
            } else {
                background.push('question-wrong');
            }
        }
        setCorrectAnsBackground(background);
        setScore(score);
    };

    useEffect(() => {
        document.title = 'Quizy - Score card';
        (category != null) ? calculateScore() : navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!speechRendered && score !== '') {
            speakScore();
            setSpeechRendered(true);
            setCategory(null);
        }
    }, [score, speechRendered]);

    const speakScore = () => {
        const tempScore = score;
        const speechSynthesis = window.speechSynthesis;
        const scoreSpeech = `You Scored ${tempScore}; out of 5;`;
        let conditionalSpeech = '';

        if (score <= 2) {
            conditionalSpeech = 'No Problem! better luck next Time;';
        } else if (score > 2 && score <= 4) {
            conditionalSpeech = "It's a Nice Try; better luck next Time;";
        } else {
            conditionalSpeech = 'Congrats! you achieved a solid score;';
        }

        const textToSpeak = scoreSpeech + ";" + conditionalSpeech + ';' + 'Thanks for Using Quizy; By';
        if (textToSpeak) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className='card text-center my-3' style={{ width: "800px" }}>
                <div className='mt-4 mx-4 pt-3' id='score'>
                    <h2>Your Score is {score}/5</h2>
                    <p>View details : </p>
                </div>
                <div id="scoreResult" className='m-4'>
                    {questionsArray.map((question, index) => (
                        <div key={index} className={`card my-3 ${correctAnsBackground[index]} p-3`} >
                            <h6>Q{index + 1}. {question}</h6>
                            <div><strong>Your answer : </strong>{givenAns[index]}</div>
                            <div><strong>Correct Answer : </strong>{correctAns[index]}</div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-outline-dark mx-4 my-2" onClick={() => { navigate("/") }}>❮  Back To Home</button>
            </div>
        </div>
    )
}

export default Score;
