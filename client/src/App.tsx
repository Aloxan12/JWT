import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';
import {ToastContainer} from "react-toastify";


function App() {

    return (
        <div className="App">
            <div>
                <NavLink to={"/registration"}>Регистрация</NavLink>
            </div>
        </div>
    );
}

export default App;
