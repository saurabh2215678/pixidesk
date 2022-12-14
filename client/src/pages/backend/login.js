import React,{useState, useEffect} from "react";
import { ReactSVG } from 'react-svg';
import logo from '../../assets/svg/logo.svg';
import background from '../../assets/images/admin-splash.jpg';
import {VisibilityOff, Visibility, Email} from '@mui/icons-material';
import {FormControl, InputLabel, Input, InputAdornment, IconButton, Slide, Dialog, Button } from '@mui/material';

import { Link, useNavigate, Navigate, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import ForgotPassword from "../../components/backend/forgotPassword";
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const FacebookButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#0069d9'),
    backgroundColor: '#0069d9',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
  }));

const GoogleButton = styled(Button)(({ theme }) => ({
color: theme.palette.getContrastText('#DB4437'),
backgroundColor: '#DB4437',
'&:hover': {
    backgroundColor: '#DB4437',
},
}));

const Login = () => {
    const { login, currentUser, signInWithFacebook, signInWithGoogle} = useAuth();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [firebaseEmailError, setFirebaseEmailError] = useState();
    const [firebasePasswordError, setFirebasePasswordError] = useState();
    const [formError, setformError] = useState();
    const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const from = location.state?.from || "/admin";
    const onSubmit = async (data) =>{
        setFormSubmitLoading(true);
        try{
            await login(data.email, data.password)
            navigate(from, { replace: true });
        }catch(e){
            setFormSubmitLoading(false);
            if(e.code === "auth/wrong-password"){
                setFirebasePasswordError('Wrong Password.');
            }
            if(e.code === "auth/user-not-found"){
                setFirebaseEmailError("Email not found.");
            }
            if(e.code !== "auth/wrong-password" && e.code !== "auth/user-not-found"){
                setformError(e.code);
                console.log(e);
            }
        }
    };

    const handleOpenForgotPasswordModal = () => {
        setOpenForgotPasswordModal(true);
    }
    const handleCloseForgotPasswordModal = () => {
        setOpenForgotPasswordModal(false);
    }

      // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
        if(type === "change" && name === "email"){
            setFirebaseEmailError(undefined);
        }
        if(type === "change" && name === "password"){
            setFirebasePasswordError(undefined);
        }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    if (currentUser) {
        return <Navigate to={from} replace />;
      }

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
                    {firebaseEmailError && <p className="err">{firebaseEmailError}</p>}
                    <FormControl sx={{ mt: 2 }} fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            onChange={()=>setFirebasePasswordError(undefined)}
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
                    {firebasePasswordError && <p className="err">{firebasePasswordError}</p>}
                    <Button variant="text" onClick={handleOpenForgotPasswordModal} sx={{ my: 2 }}>Forgot Password?</Button>
                    {formSubmitLoading?
                    <LoadingButton loading variant="contained" fullWidth>Login</LoadingButton>:
                    <Button variant="contained" type="submit" className="text-white"  fullWidth>Login</Button>
                    }
                    {formError && <p className="err">{formError}</p>}
                </form>
                <span className="or">or</span>
                <div className="otherbuttons d-flex">
                    <FacebookButton variant="contained" type="submit" onClick={signInWithFacebook} className="text-white" sx={{ mt: 3 }} fullWidth>Login with facebook</FacebookButton>
                    <div className="p-2"></div>
                    <GoogleButton variant="contained" type="submit" onClick={signInWithGoogle} className="text-white" sx={{ mt: 3 }} fullWidth>Login with Google</GoogleButton>
                </div>
            </div>
            <Dialog
                open={openForgotPasswordModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseForgotPasswordModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <ForgotPassword onCloseClick={handleCloseForgotPasswordModal}/>
            </Dialog>
        </div>
    )
}
export default Login;