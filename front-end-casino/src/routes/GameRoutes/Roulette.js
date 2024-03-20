import React from "react";
import { useNavigate } from "react-router-dom";

function Roulette() {
    const navigate = useNavigate();

    function goBlackjack() {
        navigate("/blackjack");
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 mt-5">
            <div className="bg-dark text-light rounded p-5 text-center">
                <h1 className="display-4">Roulette</h1>
                <h2>Coming soon!</h2>
                <button className="btn btn-primary mt-3" onClick={goBlackjack}>Play Blackjack?</button>
            </div>
        </div>
    );
}

export default Roulette;