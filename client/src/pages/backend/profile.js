import React,{useState, useRef, useEffect} from "react";
import { useAuth } from "../../contexts/AuthContext";
import {VisibilityOff, Visibility, AccountCircle, Email, Call} from '@mui/icons-material';
import {FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@mui/material';
import {useForm} from "react-hook-form";
import Avtar from "../../components/backend/avtar";
import ContentBox from "../../components/backend/contentBox";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@mui/lab/LoadingButton';

const Profile = () => {
    const {currentUser, updateEmail, updatePassword, logout} = useAuth();
    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm();
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const password = useRef({});
    const confirmPassword = useRef({});
    password.current = watch("password", "");
    confirmPassword.current = watch("confirm_password", "");

    const [firebaseEmailError, setFirebaseEmailError] = useState();
    const [formError, setformError] = useState();
    const [updateBtnLoading, setUpdateBtnLoading] = useState(false);

    const onSubmit = async (data) =>{
        setUpdateBtnLoading(true);
        const promises = []
        if(currentUser.email !== data.email){
            promises.push(updateEmail(data.email));
        }
        if(data.password){
            promises.push(updatePassword(data.password));
        }
        Promise.all(promises).then(()=>{
            toast.success("successfully updated");
            setUpdateBtnLoading(false);
        }).catch((e)=>{
            setUpdateBtnLoading(false);
            if(e.code === "auth/requires-recent-login"){
                logout();
            }
            if(e.code === "auth/email-already-in-use"){
                setFirebaseEmailError('Email already in use.')
            }else{
                setformError(e.code);
            }
        })
    };
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

    useEffect(()=>{
        if(currentUser){
            setValue("email",currentUser.email)
        }
    },[currentUser])

    return(
        <ContentBox className="profile_page">
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} className="_card text-center">
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
                    
                    {...register("password", {required:false, minLength:8})}
                    />
                </FormControl>
                {errors.password?.type === "minLength" && <p className="err">Minimum 8 chacters required</p>}
                <p className="inputinfo">Leave blank to keep the same</p>
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
                        {...register("confirm_password", {required:false, validate: value => value === password.current})}
                    />
                </FormControl>
                {errors.confirm_password?.type === "validate" && <p className="err">Password not matched</p>}
                <p className="inputinfo">Leave blank to keep the same</p>
                {updateBtnLoading?
                <LoadingButton loading variant="contained" sx={{ mt: 3 }} fullWidth>Update</LoadingButton>:
                <Button variant="contained" type="submit" className="text-white" sx={{ mt: 3 }} fullWidth>Update</Button>}
                {formError && <p className="err">{formError}</p>}
            </form>
        </ContentBox>
    );
}
export default Profile;