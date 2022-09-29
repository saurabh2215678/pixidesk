import React,{useRef, useState} from "react";
import { ReactSVG } from 'react-svg';
import logo from '../../assets/svg/logo.svg';
import background from '../../assets/images/admin-splash.jpg';
import {VisibilityOff, Visibility, AccountCircle, Email, Call} from '@mui/icons-material';
import {FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import Avtar from "../../components/backend/avtar";
import {useForm} from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";


const SignUp = () => {

    const { signup } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) =>{
        try{
            await signup(data.email, data.password);
            navigate('/admin');
        }catch{
            console.log("failed to create account");
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const password = useRef({});
    const confirmPassword = useRef({});
    password.current = watch("password", "");
    confirmPassword.current = watch("confirm_password", "");

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleProfilePic = (pictureblob) =>{
        console.log(pictureblob);
    }

    return(
        <div className="splash-page login-page" style={{backgroundImage: `url(${background})`}}>
            <div className="center">
                <div className="logo">
                    <ReactSVG className="logo_icon" src={logo} />
                    <h1 className="logo_text para-lg2">PIXIDESK</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="_card text-center">
                    <h3 className="heading5">Welcome to pixidesk.</h3>
                    <p className="para-md3">Already have an account? <Link to="/admin/login" className="text-theme">Log In Now</Link></p>
                    <div className="profile_pic">
                        <Avtar onChange={handleProfilePic} />
                    </div>
                    <FormControl fullWidth variant="standard">
                        <InputLabel>Name</InputLabel>
                        <Input
                            type="text"
                            endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle />
                            </InputAdornment>
                            }
                            {...register("name", {required:true})}
                        />
                    </FormControl>
                    {errors.name?.type === "required" && <p className="err">Name is Required</p>}
                    <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                        <InputLabel>Phone</InputLabel>
                        <Input
                            type="tel"
                            endAdornment={
                            <InputAdornment position="end">
                                <Call />
                            </InputAdornment>
                            }
                        {...register("phone", {required: true, pattern:/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/})}
                        />
                    </FormControl>
                    {errors.phone?.type === "required" && <p className="err">Phone is Required</p>}
                    {errors.phone?.type === "pattern" && <p className="err">Enter valid Phone number</p>}
                    <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                        <InputLabel>Email</InputLabel>
                        <Input
                            type="text"
                            endAdornment={
                            <InputAdornment position="end">
                                <Email/>
                            </InputAdornment>
                            }
                        {...register("email", {required: true, pattern:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/})}
                        />
                    </FormControl>
                    {errors.email?.type === "required" && <p className="err">Email is Required</p>}
                    {errors.email?.type === "pattern" && <p className="err">Enter valid Email id</p>}
                    <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
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
                    <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                        <InputLabel>Confirm Password</InputLabel>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...register("confirm_password", {required: true, validate: value => value === password.current})}
                        />
                    </FormControl>
                    {errors.confirm_password?.type === "required" && <p className="err">Confirm password is Required</p>}
                    {errors.confirm_password?.type === "validate" && <p className="err">Password not matched</p>}
                    <Button variant="contained" type="submit" className="text-white" sx={{ mt: 3 }} fullWidth>SignUp</Button>
                </form>
            </div>
        </div>
    );
}
export default SignUp;