import React from "react";
import { ReactSVG } from 'react-svg';
import logo from '../../assets/svg/logo.svg';
import background from '../../assets/images/admin-splash.jpg';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Login = () => {

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
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
                    <h3 className="heading5">Welcome back</h3>
                    <p className="para-md3">Don't have an account? <Link to="/admin/signup" className="text-theme">Sign Up Free</Link></p>
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                        <Input
                            type="email"
                            endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle />
                            </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ mt: 2 }} fullWidth variant="standard">
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
                    <Button variant="contained" className="text-white" sx={{ mt: 3 }} fullWidth>Login</Button>
                </div>
            </div>
        </div>
    )
}
export default Login;