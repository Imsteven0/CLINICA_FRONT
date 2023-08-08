import React from "react";
import AuthGuard from "../../hooks/AuthGuard";

export default function Exams() {
    return (
        <>
            <AuthGuard/>
            <div className="px-6 py-2">
                <h2>Pagina de examenes.</h2>
            </div>
        </>
    );
};