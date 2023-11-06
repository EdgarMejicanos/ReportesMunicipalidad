import { Navigate, useNavigate } from "react-router-dom";
import authProvider from "../../auth/AuthProvider";
import api from "../../helpers/api";
import { useState } from "react";
import "./Login.css";


export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoding] = useState(false);

    const nav = useNavigate();

    if(authProvider.checkAuth()){
        return <Navigate to="/dashboard"/>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoding(true);
        api.login({email, password}).then((loginResponse) => {
                const token = loginResponse.data.jwt
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
                    setIsLoding(false);
                
                    nav("/dashboard");
                }).catch(err => console.log(err))
            
        })
        .catch((err) => {
            console.log(err.message)
            setIsLoding(false);
        });
    }

    return(
        <>
        <img src="muni.png" id="logo2"></img>

        <div className="container d-flex justify-content-center mt-5">
            
            <div className="card p-5">
                {
                    isLoading ? (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                            <form className="card__form" onSubmit={handleSubmit}>
                                <h1>MuniReportes</h1>
                                <div className="input-container mb-3 d-block">
                                    <label htmlFor="email" className="floatingInputValue">Usuario</label>
                                    <input 
                                        className="form-control" 
                                        type="email" 
                                        name="email"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name">Contraseña</label>
                                    <input
                                        name="password"
                                        id="name"
                                        className="form-control"
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />           
                                </div>                    
                                <button type="submit" className="btn btn-primary w-100">Entrar</button>                          
                            </form>
                        )
                }
                                    <p>¿No tienes cuenta? puedes crear una aquí.</p>
                                    <a href="/registro" className="btn btn-secondary w-100">Registrarse</a>
                                
            </div>
        </div>
        <br></br>
        <br></br>
        <img src="banner_muni.jpg" ></img>
        </>
    );
}