import React from "react";
import Login_form from '../Components/form_login';

export default function Login({ onAuthenticate }) {
    return (
        <div className="contenedor_login">
            <Login_form onAuthenticate={onAuthenticate} />
        </div>
    );
}