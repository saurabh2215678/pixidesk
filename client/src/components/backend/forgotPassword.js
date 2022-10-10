import React, {useState, useRef} from "react";
import {useForm} from "react-hook-form";
import {FormControl, InputLabel, Input, InputAdornment, Button } from '@mui/material';
import {Email} from '@mui/icons-material';
import { useAuth } from "../../contexts/AuthContext";
import LoadingButton from '@mui/lab/LoadingButton';

const ForgotPassword = ({onCloseClick}) => {
    const { resetPassword } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [firebaseEmailError, setFirebaseEmailError] = useState();
    const [formError, setformError] = useState();
    const [isMailSent, setisMailSent] = useState(false);
    const [loading, setloading] = useState(false);
    const formRef = useRef();
    const onSubmit = async (data) => {
        setloading(true);
        try{
            await resetPassword(data.email)
            setisMailSent(true);
            setloading(false);
        }catch(e){
            setloading(false);
            if(e.code === "auth/user-not-found"){
                setFirebaseEmailError("Email not found.");
            }
            if(e.code !== "auth/user-not-found"){
                setformError(e.code);
                console.log(e);
            }
        }
    };

    const handleClose = ()=> {
        setisMailSent(false);
        formRef.current.reset();
        formRef.current.blur()
        console.log('ddfd');
        onCloseClick();
    }


    return(
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="forgot_password card text-center">
           <h4 className="para-lg2">{!isMailSent ? 'Forgot Your Password?' : 'Password Reset Link Sent.'}</h4>
           {isMailSent && <p className="para-md3">Check Your Mail box To Reset Your password.</p>}
            {!isMailSent &&
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
            </FormControl>}
            {errors.email?.type === "required" && <p className="err">Email is Required</p>}
            {errors.email?.type === "pattern" && <p className="err">Enter valid Email id</p>}
            {firebaseEmailError && <p className="err">{firebaseEmailError}</p>}
            {loading? 
            <LoadingButton loading variant="contained" sx={{ mt: 2 }} fullWidth>Send Reset Link</LoadingButton>:
            !isMailSent ?
            <Button variant="contained" type="submit" className="text-white" sx={{ mt: 2 }} fullWidth>Send Reset Link</Button>
            :
            <Button component="div" onClick={handleClose} variant="contained" className="text-white" sx={{ mt: 2 }} fullWidth>Close</Button>
            }
            {formError && <p className="err">{formError}</p>}
        </form>
    );
}
export default ForgotPassword;