import React,{useState} from "react";
import { ReactSVG } from 'react-svg';
import logo from '../../assets/svg/logo.svg';
import background from '../../assets/images/admin-splash.jpg';
import {VisibilityOff, Visibility, Email} from '@mui/icons-material';
import {FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@mui/material';

import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) =>{
        try{
            await login(data.email, data.password)
            navigate('/admin');
        }catch{
            console.log("failed to Login");
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <div className="splash-page login-page" style={{backgroundImage: `url(${background})`}}>
            <div className="center">
                <div className="logo">
                    <ReactSVG className="logo_icon" src={logo} />
                    <h1 className="logo_text para-lg2">PIXIDESK</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="_card text-center">
                    <h3 className="heading5">Welcome back</h3>
                    <p className="para-md3">Don't have an account? <Link to="/admin/signup" className="text-theme">Sign Up Free</Link></p>
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                        <Input
                            type="text"
                            endAdornment={
                            <InputAdornment position="end">
                                <Email />
                            </InputAdornment>
                            }
                            {...register("email", {required: true, pattern:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/})}
                        />
                    </FormControl>
                    {errors.email?.type === "required" && <p className="err">Email is Required</p>}
                    {errors.email?.type === "pattern" && <p className="err">Enter valid Email id</p>}
                    <FormControl sx={{ mt: 2 }} fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...register("password", {required: true, minLength:8})}
                        />
                    </FormControl>
                    {errors.password?.type === "required" && <p className="err">Password is Required</p>}
                    {errors.password?.type === "minLength" && <p className="err">Minimum 8 chacters required</p>}
                    <Button variant="contained" type="submit" className="text-white" sx={{ mt: 3 }} fullWidth>Login</Button>
                </form>
            </div>
        </div>
    )
}
export default Login;