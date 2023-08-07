import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from './hooks/useAuth'

import LoginForm from "./pages/autentication/LoginForm";
import RegisterForm from "./pages/autentication/RegisterForm";
import HomePage from "./pages/home/HomePage";
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/Register" element={<RegisterForm/>}/>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
