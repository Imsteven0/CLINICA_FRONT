import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from './hooks/useAuth'

import LoginForm from "./pages/autentication/LoginForm";
import RegisterForm from "./pages/autentication/RegisterForm";
import UserPage from "./pages/home/UserPage";
import Navbar from './components/Navbar'; // Tu componente de barra de navegación
import './index.css';
import NotFound from "./pages/404/NotFound";
import Quotes from "./pages/quotes/Quotes";
import Exams from "./pages/exams/Exams";
import Results from "./pages/results/Results";


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/Register" element={<RegisterForm/>}/>
                    <Route path="/" element={<Navbar/>}>
                        <Route index element={<UserPage/>}/>
                        <Route path="quotes" element={<Quotes/>}/>
                        <Route path="exams" element={<Exams/>}/>
                        <Route path="results" element={<Results/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
