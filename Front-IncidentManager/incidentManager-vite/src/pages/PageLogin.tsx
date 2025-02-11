import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../Data/Services/AuthService'; 

const NewLogin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    // Evitar que usuarios autenticados vuelvan al login
    useEffect(() => {
        if (localStorage.getItem('authenticated') === 'true') {
            navigate("/Dashboard");
        }
    }, [navigate]);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        try {
            // Llama a la función login con los datos del formulario
            await login({ correo: email, contraseña: password });
            
            // Marca al usuario como autenticado
            localStorage.setItem('authenticated', 'true');

            // Redirige al Dashboard después del login
            navigate("/Dashboard");

        } catch (error) {
            // Manejo de errores
            if (error instanceof Error) {
                setErrorMessage("Correo o contraseña incorrectos.");
            } else {
                setErrorMessage("Ocurrió un error inesperado.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="login-container">
            <div className='box-login'>
                <div className="inner-box">
                    <div className="forms-wrap">
                        <form autoComplete="off" className="sign-in-form" onSubmit={handleLogin}>
                            <div className="logo">
                            </div>
                            <div className="heading">
                                <h2>Iniciar sesión</h2>
                            </div>
                            <div className="actual-form">
                                <div className="input-wrap">
                                    <input
                                        type="email"
                                        minLength={4}
                                        className="input-field"
                                        autoComplete="off"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label className='label-login'>Correo Electrónico</label>
                                </div>

                                <div className="input-wrap">
                                    <input
                                        type="password"
                                        minLength={4}
                                        className="input-field"
                                        autoComplete="off"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label className='label-login'>Contraseña</label>
                                </div>

                                {errorMessage && (
                                    <p style={{ color: 'red', fontSize: '0.9em' }}>{errorMessage}</p>
                                )}

                                <button type="submit" className="sign-btn" disabled={loading}>
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        'Iniciar sesión'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="logo-container">
                        <div className="images-wrapper">
                            <img src="/public/roomclean.png" className='image' alt="Logo" />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NewLogin;