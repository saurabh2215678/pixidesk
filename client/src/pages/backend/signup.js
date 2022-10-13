import React,{useRef, useState, useEffect} from "react";
import { ReactSVG } from 'react-svg';
import logo from '../../assets/svg/logo.svg';
import background from '../../assets/images/admin-splash.jpg';
import {VisibilityOff, Visibility, AccountCircle, Email, Call} from '@mui/icons-material';
import {FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@mui/material';
import { Link, useNavigate, Navigate} from "react-router-dom";
import Avtar from "../../components/backend/avtar";
import {useForm} from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import CountryCodeSelector from "../../components/backend/countryCodeSelector";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../state/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';

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


const SignUp = () => {

    const { signup, currentUser, signInWithFacebook, signUpWithGoogle } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {signedUp} = bindActionCreators(actionCreators, dispatch);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [contryCode, setcontryCode] = useState();
    const password = useRef({});
    const confirmPassword = useRef({});
    password.current = watch("password", "");
    confirmPassword.current = watch("confirm_password", "");
    
    const [firebaseEmailError, setFirebaseEmailError] = useState();
    const [formError, setformError] = useState();
    const [profilePicBlob, setprofilePicBlob] = useState();

    const onSubmit = async (data) =>{
        try{
            await signup({...data, profile_picture:profilePicBlob, country_code:contryCode });
            navigate('/admin');
        }catch(e){
            signedUp();
            if(e.code === "auth/email-already-in-use"){
                setFirebaseEmailError("Email already exists.");
            }else{
                setformError(e.code);
                console.log(e);
            }
        }
    };

    // useEffect(()=>{
    //     console.log(isSigningUp);
    // },[isSigningUp]);

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if(type === "change" && name === "email"){
                setFirebaseEmailError(undefined);
            }
        });
        return () => subscription.unsubscribe();
      }, [watch]);

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
        setprofilePicBlob(pictureblob);
    }

    const handlePhoneFocus = (e) => {
        var inputCountryWidth = e.target.closest(".input_phone").firstChild.clientWidth;
        e.target.closest(".input_phone").style.setProperty('--input_dial_code_width', `${inputCountryWidth}px`);
    }
    const handleCountryCodeChange = ({element, country}) => {
        var inputCountryWidth = element?.clientWidth;
        element?.closest(".input_phone").style.setProperty('--input_dial_code_width', `${inputCountryWidth}px`);
        setcontryCode(country?.dial_code);
    }

    if (currentUser) {
        return <Navigate to="/admin" replace />;
      }

    const handleSignUpWithFacebook = async () => {
        const signupwithfacebook = await signInWithFacebook();
        if(signupwithfacebook == 'auth/account-exists-with-different-credential'){
            toast.error("Already registered with this facebook account. try logging in");
        }
        // console.log(signupwithfacebook)
    } 
    return(
        <div className="splash-page login-page" style={{backgroundImage: `url(${background})`}}>
            <div className="center">
            <ToastContainer
            position="bottom-center"
            />
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
                    <div className="input_phone">
                        <CountryCodeSelector onChange={handleCountryCodeChange} />
                        <FormControl sx={{ mt: 1 }} fullWidth variant="standard">
                            <InputLabel>Phone</InputLabel>
                            <Input
                                type="tel"
                                onFocus={handlePhoneFocus}
                                endAdornment={
                                <InputAdornment position="end">
                                    <Call />
                                </InputAdornment>
                                }
                            {...register("phone", {required: true, pattern:/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/})}
                            />
                        </FormControl>
                    </div>
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
                    {firebaseEmailError && <p className="err">{firebaseEmailError}</p>}
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
                    {formError && <p className="err">{formError}</p>}
                </form>
                <span className="or">or</span>
                <div className="otherbuttons d-flex">
                    
                    <FacebookButton variant="contained" type="submit" onClick={handleSignUpWithFacebook} className="text-white" sx={{ mt: 3 }} fullWidth>Sign up with facebook</FacebookButton>
                    <div className="p-2"></div>
                    <GoogleButton variant="contained" type="submit"  onClick={()=>signUpWithGoogle()} className="text-white" sx={{ mt: 3 }} fullWidth>Sign up with Google</GoogleButton>
                </div>
            </div>
        </div>
    );
}
export default SignUp;