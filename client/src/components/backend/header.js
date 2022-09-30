import React, { useState } from "react";
import Menus from "./menus";
import { Button } from '@mui/material';
import {useAuth} from '../../contexts/AuthContext';
import {Link, useNavigate} from "react-router-dom";

const Header = () => {

    const { currentUser, logout } = useAuth();
    const [err, setError] = useState("");
    const navigate = useNavigate();

    const handleLogout = async () => {
        setError("");
        try{
            await logout();
            navigate('login');
        }catch(e){
            setError(e.code);
            console.log(err);
        }
    }

    return(
        <header>
            <div className="left">
                <Menus ristrictItems={true}/>
            </div>
            <div className="right">
                <p>{currentUser && currentUser.email}</p>
                <Button variant="contained" onClick={handleLogout} className="text-white" fullWidth>Logout</Button>
                <Button component={Link} to="updateProfile" style={{minWidth:"fit-content"}} variant="contained" className="text-white" fullWidth>Update profile</Button>
            </div>
        </header>
    );
}
export default Header;