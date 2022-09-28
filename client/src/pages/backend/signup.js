import React from "react";
import { ReactSVG } from 'react-svg';
import logo from '../../assets/svg/logo.svg';
import background from '../../assets/images/admin-splash.jpg';
import {VisibilityOff, Visibility, AccountCircle, Email, ContactPhone} from '@mui/icons-material';
import {FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@mui/material';
import { Link } from "react-router-dom";
import Avtar from "../../components/backend/avtar";



const SignUp = () => {

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        confirmpassword: '',
        showPassword: false,
        showConfirmPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
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
                <div className="_card text-center">
                    <h3 className="heading5">Welcome to pixidesk.</h3>
                    <p className="para-md3">Already have an account? <Link to="/admin/login" className="text-theme">Log In Now</Link></p>
                    <div className="profile_pic">
                        <Avtar/>
                        
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
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                        <InputLabel>Phone</InputLabel>
                        <Input
                            type="tel"
                            endAdornment={
                            <InputAdornment position="end">
                                <ContactPhone />
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                        <InputLabel>Email</InputLabel>
                        <Input
                            type="email"
                            endAdornment={
                            <InputAdornment position="end">
                                <Email/>
                            </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                        <InputLabel>Confirm Password</InputLabel>
                        <Input
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmpassword}
                            onChange={handleChange('confirmpassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button variant="contained" className="text-white" sx={{ mt: 3 }} fullWidth>SignUp</Button>
                </div>
            </div>
        </div>
    );
}
export default SignUp;