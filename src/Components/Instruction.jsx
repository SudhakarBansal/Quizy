import React from 'react'
import { useNavigate } from 'react-router-dom';

const Instruction = () => {
    const navigate = useNavigate();
    return (
        <div className="container d-flex justify-content-center">
            <div className="card text-center my-3" style={{ width: "800px" }}>
                <h2 className='mt-4'>Please follow these Instructions!</h2>
                <div className='card-body'>
                    <ol className="list-group list-group-numbered">
                        <li className="card card-2 my-2 py-3 mx-3">Please don't reload the page during your quiz.</li>
                        <li className="card card-2 my-2 py-3 mx-3">You will be asked 5 questions.</li>
                        <li className="card card-2 my-2 py-3 mx-3">15 seconds will be given for each answer.</li>
                        <li className="card card-2 my-2 py-3 mx-3">Selected Option will be recieved as your answer if timer goes off.</li>
                        <li className="card card-2 my-2 py-3 mx-3">Click again on selected option to unselect it.</li>
                    </ol>

                    <button className="btn btn-outline-dark mx-1 my-2" onClick={() => { navigate("/quiz") }}>Move to Quiz</button>
                </div>
            </div>
        </div>
    )
}

export default Instruction
