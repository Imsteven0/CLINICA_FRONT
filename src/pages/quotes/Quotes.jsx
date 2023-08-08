import React from "react";
import AuthGuard from "../../hooks/AuthGuard";

export default function Quotes() {
    return (
        <>
            <AuthGuard/>
            <div className="px-6 py-2">
                <h2>Pagina de Citas.</h2>
            </div>
        </>
    );
};