import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';
import {ToastContainer} from "react-toastify";
import {useCheckAuthQuery} from "./redux/authApi";
import {useAppDispatch} from "./redux/store";
import {setAuthData, setToken} from "./redux/Reducers/authReducer/authReducer";
import axios from 'axios';


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
