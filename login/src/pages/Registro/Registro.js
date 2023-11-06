import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Navigate, useNavigate } from "react-router-dom";
import authProvider from "../../auth/AuthProvider";
import "./Registro.css";
import api from "../../helpers/api";

export default function Registro(){

    const [name, setName] = useState("");
    const [loading, setIsloading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dpi, setDpi] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");

    const nav = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setIsloading(true);
        const userData = {
            Nombre: name,
            email: email,
            password: password,
            DPI: dpi,
            Direccion: direccion,
            Telefono: telefono,
            username: email,
            rol: 2
        }
        api.register(userData).then(registerResponse => {
            const token = registerResponse.data.jwt
                authProvider.getMe(token).then(response => {
                    const userData = response.data;
                    const session = {
                        user: {
                            id: userData.id,
                            email: userData.email,
                            nombre: userData.Nombre,
                            rol: {
                                id: userData.rol.id,
                                identificador: userData.rol.Identificador
                            }
                        },
                        token: token
                    
                    }
                    authProvider.saveSession(session)
                    console.log(session);
                    setIsloading(false);
                
                    nav("/dashboard");
                }).catch(err => console.log(err))
        })
        try{
        } catch (error){

        }
    }

    if(authProvider.checkAuth()){
        return <Navigate to="/dashboard"/>
    }

    return(

    <>
    <img src="muni.png" id="logo2"></img>
    <div className="container d-flex justify-content-center mt-5">
            
        <div className="card p-5">

            
            {
                loading ? (
                    <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                ) : (
                    <form className="card__form" onSubmit={handleSubmit} >
            <h1>Registro de usuario</h1>
                <div className="input-container mb-3 d-block">
                    
                    <label>Nombre completo:</label>
                    <input type="text" value={name}  className="form-control" required
                    onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="input-container mb-3 d-block">
                    <label>Correo electronico:</label>
                    <input type="email" value={email} className="form-control"  required
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="input-container mb-3 d-block">
                <label>DPI:</label>
                <input type="text" value={dpi} className="form-control" required
                onChange={(e) => setDpi(e.target.value)}/>
                </div>

                <div className="input-container mb-3 d-block">
                <label>Dirección:</label>
                <input type="text" value={direccion} className="form-control"  required
                onChange={(e) => setDireccion(e.target.value)}/>
                </div>

                <div className="input-container mb-3 d-block">
                <label>Telefono:</label>
                <input type="text" value={telefono} className="form-control" required
                onChange={(e) => setTelefono(e.target.value)}/>
                </div>

                <div className="input-container mb-3 d-block">
                <label>Contraseña:</label>
                <input type="password" value={password} className="form-control" required
                onChange={(e) => setPassword(e.target.value)}/>    
                </div>    

                <button className="btn btn-primary w-100">Registrarse</button>
                <a>¿Ya tienes cuenta? regresa para iniciar sesión</a>
                <a href="/login" className="btn btn-secondary w-100">Regresar</a>
            </form>
                )
            }
            
        </div>
    </div>
    <img src="banner_muni.jpg" ></img>
    </>
    );
}