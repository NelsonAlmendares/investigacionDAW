// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import '../../css/style.css';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setToken(response.data.token);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (

        <div className="contents">
            <Card className='center-card' sx={{ minWidth: 275 }}>
            <CardContent className='card_content'>
                <Typography className='content_login-header' gutterBottom sx={{ color: 'text.secondary', fontSize: 34 }}>
                    Login
                </Typography>
                
                <form onSubmit={handleSubmit} className='form_content'>
                    <label for="exampleFormControlInput1" class="form-label-nofrw">User Name:</label>
                    <TextField id="outlined-basic" className='custom_size' onChange={(e) => setUsername(e.target.value)} value={username} label="Username" variant="outlined" required />

                    <label for="exampleFormControlInput1" class="form-label-nofrw">Password:</label>
                    <TextField type="password" className='custom_size' id="outlined-basic" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" label="Password" variant="outlined" required />            

                    <CardActions>
                        <Button type="submit" className='custom-button-secondary' > Login </Button>{' '}
                    </CardActions>
                    
                </form>

            </CardContent>            
        </Card>
        </div>        
    );
};

export default Login;
