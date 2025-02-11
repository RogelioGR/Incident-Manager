import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Data/Services/AuthService';
import { Container, Spinner, Alert } from 'react-bootstrap';


const NewLogin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

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
            await login({ correo: email, contraseña: password });
            localStorage.setItem('authenticated', 'true');
            navigate("/Dashboard");
        } catch (error) {
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
            <div style={{
                backgroundColor: '#f0f2f5',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Arial, sans-serif',
                padding: '20px'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', backgroundColor: '#ffffff' }}>
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="text-center mb-4" style={{ color: '#333333', fontWeight: 'bold' }}>Incident Manager</h3>
                                    <p className="text-center text-muted mb-4">Gestiona tus incidentes de manera eficiente</p>

                                    {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}

                                    <form autoComplete="off" onSubmit={handleLogin}>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="form-label text-muted small">Correo Electrónico:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Ingresa tu correo"
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label text-muted small">Contraseña:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Ingresa tu contraseña"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn w-100"
                                            style={{ backgroundColor: '#007bff', color: '#ffffff', borderRadius: '10px', padding: '12px', fontWeight: 'bold' }}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                    {' '}Cargando...
                                                </>
                                            ) : 'Iniciar sesión'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NewLogin;