import React from "react";
import Menus from "./menus";

const Header = () => {
    return(
        <header>
            <div className="left">
                <Menus ristrictItems={true}/>
            </div>
            <div className="right"></div>
        </header>
    );
}
export default Header;