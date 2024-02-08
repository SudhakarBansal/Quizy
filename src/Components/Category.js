import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryContext from './Context/CategoryContext';
import Navbar from './Navbar';
import { useEffect } from 'react';
const Category = () => {

    const { setCategory } = useContext(CategoryContext);
    const navigate = useNavigate();

    const redirectToQuiz = (value) => {
        setCategory(value);

        // Redirect to the instruction route with the category query parameter
        navigate("/instruction");
    };

    useEffect(() => {
        document.title = 'Quizy - Explore, Play, and Challenge Your Knowledge!';
    }, [])


    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center">
                <div className='card text-center mt-5' style={{ width: "800px" }}>
                    <h2 className='mt-4'>Select Your Area of Interest</h2>
                    <div className="card-body">
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(9)}>General Knowledge</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(10)}>Books</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(11)}>Film</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(12)}>Music</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(13)}> Musicals & Theatres</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(14)}>Televion</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(15)}>Video Games</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(16)}>Board Games</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(17)}>Science & Nature</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(18)}>Computers</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(19)}>Mathematics</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(20)}>Mythology</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(21)}>Sports</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(22)}>Geography</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(23)}>History</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(24)}>Politics</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(25)}>Art</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(26)}>Celebrities</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(27)}>Animals</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(28)}>Vehicles</button>
                        <button type="button" className="btn btn-outline-dark mx-1 my-2" onClick={() => redirectToQuiz(30)}>Gadgets</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;
