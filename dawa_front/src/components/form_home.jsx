// src/components/form_home.jsx
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../styles/form_home.css';

export default function HomeForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const postContent = data.get('postContent');

        if (!postContent) {
            alert('El contenido de la publicación no puede estar vacío');
        } else {
            console.log('Nueva publicación:', postContent);
        }
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
                Crear una nueva publicación
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="postContent"
                    label="¿Qué estás pensando?"
                    name="postContent"
                    autoComplete="off"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Publicar
                </Button>
            </Box>
        </Box>
    );
}
