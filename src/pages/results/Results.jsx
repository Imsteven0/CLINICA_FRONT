import React from "react";
import AuthGuard from "../../hooks/AuthGuard";

export default function Results() {
    return (
        <>
            <AuthGuard/>
            <div className="px-6 py-2">
                <h2>Pagina de Resultados.</h2>
            </div>
        </>
    );
};