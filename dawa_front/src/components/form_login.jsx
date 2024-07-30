// src/Components/form_login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import '../Styles/form_login.css';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                RedSocial UG - Grupo 7
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn({ onAuthenticate }) {
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser(); 
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');

        if (!username || !password) {
            setError('Ingrese Usuario o contraseña válida');
        } else {
            const credentials = {
                login_user: username,
                login_password: password,
            };
            setCredentials(credentials);
            setError(null); // Limpiar errores
        }
    };

    useEffect(() => {
        if (credentials) {
            console.log('Enviando credenciales:', credentials); 
            fetch("http://127.0.0.1:5000/security/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((data) => {
                        console.error('Error en la respuesta:', data); 
                        throw new Error(data.message || 'Usuario o contraseña incorrectos');
                    });
                }
                return res.json();
            })
            .then((data) => {
                console.log('Datos recibidos:', data);
                if (data.status === 'success') {
                    if (data.data) {
                        const user = {
                            id_usuario: data.data.usuario_id,
                            username: data.data.nombre,
                            role: data.data.role, 
                            profilePicture: data.data.profilePicture, 
                        };
                        localStorage.setItem('user', JSON.stringify(user));
                        setUser(user); 
                        setError(null);
                        if (typeof onAuthenticate === 'function') {
                            onAuthenticate(true, user.id_usuario, user.role); 
                        } else {
                            console.error('onAuthenticate no es una función');
                        }
                     
                        if (user.role === 'admin') {
                            navigate('/admin');
                        } else {
                            navigate('/home');
                        }
                    } else {
                        throw new Error('Datos de usuario incompletos en la respuesta');
                    }
                } else {
                    setError(data.message);
                }
            })
            .catch((err) => {
                console.error('Error en el inicio de sesión:', err); 
                setError(err.message || 'Error en el inicio de sesión');
            });
        }
    }, [credentials, navigate, onAuthenticate, setUser]);

    return (
        <div className='contenedor'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                    <MobileFriendlyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Usuario"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {error && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity="error">
                                {error}
                            </Alert>
                        </Stack>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"¿No tienes una cuenta? Crear una"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
    );
}
