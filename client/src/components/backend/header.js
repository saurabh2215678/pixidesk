import React from "react";
import Menus from "./menus";
import { Button } from '@mui/material';

const Header = () => {
    return(
        <header>
            <div className="left">
                <Menus ristrictItems={true}/>
            </div>
            <div className="right">
                <Button variant="contained" className="text-white" fullWidth>Logout</Button>
            </div>
        </header>
    );
}
export default Header;